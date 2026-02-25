'use client'

import { useState } from 'react'

export default function Home() {
  const [formData, setFormData] = useState({
    nama: '',
    hp: '',
    layanan: '',
    durasi: '',
    bank: '',
    rekening: ''
  })

  const jobs = [
    { id: 1, title: 'Pelayanan Setengah Badan', durasi: '3 Hari', gaji: 'Rp 45-65 Juta', type: 'Setengah' },
    { id: 2, title: 'Pelayanan Setengah Badan', durasi: '7 Hari', gaji: 'Rp 170-200 Juta', type: 'Setengah' },
    { id: 3, title: 'Pelayanan Setengah Badan', durasi: '30 Hari', gaji: 'Rp 1-1.5 Miliar', type: 'Setengah' },
    { id: 4, title: 'Pelayanan Badan Penuh', durasi: '3 Hari', gaji: 'Rp 90-130 Juta', type: 'Full' },
    { id: 5, title: 'Pelayanan Badan Penuh', durasi: '7 Hari', gaji: 'Rp 340-400 Juta', type: 'Full' },
    { id: 6, title: 'Pelayanan Badan Penuh', durasi: '30 Hari', gaji: 'Rp 2-3 Miliar', type: 'Full' },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const message = `Halo, saya ingin mendaftar:

Nama: ${formData.nama}
HP/WA: ${formData.hp}
Layanan: ${formData.layanan}
Durasi: ${formData.durasi}
Bank: ${formData.bank}
Rekening: ${formData.rekening}`
    
    window.open(`https://wa.me/6285215573737?text=${encodeURIComponent(message)}`, '_blank')
  }

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
          <a href="#tentang" style={{ color: 'white', textDecoration: 'none' }}>Tentang</a>
          <a href="#layanan" style={{ color: 'white', textDecoration: 'none' }}>Layanan</a>
          <a href="#portofolio" style={{ color: 'white', textDecoration: 'none' }}>Portofolio</a>
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
            DAFTAR SEKARANG
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

      {/* Tentang Kami */}
      <section id="tentang" style={{ padding: '80px 24px', background: 'white' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 'bold', color: '#003366', textAlign: 'center', marginBottom: '16px' }}>
            Mengapa PT. Andika Pratama?
          </h2>
          <p style={{ fontSize: '18px', color: '#666', textAlign: 'center', marginBottom: '48px' }}>
            Kami adalah mitra terpercaya untuk kontrak kerja premium di sektor pelayanan kecerdasan
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
            <div style={{ background: '#003366', borderRadius: '16px', padding: '24px', color: 'white', textAlign: 'center' }}>
              <div style={{ fontSize: '32px', marginBottom: '8px' }}>1</div>
              <h3 style={{ fontWeight: 'bold', marginBottom: '8px' }}>PENDAFTARAN</h3>
              <p style={{ opacity: 0.8 }}>Gratis</p>
            </div>
            <div style={{ background: '#003366', borderRadius: '16px', padding: '24px', color: 'white', textAlign: 'center' }}>
              <div style={{ fontSize: '32px', marginBottom: '8px' }}>2</div>
              <h3 style={{ fontWeight: 'bold', marginBottom: '8px' }}>BEKERJA</h3>
              <p style={{ opacity: 0.8 }}>Profesional</p>
            </div>
            <div style={{ background: '#003366', borderRadius: '16px', padding: '24px', color: 'white', textAlign: 'center' }}>
              <div style={{ fontSize: '32px', marginBottom: '8px' }}>3</div>
              <h3 style={{ fontWeight: 'bold', marginBottom: '8px' }}>TERIMA GAJI</h3>
              <p style={{ opacity: 0.8 }}>Selesai Kontrak</p>
            </div>
          </div>
        </div>
      </section>

      {/* Layanan */}
      <section id="layanan" style={{ padding: '80px 24px', background: '#f8fafc' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 'bold', color: '#003366', textAlign: 'center', marginBottom: '16px' }}>
            Pilihan Kontrak Premium
          </h2>
          <p style={{ fontSize: '18px', color: '#666', textAlign: 'center', marginBottom: '48px' }}>
            Dua bidang utama dengan kompensasi sesuai kebutuhan pribadi pekerja
          </p>
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

      {/* Portofolio */}
      <section id="portofolio" style={{ padding: '80px 24px', background: 'white' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 'bold', color: '#003366', textAlign: 'center', marginBottom: '16px' }}>
            Proyek & Lowongan Terbaru
          </h2>
          <p style={{ fontSize: '18px', color: '#666', textAlign: 'center', marginBottom: '48px' }}>
            Peluang menghasilkan puluhan juta atau milyar hanya hitungan hari tanpa resiko
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            {jobs.map((job) => (
              <div key={job.id} style={{ background: 'white', borderRadius: '12px', padding: '20px', border: '1px solid #e5e7eb' }}>
                <div style={{ 
                  display: 'inline-block',
                  background: job.type === 'Full' ? '#FFD700' : '#e5e7eb', 
                  color: '#003366',
                  padding: '4px 10px', 
                  borderRadius: '4px', 
                  fontSize: '12px',
                  fontWeight: 'bold',
                  marginBottom: '12px'
                }}>
                  {job.type}
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px', color: '#003366' }}>{job.title}</h3>
                <p style={{ fontSize: '14px', marginBottom: '4px', color: '#666' }}>Durasi: {job.durasi}</p>
                <p style={{ fontSize: '16px', fontWeight: 'bold', color: '#FFD700' }}>{job.gaji}</p>
                <a href="#kontak" style={{
                  display: 'block',
                  marginTop: '16px',
                  background: '#003366',
                  color: 'white',
                  padding: '10px',
                  borderRadius: '8px',
                  textAlign: 'center',
                  textDecoration: 'none',
                  fontWeight: 'bold'
                }}>Lamar Sekarang</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form Pendaftaran */}
      <section id="kontak" style={{ padding: '80px 24px', background: '#f8fafc' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 'bold', color: '#003366', textAlign: 'center', marginBottom: '8px' }}>
            Formulir Pendaftaran
          </h2>
          <p style={{ textAlign: 'center', color: '#666', marginBottom: '32px' }}>Isi data di bawah ini untuk mendaftar</p>
          
          <form onSubmit={handleSubmit} style={{ background: 'white', borderRadius: '16px', padding: '32px', border: '1px solid #e5e7eb' }}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontWeight: 'bold', color: '#003366', marginBottom: '8px' }}>Nama Lengkap *</label>
              <input 
                type="text" 
                required
                value={formData.nama}
                onChange={(e) => setFormData({...formData, nama: e.target.value})}
                style={{ width: '100%', padding: '12px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '16px', boxSizing: 'border-box' }}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontWeight: 'bold', color: '#003366', marginBottom: '8px' }}>Nomor HP/WA *</label>
              <input 
                type="tel" 
                required
                value={formData.hp}
                onChange={(e) => setFormData({...formData, hp: e.target.value})}
                style={{ width: '100%', padding: '12px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '16px', boxSizing: 'border-box' }}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontWeight: 'bold', color: '#003366', marginBottom: '8px' }}>Jenis Layanan *</label>
              <select 
                required
                value={formData.layanan}
                onChange={(e) => setFormData({...formData, layanan: e.target.value})}
                style={{ width: '100%', padding: '12px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '16px', boxSizing: 'border-box' }}
              >
                <option value="">Pilih Layanan</option>
                <option value="Bidang Setengah">Bidang Setengah</option>
                <option value="Bidang Full">Bidang Full</option>
              </select>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontWeight: 'bold', color: '#003366', marginBottom: '8px' }}>Durasi Kontrak *</label>
              <select 
                required
                value={formData.durasi}
                onChange={(e) => setFormData({...formData, durasi: e.target.value})}
                style={{ width: '100%', padding: '12px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '16px', boxSizing: 'border-box' }}
              >
                <option value="">Pilih Durasi</option>
                <option value="3 Hari">3 Hari</option>
                <option value="7 Hari">7 Hari</option>
                <option value="30 Hari">30 Hari</option>
              </select>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontWeight: 'bold', color: '#003366', marginBottom: '8px' }}>Nama Bank *</label>
              <input 
                type="text" 
                required
                value={formData.bank}
                onChange={(e) => setFormData({...formData, bank: e.target.value})}
                style={{ width: '100%', padding: '12px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '16px', boxSizing: 'border-box' }}
              />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontWeight: 'bold', color: '#003366', marginBottom: '8px' }}>Nomor Rekening *</label>
              <input 
                type="text" 
                required
                value={formData.rekening}
                onChange={(e) => setFormData({...formData, rekening: e.target.value})}
                style={{ width: '100%', padding: '12px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '16px', boxSizing: 'border-box' }}
              />
            </div>

            <button 
              type="submit"
              style={{ 
                width: '100%', 
                background: '#FFD700', 
                color: '#003366', 
                padding: '16px', 
                borderRadius: '8px', 
                fontWeight: 'bold', 
                fontSize: '18px', 
                border: 'none', 
                cursor: 'pointer'
              }}
            >
              KIRIM PENDAFTARAN
            </button>
          </form>

          {/* Info Kontak */}
          <div style={{ marginTop: '48px' }}>
            <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#003366', textAlign: 'center', marginBottom: '24px' }}>Informasi Kontak</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
              <div style={{ background: 'white', borderRadius: '12px', padding: '16px', border: '1px solid #e5e7eb' }}>
                <p style={{ fontWeight: 'bold', color: '#003366', marginBottom: '4px' }}>Alamat</p>
                <p style={{ color: '#666', fontSize: '14px' }}>Tapaktuan, Aceh Selatan, Prov. Aceh</p>
              </div>
              <div style={{ background: 'white', borderRadius: '12px', padding: '16px', border: '1px solid #e5e7eb' }}>
                <p style={{ fontWeight: 'bold', color: '#003366', marginBottom: '4px' }}>Email</p>
                <p style={{ color: '#666', fontSize: '14px' }}>pt.andikapratama20@gmail.com</p>
              </div>
              <div style={{ background: 'white', borderRadius: '12px', padding: '16px', border: '1px solid #e5e7eb' }}>
                <p style={{ fontWeight: 'bold', color: '#003366', marginBottom: '4px' }}>Telepon</p>
                <p style={{ color: '#666', fontSize: '14px' }}>0852-1557-3737</p>
              </div>
            </div>
          </div>

          {/* Proses Pendaftaran */}
          <div style={{ marginTop: '32px', background: '#003366', borderRadius: '12px', padding: '24px', color: 'white' }}>
            <h4 style={{ fontWeight: 'bold', color: '#FFD700', marginBottom: '16px' }}>Proses Pendaftaran</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ marginBottom: '8px' }}>✓ Isi formulir dengan data lengkap</li>
              <li style={{ marginBottom: '8px' }}>✓ Klik Kirim Pendaftaran</li>
              <li>✓ Hubungi langsung ke whatsapp jika udah mendaftar</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: '#003366', color: 'white', padding: '32px 24px', textAlign: 'center', marginTop: 'auto' }}>
        <p style={{ fontWeight: 'bold', fontSize: '18px', marginBottom: '8px' }}>PT. ANDIKA PRATAMA</p>
        <p style={{ opacity: 0.7, fontSize: '14px' }}>© 2024 PT. ANDIKA PRATAMA. All rights reserved.</p>
      </footer>
    </div>
  )
}
