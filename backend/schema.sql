-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- SHOPS TABLE
CREATE TABLE IF NOT EXISTS shops (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  address TEXT,
  phone VARCHAR(20),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- PRODUCTS TABLE
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  shop_id UUID REFERENCES shops(id),
  name VARCHAR(255) NOT NULL,
  barcode VARCHAR(100) UNIQUE,
  price DECIMAL(10, 2) NOT NULL,
  stock INTEGER DEFAULT 0,
  category VARCHAR(100),
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- SALES TABLE
CREATE TABLE IF NOT EXISTS sales (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  shop_id UUID REFERENCES shops(id),
  total_amount DECIMAL(10, 2) NOT NULL,
  payment_method VARCHAR(50) DEFAULT 'cash',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- SALE ITEMS JOINT TABLE
CREATE TABLE IF NOT EXISTS sale_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sale_id UUID REFERENCES sales(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id),
  quantity INTEGER NOT NULL,
  price_at_sale DECIMAL(10, 2) NOT NULL,
  total DECIMAL(10, 2) NOT NULL
);

-- SEED DATA (Shop & Products)
INSERT INTO shops (id, name, address, phone) 
VALUES ('00000000-0000-0000-0000-000000000001', 'Test Kirana Store', '123 Main St', '9876543210')
ON CONFLICT DO NOTHING;

INSERT INTO products (shop_id, name, barcode, price, stock, category) VALUES
('00000000-0000-0000-0000-000000000001', 'Maggi Noodles', '8901058000490', 14.00, 100, 'Food'),
('00000000-0000-0000-0000-000000000001', 'Tata Salt 1kg', '8904043901006', 28.00, 50, 'Grocery'),
('00000000-0000-0000-0000-000000000001', 'Amul Taaza Milk', '8901262010044', 54.00, 24, 'Dairy'),
('00000000-0000-0000-0000-000000000001', 'Colgate Strong Teeth', '8901314010526', 95.00, 30, 'Personal Care')
ON CONFLICT (barcode) DO NOTHING;
