/**
 * Quick Test Supabase Connection via Browser Console
 * 
 * Cara pakai:
 * 1. Buka aplikasi di browser
 * 2. Buka Developer Console (F12)
 * 3. Copy paste isi file ini ke console
 * 4. Ketik: testSupabase()
 */

async function testSupabase() {
  console.log('🔄 Testing Supabase Connection...\n');
  
  try {
    // Import fungsi test
    const { testSupabaseConnection } = await import('./src/lib/supabase-test.ts');
    
    // Jalankan test
    const result = await testSupabaseConnection();
    
    if (result.success) {
      console.log('✅ SUCCESS! Supabase is connected.\n');
      console.log('📊 Database Stats:');
      console.table(result.stats);
    } else {
      console.log('❌ FAILED! Connection error.\n');
      console.error('Error:', result.error);
    }
    
    return result;
    
  } catch (error) {
    console.error('❌ Test failed:', error);
    return { success: false, error: error.message };
  }
}

// Info
console.log('📦 Supabase Test loaded!');
console.log('💡 Type: testSupabase() to run the test');
