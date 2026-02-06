require('dotenv').config({ path: '../.env' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
);

const SHOP_ID = '00000000-0000-0000-0000-000000000001';

const PRODUCTS = [
    { shop_id: SHOP_ID, name: 'Maggi Noodles', barcode: '8901058000490', price: 14.00, stock: 100, category: 'Food' },
    { shop_id: SHOP_ID, name: 'Tata Salt 1kg', barcode: '8904043901006', price: 28.00, stock: 50, category: 'Grocery' },
    { shop_id: SHOP_ID, name: 'Amul Taaza Milk', barcode: '8901262010044', price: 54.00, stock: 24, category: 'Dairy' },
    { shop_id: SHOP_ID, name: 'Colgate Strong Teeth', barcode: '8901314010526', price: 95.00, stock: 30, category: 'Personal Care' },
    { shop_id: SHOP_ID, name: 'Dove Soap', barcode: '8901030000001', price: 45.00, stock: 60, category: 'Personal Care' }
];

async function seed() {
    console.log('🌱 Seeding Database...');

    try {
        // 1. Create Shop
        console.log('Checking Shop...');
        const { error: shopError } = await supabase
            .from('shops')
            .upsert({
                id: SHOP_ID,
                name: 'Test Kirana Store',
                address: '123 Main St',
                phone: '9876543210'
            })
            .select();

        if (shopError) {
            if (shopError.code === '42P01') {
                console.error('❌ ERROR: Table "shops" does not exist.');
                console.error('👉 ACTION REQUIRED: Run the SQL in backend/schema.sql in your Supabase SQL Editor first!');
                process.exit(1);
            }
            throw shopError;
        }

        // 2. Insert Products
        console.log('Inserting Products...');
        for (const p of PRODUCTS) {
            const { error: prodError } = await supabase
                .from('products')
                .upsert(p, { onConflict: 'barcode' });

            if (prodError) console.error(`Failed to insert ${p.name}:`, prodError.message);
            else console.log(`✅ ${p.name}`);
        }

        console.log('✨ Data Seeding Complete!');
    } catch (err) {
        console.error('Unexpected Error:', err);
    }
}

seed();
