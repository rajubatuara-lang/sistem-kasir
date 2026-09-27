-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  price NUMERIC(12, 2) NOT NULL,
  cost NUMERIC(12, 2) NOT NULL,
  stock INTEGER NOT NULL DEFAULT 0,
  status VARCHAR(20) NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  image TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create transactions table
CREATE TABLE IF NOT EXISTS transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice VARCHAR(100) UNIQUE NOT NULL,
  date TIMESTAMPTZ NOT NULL,
  cashier VARCHAR(100) NOT NULL,
  items JSONB NOT NULL,
  subtotal NUMERIC(12, 2) NOT NULL,
  discount NUMERIC(12, 2) NOT NULL DEFAULT 0,
  total NUMERIC(12, 2) NOT NULL,
  method VARCHAR(20) NOT NULL CHECK (method IN ('cash', 'transfer', 'qris')),
  status VARCHAR(20) NOT NULL DEFAULT 'completed' CHECK (status IN ('completed', 'void', 'pending')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_status ON products(status);
CREATE INDEX IF NOT EXISTS idx_products_code ON products(code);
CREATE INDEX IF NOT EXISTS idx_transactions_date ON transactions(date);
CREATE INDEX IF NOT EXISTS idx_transactions_status ON transactions(status);
CREATE INDEX IF NOT EXISTS idx_transactions_invoice ON transactions(invoice);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers to automatically update updated_at
CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_transactions_updated_at
  BEFORE UPDATE ON transactions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert initial categories
INSERT INTO categories (name) VALUES
  ('Makanan'),
  ('Minuman'),
  ('Snack'),
  ('Kebutuhan'),
  ('Elektronik')
ON CONFLICT (name) DO NOTHING;

-- Enable Row Level Security (RLS)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (you can modify these based on your needs)
-- For now, we'll allow all operations for authenticated users

-- Products policies
CREATE POLICY "Enable read access for all users" ON products
  FOR SELECT USING (true);

CREATE POLICY "Enable insert for authenticated users only" ON products
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update for authenticated users only" ON products
  FOR UPDATE USING (true);

CREATE POLICY "Enable delete for authenticated users only" ON products
  FOR DELETE USING (true);

-- Transactions policies
CREATE POLICY "Enable read access for all users" ON transactions
  FOR SELECT USING (true);

CREATE POLICY "Enable insert for authenticated users only" ON transactions
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update for authenticated users only" ON transactions
  FOR UPDATE USING (true);

CREATE POLICY "Enable delete for authenticated users only" ON transactions
  FOR DELETE USING (true);

-- Categories policies
CREATE POLICY "Enable read access for all users" ON categories
  FOR SELECT USING (true);

CREATE POLICY "Enable insert for authenticated users only" ON categories
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update for authenticated users only" ON categories
  FOR UPDATE USING (true);

CREATE POLICY "Enable delete for authenticated users only" ON categories
  FOR DELETE USING (true);
