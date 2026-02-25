export default function Home() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'Arial, sans-serif' }}>
      
      {/* Header */}
      <header style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        background: '#003366',
        padding: '16px 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 1000
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ 
            width: '40px', 
            height: '40px', 
            background: '#FFD700', 
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            color: '#003366'
          }}>AP</div>
          <span style={{ color: 'white', fontWeight: 'bold', fontSize: '18px' }}>PT. ANDIKA PRATAMA</span>
        </div>
        <nav style={{ display: 'flex', gap: '24px' }}>
          <a href="#beranda" style={{ color: 'white', textDecoration: 'none' }}>Beranda</a>
          <a href="#layanan" style={{ color: 'white', textDecoration: 'none' }}>Layanan</a>
          <a href="#kontak" style={{ color: 'white', textDecoration: 'none' }}>Kontak</a>
        </nav>
      </header>

      {/* Hero */}
      <section id="beranda" style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #003366 0%, #001a33 50%, #000000 100%)',
        textAlign: 'center',
        padding: '120px 24px 60px'
      }}>
        <div style={{ maxWidth: '800px' }}>
          <h1 style={{ fontSize: '48px', fontWeight: 'bold', color: 'white', marginBottom: '24px' }}>
            PT. ANDIKA PRATAMA
          </h1>
          <p style={{ fontSize: '24px', color: '#FFD700', marginBottom: '32px' }}>
            Solusi Kerja dengan Penghasilan Tertinggi
          </p>
          <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.8)', marginBottom: '40px' }}>
            Pendaftaran Gratis – Kontrak Langsung, Gaji Transparan
          </p>
          <a href="#kontak" style={{
            display: 'inline-block',
            background: '#FFD700',
            color: '#003366',
            padding: '16px 48px',
            borderRadius: '8px',
            fontWeight: 'bold',
            fontSize: '18px',
            textDecoration: 'none'
          }}>
            HUBUNGI KAMI
          </a>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '60px', marginTop: '60px', paddingTop: '40px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            <div>
              <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#FFD700' }}>4000+</div>
              <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px' }}>Wanita bekerja</div>
            </div>
            <div>
              <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#FFD700' }}>5+</div>
              <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px' }}>Tahun berdiri</div>
            </div>
            <div>
              <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#FFD700' }}>100%</div>
              <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px' }}>Gaji Transparan</div>
            </div>
          </div>
        </div>
      </section>

      {/* Layanan */}
      <section id="layanan" style={{ padding: '80px 24px', background: '#f8fafc' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 'bold', color: '#003366', textAlign: 'center', marginBottom: '48px' }}>
            Pilihan Kontrak Premium
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            
            <div style={{ background: 'white', borderRadius: '16px', padding: '24px', border: '1px solid #e5e7eb' }}>
              <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#003366', marginBottom: '16px' }}>Bidang Setengah</h3>
              <p style={{ color: '#666', marginBottom: '24px' }}>Kontrak pelayanan yang cepat dan instan</p>
              <div style={{ background: '#f1f5f9', borderRadius: '8px', padding: '12px', marginBottom: '8px', display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: '500', color: '#003366' }}>3 Hari</span>
                <span style={{ fontWeight: 'bold', color: '#003366' }}>Rp 45-65 Juta</span>
              </div>
              <div style={{ background: '#f1f5f9', borderRadius: '8px', padding: '12px', marginBottom: '8px', display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: '500', color: '#003366' }}>7 Hari</span>
                <span style={{ fontWeight: 'bold', color: '#003366' }}>Rp 170-200 Juta</span>
              </div>
              <div style={{ background: '#f1f5f9', borderRadius: '8px', padding: '12px', display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: '500', color: '#003366' }}>30 Hari</span>
                <span style={{ fontWeight: 'bold', color: '#003366' }}>Rp 1-1.5 Miliar</span>
              </div>
            </div>

            <div style={{ background: 'white', borderRadius: '16px', padding: '24px', border: '2px solid #FFD700' }}>
              <span style={{ background: '#FFD700', color: '#003366', padding: '4px 12px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold' }}>RECOMMENDED</span>
              <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#003366', marginTop: '16px', marginBottom: '16px' }}>Bidang Full</h3>
              <p style={{ color: '#666', marginBottom: '24px' }}>Gaji 3X lipat dari Bidang Setengah</p>
              <div style={{ background: '#f1f5f9', borderRadius: '8px', padding: '12px', marginBottom: '8px', display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: '500', color: '#003366' }}>3 Hari</span>
                <span style={{ fontWeight: 'bold', color: '#003366' }}>Rp 90-130 Juta</span>
              </div>
              <div style={{ background: '#f1f5f9', borderRadius: '8px', padding: '12px', marginBottom: '8px', display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: '500', color: '#003366' }}>7 Hari</span>
                <span style={{ fontWeight: 'bold', color: '#003366' }}>Rp 340-400 Juta</span>
              </div>
              <div style={{ background: '#f1f5f9', borderRadius: '8px', padding: '12px', display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: '500', color: '#003366' }}>30 Hari</span>
                <span style={{ fontWeight: 'bold', color: '#003366' }}>Rp 2-3 Miliar</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Kontak */}
      <section id="kontak" style={{ padding: '80px 24px', background: 'white' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 'bold', color: '#003366', textAlign: 'center', marginBottom: '48px' }}>
            Hubungi Kami
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px' }}>
            <div style={{ background: '#f8fafc', borderRadius: '12px', padding: '24px' }}>
              <h3 style={{ fontWeight: 'bold', color: '#003366', marginBottom: '8px' }}>📍 Alamat</h3>
              <p style={{ color: '#666' }}>Tapaktuan, Kab. Aceh Selatan, ACEH</p>
            </div>
            <div style={{ background: '#f8fafc', borderRadius: '12px', padding: '24px' }}>
              <h3 style={{ fontWeight: 'bold', color: '#003366', marginBottom: '8px' }}>📱 WhatsApp</h3>
              <p style={{ color: '#666' }}>+62 852-7021-8007</p>
            </div>
            <div style={{ background: '#f8fafc', borderRadius: '12px', padding: '24px' }}>
              <h3 style={{ fontWeight: 'bold', color: '#003366', marginBottom: '8px' }}>📧 Email</h3>
              <p style={{ color: '#666' }}>Pt.andikapratama20@gmail.com</p>
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: '32px' }}>
            <a href="https://wa.me/6285270218007" target="_blank" rel="noopener noreferrer" style={{
              display: 'inline-block',
              background: '#003366',
              color: 'white',
              padding: '16px 48px',
              borderRadius: '8px',
              fontWeight: 'bold',
              fontSize: '18px',
              textDecoration: 'none'
            }}>
              Hubungi via WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: '#003366', color: 'white', padding: '32px 24px', textAlign: 'center', marginTop: 'auto' }}>
        <p>© 2024 PT. ANDIKA PRATAMA. All rights reserved.</p>
      </footer>
    </div>
  );
}
