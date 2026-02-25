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

  const headerStyle = {
    position: "fixed" as const,
    top: 0,
    left: 0,
    right: 0,
    zIndex: 50,
    backgroundColor: isScrolled ? "rgba(255,255,255,0.95)" : "transparent",
    backdropFilter: isScrolled ? "blur(10px)" : "none",
    boxShadow: isScrolled ? "0 2px 10px rgba(0,0,0,0.1)" : "none",
    transition: "all 0.3s",
  };

  const navLinkStyle = {
    color: isScrolled ? "#003366" : "white",
    textDecoration: "none",
    fontWeight: 500,
    fontSize: 14,
    marginLeft: 32,
  };

  const buttonPrimary = {
    backgroundColor: "#FFD700",
    color: "#003366",
    padding: "10px 24px",
    borderRadius: 6,
    border: "none",
    fontWeight: 600,
    cursor: "pointer",
    fontSize: 14,
  };

  const inputStyle = {
    width: "100%",
    padding: 12,
    border: "1px solid #e5e7eb",
    borderRadius: 6,
    fontSize: 14,
    outline: "none",
  };

  const selectStyle = {
    width: "100%",
    padding: 12,
    border: "1px solid #e5e7eb",
    borderRadius: 6,
    fontSize: 14,
    outline: "none",
    backgroundColor: "white",
  };

  const labelStyle = {
    display: "block",
    marginBottom: 8,
    fontWeight: 500,
    color: "#003366",
    fontSize: 14,
  };

  const cardStyle = {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 24,
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Toast */}
      {toast && (
        <div style={{
          position: "fixed",
          top: 80,
          right: 16,
          zIndex: 9999,
          padding: "16px 24px",
          borderRadius: 8,
          color: "white",
          fontWeight: 500,
          display: "flex",
          alignItems: "center",
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
          padding: 20,
        }}>
          <div style={{ backgroundColor: "white", borderRadius: 12, maxWidth: 600, width: "100%", maxHeight: "90vh", overflow: "auto", position: "relative" }}>
            <button onClick={() => setShowContract(false)} style={{ position: "absolute", top: 16, right: 16, background: "#f3f4f6", border: "none", borderRadius: "50%", width: 32, height: 32, cursor: "pointer", fontSize: 18 }}>✕</button>
            
            <div style={{ padding: 40, color: "#003366", fontSize: 14 }}>
              <h1 style={{ textAlign: "center", marginBottom: 5, fontSize: 20, fontWeight: "bold" }}>SURAT PERJANJIAN KONTRAK KERJA</h1>
              <p style={{ textAlign: "center", color: "#666", marginBottom: 24 }}>No: {pendaftaranData.nomorKontrak}</p>

              <div style={{ marginBottom: 24 }}>
                <p style={{ fontWeight: "bold" }}>PIHAK PERTAMA (Perusahaan):</p>
                <p style={{ marginLeft: 16 }}>PT. ANDIKA PRATAMA</p>
                <p style={{ marginLeft: 16 }}>Medan, Sumatera Utara / Banda Aceh, Indonesia</p>
                <p style={{ fontWeight: "bold", marginTop: 16 }}>PIHAK KEDUA (Pekerja):</p>
                <p style={{ marginLeft: 16 }}>Nama: {pendaftaranData.namaLengkap}</p>
                <p style={{ marginLeft: 16 }}>Nomor HP/WA: {pendaftaranData.nomorHP}</p>
                <p style={{ marginLeft: 16 }}>Nama Bank: {pendaftaranData.namaBank}</p>
                <p style={{ marginLeft: 16 }}>Nomor Rekening: {pendaftaranData.nomorRekening}</p>
              </div>

              <div style={{ borderTop: "1px solid #e5e7eb", borderBottom: "1px solid #e5e7eb", padding: "16px 0", marginBottom: 24 }}>
                <p style={{ fontWeight: "bold", marginBottom: 8 }}>PASAL 1 - JENIS DAN DURASI KERJA</p>
                <p style={{ marginLeft: 16 }}>1. Jenis Layanan: <strong>{pendaftaranData.jenisLayanan === "Setengah" ? "Pelayanan Setengah Badan" : "Pelayanan Badan Penuh"}</strong></p>
                <p style={{ marginLeft: 16 }}>2. Durasi Kontrak: <strong>{pendaftaranData.durasiKontrak}</strong></p>
                <p style={{ marginLeft: 16 }}>3. Tanggal Mulai: <strong>{formatDate(pendaftaranData.tanggalKontrak)}</strong></p>
              </div>

              {pendaftaranData.fotoUrl && (
                <div style={{ textAlign: "center", marginBottom: 24 }}>
                  <p style={{ fontWeight: "bold", marginBottom: 8 }}>Foto:</p>
                  <img src={pendaftaranData.fotoUrl} alt="Foto" style={{ width: 100, height: 120, objectFit: "cover", borderRadius: 4, border: "1px solid #e5e7eb" }} />
                </div>
              )}

              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 48 }}>
                <div style={{ textAlign: "center", width: "45%" }}>
                  <p style={{ fontWeight: "bold", marginBottom: 60 }}>PIHAK PERTAMA</p>
                  <p style={{ borderTop: "1px solid #333", paddingTop: 8 }}>PT. ANDIKA PRATAMA</p>
                </div>
                <div style={{ textAlign: "center", width: "45%" }}>
                  <p style={{ fontWeight: "bold", marginBottom: 60 }}>PIHAK KEDUA</p>
                  <p style={{ borderTop: "1px solid #333", paddingTop: 8 }}>{pendaftaranData.namaLengkap}</p>
                </div>
              </div>

              <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
                <button onClick={handleSendWhatsApp} style={{ flex: 1, padding: "12px 24px", backgroundColor: "#25D366", color: "white", border: "none", borderRadius: 8, cursor: "pointer", fontWeight: 600 }}>
                  Kirim ke WhatsApp Admin
                </button>
                <button onClick={() => window.print()} style={{ flex: 1, padding: "12px 24px", backgroundColor: "#003366", color: "white", border: "none", borderRadius: 8, cursor: "pointer", fontWeight: 600 }}>
                  Cetak Kontrak
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header style={headerStyle}>
        <nav style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
            <a href="#beranda" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}>
              <div style={{ fontWeight: "bold", fontSize: 18, color: isScrolled ? "#003366" : "white", display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 48, height: 48, backgroundColor: "#FFD700", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", color: "#003366" }}>AP</div>
                <span style={{ display: typeof window !== "undefined" && window.innerWidth < 640 ? "none" : "inline" }}>PT. ANDIKA PRATAMA</span>
              </div>
            </a>

            <div style={{ display: typeof window !== "undefined" && window.innerWidth < 1024 ? "none" : "flex", alignItems: "center" }}>
              <a href="#beranda" style={navLinkStyle}>Beranda</a>
              <a href="#tentang" style={navLinkStyle}>Tentang Kami</a>
              <a href="#layanan" style={navLinkStyle}>Layanan</a>
              <a href="#portofolio" style={navLinkStyle}>Portofolio</a>
              <a href="#kontak" style={navLinkStyle}>Kontak</a>
              <a href="#kontak" style={{ ...buttonPrimary, marginLeft: 32, textDecoration: "none" }}>Hubungi Kami</a>
            </div>

            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{ display: typeof window !== "undefined" && window.innerWidth >= 1024 ? "none" : "block", background: "none", border: "none", cursor: "pointer", color: isScrolled ? "#003366" : "white", fontSize: 24 }}>
              {mobileMenuOpen ? "✕" : "☰"}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div style={{ backgroundColor: "white", padding: 20, borderRadius: 8, marginTop: 8 }}>
              <a href="#beranda" onClick={() => setMobileMenuOpen(false)} style={{ display: "block", color: "#003366", textDecoration: "none", padding: "12px 0", fontWeight: 500 }}>Beranda</a>
              <a href="#tentang" onClick={() => setMobileMenuOpen(false)} style={{ display: "block", color: "#003366", textDecoration: "none", padding: "12px 0", fontWeight: 500 }}>Tentang Kami</a>
              <a href="#layanan" onClick={() => setMobileMenuOpen(false)} style={{ display: "block", color: "#003366", textDecoration: "none", padding: "12px 0", fontWeight: 500 }}>Layanan</a>
              <a href="#portofolio" onClick={() => setMobileMenuOpen(false)} style={{ display: "block", color: "#003366", textDecoration: "none", padding: "12px 0", fontWeight: 500 }}>Portofolio</a>
              <a href="#kontak" onClick={() => setMobileMenuOpen(false)} style={{ display: "block", color: "#003366", textDecoration: "none", padding: "12px 0", fontWeight: 500 }}>Kontak</a>
              <a href="#kontak" onClick={() => setMobileMenuOpen(false)} style={{ display: "block", backgroundColor: "#FFD700", color: "#003366", padding: "12px", borderRadius: 6, textDecoration: "none", fontWeight: 600, textAlign: "center", marginTop: 12 }}>Hubungi Kami</a>
            </div>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <section id="beranda" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, #003366 0%, #001a33 50%, #000000 100%)", padding: "80px 20px 40px", position: "relative" }}>
        <div style={{ maxWidth: 900, textAlign: "center" }}>
          <span style={{ display: "inline-block", backgroundColor: "rgba(255, 215, 0, 0.2)", color: "#FFD700", padding: "6px 16px", borderRadius: 20, fontSize: 14, marginBottom: 24 }}>Pendaftaran Gratis</span>
          <h1 style={{ fontSize: 48, fontWeight: "bold", color: "white", marginBottom: 24, lineHeight: 1.2 }}>
            PT. ANDIKA PRATAMA: <span style={{ color: "#FFD700" }}>Solusi Kerja dengan penghasilan tertinggi di dunia</span> hanya dalam beberapa hari
          </h1>
          <p style={{ fontSize: 18, color: "rgba(255,255,255,0.8)", marginBottom: 32, maxWidth: 700, marginLeft: "auto", marginRight: "auto" }}>
            Pendaftaran Gratis – Kontrak Langsung, Gaji Transparan untuk Para Wanita yg menganggap mereka berharga
          </p>
          <a href="#kontak" style={{ display: "inline-block", backgroundColor: "#FFD700", color: "#003366", padding: "16px 48px", borderRadius: 6, textDecoration: "none", fontWeight: 600, fontSize: 16 }}>HUBUNGI KAMI →</a>
          
          <div style={{ display: "flex", justifyContent: "center", gap: 48, marginTop: 48, paddingTop: 32, borderTop: "1px solid rgba(255,255,255,0.1)" }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 28, fontWeight: "bold", color: "#FFD700" }}>4000+</div>
              <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, marginTop: 4 }}>Wanita telah bekerja</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 28, fontWeight: "bold", color: "#FFD700" }}>5+</div>
              <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, marginTop: 4 }}>Tahun berdiri</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 28, fontWeight: "bold", color: "#FFD700" }}>100%</div>
              <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, marginTop: 4 }}>Gaji Transparan</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="tentang" style={{ padding: "80px 20px", backgroundColor: "white" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span style={{ display: "inline-block", backgroundColor: "rgba(0, 51, 102, 0.1)", color: "#003366", padding: "6px 16px", borderRadius: 20, fontSize: 14, marginBottom: 16 }}>Tentang Kami</span>
            <h2 style={{ fontSize: 36, fontWeight: "bold", color: "#003366", marginBottom: 16 }}>Mengapa PT. Andika Pratama?</h2>
            <p style={{ color: "#666", fontSize: 18 }}>Kami adalah mitra terpercaya untuk kontrak kerja premium</p>
          </div>

          <div style={{ display: "flex", gap: 48, alignItems: "center", flexWrap: "wrap" }}>
            <div style={{ flex: 1, minWidth: 300 }}>
              <p style={{ fontSize: 16, color: "#333", lineHeight: 1.8, marginBottom: 24 }}>
                <strong style={{ color: "#003366" }}>PT. ANDIKA PRATAMA</strong> adalah perusahaan yang bergerak di bidang kecerdasan dan penghormatan wanita. Dengan pengalaman bertahun-tahun dan telah dibuktikan ribuan orang sejak tahun 2020.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                <span style={{ display: "flex", alignItems: "center", gap: 8, backgroundColor: "rgba(0, 51, 102, 0.05)", padding: "8px 16px", borderRadius: 20, fontSize: 14, color: "#003366" }}>✓ Berpengalaman</span>
                <span style={{ display: "flex", alignItems: "center", gap: 8, backgroundColor: "rgba(0, 51, 102, 0.05)", padding: "8px 16px", borderRadius: 20, fontSize: 14, color: "#003366" }}>✓ Profesional</span>
                <span style={{ display: "flex", alignItems: "center", gap: 8, backgroundColor: "rgba(0, 51, 102, 0.05)", padding: "8px 16px", borderRadius: 20, fontSize: 14, color: "#003366" }}>✓ Gaji Kompetitif</span>
              </div>
            </div>

            <div style={{ flex: 1, minWidth: 300 }}>
              <div style={{ display: "grid", gap: 16 }}>
                <div style={{ background: "linear-gradient(135deg, #003366 0%, #001a33 100%)", padding: 24, borderRadius: 12, color: "white", position: "relative" }}>
                  <span style={{ position: "absolute", top: 12, right: 12, width: 32, height: 32, backgroundColor: "#FFD700", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", color: "#003366" }}>1</span>
                  <h4 style={{ fontWeight: "bold", fontSize: 18 }}>PENDAFTARAN</h4>
                  <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 14, marginTop: 4 }}>Gratis</p>
                </div>
                <div style={{ background: "linear-gradient(135deg, #003366 0%, #001a33 100%)", padding: 24, borderRadius: 12, color: "white", position: "relative" }}>
                  <span style={{ position: "absolute", top: 12, right: 12, width: 32, height: 32, backgroundColor: "#FFD700", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", color: "#003366" }}>2</span>
                  <h4 style={{ fontWeight: "bold", fontSize: 18 }}>BEKERJA</h4>
                  <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 14, marginTop: 4 }}>Secara Profesional</p>
                </div>
                <div style={{ background: "linear-gradient(135deg, #003366 0%, #001a33 100%)", padding: 24, borderRadius: 12, color: "white", position: "relative" }}>
                  <span style={{ position: "absolute", top: 12, right: 12, width: 32, height: 32, backgroundColor: "#FFD700", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", color: "#003366" }}>3</span>
                  <h4 style={{ fontWeight: "bold", fontSize: 18 }}>TERIMA GAJI</h4>
                  <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 14, marginTop: 4 }}>Ketika Selesai Kontrak</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="layanan" style={{ padding: "80px 20px", backgroundColor: "#F8FAFC" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span style={{ display: "inline-block", backgroundColor: "rgba(255, 215, 0, 0.2)", color: "#003366", padding: "6px 16px", borderRadius: 20, fontSize: 14, marginBottom: 16 }}>Layanan Kami</span>
            <h2 style={{ fontSize: 36, fontWeight: "bold", color: "#003366", marginBottom: 16 }}>Pilihan Kontrak Premium</h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
            {/* Setengah */}
            <div style={{ ...cardStyle, border: "1px solid #e5e7eb" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <div style={{ width: 48, height: 48, backgroundColor: "rgba(0, 51, 102, 0.1)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>⚡</div>
                <div>
                  <h3 style={{ fontWeight: "bold", color: "#003366" }}>Bidang Setengah</h3>
                  <p style={{ fontSize: 14, color: "#666" }}>Kontrak pelayanan cepat</p>
                </div>
              </div>
              <p style={{ color: "#666", marginBottom: 16 }}>Pelayanan yang mudah, cepat dengan gaji fantastis</p>
              {[
                { durasi: "3 Hari", gaji: "Rp 45-65 Juta" },
                { durasi: "7 Hari", gaji: "Rp 170-200 Juta" },
                { durasi: "30 Hari", gaji: "Rp 1-1.5 Miliar" },
              ].map((pkg, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: 12, backgroundColor: "rgba(0, 51, 102, 0.05)", borderRadius: 8, marginBottom: 8 }}>
                  <span style={{ color: "#003366", fontWeight: 500 }}>🕐 {pkg.durasi}</span>
                  <span style={{ color: "#003366", fontWeight: "bold" }}>💰 {pkg.gaji}</span>
                </div>
              ))}
            </div>

            {/* Full */}
            <div style={{ ...cardStyle, border: "2px solid #FFD700", position: "relative" }}>
              <span style={{ position: "absolute", top: 12, right: 12, backgroundColor: "#FFD700", color: "#003366", padding: "4px 12px", borderRadius: 4, fontSize: 12, fontWeight: "bold" }}>Recommended</span>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <div style={{ width: 48, height: 48, background: "linear-gradient(135deg, #FFD700 0%, #E6C200 100%)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>🎯</div>
                <div>
                  <h3 style={{ fontWeight: "bold", color: "#003366" }}>Bidang Full</h3>
                  <p style={{ fontSize: 14, color: "#666" }}>Gaji 3X lipat</p>
                </div>
              </div>
              <p style={{ color: "#666", marginBottom: 16 }}>Sanggup dan profesional, hasil maksimal</p>
              {[
                { durasi: "3 Hari", gaji: "Rp 90-130 Juta" },
                { durasi: "7 Hari", gaji: "Rp 340-400 Juta" },
                { durasi: "30 Hari", gaji: "Rp 2-3 Miliar" },
              ].map((pkg, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: 12, backgroundColor: "rgba(255, 215, 0, 0.1)", borderRadius: 8, marginBottom: 8 }}>
                  <span style={{ color: "#003366", fontWeight: 500 }}>🕐 {pkg.durasi}</span>
                  <span style={{ color: "#003366", fontWeight: "bold" }}>💰 {pkg.gaji}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portofolio" style={{ padding: "80px 20px", backgroundColor: "white" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span style={{ display: "inline-block", backgroundColor: "rgba(0, 51, 102, 0.1)", color: "#003366", padding: "6px 16px", borderRadius: 20, fontSize: 14, marginBottom: 16 }}>Portofolio</span>
            <h2 style={{ fontSize: 36, fontWeight: "bold", color: "#003366", marginBottom: 16 }}>Proyek & Lowongan Terbaru</h2>
            <p style={{ color: "#666", fontSize: 18 }}>Peluang karir premium</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
            {[
              { title: "Pelayanan Setengah Badan", durasi: "3 Hari", gaji: "Rp 45-65 Juta", type: "Setengah" },
              { title: "Pelayanan Badan Penuh", durasi: "30 Hari", gaji: "Rp 2-3 Miliar", type: "Full" },
              { title: "Pelayanan Setengah Badan", durasi: "7 Hari", gaji: "Rp 170-200 Juta", type: "Setengah" },
              { title: "Pelayanan Badan Penuh", durasi: "30 Hari", gaji: "Rp 1.5-2 Miliar", type: "Full" },
              { title: "Pelayanan Badan Penuh", durasi: "7 Hari", gaji: "Rp 340-400 Juta", type: "Full" },
              { title: "Pelayanan Badan Penuh", durasi: "3 Hari", gaji: "Rp 90-130 Juta", type: "Full" },
            ].map((item, i) => (
              <div key={i} style={{ ...cardStyle, border: "1px solid #e5e7eb", padding: 0, overflow: "hidden" }}>
                <div style={{ background: "linear-gradient(to right, #003366, #001a33)", padding: 16, color: "white" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
                    <div>
                      <h3 style={{ fontWeight: "bold" }}>{item.title}</h3>
                      <p style={{ fontSize: 14, opacity: 0.7, marginTop: 4 }}>PT. ANDIKA PRATAMA</p>
                    </div>
                    <span style={{ backgroundColor: item.type === "Full" ? "#FFD700" : "rgba(255,255,255,0.2)", color: item.type === "Full" ? "#003366" : "white", padding: "4px 8px", borderRadius: 4, fontSize: 12 }}>{item.type}</span>
                  </div>
                </div>
                <div style={{ padding: 16 }}>
                  <div style={{ display: "flex", gap: 16, marginBottom: 12 }}>
                    <span style={{ fontSize: 14, color: "#666" }}>📍 Indonesia</span>
                    <span style={{ fontSize: 14, color: "#666" }}>⏱ {item.durasi}</span>
                  </div>
                  <div style={{ backgroundColor: "rgba(0,51,102,0.05)", padding: 12, borderRadius: 8, marginBottom: 12 }}>
                    <span style={{ fontWeight: "bold", color: "#003366" }}>💰 {item.gaji}</span>
                  </div>
                  <a href="#kontak" style={{ display: "block", width: "100%", backgroundColor: "#003366", color: "white", padding: 12, borderRadius: 6, textAlign: "center", textDecoration: "none", fontWeight: 600 }}>Lamar Sekarang</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="kontak" style={{ padding: "80px 20px", backgroundColor: "#F8FAFC" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span style={{ display: "inline-block", backgroundColor: "rgba(255, 215, 0, 0.2)", color: "#003366", padding: "6px 16px", borderRadius: 20, fontSize: 14, marginBottom: 16 }}>Pendaftaran</span>
            <h2 style={{ fontSize: 36, fontWeight: "bold", color: "#003366", marginBottom: 16 }}>Formulir Pendaftaran</h2>
            <p style={{ color: "#666", fontSize: 18 }}>Isi formulir untuk mendaftar</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 32 }}>
            {/* Contact Info */}
            <div style={cardStyle}>
              <h3 style={{ color: "#003366", fontWeight: "bold", marginBottom: 16 }}>Informasi Kontak</h3>
              
              <div style={{ display: "flex", alignItems: "start", gap: 12, marginBottom: 16 }}>
                <div style={{ width: 40, height: 40, backgroundColor: "rgba(0,51,102,0.1)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>📞</div>
                <div>
                  <p style={{ fontWeight: 600, color: "#003366" }}>Telepon</p>
                  <p style={{ color: "#666" }}>+62 852-1557-3737</p>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "start", gap: 12, marginBottom: 16 }}>
                <div style={{ width: 40, height: 40, backgroundColor: "rgba(0,51,102,0.1)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>📧</div>
                <div>
                  <p style={{ fontWeight: 600, color: "#003366" }}>Email</p>
                  <p style={{ color: "#666" }}>info@andikapratama.com</p>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "start", gap: 12, marginBottom: 16 }}>
                <div style={{ width: 40, height: 40, backgroundColor: "rgba(0,51,102,0.1)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>📍</div>
                <div>
                  <p style={{ fontWeight: 600, color: "#003366" }}>Alamat</p>
                  <p style={{ color: "#666" }}>Medan / Banda Aceh, Indonesia</p>
                </div>
              </div>

              <div style={{ backgroundColor: "rgba(0,51,102,0.05)", padding: 16, borderRadius: 8 }}>
                <p style={{ fontWeight: 600, color: "#003366", marginBottom: 4 }}>Jam Operasional</p>
                <p style={{ color: "#666" }}>⏰ Senin - Minggu: 24 Jam</p>
              </div>
            </div>

            {/* Registration Form */}
            <div style={cardStyle}>
              <h3 style={{ color: "#003366", fontWeight: "bold", marginBottom: 16 }}>Form Pendaftaran</h3>
              
              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: 16 }}>
                  <label style={labelStyle}>Nama Lengkap <span style={{ color: "red" }}>*</span></label>
                  <input type="text" name="namaLengkap" value={formData.namaLengkap} onChange={handleInputChange} placeholder="Masukkan nama lengkap" style={inputStyle} required />
                </div>

                <div style={{ marginBottom: 16 }}>
                  <label style={labelStyle}>Nomor HP/WA <span style={{ color: "red" }}>*</span></label>
                  <input type="tel" name="nomorHP" value={formData.nomorHP} onChange={handleInputChange} placeholder="Contoh: 08123456789" style={inputStyle} required />
                </div>

                <div style={{ marginBottom: 16 }}>
                  <label style={labelStyle}>Jenis Layanan <span style={{ color: "red" }}>*</span></label>
                  <select name="jenisLayanan" value={formData.jenisLayanan} onChange={handleInputChange} style={selectStyle} required>
                    <option value="">Pilih Jenis Layanan</option>
                    <option value="Setengah">Pelayanan Setengah Badan</option>
                    <option value="Full">Pelayanan Badan Penuh</option>
                  </select>
                </div>

                <div style={{ marginBottom: 16 }}>
                  <label style={labelStyle}>Durasi Kontrak <span style={{ color: "red" }}>*</span></label>
                  <select name="durasiKontrak" value={formData.durasiKontrak} onChange={handleInputChange} style={selectStyle} required>
                    <option value="">Pilih Durasi</option>
                    <option value="3 Hari">3 Hari</option>
                    <option value="7 Hari">7 Hari</option>
                    <option value="30 Hari">30 Hari</option>
                  </select>
                </div>

                <div style={{ marginBottom: 16 }}>
                  <label style={labelStyle}>Nama Bank <span style={{ color: "red" }}>*</span></label>
                  <select name="namaBank" value={formData.namaBank} onChange={handleInputChange} style={selectStyle} required>
                    <option value="">Pilih Bank</option>
                    <option value="BCA">BCA</option>
                    <option value="Mandiri">Mandiri</option>
                    <option value="BRI">BRI</option>
                    <option value="BNI">BNI</option>
                    <option value="CIMB Niaga">CIMB Niaga</option>
                    <option value="Lainnya">Lainnya</option>
                  </select>
                </div>

                <div style={{ marginBottom: 16 }}>
                  <label style={labelStyle}>Nomor Rekening <span style={{ color: "red" }}>*</span></label>
                  <input type="text" name="nomorRekening" value={formData.nomorRekening} onChange={handleInputChange} placeholder="Masukkan nomor rekening" style={inputStyle} required />
                </div>

                <div style={{ marginBottom: 16 }}>
                  <label style={labelStyle}>Upload Pas Foto <span style={{ color: "red" }}>*</span></label>
                  <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                    <label style={{ flex: 1, border: "2px dashed #d1d5db", borderRadius: 8, padding: 24, textAlign: "center", cursor: "pointer" }}>
                      <input type="file" accept="image/*" onChange={handlePhotoChange} style={{ display: "none" }} required />
                      <span style={{ color: "#9ca3af" }}>{formData.foto ? formData.foto.name : "📷 Klik untuk upload foto"}</span>
                    </label>
                    {photoPreview && <img src={photoPreview} alt="Preview" style={{ width: 80, height: 100, objectFit: "cover", borderRadius: 8, border: "1px solid #e5e7eb" }} />}
                  </div>
                </div>

                <button type="submit" disabled={isSubmitting} style={{ width: "100%", padding: 14, backgroundColor: isSubmitting ? "#9ca3af" : "#003366", color: "white", border: "none", borderRadius: 6, fontSize: 16, fontWeight: 600, cursor: isSubmitting ? "not-allowed" : "pointer" }}>
                  {isSubmitting ? "Memproses..." : "DAFTAR SEKARANG"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: "#001a33", color: "white", padding: "40px 20px", marginTop: "auto" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", textAlign: "center" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 16 }}>
            <div style={{ width: 40, height: 40, backgroundColor: "#FFD700", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", color: "#003366" }}>AP</div>
            <span style={{ fontWeight: "bold", fontSize: 18 }}>PT. ANDIKA PRATAMA</span>
          </div>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, marginBottom: 8 }}>📞 +62 852-1557-3737 | 📧 info@andikapratama.com</p>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, marginBottom: 24 }}>📍 Medan / Banda Aceh, Indonesia</p>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 12 }}>© 2024 PT. ANDIKA PRATAMA. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
