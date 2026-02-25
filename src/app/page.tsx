'use client'

import { useState } from 'react'

// Icon Components (SVG)
const MenuIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  </svg>
)

const MapPinIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#003366" strokeWidth="2">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
)

const PhoneIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#003366" strokeWidth="2">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
  </svg>
)

const MailIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#003366" strokeWidth="2">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>
)

const UploadIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
    <polyline points="17 8 12 3 7 8"></polyline>
    <line x1="12" y1="3" x2="12" y2="15"></line>
  </svg>
)

const CheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFD700" strokeWidth="3">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
)

const ClockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#003366" strokeWidth="2">
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
)

const WalletIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFD700" strokeWidth="2">
    <path d="M21 4H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2z"></path>
    <path d="M1 10h22"></path>
  </svg>
)

const StarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="#FFD700" stroke="#FFD700" strokeWidth="2">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
  </svg>
)

export default function Home() {
  const [formData, setFormData] = useState({
    nama: '',
    hp: '',
    layanan: '',
    durasi: '',
    bank: '',
    rekening: ''
  })
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showAdmin, setShowAdmin] = useState(false)
  const [adminPassword, setAdminPassword] = useState('')
  const [adminData, setAdminData] = useState<any[]>([])
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const jobs = [
    { id: 1, title: 'Pelayanan Setengah Badan', durasi: '3 Hari', gaji: 'Rp 45-65 Juta', type: 'Setengah' },
    { id: 2, title: 'Pelayanan Setengah Badan', durasi: '7 Hari', gaji: 'Rp 170-200 Juta', type: 'Setengah' },
    { id: 3, title: 'Pelayanan Setengah Badan', durasi: '30 Hari', gaji: 'Rp 1-1.5 Miliar', type: 'Setengah' },
    { id: 4, title: 'Pelayanan Badan Penuh', durasi: '3 Hari', gaji: 'Rp 90-130 Juta', type: 'Full' },
    { id: 5, title: 'Pelayanan Badan Penuh', durasi: '7 Hari', gaji: 'Rp 340-400 Juta', type: 'Full' },
    { id: 6, title: 'Pelayanan Badan Penuh', durasi: '30 Hari', gaji: 'Rp 2-3 Miliar', type: 'Full' },
  ]

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/pendaftaran', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          fotoUrl: photoPreview
        })
      })
      
      if (response.ok) {
        alert('Pendaftaran berhasil!')
        const message = `Halo, saya sudah mendaftar:\n\nNama: ${formData.nama}\nHP: ${formData.hp}\nLayanan: ${formData.layanan}\nDurasi: ${formData.durasi}`
        window.open(`https://wa.me/6285215573737?text=${encodeURIComponent(message)}`, '_blank')
        setFormData({ nama: '', hp: '', layanan: '', durasi: '', bank: '', rekening: '' })
        setPhotoPreview(null)
      }
    } catch (error) {
      alert('Terjadi kesalahan')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleAdminLogin = async () => {
    if (adminPassword === 'Pt.andika@20') {
      setIsLoggedIn(true)
      const response = await fetch('/api/pendaftaran')
      const data = await response.json()
      setAdminData(data)
    } else {
      alert('Password salah!')
    }
  }

  // Admin Dashboard Component
  if (showAdmin && isLoggedIn) {
    return (
      <div style={{ minHeight: '100vh', background: '#f8fafc', padding: '24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#003366' }}>🔐 Admin Dashboard</h1>
            <button 
              onClick={() => { setShowAdmin(false); setIsLoggedIn(false); }}
              style={{ background: '#dc2626', color: 'white', padding: '8px 16px', borderRadius: '8px', border: 'none', cursor: 'pointer' }}
            >
              Logout
            </button>
          </div>
          
          <div style={{ background: 'white', borderRadius: '12px', padding: '24px', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px' }}>Statistik</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px' }}>
              <div style={{ background: '#003366', color: 'white', padding: '16px', borderRadius: '8px', textAlign: 'center' }}>
                <div style={{ fontSize: '32px', fontWeight: 'bold' }}>{adminData.length}</div>
                <div style={{ opacity: 0.8 }}>Total Pendaftar</div>
              </div>
            </div>
          </div>

          <div style={{ background: 'white', borderRadius: '12px', padding: '24px', overflow: 'auto' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px' }}>Data Pendaftar</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
              <thead>
                <tr style={{ background: '#f1f5f9' }}>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Nama</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>HP</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Layanan</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Durasi</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Bank</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Rekening</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Foto</th>
                </tr>
              </thead>
              <tbody>
                {adminData.map((item: any) => (
                  <tr key={item.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <td style={{ padding: '12px' }}>{item.namaLengkap}</td>
                    <td style={{ padding: '12px' }}>{item.nomorHP}</td>
                    <td style={{ padding: '12px' }}>{item.layanan}</td>
                    <td style={{ padding: '12px' }}>{item.durasi}</td>
                    <td style={{ padding: '12px' }}>{item.bank}</td>
                    <td style={{ padding: '12px' }}>{item.rekening}</td>
                    <td style={{ padding: '12px' }}>
                      {item.fotoUrl && <img src={item.fotoUrl} style={{ width: '40px', height: '50px', objectFit: 'cover', borderRadius: '4px' }} />}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {adminData.length === 0 && (
              <p style={{ textAlign: 'center', color: '#666', padding: '24px' }}>Belum ada pendaftar</p>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Admin Login Modal
  if (showAdmin && !isLoggedIn) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc' }}>
        <div style={{ background: 'white', padding: '32px', borderRadius: '16px', maxWidth: '400px', width: '100%' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#003366', marginBottom: '16px', textAlign: 'center' }}>🔐 Admin Login</h2>
          <input
            type="password"
            placeholder="Masukkan password"
            value={adminPassword}
            onChange={(e) => setAdminPassword(e.target.value)}
            style={{ width: '100%', padding: '12px', border: '1px solid #e5e7eb', borderRadius: '8px', marginBottom: '16px', boxSizing: 'border-box' }}
          />
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={handleAdminLogin} style={{ flex: 1, background: '#003366', color: 'white', padding: '12px', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>Login</button>
            <button onClick={() => setShowAdmin(false)} style={{ flex: 1, background: '#e5e7eb', color: '#333', padding: '12px', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>Batal</button>
          </div>
        </div>
      </div>
    )
  }
    // Main Page
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
            width: '48px', 
            height: '48px', 
            background: 'linear-gradient(135deg, #FFD700, #FFA500)', 
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            color: '#003366',
            fontSize: '20px',
            boxShadow: '0 4px 12px rgba(255, 215, 0, 0.3)'
          }}>AP</div>
          <span style={{ color: 'white', fontWeight: 'bold', fontSize: '18px' }}>PT. ANDIKA PRATAMA</span>
        </div>
        <nav style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <a href="#beranda" style={{ color: 'white', textDecoration: 'none' }}>Beranda</a>
          <a href="#tentang" style={{ color: 'white', textDecoration: 'none' }}>Tentang</a>
          <a href="#layanan" style={{ color: 'white', textDecoration: 'none' }}>Layanan</a>
          <a href="#portofolio" style={{ color: 'white', textDecoration: 'none' }}>Portofolio</a>
          <a href="#kontak" style={{ color: 'white', textDecoration: 'none' }}>Kontak</a>
          <button onClick={() => setShowAdmin(true)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '16px' }}>🔐</button>
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
        <div style={{ maxWidth: '900px' }}>
          <div style={{ 
            display: 'inline-block',
            background: 'rgba(255, 215, 0, 0.2)', 
            color: '#FFD700', 
            padding: '8px 20px', 
            borderRadius: '20px',
            marginBottom: '24px',
            fontSize: '14px'
          }}>
            ⭐ Pendaftaran Gratis
          </div>
          <h1 style={{ fontSize: '52px', fontWeight: 'bold', color: 'white', marginBottom: '24px', lineHeight: 1.2 }}>
            PT. ANDIKA PRATAMA
            <br />
            <span style={{ color: '#FFD700', fontSize: '32px' }}>Solusi Kerja dengan Penghasilan Tertinggi</span>
          </h1>
          <p style={{ fontSize: '20px', color: 'rgba(255,255,255,0.8)', marginBottom: '40px', maxWidth: '700px', margin: '0 auto 40px' }}>
            Pendaftaran Gratis – Kontrak Langsung, Gaji Transparan untuk Para Wanita yang Menghargai Diri Sendiri
          </p>
          <a href="#kontak" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'linear-gradient(135deg, #FFD700, #FFA500)',
            color: '#003366',
            padding: '18px 48px',
            borderRadius: '12px',
            fontWeight: 'bold',
            fontSize: '18px',
            textDecoration: 'none',
            boxShadow: '0 4px 20px rgba(255, 215, 0, 0.4)'
          }}>
            DAFTAR SEKARANG →
          </a>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px', marginTop: '60px', paddingTop: '40px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            {[
              { value: '4000+', label: 'Wanita Telah Bekerja', icon: '👩' },
              { value: '5+', label: 'Tahun Berdiri', icon: '📅' },
              { value: '100%', label: 'Gaji Transparan', icon: '💰' }
            ].map((stat, i) => (
              <div key={i}>
                <div style={{ fontSize: '40px', marginBottom: '8px' }}>{stat.icon}</div>
                <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#FFD700' }}>{stat.value}</div>
                <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tentang */}
      <section id="tentang" style={{ padding: '100px 24px', background: 'white' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <span style={{ background: '#003366', color: 'white', padding: '6px 16px', borderRadius: '20px', fontSize: '14px' }}>Tentang Kami</span>
            <h2 style={{ fontSize: '42px', fontWeight: 'bold', color: '#003366', marginTop: '16px', marginBottom: '16px' }}>
              Mengapa PT. Andika Pratama?
            </h2>
            <p style={{ fontSize: '18px', color: '#666', maxWidth: '600px', margin: '0 auto' }}>
              Kami adalah mitra terpercaya untuk kontrak kerja premium di sektor pelayanan kecerdasan
            </p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {[
              { step: '1', title: 'PENDAFTARAN', desc: 'Gratis', icon: '📝' },
              { step: '2', title: 'BEKERJA', desc: 'Profesional', icon: '💼' },
              { step: '3', title: 'TERIMA GAJI', desc: 'Selesai Kontrak', icon: '💵' }
            ].map((item, i) => (
              <div key={i} style={{ 
                background: 'linear-gradient(135deg, #003366, #001a33)', 
                borderRadius: '16px', 
                padding: '32px 24px',
                color: 'white',
                textAlign: 'center',
                position: 'relative'
              }}>
                <div style={{ fontSize: '40px', marginBottom: '16px' }}>{item.icon}</div>
                <div style={{ 
                  position: 'absolute', 
                  top: '16px', 
                  right: '16px', 
                  width: '32px', 
                  height: '32px', 
                  background: '#FFD700', 
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  color: '#003366'
                }}>{item.step}</div>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>{item.title}</h3>
                <p style={{ opacity: 0.8 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Layanan */}
      <section id="layanan" style={{ padding: '100px 24px', background: '#f8fafc' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <span style={{ background: '#FFD700', color: '#003366', padding: '6px 16px', borderRadius: '20px', fontSize: '14px', fontWeight: 'bold' }}>Layanan Kami</span>
            <h2 style={{ fontSize: '42px', fontWeight: 'bold', color: '#003366', marginTop: '16px', marginBottom: '16px' }}>
              Pilihan Kontrak Premium
            </h2>
            <p style={{ fontSize: '18px', color: '#666' }}>
              Dua bidang utama dengan kompensasi sesuai kebutuhan pribadi pekerja
            </p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '32px' }}>
            {/* Setengah */}
            <div style={{ background: 'white', borderRadius: '20px', padding: '32px', border: '1px solid #e5e7eb' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                <div style={{ width: '60px', height: '60px', background: '#f1f5f9', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>⚡</div>
                <div>
                  <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#003366' }}>Bidang Setengah</h3>
                  <p style={{ color: '#666', fontSize: '14px' }}>Kontrak pelayanan cepat dan instan</p>
                </div>
              </div>
              <p style={{ color: '#666', marginBottom: '20px' }}>Pelayanan yang mudah, cepat dengan gaji fantastis</p>
              <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '16px' }}>
                {[
                  { durasi: '3 Hari', gaji: 'Rp 45-65 Juta' },
                  { durasi: '7 Hari', gaji: 'Rp 170-200 Juta' },
                  { durasi: '30 Hari', gaji: 'Rp 1-1.5 Miliar' }
                ].map((pkg, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: '#f8fafc', borderRadius: '8px', marginBottom: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <ClockIcon />
                      <span style={{ fontWeight: '500', color: '#003366' }}>{pkg.durasi}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <WalletIcon />
                      <span style={{ fontWeight: 'bold', color: '#003366' }}>{pkg.gaji}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Full */}
            <div style={{ background: 'white', borderRadius: '20px', padding: '32px', border: '3px solid #FFD700', position: 'relative' }}>
              <span style={{ position: 'absolute', top: '-12px', right: '24px', background: '#FFD700', color: '#003366', padding: '6px 16px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' }}>⭐ RECOMMENDED</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                <div style={{ width: '60px', height: '60px', background: 'linear-gradient(135deg, #FFD700, #FFA500)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>🎯</div>
                <div>
                  <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#003366' }}>Bidang Full</h3>
                  <p style={{ color: '#666', fontSize: '14px' }}>Gaji 3X lipat</p>
                </div>
              </div>
              <p style={{ color: '#666', marginBottom: '20px' }}>Sedikit nekat, profesional dengan hasil maximal</p>
              <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '16px' }}>
                {[
                  { durasi: '3 Hari', gaji: 'Rp 90-130 Juta' },
                  { durasi: '7 Hari', gaji: 'Rp 340-400 Juta' },
                  { durasi: '30 Hari', gaji: 'Rp 2-3 Miliar' }
                ].map((pkg, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: '#f8fafc', borderRadius: '8px', marginBottom: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <ClockIcon />
                      <span style={{ fontWeight: '500', color: '#003366' }}>{pkg.durasi}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <WalletIcon />
                      <span style={{ fontWeight: 'bold', color: '#003366' }}>{pkg.gaji}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portofolio */}
      <section id="portofolio" style={{ padding: '100px 24px', background: 'white' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <span style={{ background: '#003366', color: 'white', padding: '6px 16px', borderRadius: '20px', fontSize: '14px' }}>Portofolio</span>
            <h2 style={{ fontSize: '42px', fontWeight: 'bold', color: '#003366', marginTop: '16px', marginBottom: '16px' }}>
              Proyek & Lowongan Terbaru
            </h2>
            <p style={{ fontSize: '18px', color: '#666' }}>
              Peluang menghasilkan puluhan juta atau milyar hanya hitungan hari tanpa resiko
            </p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            {jobs.map((job) => (
              <div key={job.id} style={{ background: 'white', borderRadius: '16px', overflow: 'hidden', border: '1px solid #e5e7eb', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                <div style={{ background: 'linear-gradient(135deg, #003366, #001a33)', padding: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                    <div>
                      <h3 style={{ color: 'white', fontWeight: 'bold', fontSize: '18px', marginBottom: '4px' }}>{job.title}</h3>
                      <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px' }}>PT. ANDIKA PRATAMA</p>
                    </div>
                    <span style={{ 
                      background: job.type === 'Full' ? '#FFD700' : 'rgba(255,255,255,0.2)', 
                      color: job.type === 'Full' ? '#003366' : 'white',
                      padding: '4px 12px', 
                      borderRadius: '20px', 
                      fontSize: '12px',
                      fontWeight: 'bold'
                    }}>{job.type}</span>
                  </div>
                </div>
                <div style={{ padding: '20px' }}>
                  <div style={{ display: 'flex', gap: '16px', marginBottom: '16px', color: '#666', fontSize: '14px' }}>
                    <span>📍 Indonesia</span>
                    <span>⏱ {job.durasi}</span>
                  </div>
                  <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '8px', marginBottom: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <WalletIcon />
                      <span style={{ fontWeight: 'bold', color: '#003366' }}>{job.gaji}</span>
                    </div>
                  </div>
                  <a href="#kontak" style={{
                    display: 'block',
                    background: '#003366',
                    color: 'white',
                    padding: '12px',
                    borderRadius: '8px',
                    textAlign: 'center',
                    textDecoration: 'none',
                    fontWeight: 'bold'
                  }}>Lamar Sekarang</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Kontak */}
      <section id="kontak" style={{ padding: '100px 24px', background: '#f8fafc' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <span style={{ background: '#FFD700', color: '#003366', padding: '6px 16px', borderRadius: '20px', fontSize: '14px', fontWeight: 'bold' }}>Pendaftaran</span>
            <h2 style={{ fontSize: '42px', fontWeight: 'bold', color: '#003366', marginTop: '16px', marginBottom: '16px' }}>
              Formulir Pendaftaran
            </h2>
            <p style={{ fontSize: '18px', color: '#666' }}>
              Isi formulir di bawah untuk mendaftar
            </p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '32px' }}>
            {/* Form */}
            <form onSubmit={handleSubmit} style={{ background: 'white', borderRadius: '20px', padding: '32px', border: '1px solid #e5e7eb' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#003366', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                📝 Form Pendaftaran
              </h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: 'bold', color: '#003366', marginBottom: '8px' }}>Nama Lengkap *</label>
                  <input 
                    type="text" 
                    required
                    value={formData.nama}
                    onChange={(e) => setFormData({...formData, nama: e.target.value})}
                    style={{ width: '100%', padding: '12px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '16px', boxSizing: 'border-box' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: 'bold', color: '#003366', marginBottom: '8px' }}>Nomor HP/WA *</label>
                  <input 
                    type="tel" 
                    required
                    value={formData.hp}
                    onChange={(e) => setFormData({...formData, hp: e.target.value})}
                    style={{ width: '100%', padding: '12px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '16px', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: 'bold', color: '#003366', marginBottom: '8px' }}>Jenis Layanan *</label>
                  <select 
                    required
                    value={formData.layanan}
                    onChange={(e) => setFormData({...formData, layanan: e.target.value})}
                    style={{ width: '100%', padding: '12px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '16px', boxSizing: 'border-box', background: 'white' }}
                  >
                    <option value="">Pilih Layanan</option>
                    <option value="Bidang Setengah">Bidang Setengah</option>
                    <option value="Bidang Full">Bidang Full</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: 'bold', color: '#003366', marginBottom: '8px' }}>Durasi Kontrak *</label>
                  <select 
                    required
                    value={formData.durasi}
                    onChange={(e) => setFormData({...formData, durasi: e.target.value})}
                    style={{ width: '100%', padding: '12px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '16px', boxSizing: 'border-box', background: 'white' }}
                  >
                    <option value="">Pilih Durasi</option>
                    <option value="3 Hari">3 Hari</option>
                    <option value="7 Hari">7 Hari</option>
                    <option value="30 Hari">30 Hari</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: 'bold', color: '#003366', marginBottom: '8px' }}>Nama Bank *</label>
                  <input 
                    type="text" 
                    required
                    value={formData.bank}
                    onChange={(e) => setFormData({...formData, bank: e.target.value})}
                    style={{ width: '100%', padding: '12px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '16px', boxSizing: 'border-box' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: 'bold', color: '#003366', marginBottom: '8px' }}>Nomor Rekening *</label>
                  <input 
                    type="text" 
                    required
                    value={formData.rekening}
                    onChange={(e) => setFormData({...formData, rekening: e.target.value})}
                    style={{ width: '100%', padding: '12px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '16px', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              {/* Upload Foto */}
              <div style={{ marginTop: '16px' }}>
                <label style={{ display: 'block', fontWeight: 'bold', color: '#003366', marginBottom: '8px' }}>Upload Pas Foto *</label>
                <div style={{ 
                  border: '2px dashed #e5e7eb', 
                  borderRadius: '12px', 
                  padding: '24px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  position: 'relative'
                }}>
                  {photoPreview ? (
                    <div>
                      <img src={photoPreview} style={{ maxWidth: '150px', maxHeight: '200px', objectFit: 'cover', borderRadius: '8px', marginBottom: '8px' }} />
                      <p style={{ color: '#666', fontSize: '14px' }}>Klik untuk ganti foto</p>
                    </div>
                  ) : (
                    <div>
                      <UploadIcon />
                      <p style={{ color: '#666', marginTop: '8px' }}>Klik untuk upload foto</p>
                      <p style={{ color: '#999', fontSize: '12px' }}>Format: JPG, PNG (Max 2MB)</p>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }}
                    required
                  />
                </div>
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                style={{ 
                  width: '100%', 
                  background: 'linear-gradient(135deg, #FFD700, #FFA500)', 
                  color: '#003366', 
                  padding: '16px', 
                  borderRadius: '12px', 
                  fontWeight: 'bold', 
                  fontSize: '18px', 
                  border: 'none', 
                  cursor: isSubmitting ? 'wait' : 'pointer',
                  marginTop: '24px',
                  opacity: isSubmitting ? 0.7 : 1
                }}
              >
                {isSubmitting ? '⏳ Memproses...' : '🚀 KIRIM PENDAFTARAN'}
              </button>
            </form>

            {/* Info Samping */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Alamat */}
              <div style={{ background: 'white', borderRadius: '12px', padding: '20px', border: '1px solid #e5e7eb' }}>
                <div style={{ display: 'flex', alignItems: 'start', gap: '12px' }}>
                  <div style={{ width: '40px', height: '40px', background: '#f1f5f9', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <MapPinIcon />
                  </div>
                  <div>
                    <h4 style={{ fontWeight: 'bold', color: '#003366', marginBottom: '4px' }}>Alamat</h4>
                    <p style={{ color: '#666', fontSize: '14px' }}>Tapaktuan, Aceh Selatan, Prov. Aceh</p>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div style={{ background: 'white', borderRadius: '12px', padding: '20px', border: '1px solid #e5e7eb' }}>
                <div style={{ display: 'flex', alignItems: 'start', gap: '12px' }}>
                  <div style={{ width: '40px', height: '40px', background: '#f1f5f9', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <MailIcon />
                  </div>
                  <div>
                    <h4 style={{ fontWeight: 'bold', color: '#003366', marginBottom: '4px' }}>Email</h4>
                    <p style={{ color: '#666', fontSize: '14px' }}>pt.andikapratama20@gmail.com</p>
                  </div>
                </div>
              </div>

              {/* Telepon */}
              <div style={{ background: 'white', borderRadius: '12px', padding: '20px', border: '1px solid #e5e7eb' }}>
                <div style={{ display: 'flex', alignItems: 'start', gap: '12px' }}>
                  <div style={{ width: '40px', height: '40px', background: '#f1f5f9', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <PhoneIcon />
                  </div>
                  <div>
                    <h4 style={{ fontWeight: 'bold', color: '#003366', marginBottom: '4px' }}>Telepon</h4>
                    <p style={{ color: '#666', fontSize: '14px' }}>0852-1557-3737</p>
                  </div>
                </div>
              </div>

              {/* Proses */}
              <div style={{ background: 'linear-gradient(135deg, #003366, #001a33)', borderRadius: '12px', padding: '20px', color: 'white' }}>
                <h4 style={{ fontWeight: 'bold', color: '#FFD700', marginBottom: '12px' }}>📋 Proses Pendaftaran</h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <CheckIcon /> Isi formulir dengan data lengkap
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <CheckIcon /> Klik Kirim Pendaftaran
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckIcon /> Hubungi langsung ke whatsapp jika udah mendaftar
                  </li>
                </ul>
              </div>

              {/* WhatsApp Button */}
              <a href="https://wa.me/6285215573737" target="_blank" style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                background: '#25D366',
                color: 'white',
                padding: '16px',
                borderRadius: '12px',
                textDecoration: 'none',
                fontWeight: 'bold',
                textAlign: 'center'
              }}>
                💬 Hubungi via WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: '#003366', color: 'white', padding: '48px 24px', marginTop: 'auto' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '16px' }}>
            <div style={{ width: '48px', height: '48px', background: '#FFD700', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#003366', fontSize: '20px' }}>AP</div>
            <span style={{ fontWeight: 'bold', fontSize: '20px' }}>PT. ANDIKA PRATAMA</span>
          </div>
          <p style={{ opacity: 0.7, marginBottom: '24px' }}>Solusi Kerja dengan Penghasilan Tertinggi</p>
          <p style={{ opacity: 0.5, fontSize: '14px' }}>© 2024 PT. ANDIKA PRATAMA. All rights reserved.</p>
          <button onClick={() => setShowAdmin(true)} style={{ marginTop: '16px', background: 'transparent', border: '1px solid rgba(255,255,255,0.3)', color: 'rgba(255,255,255,0.5)', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontSize: '12px' }}>🔐 Admin</button>
        </div>
      </footer>
    </div>
  )
}
