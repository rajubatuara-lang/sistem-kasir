import { supabase } from './supabase';

/**
 * Test koneksi ke Supabase
 * Mengembalikan status koneksi dan informasi project
 */
export async function testSupabaseConnection() {
  try {
    console.log('🔄 Testing Supabase connection...');
    
    // Test 1: Cek apakah client terbuat dengan benar
    if (!supabase) {
      console.error('❌ Supabase client not initialized');
      return {
        success: false,
        error: 'Supabase client not initialized',
      };
    }
    
    console.log('✅ Supabase client initialized');
    
    // Test 2: Ping database dengan query sederhana
    const { data, error } = await supabase
      .from('products')
      .select('count')
      .limit(1);
    
    if (error) {
      console.error('❌ Database connection failed:', error.message);
      return {
        success: false,
        error: error.message,
        details: error,
      };
    }
    
    console.log('✅ Database connection successful');
    
    // Test 3: Cek jumlah data di tabel
    const { count: productCount } = await supabase
      .from('products')
      .select('*', { count: 'exact', head: true });
    
    const { count: transactionCount } = await supabase
      .from('transactions')
      .select('*', { count: 'exact', head: true });
    
    const { count: categoryCount } = await supabase
      .from('categories')
      .select('*', { count: 'exact', head: true });
    
    console.log('📊 Database Stats:');
    console.log(`   Products: ${productCount || 0}`);
    console.log(`   Transactions: ${transactionCount || 0}`);
    console.log(`   Categories: ${categoryCount || 0}`);
    
    // Test 4: Cek environment variables
    const envCheck = {
      url: import.meta.env.VITE_SUPABASE_URL ? '✅ Set' : '❌ Missing',
      anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY ? '✅ Set' : '❌ Missing',
    };
    
    console.log('🔐 Environment Variables:');
    console.log(`   VITE_SUPABASE_URL: ${envCheck.url}`);
    console.log(`   VITE_SUPABASE_ANON_KEY: ${envCheck.anonKey}`);
    
    console.log('✅ All tests passed! Supabase is connected.');
    
    return {
      success: true,
      stats: {
        products: productCount || 0,
        transactions: transactionCount || 0,
        categories: categoryCount || 0,
      },
      env: envCheck,
    };
    
  } catch (error: any) {
    console.error('❌ Connection test failed:', error.message);
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * Test koneksi dengan feedback visual di UI
 */
export async function testConnectionWithFeedback(): Promise<{
  success: boolean;
  message: string;
  details?: any;
}> {
  try {
    const result = await testSupabaseConnection();
    
    if (result.success) {
      return {
        success: true,
        message: `Koneksi berhasil! Database memiliki ${result.stats?.products} produk, ${result.stats?.transactions} transaksi, dan ${result.stats?.categories} kategori.`,
        details: result.stats,
      };
    } else {
      return {
        success: false,
        message: `Koneksi gagal: ${result.error}`,
        details: result.details,
      };
    }
  } catch (error: any) {
    return {
      success: false,
      message: `Error: ${error.message}`,
    };
  }
}

/**
 * Quick test - hanya return true/false
 */
export async function isSupabaseConnected(): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('products')
      .select('id')
      .limit(1);
    
    return !error;
  } catch {
    return false;
  }
}
