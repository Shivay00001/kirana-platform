const supabase = require('../config/supabase');

exports.getAllProducts = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .order('name');

        if (error) throw error;

        res.json({ success: true, data });
    } catch (err) {
        console.error('DB Error:', err.message);
        res.status(500).json({ success: false, error: 'Database connection failed' });
    }
};

exports.searchProducts = async (req, res) => {
    const { q } = req.query;
    if (!q) return exports.getAllProducts(req, res);

    try {
        // ILIKE for case-insensitive search on name, or exact match on barcode
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .or(`name.ilike.%${q}%,barcode.eq.${q}`);

        if (error) throw error;
        res.json({ success: true, data });
    } catch (err) {
        console.error('DB Search Error:', err.message);
        res.status(500).json({ success: false, error: 'Search failed' });
    }
};

exports.createProduct = async (req, res) => {
    try {
        const { name, barcode, price, stock, category } = req.body;

        // Validation
        if (!name || !price) {
            return res.status(400).json({ success: false, error: 'Name and Price are required' });
        }

        const { data, error } = await supabase
            .from('products')
            .insert([{ name, barcode, price, stock, category }])
            .select()
            .single();

        if (error) throw error;
        res.status(201).json({ success: true, data });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};
