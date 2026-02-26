"use client";

import { useState, useEffect } from "react";

const ADMIN_WHATSAPP = "6285215573737";

export default function HomePage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: string } | null>(null);
  const [showContract, setShowContract] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pendaftaranData, setPendaftaranData] = useState<{
    namaLengkap: string;
    nomorHP: string;
    durasiKontrak: string;
    fotoUrl: string | null;
    nomorRekening: string;
    namaBank: string;
    jenisLayanan: string;
    nomorKontrak: string;
    tanggalKontrak: string;
  } | null>(null);

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, foto: file });
      const reader = new FileReader();
      reader.onloadend = () => setPhotoPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const timestamp = Date.now().toString(36).toUpperCase();
      const random = Math.random().toString(36).substring(2, 6).toUpperCase();
      const nomorKontrak = "AP-" + timestamp + "-" + random;

      setPendaftaranData({
        namaLengkap: formData.namaLengkap,
        nomorHP: formData.nomorHP,
        durasiKontrak: formData.durasiKontrak,
        fotoUrl: photoPreview,
        nomorRekening: formData.nomorRekening,
        namaBank: formData.namaBank,
        jenisLayanan: formData.jenisLayanan,
        nomorKontrak,
        tanggalKontrak: new Date().toISOString(),
      });

      setShowContract(true);
      setToast({ message: "Pendaftaran berhasil!", type: "success" });
      setFormData({ namaLengkap: "", nomorHP: "", durasiKontrak: "", foto: null, nomorRekening: "", namaBank: "", jenisLayanan: "" });
      setPhotoPreview(null);
    } catch {
      setToast({ message: "Terjadi kesalahan!", type: "error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSendWhatsApp = () => {
    if (!pendaftaranData) return;
    const date = new Date(pendaftaranData.tanggalKontrak);
    const tanggal = date.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
    const layanan = pendaftaranData.jenisLayanan === "Setengah" ? "Pelayanan Setengah Badan" : "Pelayanan Badan Penuh";
    
    const message = "*PENDAFTARAN BARU*\n\nNomor Kontrak: " + pendaftaranData.nomorKontrak + "\nNama: " + pendaftaranData.namaLengkap + "\nNo. HP: " + pendaftaranData.nomorHP + "\nLayanan: " + layanan + "\nDurasi: " + pendaftaranData.durasiKontrak + "\nBank: " + pendaftaranData.namaBank + "\nNo. Rekening: " + pendaftaranData.nomorRekening + "\nTanggal: " + tanggal + "\n\nTerima kasih.";
    
    window.open("https://wa.me/" + ADMIN_WHATSAPP + "?text=" + encodeURIComponent(message), "_blank");
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Toast */}
      {toast && (
        <div style={{
          position: "fixed",
          top: 80,
          right: 16,
          left: 16,
          zIndex: 9999,
          padding: "16px 24px",
          borderRadius: 8,
          color: "white",
          fontWeight: 500,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 12,
          backgroundColor: toast.type === "success" ? "#10B981" : "#EF4444",
        }}>
          <span>{toast.type === "success" ? "✓" : "✕"}</span>
          <span>{toast.message}</span>
          <button onClick={() => setToast(null)} style={{ background: "none", border: "none", color: "white", cursor: "pointer", marginLeft: 8 }}>✕</button>
        </div>
      )}

      {/* Contract Dialog */}
      {showContract && pendaftaranData && (
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
          padding: 16,
        }}>
          <div style={{ backgroundColor: "white", borderRadius: 12, maxWidth: 600, width: "100%", maxHeight: "90vh", overflow: "auto", position: "relative" }}>
            <button onClick={() => setShowContract(false)} style={{ position: "absolute", top: 16, right: 16, background: "#f3f4f6", border: "none", borderRadius: "50%", width: 32, height: 32, cursor: "pointer", fontSize: 18 }}>✕</button>
            
            <div style={{ padding: 24, color: "#003366", fontSize: 14 }}>
              <h1 style={{ textAlign: "center", marginBottom: 5, fontSize: 18, fontWeight: "bold" }}>SURAT PERJANJIAN KONTRAK KERJA</h1>
              <p style={{ textAlign: "center", color: "#666", marginBottom: 20, fontSize: 13 }}>No: {pendaftaranData.nomorKontrak}</p>

              <div style={{ marginBottom: 20 }}>
                <p style={{ fontWeight: "bold" }}>PIHAK PERTAMA (Perusahaan):</p>
                <p style={{ marginLeft: 12, fontSize: 13 }}>PT. ANDIKA PRATAMA</p>
                <p style={{ marginLeft: 12, fontSize: 13 }}>Medan, Sumatera Utara / Banda Aceh, Indonesia</p>
                <p style={{ fontWeight: "bold", marginTop: 12 }}>PIHAK KEDUA (Pekerja):</p>
                <p style={{ marginLeft: 12, fontSize: 13 }}>Nama: {pendaftaranData.namaLengkap}</p>
                <p style={{ marginLeft: 12, fontSize: 13 }}>Nomor HP/WA: {pendaftaranData.nomorHP}</p>
                <p style={{ marginLeft: 12, fontSize: 13 }}>Nama Bank: {pendaftaranData.namaBank}</p>
                <p style={{ marginLeft: 12, fontSize: 13 }}>Nomor Rekening: {pendaftaranData.nomorRekening}</p>
              </div>

              <div style={{ borderTop: "1px solid #e5e7eb", borderBottom: "1px solid #e5e7eb", padding: "12px 0", marginBottom: 20 }}>
                <p style={{ fontWeight: "bold", marginBottom: 8, fontSize: 13 }}>PASAL 1 - JENIS DAN DURASI KERJA</p>
                <p style={{ marginLeft: 12, fontSize: 13 }}>1. Jenis Layanan: <strong>{pendaftaranData.jenisLayanan === "Setengah" ? "Pelayanan Setengah Badan" : "Pelayanan Badan Penuh"}</strong></p>
                <p style={{ marginLeft: 12, fontSize: 13 }}>2. Durasi Kontrak: <strong>{pendaftaranData.durasiKontrak}</strong></p>
                <p style={{ marginLeft: 12, fontSize: 13 }}>3. Tanggal Mulai: <strong>{formatDate(pendaftaranData.tanggalKontrak)}</strong></p>
              </div>

              {pendaftaranData.fotoUrl && (
                <div style={{ textAlign: "center", marginBottom: 20 }}>
                  <p style={{ fontWeight: "bold", marginBottom: 8, fontSize: 13 }}>Foto:</p>
                  <img src={pendaftaranData.fotoUrl} alt="Foto" style={{ width: 80, height: 100, objectFit: "cover", borderRadius: 4, border: "1px solid #e5e7eb" }} />
                </div>
              )}

              <div style={{ display: "flex", flexDirection: "column", gap: 32, marginTop: 40 }}>
                <div style={{ textAlign: "center" }}>
                  <p style={{ fontWeight: "bold", marginBottom: 48, fontSize: 13 }}>PIHAK PERTAMA</p>
                  <p style={{ borderTop: "1px solid #333", paddingTop: 8, fontSize: 13 }}>PT. ANDIKA PRATAMA</p>
                </div>
                <div style={{ textAlign: "center" }}>
                  <p style={{ fontWeight: "bold", marginBottom: 48, fontSize: 13 }}>PIHAK KEDUA</p>
                  <p style={{ borderTop: "1px solid #333", paddingTop: 8, fontSize: 13 }}>{pendaftaranData.namaLengkap}</p>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 24 }}>
                <button onClick={handleSendWhatsApp} style={{ width: "100%", padding: "14px 24px", backgroundColor: "#25D366", color: "white", border: "none", borderRadius: 8, cursor: "pointer", fontWeight: 600, fontSize: 14 }}>
                  📱 Kirim ke WhatsApp Admin
                </button>
                <button onClick={() => window.print()} style={{ width: "100%", padding: "14px 24px", backgroundColor: "#003366", color: "white", border: "none", borderRadius: 8, cursor: "pointer", fontWeight: 600, fontSize: 14 }}>
                  🖨️ Cetak Kontrak
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        backgroundColor: isScrolled ? "rgba(255,255,255,0.95)" : "transparent",
        backdropFilter: isScrolled ? "blur(10px)" : "none",
        boxShadow: isScrolled ? "0 2px 10px rgba(0,0,0,0.1)" : "none",
        transition: "all 0.3s",
      }}>
        <nav style={{ maxWidth: 1200, margin: "0 auto", padding: "0 16px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
            <a href="#beranda" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
              <div style={{ fontWeight: "bold", fontSize: 16, color: isScrolled ? "#003366" : "white", display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 40, height: 40, backgroundColor: "#FFD700", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", color: "#003366", fontSize: 14 }}>AP</div>
                <span className="logo-text" style={{ display: "none" }}>PT. ANDIKA PRATAMA</span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <div className="desktop-nav" style={{ display: "none", alignItems: "center" }}>
              <a href="#beranda" style={{ color: isScrolled ? "#003366" : "white", textDecoration: "none", fontWeight: 500, fontSize: 14, marginLeft: 24 }}>Beranda</a>
              <a href="#tentang" style={{ color: isScrolled ? "#003366" : "white", textDecoration: "none", fontWeight: 500, fontSize: 14, marginLeft: 24 }}>Tentang Kami</a>
              <a href="#layanan" style={{ color: isScrolled ? "#003366" : "white", textDecoration: "none", fontWeight: 500, fontSize: 14, marginLeft: 24 }}>Layanan</a>
              <a href="#portofolio" style={{ color: isScrolled ? "#003366" : "white", textDecoration: "none", fontWeight: 500, fontSize: 14, marginLeft: 24 }}>Portofolio</a>
              <a href="#kontak" style={{ color: isScrolled ? "#003366" : "white", textDecoration: "none", fontWeight: 500, fontSize: 14, marginLeft: 24 }}>Kontak</a>
              <a href="#kontak" style={{ backgroundColor: "#FFD700", color: "#003366", padding: "10px 20px", borderRadius: 6, textDecoration: "none", fontWeight: 600, fontSize: 14, marginLeft: 24 }}>Hubungi Kami</a>
            </div>

            {/* Mobile Menu Button */}
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="mobile-menu-btn" style={{ background: "none", border: "none", cursor: "pointer", color: isScrolled ? "#003366" : "white", fontSize: 24, padding: 8 }}>
              {mobileMenuOpen ? "✕" : "☰"}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div style={{ backgroundColor: "white", padding: 16, borderRadius: 8, marginTop: 8 }}>
              <a href="#beranda" onClick={() => setMobileMenuOpen(false)} style={{ display: "block", color: "#003366", textDecoration: "none", padding: "12px 0", fontWeight: 500, fontSize: 14, borderBottom: "1px solid #f3f4f6" }}>Beranda</a>
              <a href="#tentang" onClick={() => setMobileMenuOpen(false)} style={{ display: "block", color: "#003366", textDecoration: "none", padding: "12px 0", fontWeight: 500, fontSize: 14, borderBottom: "1px solid #f3f4f6" }}>Tentang Kami</a>
              <a href="#layanan" onClick={() => setMobileMenuOpen(false)} style={{ display: "block", color: "#003366", textDecoration: "none", padding: "12px 0", fontWeight: 500, fontSize: 14, borderBottom: "1px solid #f3f4f6" }}>Layanan</a>
              <a href="#portofolio" onClick={() => setMobileMenuOpen(false)} style={{ display: "block", color: "#003366", textDecoration: "none", padding: "12px 0", fontWeight: 500, fontSize: 14, borderBottom: "1px solid #f3f4f6" }}>Portofolio</a>
              <a href="#kontak" onClick={() => setMobileMenuOpen(false)} style={{ display: "block", color: "#003366", textDecoration: "none", padding: "12px 0", fontWeight: 500, fontSize: 14 }}>Kontak</a>
              <a href="#kontak" onClick={() => setMobileMenuOpen(false)} style={{ display: "block", backgroundColor: "#FFD700", color: "#003366", padding: "12px", borderRadius: 6, textDecoration: "none", fontWeight: 600, textAlign: "center", marginTop: 12, fontSize: 14 }}>Hubungi Kami</a>
            </div>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <section id="beranda" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, #003366 0%, #001a33 50%, #000000 100%)", padding: "80px 16px 40px", position: "relative" }}>
        <div style={{ maxWidth: 800, width: "100%", textAlign: "center", padding: "0 8px" }}>
          <span style={{ display: "inline-block", backgroundColor: "rgba(255, 215, 0, 0.2)", color: "#FFD700", padding: "6px 16px", borderRadius: 20, fontSize: 12, marginBottom: 20 }}>Pendaftaran Gratis</span>
          <h1 style={{ fontSize: "clamp(1.5rem, 5vw, 2.5rem)", fontWeight: "bold", color: "white", marginBottom: 20, lineHeight: 1.3, padding: "0 8px" }}>
            PT. ANDIKA PRATAMA: <span style={{ color: "#FFD700" }}>Solusi Kerja dengan penghasilan tertinggi di dunia</span> hanya dalam beberapa hari
          </h1>
          <p style={{ fontSize: "clamp(0.875rem, 2.5vw, 1rem)", color: "rgba(255,255,255,0.8)", marginBottom: 28, maxWidth: 600, marginLeft: "auto", marginRight: "auto", padding: "0 8px" }}>
            Pendaftaran Gratis – Kontrak Langsung, Gaji Transparan untuk Para Wanita yg menganggap mereka berharga
          </p>
          <a href="#kontak" style={{ display: "inline-block", backgroundColor: "#FFD700", color: "#003366", padding: "14px 32px", borderRadius: 6, textDecoration: "none", fontWeight: 600, fontSize: "clamp(0.875rem, 2vw, 1rem)" }}>HUBUNGI KAMI →</a>
          
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 24, marginTop: 40, paddingTop: 28, borderTop: "1px solid rgba(255,255,255,0.1)" }}>
            <div style={{ textAlign: "center", flex: "1 1 80px", minWidth: 80 }}>
              <div style={{ fontSize: "clamp(1.25rem, 4vw, 1.75rem)", fontWeight: "bold", color: "#FFD700" }}>4000+</div>
              <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "clamp(0.625rem, 2vw, 0.75rem)", marginTop: 4 }}>Wanita telah bekerja</div>
            </div>
            <div style={{ textAlign: "center", flex: "1 1 80px", minWidth: 80 }}>
              <div style={{ fontSize: "clamp(1.25rem, 4vw, 1.75rem)", fontWeight: "bold", color: "#FFD700" }}>5+</div>
              <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "clamp(0.625rem, 2vw, 0.75rem)", marginTop: 4 }}>Tahun berdiri</div>
            </div>
            <div style={{ textAlign: "center", flex: "1 1 80px", minWidth: 80 }}>
              <div style={{ fontSize: "clamp(1.25rem, 4vw, 1.75rem)", fontWeight: "bold", color: "#FFD700" }}>100%</div>
              <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "clamp(0.625rem, 2vw, 0.75rem)", marginTop: 4 }}>Gaji Transparan</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="tentang" style={{ padding: "60px 16px", backgroundColor: "white" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <span style={{ display: "inline-block", backgroundColor: "rgba(0, 51, 102, 0.1)", color: "#003366", padding: "6px 16px", borderRadius: 20, fontSize: 12, marginBottom: 12 }}>Tentang Kami</span>
            <h2 style={{ fontSize: "clamp(1.5rem, 4vw, 2rem)", fontWeight: "bold", color: "#003366", marginBottom: 12 }}>Mengapa PT. Andika Pratama?</h2>
            <p style={{ color: "#666", fontSize: "clamp(0.875rem, 2.5vw, 1rem)" }}>Kami adalah mitra terpercaya untuk kontrak kerja premium</p>
          </div>

          <div className="about-grid" style={{ display: "flex", flexDirection: "column", gap: 32, alignItems: "center" }}>
            <div style={{ width: "100%" }}>
              <p style={{ fontSize: "clamp(0.875rem, 2vw, 1rem)", color: "#333", lineHeight: 1.8, marginBottom: 20, textAlign: "center" }}>
                <strong style={{ color: "#003366" }}>PT. ANDIKA PRATAMA</strong> adalah perusahaan yang bergerak di bidang kecerdasan dan penghormatan wanita. Dengan pengalaman bertahun-tahun dan telah dibuktikan ribuan orang sejak tahun 2020.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 8 }}>
                <span style={{ display: "flex", alignItems: "center", gap: 6, backgroundColor: "rgba(0, 51, 102, 0.05)", padding: "8px 14px", borderRadius: 20, fontSize: 13, color: "#003366" }}>✓ Berpengalaman</span>
                <span style={{ display: "flex", alignItems: "center", gap: 6, backgroundColor: "rgba(0, 51, 102, 0.05)", padding: "8px 14px", borderRadius: 20, fontSize: 13, color: "#003366" }}>✓ Profesional</span>
                <span style={{ display: "flex", alignItems: "center", gap: 6, backgroundColor: "rgba(0, 51, 102, 0.05)", padding: "8px 14px", borderRadius: 20, fontSize: 13, color: "#003366" }}>✓ Gaji Kompetitif</span>
              </div>
            </div>

            <div style={{ width: "100%", maxWidth: 400 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ background: "linear-gradient(135deg, #003366 0%, #001a33 100%)", padding: 20, borderRadius: 12, color: "white", position: "relative" }}>
                  <span style={{ position: "absolute", top: 12, right: 12, width: 28, height: 28, backgroundColor: "#FFD700", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", color: "#003366", fontSize: 13 }}>1</span>
                  <h4 style={{ fontWeight: "bold", fontSize: 16 }}>PENDAFTARAN</h4>
                  <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 13, marginTop: 4 }}>Gratis</p>
                </div>
                <div style={{ background: "linear-gradient(135deg, #003366 0%, #001a33 100%)", padding: 20, borderRadius: 12, color: "white", position: "relative" }}>
                  <span style={{ position: "absolute", top: 12, right: 12, width: 28, height: 28, backgroundColor: "#FFD700", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", color: "#003366", fontSize: 13 }}>2</span>
                  <h4 style={{ fontWeight: "bold", fontSize: 16 }}>BEKERJA</h4>
                  <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 13, marginTop: 4 }}>Secara Profesional</p>
                </div>
                <div style={{ background: "linear-gradient(135deg, #003366 0%, #001a33 100%)", padding: 20, borderRadius: 12, color: "white", position: "relative" }}>
                  <span style={{ position: "absolute", top: 12, right: 12, width: 28, height: 28, backgroundColor: "#FFD700", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", color: "#003366", fontSize: 13 }}>3</span>
                  <h4 style={{ fontWeight: "bold", fontSize: 16 }}>TERIMA GAJI</h4>
                  <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 13, marginTop: 4 }}>Ketika Selesai Kontrak</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="layanan" style={{ padding: "60px 16px", backgroundColor: "#F8FAFC" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <span style={{ display: "inline-block", backgroundColor: "rgba(255, 215, 0, 0.2)", color: "#003366", padding: "6px 16px", borderRadius: 20, fontSize: 12, marginBottom: 12 }}>Layanan Kami</span>
            <h2 style={{ fontSize: "clamp(1.5rem, 4vw, 2rem)", fontWeight: "bold", color: "#003366", marginBottom: 12 }}>Pilihan Kontrak Premium</h2>
          </div>

          <div className="services-grid" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {/* Setengah */}
            <div style={{ backgroundColor: "white", borderRadius: 12, padding: 20, boxShadow: "0 4px 12px rgba(0,0,0,0.1)", border: "1px solid #e5e7eb" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <div style={{ width: 44, height: 44, backgroundColor: "rgba(0, 51, 102, 0.1)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>⚡</div>
                <div>
                  <h3 style={{ fontWeight: "bold", color: "#003366", fontSize: 16 }}>Bidang Setengah</h3>
                  <p style={{ fontSize: 13, color: "#666" }}>Kontrak pelayanan cepat</p>
                </div>
              </div>
              <p style={{ color: "#666", marginBottom: 16, fontSize: 14 }}>Pelayanan yang mudah, cepat dengan gaji fantastis</p>
              {[
                { durasi: "3 Hari", gaji: "Rp 45-65 Juta" },
                { durasi: "7 Hari", gaji: "Rp 170-200 Juta" },
                { durasi: "30 Hari", gaji: "Rp 1-1.5 Miliar" },
              ].map((pkg, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: 12, backgroundColor: "rgba(0, 51, 102, 0.05)", borderRadius: 8, marginBottom: 8 }}>
                  <span style={{ color: "#003366", fontWeight: 500, fontSize: 13 }}>🕐 {pkg.durasi}</span>
                  <span style={{ color: "#003366", fontWeight: "bold", fontSize: 13 }}>💰 {pkg.gaji}</span>
                </div>
              ))}
            </div>

            {/* Full */}
            <div style={{ backgroundColor: "white", borderRadius: 12, padding: 20, boxShadow: "0 4px 12px rgba(0,0,0,0.1)", border: "2px solid #FFD700", position: "relative" }}>
              <span style={{ position: "absolute", top: 12, right: 12, backgroundColor: "#FFD700", color: "#003366", padding: "4px 10px", borderRadius: 4, fontSize: 11, fontWeight: "bold" }}>Recommended</span>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <div style={{ width: 44, height: 44, background: "linear-gradient(135deg, #FFD700 0%, #E6C200 100%)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>🎯</div>
                <div>
                  <h3 style={{ fontWeight: "bold", color: "#003366", fontSize: 16 }}>Bidang Full</h3>
                  <p style={{ fontSize: 13, color: "#666" }}>Gaji 3X lipat</p>
                </div>
              </div>
              <p style={{ color: "#666", marginBottom: 16, fontSize: 14 }}>Sanggup dan profesional, hasil maksimal</p>
              {[
                { durasi: "3 Hari", gaji: "Rp 90-130 Juta" },
                { durasi: "7 Hari", gaji: "Rp 340-400 Juta" },
                { durasi: "30 Hari", gaji: "Rp 2-3 Miliar" },
              ].map((pkg, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: 12, backgroundColor: "rgba(255, 215, 0, 0.1)", borderRadius: 8, marginBottom: 8 }}>
                  <span style={{ color: "#003366", fontWeight: 500, fontSize: 13 }}>🕐 {pkg.durasi}</span>
                  <span style={{ color: "#003366", fontWeight: "bold", fontSize: 13 }}>💰 {pkg.gaji}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portofolio" style={{ padding: "60px 16px", backgroundColor: "white" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <span style={{ display: "inline-block", backgroundColor: "rgba(0, 51, 102, 0.1)", color: "#003366", padding: "6px 16px", borderRadius: 20, fontSize: 12, marginBottom: 12 }}>Portofolio</span>
            <h2 style={{ fontSize: "clamp(1.5rem, 4vw, 2rem)", fontWeight: "bold", color: "#003366", marginBottom: 12 }}>Proyek & Lowongan Terbaru</h2>
            <p style={{ color: "#666", fontSize: "clamp(0.875rem, 2.5vw, 1rem)" }}>Peluang karir premium</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
            {[
              { title: "Pelayanan Setengah Badan", durasi: "3 Hari", gaji: "Rp 45-65 Juta", type: "Setengah" },
              { title: "Pelayanan Badan Penuh", durasi: "30 Hari", gaji: "Rp 2-3 Miliar", type: "Full" },
              { title: "Pelayanan Setengah Badan", durasi: "7 Hari", gaji: "Rp 170-200 Juta", type: "Setengah" },
              { title: "Pelayanan Badan Penuh", durasi: "30 Hari", gaji: "Rp 1.5-2 Miliar", type: "Full" },
              { title: "Pelayanan Badan Penuh", durasi: "7 Hari", gaji: "Rp 340-400 Juta", type: "Full" },
              { title: "Pelayanan Badan Penuh", durasi: "3 Hari", gaji: "Rp 90-130 Juta", type: "Full" },
            ].map((item, i) => (
              <div key={i} style={{ backgroundColor: "white", borderRadius: 12, boxShadow: "0 4px 12px rgba(0,0,0,0.1)", border: "1px solid #e5e7eb", overflow: "hidden" }}>
                <div style={{ background: "linear-gradient(to right, #003366, #001a33)", padding: 14, color: "white" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
                    <div>
                      <h3 style={{ fontWeight: "bold", fontSize: 14 }}>{item.title}</h3>
                      <p style={{ fontSize: 12, opacity: 0.7, marginTop: 2 }}>PT. ANDIKA PRATAMA</p>
                    </div>
                    <span style={{ backgroundColor: item.type === "Full" ? "#FFD700" : "rgba(255,255,255,0.2)", color: item.type === "Full" ? "#003366" : "white", padding: "3px 8px", borderRadius: 4, fontSize: 11 }}>{item.type}</span>
                  </div>
                </div>
                <div style={{ padding: 14 }}>
                  <div style={{ display: "flex", gap: 12, marginBottom: 10, fontSize: 12 }}>
                    <span style={{ color: "#666" }}>📍 Indonesia</span>
                    <span style={{ color: "#666" }}>⏱ {item.durasi}</span>
                  </div>
                  <div style={{ backgroundColor: "rgba(0,51,102,0.05)", padding: 10, borderRadius: 8, marginBottom: 10 }}>
                    <span style={{ fontWeight: "bold", color: "#003366", fontSize: 13 }}>💰 {item.gaji}</span>
                  </div>
                  <a href="#kontak" style={{ display: "block", width: "100%", backgroundColor: "#003366", color: "white", padding: 10, borderRadius: 6, textAlign: "center", textDecoration: "none", fontWeight: 600, fontSize: 13 }}>Lamar Sekarang</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="kontak" style={{ padding: "60px 16px", backgroundColor: "#F8FAFC" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <span style={{ display: "inline-block", backgroundColor: "rgba(255, 215, 0, 0.2)", color: "#003366", padding: "6px 16px", borderRadius: 20, fontSize: 12, marginBottom: 12 }}>Pendaftaran</span>
            <h2 style={{ fontSize: "clamp(1.5rem, 4vw, 2rem)", fontWeight: "bold", color: "#003366", marginBottom: 12 }}>Formulir Pendaftaran</h2>
            <p style={{ color: "#666", fontSize: "clamp(0.875rem, 2.5vw, 1rem)" }}>Isi formulir untuk mendaftar</p>
          </div>

          <div className="contact-grid" style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {/* Contact Info */}
            <div style={{ backgroundColor: "white", borderRadius: 12, padding: 20, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
              <h3 style={{ color: "#003366", fontWeight: "bold", marginBottom: 16, fontSize: 16 }}>Informasi Kontak</h3>
              
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{ display: "flex", alignItems: "start", gap: 12 }}>
                  <div style={{ width: 36, height: 36, backgroundColor: "rgba(0,51,102,0.1)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>📞</div>
                  <div>
                    <p style={{ fontWeight: 600, color: "#003366", fontSize: 14 }}>Telepon</p>
                    <p style={{ color: "#666", fontSize: 13 }}>+62 852-1557-3737</p>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "start", gap: 12 }}>
                  <div style={{ width: 36, height: 36, backgroundColor: "rgba(0,51,102,0.1)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>📧</div>
                  <div>
                    <p style={{ fontWeight: 600, color: "#003366", fontSize: 14 }}>Email</p>
                    <p style={{ color: "#666", fontSize: 13 }}>info@andikapratama.com</p>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "start", gap: 12 }}>
                  <div style={{ width: 36, height: 36, backgroundColor: "rgba(0,51,102,0.1)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>📍</div>
                  <div>
                    <p style={{ fontWeight: 600, color: "#003366", fontSize: 14 }}>Alamat</p>
                    <p style={{ color: "#666", fontSize: 13 }}>Medan / Banda Aceh, Indonesia</p>
                  </div>
                </div>

                <div style={{ backgroundColor: "rgba(0,51,102,0.05)", padding: 14, borderRadius: 8 }}>
                  <p style={{ fontWeight: 600, color: "#003366", marginBottom: 4, fontSize: 14 }}>Jam Operasional</p>
                  <p style={{ color: "#666", fontSize: 13 }}>⏰ Senin - Minggu: 24 Jam</p>
                </div>
              </div>
            </div>

            {/* Registration Form */}
            <div style={{ backgroundColor: "white", borderRadius: 12, padding: 20, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
              <h3 style={{ color: "#003366", fontWeight: "bold", marginBottom: 16, fontSize: 16 }}>Form Pendaftaran</h3>
              
              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: 14 }}>
                  <label style={{ display: "block", marginBottom: 6, fontWeight: 500, color: "#003366", fontSize: 13 }}>Nama Lengkap <span style={{ color: "red" }}>*</span></label>
                  <input type="text" name="namaLengkap" value={formData.namaLengkap} onChange={handleInputChange} placeholder="Masukkan nama lengkap" style={{ width: "100%", padding: 12, border: "1px solid #e5e7eb", borderRadius: 6, fontSize: 14, outline: "none", boxSizing: "border-box" }} required />
                </div>

                <div style={{ marginBottom: 14 }}>
                  <label style={{ display: "block", marginBottom: 6, fontWeight: 500, color: "#003366", fontSize: 13 }}>Nomor HP/WA <span style={{ color: "red" }}>*</span></label>
                  <input type="tel" name="nomorHP" value={formData.nomorHP} onChange={handleInputChange} placeholder="Contoh: 08123456789" style={{ width: "100%", padding: 12, border: "1px solid #e5e7eb", borderRadius: 6, fontSize: 14, outline: "none", boxSizing: "border-box" }} required />
                </div>

                <div style={{ display: "flex", gap: 12, marginBottom: 14, flexWrap: "wrap" }}>
                  <div style={{ flex: "1 1 140px", minWidth: 140 }}>
                    <label style={{ display: "block", marginBottom: 6, fontWeight: 500, color: "#003366", fontSize: 13 }}>Jenis Layanan <span style={{ color: "red" }}>*</span></label>
                    <select name="jenisLayanan" value={formData.jenisLayanan} onChange={handleInputChange} style={{ width: "100%", padding: 12, border: "1px solid #e5e7eb", borderRadius: 6, fontSize: 14, outline: "none", backgroundColor: "white", boxSizing: "border-box" }} required>
                      <option value="">Pilih Layanan</option>
                      <option value="Setengah">Setengah Badan</option>
                      <option value="Full">Badan Penuh</option>
                    </select>
                  </div>

                  <div style={{ flex: "1 1 140px", minWidth: 140 }}>
                    <label style={{ display: "block", marginBottom: 6, fontWeight: 500, color: "#003366", fontSize: 13 }}>Durasi <span style={{ color: "red" }}>*</span></label>
                    <select name="durasiKontrak" value={formData.durasiKontrak} onChange={handleInputChange} style={{ width: "100%", padding: 12, border: "1px solid #e5e7eb", borderRadius: 6, fontSize: 14, outline: "none", backgroundColor: "white", boxSizing: "border-box" }} required>
                      <option value="">Pilih Durasi</option>
                      <option value="3 Hari">3 Hari</option>
                      <option value="7 Hari">7 Hari</option>
                      <option value="30 Hari">30 Hari</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: "flex", gap: 12, marginBottom: 14, flexWrap: "wrap" }}>
                  <div style={{ flex: "1 1 140px", minWidth: 140 }}>
                    <label style={{ display: "block", marginBottom: 6, fontWeight: 500, color: "#003366", fontSize: 13 }}>Nama Bank <span style={{ color: "red" }}>*</span></label>
                    <select name="namaBank" value={formData.namaBank} onChange={handleInputChange} style={{ width: "100%", padding: 12, border: "1px solid #e5e7eb", borderRadius: 6, fontSize: 14, outline: "none", backgroundColor: "white", boxSizing: "border-box" }} required>
                      <option value="">Pilih Bank</option>
                      <option value="BCA">BCA</option>
                      <option value="Mandiri">Mandiri</option>
                      <option value="BRI">BRI</option>
                      <option value="BNI">BNI</option>
                      <option value="CIMB Niaga">CIMB Niaga</option>
                      <option value="Lainnya">Lainnya</option>
                    </select>
                  </div>

                  <div style={{ flex: "1 1 140px", minWidth: 140 }}>
                    <label style={{ display: "block", marginBottom: 6, fontWeight: 500, color: "#003366", fontSize: 13 }}>No. Rekening <span style={{ color: "red" }}>*</span></label>
                    <input type="text" name="nomorRekening" value={formData.nomorRekening} onChange={handleInputChange} placeholder="No. Rek" style={{ width: "100%", padding: 12, border: "1px solid #e5e7eb", borderRadius: 6, fontSize: 14, outline: "none", boxSizing: "border-box" }} required />
                  </div>
                </div>

                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: "block", marginBottom: 6, fontWeight: 500, color: "#003366", fontSize: 13 }}>Upload Pas Foto <span style={{ color: "red" }}>*</span></label>
                  <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
                    <label style={{ flex: 1, border: "2px dashed #d1d5db", borderRadius: 8, padding: 20, textAlign: "center", cursor: "pointer", minWidth: 150 }}>
                      <input type="file" accept="image/*" onChange={handlePhotoChange} style={{ display: "none" }} required />
                      <span style={{ color: "#9ca3af", fontSize: 13 }}>📷 {formData.foto ? formData.foto.name : "Klik untuk upload foto"}</span>
                    </label>
                    {photoPreview && <img src={photoPreview} alt="Preview" style={{ width: 70, height: 90, objectFit: "cover", borderRadius: 8, border: "1px solid #e5e7eb" }} />}
                  </div>
                </div>

                <button type="submit" disabled={isSubmitting} style={{ width: "100%", padding: 14, backgroundColor: isSubmitting ? "#9ca3af" : "#003366", color: "white", border: "none", borderRadius: 6, fontSize: 14, fontWeight: 600, cursor: isSubmitting ? "not-allowed" : "pointer" }}>
                  {isSubmitting ? "Memproses..." : "DAFTAR SEKARANG"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: "#001a33", color: "white", padding: "32px 16px", marginTop: "auto" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", textAlign: "center" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 12 }}>
            <div style={{ width: 36, height: 36, backgroundColor: "#FFD700", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", color: "#003366", fontSize: 13 }}>AP</div>
            <span style={{ fontWeight: "bold", fontSize: 16 }}>PT. ANDIKA PRATAMA</span>
          </div>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, marginBottom: 6 }}>📞 +62 852-1557-3737 | 📧 info@andikapratama.com</p>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, marginBottom: 16 }}>📍 Medan / Banda Aceh, Indonesia</p>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 11 }}>© 2024 PT. ANDIKA PRATAMA. All rights reserved.</p>
        </div>
      </footer>

      {/* Responsive Styles */}
      <style jsx global>{`
        @media (min-width: 640px) {
          section {
            padding-left: 24px;
            padding-right: 24px;
          }
        }
        
        @media (min-width: 1024px) {
          .logo-text {
            display: inline !important;
          }
          
          .desktop-nav {
            display: flex !important;
          }
          
          .mobile-menu-btn {
            display: none !important;
          }
          
          .about-grid {
            flex-direction: row;
            align-items: flex-start;
          }
          
          .about-grid > div:first-child {
            text-align: left;
          }
          
          .services-grid {
            flex-direction: row;
          }
          
          .contact-grid {
            flex-direction: row;
          }
        }
        
        @media (min-width: 1280px) {
          section {
            padding-left: 32px;
            padding-right: 32px;
          }
        }
        
        html {
          scroll-behavior: smooth;
        }
        
        body {
          overflow-x: hidden;
        }
        
        @media (max-width: 640px) {
          button, a, input, select {
            min-height: 44px;
          }
          
          input, select {
            font-size: 16px !important;
          }
        }
      `}</style>
    </div>
  );
}
