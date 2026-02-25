"use client";

import { useState, useEffect } from "react";

// Admin WhatsApp Number
const ADMIN_WHATSAPP = "6285215573737";

// Toast Notification Component
function Toast({ message, type, onClose }: { message: string; type: "success" | "error"; onClose: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div style={{
      position: "fixed",
      top: "20px",
      right: "20px",
      padding: "16px 24px",
      borderRadius: "8px",
      color: "white",
      fontWeight: "500",
      zIndex: 9999,
      display: "flex",
      alignItems: "center",
      gap: "12px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
      animation: "slideIn 0.3s ease-out",
      backgroundColor: type === "success" ? "#10B981" : "#EF4444",
    }}>
      <span>{type === "success" ? "✓" : "✕"}</span>
      <span>{message}</span>
      <button onClick={onClose} style={{ background: "none", border: "none", color: "white", cursor: "pointer", marginLeft: "8px" }}>✕</button>
    </div>
  );
}

// Contract Dialog Component
function ContractDialog({ data, onClose }: { data: any; onClose: () => void }) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const handlePrint = () => {
    const printContent = document.getElementById('contract-print');
    if (printContent) {
      const printWindow = window.open('', '', 'width=800,height=600');
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>Surat Perjanjian Kontrak - ${data.nomorKontrak}</title>
              <style>
                body { font-family: Arial, sans-serif; padding: 40px; color: #003366; }
                h1 { text-align: center; margin-bottom: 5px; }
                .header-line { text-align: center; color: #666; margin-bottom: 20px; }
                .section { margin: 20px 0; }
                .section-title { font-weight: bold; margin-bottom: 10px; }
                .signatures { display: flex; justify-content: space-between; margin-top: 60px; }
                .signature-box { text-align: center; width: 45%; }
                .signature-line { border-top: 1px solid #333; margin-top: 60px; padding-top: 5px; }
              </style>
            </head>
            <body>${printContent.innerHTML}</body>
          </html>
        `);
        printWindow.document.close();
        printWindow.print();
      }
    }
  };

  const handleSendWhatsApp = () => {
    const message = `*PENDAFTARAN BERHASIL*

Nomor Kontrak: ${data.nomorKontrak}
Nama: ${data.namaLengkap}
No. HP: ${data.nomorHP}
Layanan: ${data.jenisLayanan === 'Setengah' ? 'Pelayanan Setengah Badan' : 'Pelayanan Badan Penuh'}
Durasi: ${data.durasiKontrak}
Bank: ${data.namaBank}
No. Rekening: ${data.nomorRekening}
Tanggal: ${formatDate(data.tanggalKontrak)}

Terima kasih telah mendaftar di PT. ANDIKA PRATAMA`;

    const waUrl = `https://wa.me/${ADMIN_WHATSAPP}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');
  };

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0,0,0,0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 9998,
      padding: "20px",
    }}>
      <div style={{
        backgroundColor: "white",
        borderRadius: "12px",
        maxWidth: "700px",
        width: "100%",
        maxHeight: "90vh",
        overflow: "auto",
        position: "relative",
      }}>
        <button onClick={onClose} style={{ position: "absolute", top: "16px", right: "16px", background: "#f3f4f6", border: "none", borderRadius: "50%", width: "32px", height: "32px", cursor: "pointer", fontSize: "18px" }}>✕</button>
        
        <div id="contract-print" style={{ padding: "40px", color: "#003366" }}>
          <h1 style={{ textAlign: "center", marginBottom: "5px" }}>SURAT PERJANJIAN KONTRAK KERJA</h1>
          <p style={{ textAlign: "center", color: "#666", marginBottom: "24px" }}>No: {data.nomorKontrak}</p>

          <div style={{ marginBottom: "24px" }}>
            <p><strong>PIHAK PERTAMA (Perusahaan):</strong></p>
            <p style={{ marginLeft: "16px" }}>PT. ANDIKA PRATAMA</p>
            <p style={{ marginLeft: "16px" }}>Alamat: Medan, Sumatera Utara / Banda Aceh, Indonesia</p>
          </div>

          <div style={{ marginBottom: "24px" }}>
            <p><strong>PIHAK KEDUA (Pekerja):</strong></p>
            <p style={{ marginLeft: "16px" }}>Nama: {data.namaLengkap}</p>
            <p style={{ marginLeft: "16px" }}>Nomor HP/WA: {data.nomorHP}</p>
            <p style={{ marginLeft: "16px" }}>Nama Bank: {data.namaBank}</p>
            <p style={{ marginLeft: "16px" }}>Nomor Rekening: {data.nomorRekening}</p>
          </div>

          <div style={{ borderTop: "1px solid #e5e7eb", borderBottom: "1px solid #e5e7eb", padding: "24px 0", marginBottom: "24px" }}>
            <p style={{ fontWeight: "bold", marginBottom: "12px" }}>PASAL 1 - JENIS DAN DURASI KERJA</p>
            <p style={{ marginLeft: "16px" }}>1. Jenis Layanan: <strong>{data.jenisLayanan === 'Setengah' ? 'Pelayanan Setengah Badan' : 'Pelayanan Badan Penuh'}</strong></p>
            <p style={{ marginLeft: "16px" }}>2. Durasi Kontrak: <strong>{data.durasiKontrak}</strong></p>
            <p style={{ marginLeft: "16px" }}>3. Tanggal Mulai: <strong>{formatDate(data.tanggalKontrak)}</strong></p>
          </div>

          <div style={{ marginBottom: "24px" }}>
            <p style={{ fontWeight: "bold", marginBottom: "12px" }}>PASAL 2 - HAK DAN KEWAJIBAN</p>
            <p style={{ marginLeft: "16px" }}>Pihak Kedua berkewajiban untuk bekerja dengan profesional, penuh dedikasi, dan menghormati semua pihak yang terlibat.</p>
          </div>

          <div style={{ marginBottom: "24px" }}>
            <p style={{ fontWeight: "bold", marginBottom: "12px" }}>PASAL 3 - PEMBAYARAN</p>
            <p style={{ marginLeft: "16px" }}>Pembayaran akan dilakukan melalui transfer bank ke rekening Pihak Kedua setelah kontrak kerja selesai.</p>
          </div>

          {data.fotoUrl && (
            <div style={{ textAlign: "center", marginBottom: "24px" }}>
              <p style={{ fontWeight: "bold", marginBottom: "8px" }}>Foto Pihak Kedua:</p>
              <img src={data.fotoUrl} alt="Foto" style={{ width: "120px", height: "150px", objectFit: "cover", borderRadius: "4px", border: "1px solid #e5e7eb" }} />
            </div>
          )}

          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "48px" }}>
            <div style={{ textAlign: "center", width: "45%" }}>
              <p style={{ fontWeight: "bold", marginBottom: "60px" }}>PIHAK PERTAMA</p>
              <div style={{ borderTop: "1px solid #333", paddingTop: "8px" }}>PT. ANDIKA PRATAMA</div>
            </div>
            <div style={{ textAlign: "center", width: "45%" }}>
              <p style={{ fontWeight: "bold", marginBottom: "60px" }}>PIHAK KEDUA</p>
              <div style={{ borderTop: "1px solid #333", paddingTop: "8px" }}>{data.namaLengkap}</div>
            </div>
          </div>
        </div>

        <div style={{ padding: "16px 40px 32px", display: "flex", gap: "12px", borderTop: "1px solid #e5e7eb" }}>
          <button onClick={handleSendWhatsApp} style={{ flex: 1, padding: "12px 24px", backgroundColor: "#25D366", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "600", fontSize: "14px" }}>
            📱 Kirim ke WhatsApp Admin
          </button>
          <button onClick={handlePrint} style={{ flex: 1, padding: "12px 24px", backgroundColor: "#003366", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "600", fontSize: "14px" }}>
            🖨️ Cetak Kontrak
          </button>
        </div>
      </div>
    </div>
  );
}

