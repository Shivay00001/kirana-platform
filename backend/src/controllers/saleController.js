const supabase = require('../config/supabase');

exports.createSale = async (req, res) => {
    try {
        const { shop_id, items, total, payment_method } = req.body;

        // Note: Basic validation is handled by middleware, but we double-check internals here

        // 1. Create Sale Record
        const { data: sale, error: saleError } = await supabase
            .from('sales')
            .insert([{
                shop_id: shop_id || '00000000-0000-0000-0000-000000000001', // Default Shop ID
                total_amount: total,
                payment_method
            }])
            .select()
            .single();

        if (saleError) throw saleError;

        // 2. Prepare Sale Items
        const saleItems = items.map(item => ({
            sale_id: sale.id,
            product_id: item.id,
            quantity: item.quantity,
            price_at_sale: item.price,
            total: item.price * item.quantity
        }));

        // 3. Batch Insert Items
        const { error: itemsError } = await supabase
            .from('sale_items')
            .insert(saleItems);

        if (itemsError) throw itemsError;

        // 4. Update Stock (Atomicity via RPC)
        // This ensures preventing Race Conditions (Double Selling).
        // It calls the Postgres function 'decrement_stock' which uses Row-Level Locking.
        const errors = [];
        for (const item of items) {
            const { error: rpcError } = await supabase.rpc('decrement_stock', {
                row_id: item.id,
                qty: item.quantity
            });

            if (rpcError) {
                console.error(`Stock Update Failed for Product ${item.id}:`, rpcError.message);
                errors.push({ id: item.id, error: rpcError.message });
            }
        }

        if (errors.length > 0) {
            // Partial success warning
            return res.status(206).json({
                success: true,
                sale_id: sale.id,
                message: 'Sale recorded but some stock updates failed (Race condition or insufficient stock).',
                failed_items: errors
            });
        }

        res.json({ success: true, sale_id: sale.id, message: 'Sale recorded successfully' });
    } catch (err) {
        console.error('Sale Transaction Error:', err);
        res.status(500).json({ success: false, error: 'Transaction failed. Please try again.' });
    }
};