// Main Page Component
export default function HomePage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [showContract, setShowContract] = useState(false);
  const [pendaftaranData, setPendaftaranData] = useState<any>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    namaLengkap: "",
    nomorHP: "",
    durasiKontrak: "",
    foto: null as File | null,
    nomorRekening: "",
    namaBank: "",
    jenisLayanan: "",
  });

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, foto: file }));
      const reader = new FileReader();
      reader.onloadend = () => setPhotoPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const timestamp = Date.now().toString(36).toUpperCase();
      const random = Math.random().toString(36).substring(2, 6).toUpperCase();
      const nomorKontrak = `AP-${timestamp}-${random}`;

      const newData = {
        id: timestamp,
        namaLengkap: formData.namaLengkap,
        nomorHP: formData.nomorHP,
        durasiKontrak: formData.durasiKontrak,
        fotoUrl: photoPreview,
        nomorRekening: formData.nomorRekening,
        namaBank: formData.namaBank,
        jenisLayanan: formData.jenisLayanan,
        nomorKontrak,
        tanggalKontrak: new Date().toISOString(),
      };

      setPendaftaranData(newData);
      setShowContract(true);
      setToast({ message: "Pendaftaran berhasil! Silakan kirim ke WhatsApp admin.", type: "success" });

      setFormData({ namaLengkap: "", nomorHP: "", durasiKontrak: "", foto: null, nomorRekening: "", namaBank: "", jenisLayanan: "" });
      setPhotoPreview(null);

    } catch {
      setToast({ message: "Terjadi kesalahan. Silakan coba lagi.", type: "error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const navItems = [
    { label: "Beranda", href: "#beranda" },
    { label: "Tentang Kami", href: "#tentang" },
    { label: "Layanan", href: "#layanan" },
    { label: "Kontak", href: "#kontak" },
  ];

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      {showContract && pendaftaranData && <ContractDialog data={pendaftaranData} onClose={() => setShowContract(false)} />}

      {/* Header */}
      <header style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, backgroundColor: isScrolled ? "rgba(255,255,255,0.95)" : "transparent", backdropFilter: isScrolled ? "blur(10px)" : "none", boxShadow: isScrolled ? "0 2px 10px rgba(0,0,0,0.1)" : "none", transition: "all 0.3s" }}>
        <nav style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "64px" }}>
            <a href="#beranda" style={{ display: "flex", alignItems: "center", gap: "12px", textDecoration: "none" }}>
              <div style={{ fontWeight: "bold", fontSize: "18px", color: isScrolled ? "#003366" : "white", display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{ width: "48px", height: "48px", backgroundColor: "#FFD700", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", color: "#003366" }}>AP</div>
                <span style={{ display: typeof window !== 'undefined' && window.innerWidth < 640 ? "none" : "inline" }}>PT. ANDIKA PRATAMA</span>
              </div>
            </a>

            <div style={{ display: typeof window !== 'undefined' && window.innerWidth < 1024 ? "none" : "flex", alignItems: "center", gap: "32px" }}>
              {navItems.map((item) => (
                <a key={item.label} href={item.href} style={{ color: isScrolled ? "#003366" : "white", textDecoration: "none", fontWeight: "500", fontSize: "14px" }}>{item.label}</a>
              ))}
              <a href="#kontak" style={{ backgroundColor: "#FFD700", color: "#003366", padding: "10px 24px", borderRadius: "6px", textDecoration: "none", fontWeight: "600" }}>Hubungi Kami</a>
            </div>

            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{ display: typeof window !== 'undefined' && window.innerWidth >= 1024 ? "none" : "block", background: "none", border: "none", cursor: "pointer", color: isScrolled ? "#003366" : "white", fontSize: "24px" }}>
              {mobileMenuOpen ? "✕" : "☰"}
            </button>
          </div>

          {mobileMenuOpen && (
            <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "8px", marginTop: "8px" }}>
              {navItems.map((item) => (
                <a key={item.label} href={item.href} onClick={() => setMobileMenuOpen(false)} style={{ display: "block", color: "#003366", textDecoration: "none", padding: "12px 0", fontWeight: "500" }}>{item.label}</a>
              ))}
              <a href="#kontak" onClick={() => setMobileMenuOpen(false)} style={{ display: "block", backgroundColor: "#FFD700", color: "#003366", padding: "12px", borderRadius: "6px", textDecoration: "none", fontWeight: "600", textAlign: "center", marginTop: "12px" }}>Hubungi Kami</a>
            </div>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <section id="beranda" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, #003366 0%, #001a33 50%, #000000 100%)", padding: "80px 20px 40px", position: "relative" }}>
        <div style={{ maxWidth: "900px", textAlign: "center" }}>
          <span style={{ display: "inline-block", backgroundColor: "rgba(255, 215, 0, 0.2)", color: "#FFD700", padding: "6px 16px", borderRadius: "20px", fontSize: "14px", marginBottom: "24px" }}>Pendaftaran Gratis</span>
          <h1 style={{ fontSize: "48px", fontWeight: "bold", color: "white", marginBottom: "24px", lineHeight: 1.2 }}>PT. ANDIKA PRATAMA: <span style={{ color: "#FFD700" }}>Solusi Kerja dengan penghasilan tertinggi di dunia</span> hanya dalam beberapa hari</h1>
          <p style={{ fontSize: "18px", color: "rgba(255,255,255,0.8)", marginBottom: "32px", maxWidth: "700px", marginLeft: "auto", marginRight: "auto" }}>Pendaftaran Gratis – Kontrak Langsung, Gaji Transparan untuk Para Wanita yang menganggap mereka berharga</p>
          <a href="#kontak" style={{ display: "inline-block", backgroundColor: "#FFD700", color: "#003366", padding: "16px 48px", borderRadius: "6px", textDecoration: "none", fontWeight: "600", fontSize: "16px" }}>HUBUNGI KAMI →</a>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px", marginTop: "48px", paddingTop: "32px", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
            {[{ value: "4000+", label: "Wanita telah bekerja dan puas" }, { value: "5+", label: "Tahun telah berdiri" }, { value: "100%", label: "Gaji Transparan" }].map((stat, index) => (
              <div key={index} style={{ textAlign: "center" }}>
                <div style={{ fontSize: "28px", fontWeight: "bold", color: "#FFD700" }}>{stat.value}</div>
                <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "14px", marginTop: "4px" }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="tentang" style={{ padding: "80px 20px", backgroundColor: "white" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <span style={{ display: "inline-block", backgroundColor: "rgba(0, 51, 102, 0.1)", color: "#003366", padding: "6px 16px", borderRadius: "20px", fontSize: "14px", marginBottom: "16px" }}>Tentang Kami</span>
            <h2 style={{ fontSize: "36px", fontWeight: "bold", color: "#003366", marginBottom: "16px" }}>Mengapa PT. Andika Pratama?</h2>
            <p style={{ color: "#666", fontSize: "18px", maxWidth: "600px", margin: "0 auto" }}>Kami adalah mitra terpercaya untuk kontrak kerja premium</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "48px", alignItems: "center" }}>
            <div>
              <p style={{ fontSize: "18px", color: "#333", lineHeight: 1.8, marginBottom: "24px" }}><strong style={{ color: "#003366" }}>PT. ANDIKA PRATAMA</strong> adalah perusahaan yang bergerak di bidang kecerdasan dan penghormatan wanita. Dengan pengalaman bertahun-tahun dan telah dibuktikan ribuan orang sejak tahun 2020, menjadikan kami sebagai alternatif penghasilan fantastis.</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
                {["Berpengalaman", "Profesional", "Gaji Kompetitif"].map((item, index) => (
                  <span key={index} style={{ display: "flex", alignItems: "center", gap: "8px", backgroundColor: "rgba(0, 51, 102, 0.05)", padding: "8px 16px", borderRadius: "20px", fontSize: "14px", color: "#003366" }}>✓ {item}</span>
                ))}
              </div>
            </div>

            <div style={{ display: "grid", gap: "16px" }}>
              {[{ step: "1", title: "PENDAFTARAN", desc: "Gratis" }, { step: "2", title: "BEKERJA", desc: "Secara Profesional" }, { step: "3", title: "TERIMA GAJI", desc: "Ketika Selesai Kontrak" }].map((item, index) => (
                <div key={index} style={{ background: "linear-gradient(135deg, #003366 0%, #001a33 100%)", padding: "24px", borderRadius: "12px", color: "white", position: "relative" }}>
                  <span style={{ position: "absolute", top: "12px", right: "12px", width: "32px", height: "32px", backgroundColor: "#FFD700", color: "#003366", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold" }}>{item.step}</span>
                  <h4 style={{ fontWeight: "bold", fontSize: "18px", marginBottom: "4px" }}>{item.title}</h4>
                  <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "14px" }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="layanan" style={{ padding: "80px 20px", backgroundColor: "#F8FAFC" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <span style={{ display: "inline-block", backgroundColor: "rgba(255, 215, 0, 0.2)", color: "#003366", padding: "6px 16px", borderRadius: "20px", fontSize: "14px", marginBottom: "16px" }}>Layanan Kami</span>
            <h2 style={{ fontSize: "36px", fontWeight: "bold", color: "#003366", marginBottom: "16px" }}>Pilihan Kontrak Premium</h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "24px" }}>
            <div style={{ backgroundColor: "white", borderRadius: "12px", padding: "24px", border: "1px solid #e5e7eb" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                <div style={{ width: "48px", height: "48px", backgroundColor: "rgba(0, 51, 102, 0.1)", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px" }}>⚡</div>
                <div>
                  <h3 style={{ fontWeight: "bold", color: "#003366" }}>Bidang Setengah</h3>
                  <p style={{ fontSize: "14px", color: "#666" }}>Kontrak pelayanan yang cepat</p>
                </div>
              </div>
              <p style={{ color: "#666", marginBottom: "16px" }}>Pelayanan yang mudah, cepat dengan gaji fantastis</p>
              {[{ durasi: "3 Hari", gaji: "Rp 45-65 Juta" }, { durasi: "7 Hari", gaji: "Rp 170-200 Juta" }, { durasi: "30 Hari", gaji: "Rp 1-1.5 Miliar" }].map((pkg, index) => (
                <div key={index} style={{ display: "flex", justifyContent: "space-between", padding: "12px", backgroundColor: "rgba(0, 51, 102, 0.05)", borderRadius: "8px", marginBottom: "8px" }}>
                  <span style={{ color: "#003366", fontWeight: "500" }}>🕐 {pkg.durasi}</span>
                  <span style={{ color: "#003366", fontWeight: "bold" }}>💰 {pkg.gaji}</span>
                </div>
              ))}
            </div>

            <div style={{ backgroundColor: "white", borderRadius: "12px", padding: "24px", border: "2px solid #FFD700", position: "relative" }}>
              <span style={{ position: "absolute", top: "12px", right: "12px", backgroundColor: "#FFD700", color: "#003366", padding: "4px 12px", borderRadius: "4px", fontSize: "12px", fontWeight: "bold" }}>Recommended</span>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                <div style={{ width: "48px", height: "48px", background: "linear-gradient(135deg, #FFD700 0%, #E6C200 100%)", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px" }}>🎯</div>
                <div>
                  <h3 style={{ fontWeight: "bold", color: "#003366" }}>Bidang Full</h3>
                  <p style={{ fontSize: "14px", color: "#666" }}>Gaji 3X lipat</p>
                </div>
              </div>
              <p style={{ color: "#666", marginBottom: "16px" }}>Sanggup dan profesional, hasil maksimal</p>
              {[{ durasi: "3 Hari", gaji: "Rp 90-130 Juta" }, { durasi: "7 Hari", gaji: "Rp 340-400 Juta" }, { durasi: "30 Hari", gaji: "Rp 2-3 Miliar" }].map((pkg, index) => (
                <div key={index} style={{ display: "flex", justifyContent: "space-between", padding: "12px", backgroundColor: "rgba(255, 215, 0, 0.1)", borderRadius: "8px", marginBottom: "8px" }}>
                  <span style={{ color: "#003366", fontWeight: "500" }}>🕐 {pkg.durasi}</span>
                  <span style={{ color: "#003366", fontWeight: "bold" }}>💰 {pkg.gaji}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact/Registration Section */}
      <section id="kontak" style={{ padding: "80px 20px", backgroundColor: "#F8FAFC" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <span style={{ display: "inline-block", backgroundColor: "rgba(255, 215, 0, 0.2)", color: "#003366", padding: "6px 16px", borderRadius: "20px", fontSize: "14px", marginBottom: "16px" }}>Pendaftaran</span>
            <h2 style={{ fontSize: "36px", fontWeight: "bold", color: "#003366", marginBottom: "16px" }}>Formulir Pendaftaran</h2>
            <p style={{ color: "#666", fontSize: "18px" }}>Isi formulir untuk mendapatkan surat perjanjian kontrak</p>
          </div>

          <form onSubmit={handleSubmit} style={{ backgroundColor: "white", padding: "32px", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", marginBottom: "8px", fontWeight: "500", color: "#003366" }}>Nama Lengkap <span style={{ color: "red" }}>*</span></label>
              <input type="text" name="namaLengkap" value={formData.namaLengkap} onChange={handleInputChange} placeholder="Masukkan nama lengkap Anda" required style={{ width: "100%", padding: "12px", border: "1px solid #e5e7eb", borderRadius: "6px", fontSize: "14px", outline: "none" }} />
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", marginBottom: "8px", fontWeight: "500", color: "#003366" }}>Nomor HP/WA <span style={{ color: "red" }}>*</span></label>
              <input type="tel" name="nomorHP" value={formData.nomorHP} onChange={handleInputChange} placeholder="Contoh: 08123456789" required style={{ width: "100%", padding: "12px", border: "1px solid #e5e7eb", borderRadius: "6px", fontSize: "14px", outline: "none" }} />
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", marginBottom: "8px", fontWeight: "500", color: "#003366" }}>Jenis Layanan <span style={{ color: "red" }}>*</span></label>
              <select name="jenisLayanan" value={formData.jenisLayanan} onChange={handleInputChange} required style={{ width: "100%", padding: "12px", border: "1px solid #e5e7eb", borderRadius: "6px", fontSize: "14px", outline: "none", backgroundColor: "white" }}>
                <option value="">Pilih Jenis Layanan</option>
                <option value="Setengah">Pelayanan Setengah Badan</option>
                <option value="Full">Pelayanan Badan Penuh</option>
              </select>
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", marginBottom: "8px", fontWeight: "500", color: "#003366" }}>Durasi Kontrak <span style={{ color: "red" }}>*</span></label>
              <select name="durasiKontrak" value={formData.durasiKontrak} onChange={handleInputChange} required style={{ width: "100%", padding: "12px", border: "1px solid #e5e7eb", borderRadius: "6px", fontSize: "14px", outline: "none", backgroundColor: "white" }}>
                <option value="">Pilih Durasi</option>
                <option value="3 Hari">3 Hari</option>
                <option value="7 Hari">7 Hari</option>
                <option value="30 Hari">30 Hari</option>
              </select>
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", marginBottom: "8px", fontWeight: "500", color: "#003366" }}>Nama Bank <span style={{ color: "red" }}>*</span></label>
              <select name="namaBank" value={formData.namaBank} onChange={handleInputChange} required style={{ width: "100%", padding: "12px", border: "1px solid #e5e7eb", borderRadius: "6px", fontSize: "14px", outline: "none", backgroundColor: "white" }}>
                <option value="">Pilih Bank</option>
                <option value="BCA">BCA</option>
                <option value="Mandiri">Mandiri</option>
                <option value="BRI">BRI</option>
                <option value="BNI">BNI</option>
                <option value="CIMB Niaga">CIMB Niaga</option>
                <option value="Danamon">Danamon</option>
                <option value="Permata">Permata</option>
                <option value="Lainnya">Lainnya</option>
              </select>
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", marginBottom: "8px", fontWeight: "500", color: "#003366" }}>Nomor Rekening <span style={{ color: "red" }}>*</span></label>
              <input type="text" name="nomorRekening" value={formData.nomorRekening} onChange={handleInputChange} placeholder="Masukkan nomor rekening" required style={{ width: "100%", padding: "12px", border: "1px solid #e5e7eb", borderRadius: "6px", fontSize: "14px", outline: "none" }} />
            </div>

            <div style={{ marginBottom: "24px" }}>
              <label style={{ display: "block", marginBottom: "8px", fontWeight: "500", color: "#003366" }}>Upload Pas Foto <span style={{ color: "red" }}>*</span></label>
              <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
                <label style={{ flex: 1, border: "2px dashed #d1d5db", borderRadius: "8px", padding: "24px", textAlign: "center", cursor: "pointer" }}>
                  <input type="file" accept="image/*" onChange={handlePhotoChange} required style={{ display: "none" }} />
                  <div style={{ color: "#9ca3af" }}>{formData.foto ? formData.foto.name : "📷 Klik untuk upload foto"}</div>
                </label>
                {photoPreview && <img src={photoPreview} alt="Preview" style={{ width: "80px", height: "100px", objectFit: "cover", borderRadius: "8px", border: "1px solid #e5e7eb" }} />}
              </div>
            </div>

            <button type="submit" disabled={isSubmitting} style={{ width: "100%", padding: "14px", backgroundColor: isSubmitting ? "#9ca3af" : "#003366", color: "white", border: "none", borderRadius: "6px", fontSize: "16px", fontWeight: "600", cursor: isSubmitting ? "not-allowed" : "pointer" }}>
              {isSubmitting ? "Memproses..." : "DAFTAR SEKARANG"}
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: "#001a33", color: "white", padding: "40px 20px", marginTop: "auto" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", textAlign: "center" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", marginBottom: "16px" }}>
            <div style={{ width: "40px", height: "40px", backgroundColor: "#FFD700", borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", color: "#003366" }}>AP</div>
            <span style={{ fontWeight: "bold", fontSize: "18px" }}>PT. ANDIKA PRATAMA</span>
          </div>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "14px", marginBottom: "24px" }}>Medan, Sumatera Utara / Banda Aceh, Indonesia</p>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px" }}>© 2024 PT. ANDIKA PRATAMA. All rights reserved.</p>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
