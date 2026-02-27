"use client";

import { useState, useEffect } from "react";

const ADMIN_WHATSAPP = "6285215573737";
const ADMIN_PASSWORD = "AndikaPratama2024";

type TestimoniItem = {
  id: string;
  kategori: string;
  imageUrl: string;
  keterangan: string | null;
  urutan: number;
  aktif: boolean;
};

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

  // Testimoni states
  const [testimoniResmi, setTestimoniResmi] = useState<TestimoniItem[]>([]);
  const [testimoniIlegal, setTestimoniIlegal] = useState<TestimoniItem[]>([]);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [uploadKategori, setUploadKategori] = useState("resmi");
  const [uploadImage, setUploadImage] = useState<string | null>(null);
  const [uploadKeterangan, setUploadKeterangan] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const [formData, setFormData] = useState({
    namaLengkap: "",
    nomorHP: "",
    durasiKontrak: "",
    foto: null as File | null,
    nomorRekening: "",
    namaBank: "",
    jenisLayanan: "",
  });

  // Load testimoni data
  useEffect(() => {
    const loadTestimoni = async () => {
      try {
        const res = await fetch("/api/testimoni");
        const data = await res.json();
        if (data.success) {
          setTestimoniResmi(data.data.filter((t: TestimoniItem) => t.kategori === "resmi" && t.aktif));
          setTestimoniIlegal(data.data.filter((t: TestimoniItem) => t.kategori === "ilegal" && t.aktif));
        }
      } catch (e) {
        console.error("Failed to load testimoni:", e);
      }
    };
    loadTestimoni();
  }, []);

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

  const handleTestimoniImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setUploadImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleAdminLogin = () => {
    if (adminPassword === ADMIN_PASSWORD) {
      setIsAdminLoggedIn(true);
      setToast({ message: "Login admin berhasil!", type: "success" });
    } else {
      setToast({ message: "Password salah!", type: "error" });
    }
  };

  const handleUploadTestimoni = async () => {
    if (!uploadImage) {
      setToast({ message: "Pilih gambar terlebih dahulu!", type: "error" });
      return;
    }

    setIsUploading(true);
    try {
      const res = await fetch("/api/testimoni", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          password: ADMIN_PASSWORD,
          kategori: uploadKategori,
          imageUrl: uploadImage,
          keterangan: uploadKeterangan,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setToast({ message: "Testimoni berhasil diupload!", type: "success" });
        setUploadImage(null);
        setUploadKeterangan("");
        const res2 = await fetch("/api/testimoni");
        const data2 = await res2.json();
        if (data2.success) {
          setTestimoniResmi(data2.data.filter((t: TestimoniItem) => t.kategori === "resmi" && t.aktif));
          setTestimoniIlegal(data2.data.filter((t: TestimoniItem) => t.kategori === "ilegal" && t.aktif));
        }
      } else {
        setToast({ message: data.error || "Gagal mengupload", type: "error" });
      }
    } catch {
      setToast({ message: "Terjadi kesalahan!", type: "error" });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteTestimoni = async (id: string) => {
    if (!confirm("Yakin ingin menghapus testimoni ini?")) return;
    
    try {
      const res = await fetch(`/api/testimoni?id=${id}&password=${ADMIN_PASSWORD}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setToast({ message: "Testimoni berhasil dihapus!", type: "success" });
        const res2 = await fetch("/api/testimoni");
        const data2 = await res2.json();
        if (data2.success) {
          setTestimoniResmi(data2.data.filter((t: TestimoniItem) => t.kategori === "resmi" && t.aktif));
          setTestimoniIlegal(data2.data.filter((t: TestimoniItem) => t.kategori === "ilegal" && t.aktif));
        }
      }
    } catch {
      setToast({ message: "Gagal menghapus!", type: "error" });
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
                <span style={{ display: "none" }}>PT. ANDIKA PRATAMA</span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <div style={{ display: "none", alignItems: "center" }}>
              <a href="#beranda" style={{ color: isScrolled ? "#003366" : "white", textDecoration: "none", fontWeight: 500, fontSize: 14, marginLeft: 24, display: "flex", alignItems: "center", gap: 6 }}>
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L8.354 1.146z"/></svg>
                Beranda
              </a>
              <a href="#tentang" style={{ color: isScrolled ? "#003366" : "white", textDecoration: "none", fontWeight: 500, fontSize: 14, marginLeft: 24, display: "flex", alignItems: "center", gap: 6 }}>
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/></svg>
                Tentang
              </a>
              <a href="#layanan" style={{ color: isScrolled ? "#003366" : "white", textDecoration: "none", fontWeight: 500, fontSize: 14, marginLeft: 24, display: "flex", alignItems: "center", gap: 6 }}>
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"/></svg>
                Layanan
              </a>
              <a href="#portofolio" style={{ color: isScrolled ? "#003366" : "white", textDecoration: "none", fontWeight: 500, fontSize: 14, marginLeft: 24, display: "flex", alignItems: "center", gap: 6 }}>
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/><path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/></svg>
                Portofolio
              </a>
              <a href="#testimoni" style={{ color: isScrolled ? "#003366" : "white", textDecoration: "none", fontWeight: 500, fontSize: 14, marginLeft: 24, display: "flex", alignItems: "center", gap: 6 }}>
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5z"/><path d="M10 8a2 2 0 1 1-4 0V3a2 2 0 1 1 4 0v5zM8 0a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V3a3 3 0 0 0-3-3z"/></svg>
                Testimoni
              </a>
              <a href="#kontak" style={{ color: isScrolled ? "#003366" : "white", textDecoration: "none", fontWeight: 500, fontSize: 14, marginLeft: 24, display: "flex", alignItems: "center", gap: 6 }}>
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z"/></svg>
                Kontak
              </a>
              <a href="#kontak" style={{ backgroundColor: "#FFD700", color: "#003366", padding: "10px 20px", borderRadius: 6, textDecoration: "none", fontWeight: 600, fontSize: 14, marginLeft: 24, display: "flex", alignItems: "center", gap: 6 }}>
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/></svg>
                Hubungi Kami
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{ background: "none", border: "none", cursor: "pointer", color: isScrolled ? "#003366" : "white", fontSize: 24, padding: 8 }}>
              {mobileMenuOpen ? "✕" : "☰"}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div style={{ backgroundColor: "white", padding: 16, borderRadius: 8, marginTop: 8 }}>
              <a href="#beranda" onClick={() => setMobileMenuOpen(false)} style={{ display: "block", color: "#003366", textDecoration: "none", padding: "12px 0", fontWeight: 500, fontSize: 14, borderBottom: "1px solid #f3f4f6" }}>🏠 Beranda</a>
              <a href="#tentang" onClick={() => setMobileMenuOpen(false)} style={{ display: "block", color: "#003366", textDecoration: "none", padding: "12px 0", fontWeight: 500, fontSize: 14, borderBottom: "1px solid #f3f4f6" }}>ℹ️ Tentang Kami</a>
              <a href="#layanan" onClick={() => setMobileMenuOpen(false)} style={{ display: "block", color: "#003366", textDecoration: "none", padding: "12px 0", fontWeight: 500, fontSize: 14, borderBottom: "1px solid #f3f4f6" }}>📑 Layanan</a>
              <a href="#portofolio" onClick={() => setMobileMenuOpen(false)} style={{ display: "block", color: "#003366", textDecoration: "none", padding: "12px 0", fontWeight: 500, fontSize: 14, borderBottom: "1px solid #f3f4f6" }}>📋 Portofolio</a>
              <a href="#testimoni" onClick={() => setMobileMenuOpen(false)} style={{ display: "block", color: "#003366", textDecoration: "none", padding: "12px 0", fontWeight: 500, fontSize: 14, borderBottom: "1px solid #f3f4f6" }}>🎤 Testimoni</a>
              <a href="#kontak" onClick={() => setMobileMenuOpen(false)} style={{ display: "block", color: "#003366", textDecoration: "none", padding: "12px 0", fontWeight: 500, fontSize: 14 }}>✉️ Kontak</a>
              <a href="#kontak" onClick={() => setMobileMenuOpen(false)} style={{ display: "block", backgroundColor: "#FFD700", color: "#003366", padding: "12px", borderRadius: 6, textDecoration: "none", fontWeight: 600, textAlign: "center", marginTop: 12, fontSize: 14 }}>➕ Hubungi Kami</a>
            </div>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <section id="beranda" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, #003366 0%, #001a33 50%, #000000 100%)", padding: "80px 16px 40px", position: "relative" }}>
        <div style={{ maxWidth: 800, width: "100%", textAlign: "center", padding: "0 8px" }}>
          <span style={{ display: "inline-block", backgroundColor: "rgba(255, 215, 0, 0.2)", color: "#FFD700", padding: "6px 16px", borderRadius: 20, fontSize: 12, marginBottom: 20 }}>✨ Pendaftaran Gratis</span>
          <h1 style={{ fontSize: "clamp(1.5rem, 5vw, 2.5rem)", fontWeight: "bold", color: "white", marginBottom: 20, lineHeight: 1.3, padding: "0 8px" }}>
            PT. ANDIKA PRATAMA: <span style={{ color: "#FFD700" }}>Solusi Kerja dengan penghasilan tertinggi di dunia</span> hanya dalam beberapa hari
          </h1>
          <p style={{ fontSize: "clamp(0.875rem, 2.5vw, 1rem)", color: "rgba(255,255,255,0.8)", marginBottom: 28, maxWidth: 600, marginLeft: "auto", marginRight: "auto", padding: "0 8px" }}>
            Pendaftaran Gratis – Kontrak Langsung, Gaji Transparan untuk Para Wanita yg menganggap mereka berharga
          </p>
          <a href="#kontak" style={{ display: "inline-block", backgroundColor: "#FFD700", color: "#003366", padding: "14px 32px", borderRadius: 6, textDecoration: "none", fontWeight: 600, fontSize: "clamp(0.875rem, 2vw, 1rem)" }}>🚀 HUBUNGI KAMI →</a>
          
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 24, marginTop: 40, paddingTop: 28, borderTop: "1px solid rgba(255,255,255,0.1)" }}>
            <div style={{ textAlign: "center", flex: "1 1 80px", minWidth: 80 }}>
              <div style={{ fontSize: 28, marginBottom: 4 }}>👩‍💼</div>
              <div style={{ fontSize: "clamp(1.25rem, 4vw, 1.75rem)", fontWeight: "bold", color: "#FFD700" }}>4000+</div>
              <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "clamp(0.625rem, 2vw, 0.75rem)", marginTop: 2 }}>Wanita telah bekerja</div>
            </div>
            <div style={{ textAlign: "center", flex: "1 1 80px", minWidth: 80 }}>
              <div style={{ fontSize: 28, marginBottom: 4 }}>🏆</div>
              <div style={{ fontSize: "clamp(1.25rem, 4vw, 1.75rem)", fontWeight: "bold", color: "#FFD700" }}>5+</div>
              <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "clamp(0.625rem, 2vw, 0.75rem)", marginTop: 2 }}>Tahun berdiri</div>
            </div>
            <div style={{ textAlign: "center", flex: "1 1 80px", minWidth: 80 }}>
              <div style={{ fontSize: 28, marginBottom: 4 }}>💰</div>
              <div style={{ fontSize: "clamp(1.25rem, 4vw, 1.75rem)", fontWeight: "bold", color: "#FFD700" }}>100%</div>
              <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "clamp(0.625rem, 2vw, 0.75rem)", marginTop: 2 }}>Gaji Transparan</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="tentang" style={{ padding: "60px 16px", backgroundColor: "white" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <span style={{ display: "inline-block", backgroundColor: "rgba(0, 51, 102, 0.1)", color: "#003366", padding: "6px 16px", borderRadius: 20, fontSize: 12, marginBottom: 12 }}>ℹ️ Tentang Kami</span>
            <h2 style={{ fontSize: "clamp(1.5rem, 4vw, 2rem)", fontWeight: "bold", color: "#003366", marginBottom: 12 }}>Mengapa PT. Andika Pratama?</h2>
            <p style={{ color: "#666", fontSize: "clamp(0.875rem, 2.5vw, 1rem)" }}>Kami adalah mitra terpercaya untuk kontrak kerja premium</p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 32, alignItems: "center" }}>
            <div style={{ width: "100%" }}>
              <p style={{ fontSize: "clamp(0.875rem, 2vw, 1rem)", color: "#333", lineHeight: 1.8, marginBottom: 20, textAlign: "center" }}>
                <strong style={{ color: "#003366" }}>PT. ANDIKA PRATAMA</strong> adalah perusahaan yang bergerak di bidang kecerdasan dan penghormatan wanita. Dengan pengalaman bertahun-tahun dan telah dibuktikan ribuan orang sejak tahun 2020.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 8 }}>
                <span style={{ display: "flex", alignItems: "center", gap: 6, backgroundColor: "rgba(0, 51, 102, 0.05)", padding: "8px 14px", borderRadius: 20, fontSize: 13, color: "#003366" }}>
                  <svg width="16" height="16" fill="#10B981" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/></svg>
                  ✅ Berpengalaman
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: 6, backgroundColor: "rgba(0, 51, 102, 0.05)", padding: "8px 14px", borderRadius: 20, fontSize: 13, color: "#003366" }}>
                  <svg width="16" height="16" fill="#10B981" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/></svg>
                  ✅ Profesional
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: 6, backgroundColor: "rgba(0, 51, 102, 0.05)", padding: "8px 14px", borderRadius: 20, fontSize: 13, color: "#003366" }}>
                  <svg width="16" height="16" fill="#10B981" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/></svg>
                  ✅ Gaji Kompetitif
                </span>
              </div>
            </div>

            <div style={{ width: "100%", maxWidth: 400 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ background: "linear-gradient(135deg, #003366 0%, #001a33 100%)", padding: 20, borderRadius: 12, color: "white", position: "relative", display: "flex", alignItems: "center", gap: 16 }}>
                  <div style={{ width: 48, height: 48, backgroundColor: "#FFD700", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>📝</div>
                  <div>
                    <h4 style={{ fontWeight: "bold", fontSize: 16 }}>PENDAFTARAN</h4>
                    <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 13, marginTop: 2 }}>Gratis & Mudah</p>
                  </div>
                </div>
                <div style={{ background: "linear-gradient(135deg, #003366 0%, #001a33 100%)", padding: 20, borderRadius: 12, color: "white", position: "relative", display: "flex", alignItems: "center", gap: 16 }}>
                  <div style={{ width: 48, height: 48, backgroundColor: "#FFD700", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>💼</div>
                  <div>
                    <h4 style={{ fontWeight: "bold", fontSize: 16 }}>BEKERJA</h4>
                    <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 13, marginTop: 2 }}>Secara Profesional</p>
                  </div>
                </div>
                <div style={{ background: "linear-gradient(135deg, #003366 0%, #001a33 100%)", padding: 20, borderRadius: 12, color: "white", position: "relative", display: "flex", alignItems: "center", gap: 16 }}>
                  <div style={{ width: 48, height: 48, backgroundColor: "#FFD700", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>💵</div>
                  <div>
                    <h4 style={{ fontWeight: "bold", fontSize: 16 }}>TERIMA GAJI</h4>
                    <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 13, marginTop: 2 }}>Selesai Kontrak</p>
                  </div>
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
            <span style={{ display: "inline-block", backgroundColor: "rgba(255, 215, 0, 0.2)", color: "#003366", padding: "6px 16px", borderRadius: 20, fontSize: 12, marginBottom: 12 }}>📑 Layanan Kami</span>
            <h2 style={{ fontSize: "clamp(1.5rem, 4vw, 2rem)", fontWeight: "bold", color: "#003366", marginBottom: 12 }}>Pilihan Kontrak Premium</h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {/* Setengah */}
            <div style={{ backgroundColor: "white", borderRadius: 12, padding: 20, boxShadow: "0 4px 12px rgba(0,0,0,0.1)", border: "1px solid #e5e7eb" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <div style={{ width: 48, height: 48, background: "linear-gradient(135deg, #003366 0%, #001a33 100%)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="24" height="24" fill="#FFD700" viewBox="0 0 16 16"><path d="M11.251.068a.5.5 0 0 1 .227.58L9.677 6.5H13a.5.5 0 0 1 .364.843l-8 8.5a.5.5 0 0 1-.842-.49L6.323 9.5H3a.5.5 0 0 1-.364-.843l8-8.5a.5.5 0 0 1 .615-.09z"/></svg>
                </div>
                <div>
                  <h3 style={{ fontWeight: "bold", color: "#003366", fontSize: 16 }}>⚡ Bidang Setengah</h3>
                  <p style={{ fontSize: 13, color: "#666" }}>Kontrak pelayanan cepat</p>
                </div>
              </div>
              <p style={{ color: "#666", marginBottom: 16, fontSize: 14 }}>Pelayanan yang mudah, cepat dengan gaji fantastis</p>
              {[
                { durasi: "3 Hari", gaji: "Rp 45-65 Juta" },
                { durasi: "7 Hari", gaji: "Rp 170-200 Juta" },
                { durasi: "30 Hari", gaji: "Rp 1-1.5 Miliar" },
              ].map((pkg, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: 12, backgroundColor: "rgba(0, 51, 102, 0.05)", borderRadius: 8, marginBottom: 8 }}>
                  <span style={{ color: "#003366", fontWeight: 500, fontSize: 13, display: "flex", alignItems: "center", gap: 6 }}>
                    <svg width="14" height="14" fill="#003366" viewBox="0 0 16 16"><path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/><path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/></svg>
                    {pkg.durasi}
                  </span>
                  <span style={{ color: "#003366", fontWeight: "bold", fontSize: 13, display: "flex", alignItems: "center", gap: 4 }}>💰 {pkg.gaji}</span>
                </div>
              ))}
            </div>

            {/* Full */}
            <div style={{ backgroundColor: "white", borderRadius: 12, padding: 20, boxShadow: "0 4px 12px rgba(0,0,0,0.1)", border: "2px solid #FFD700", position: "relative" }}>
              <span style={{ position: "absolute", top: 12, right: 12, backgroundColor: "#FFD700", color: "#003366", padding: "4px 10px", borderRadius: 4, fontSize: 11, fontWeight: "bold", display: "flex", alignItems: "center", gap: 4 }}>
                ⭐ Recommended
              </span>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <div style={{ width: 48, height: 48, background: "linear-gradient(135deg, #FFD700 0%, #E6C200 100%)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="24" height="24" fill="#003366" viewBox="0 0 16 16"><path d="M8 0c-.176 0-.35.006-.523.017l.064.998a7.117 7.117 0 0 1 .918 0l.064-.998A8.113 8.113 0 0 0 8 0zM6.61 1.121l-.224-.975a8.067 8.067 0 0 0-1.027.297l.364.931c.28-.11.579-.193.887-.253zM4.58 1.987l-.487-.873a8.074 8.074 0 0 0-.91.51l.56.83a7.11 7.11 0 0 1 .837-.467zM2.96 3.314l-.758-.652a8.09 8.09 0 0 0-.72.758l.814.58c.189-.249.41-.482.665-.686zM1.606 4.874l-.938-.348a8.05 8.05 0 0 0-.433.983l.945.33c.114-.334.258-.657.426-.965zm-.887 1.835L0 6.616v1l.719-.093a7.129 7.129 0 0 1 0-.814zM0 8.384v1l.719.093a7.129 7.129 0 0 1 0-.814L0 8.384zm.334 1.874-.945.33c.105.339.248.665.425.982l.938-.348a6.808 6.808 0 0 1-.418-.964zm.9 1.69-.814.58c.22.28.458.547.72.758l.757-.653a6.126 6.126 0 0 1-.663-.685zm1.37 1.31-.56.83c.29.196.596.367.91.51l.487-.873a6.107 6.107 0 0 1-.837-.468zm1.653.87-.364.93c.333.12.677.218 1.027.297l.224-.975a6.163 6.163 0 0 1-.887-.253zm1.829.4-.064.998c.173.011.347.017.523.017.176 0 .35-.006.523-.017l-.064-.998a7.117 7.117 0 0 1-.918 0zm1.814-.4.224.975c.35-.08.693-.177 1.027-.297l-.364-.93a6.163 6.163 0 0 1-.887.253zm1.706-.77.487.873c.314-.143.62-.314.91-.51l-.56-.83a6.107 6.107 0 0 1-.837.468zm1.45-1.148.757.653c.262-.211.5-.478.72-.758l-.814-.58a6.126 6.126 0 0 1-.663.685zm1.11-1.582.938.348c.177-.317.32-.643.425-.982l-.945-.33a6.808 6.808 0 0 1-.418.964zm.71-1.9.719.093v-1l-.719.093a7.129 7.129 0 0 1 0 .814z"/></svg>
                </div>
                <div>
                  <h3 style={{ fontWeight: "bold", color: "#003366", fontSize: 16 }}>🎯 Bidang Full</h3>
                  <p style={{ fontSize: 13, color: "#666" }}>Gaji 3X lipat</p>
                </div>
              </div>
              <p style={{ color: "#666", marginBottom: 16, fontSize: 14 }}>Sanggup dan profesional, hasil maksimal</p>
              {[
                { durasi: "3 Hari", gaji: "Rp 90-130 Juta" },
                { durasi: "7 Hari", gaji: "Rp 340-400 Juta" },
                { durasi: "30 Hari", gaji: "Rp 2-3 Miliar" },
              ].map((pkg, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: 12, backgroundColor: "rgba(255, 215, 0, 0.1)", borderRadius: 8, marginBottom: 8 }}>
                  <span style={{ color: "#003366", fontWeight: 500, fontSize: 13, display: "flex", alignItems: "center", gap: 6 }}>
                    <svg width="14" height="14" fill="#003366" viewBox="0 0 16 16"><path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/><path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/></svg>
                    {pkg.durasi}
                  </span>
                  <span style={{ color: "#003366", fontWeight: "bold", fontSize: 13, display: "flex", alignItems: "center", gap: 4 }}>💰 {pkg.gaji}</span>
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
            <span style={{ display: "inline-block", backgroundColor: "rgba(0, 51, 102, 0.1)", color: "#003366", padding: "6px 16px", borderRadius: 20, fontSize: 12, marginBottom: 12 }}>📋 Portofolio</span>
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
                  <a href="#kontak" style={{ display: "block", width: "100%", backgroundColor: "#003366", color: "white", padding: 10, borderRadius: 6, textAlign: "center", textDecoration: "none", fontWeight: 600, fontSize: 13 }}>🚀 Lamar Sekarang</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimoni Section */}
      <section id="testimoni" style={{ padding: "60px 16px", backgroundColor: "#F8FAFC" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <span style={{ display: "inline-block", backgroundColor: "rgba(255, 215, 0, 0.2)", color: "#003366", padding: "6px 16px", borderRadius: 20, fontSize: 12, marginBottom: 12 }}>🎤 Testimoni</span>
            <h2 style={{ fontSize: "clamp(1.5rem, 4vw, 2rem)", fontWeight: "bold", color: "#003366", marginBottom: 12 }}>Bukti & Data Pekerja</h2>
            <p style={{ color: "#666", fontSize: "clamp(0.875rem, 2.5vw, 1rem)" }}>Testimoni nyata dan statistik pekerja kami</p>
          </div>

          {/* Data Grafik */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24, marginBottom: 40 }}>
            {/* Status Pekerja Chart */}
            <div style={{ backgroundColor: "white", borderRadius: 12, padding: 24, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
              <h3 style={{ color: "#003366", fontWeight: "bold", marginBottom: 20, fontSize: 16, textAlign: "center" }}>📊 Status Pekerja</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  { label: "Mahasiswi/Pekerja", value: 43, color: "#003366" },
                  { label: "Siswi SMA/SMK/MAN", value: 35, color: "#FFD700" },
                  { label: "Siswi SMP/MTsn", value: 15, color: "#10B981" },
                  { label: "IRT/Janda", value: 7, color: "#F59E0B" },
                ].map((item, i) => (
                  <div key={i}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                      <span style={{ fontSize: 13, color: "#333" }}>{item.label}</span>
                      <span style={{ fontSize: 13, fontWeight: "bold", color: "#003366" }}>{item.value}%</span>
                    </div>
                    <div style={{ width: "100%", height: 20, backgroundColor: "#E5E7EB", borderRadius: 10, overflow: "hidden" }}>
                      <div style={{ width: `${item.value}%`, height: "100%", backgroundColor: item.color, borderRadius: 10, transition: "width 0.5s ease" }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Daerah Chart */}
            <div style={{ backgroundColor: "white", borderRadius: 12, padding: 24, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
              <h3 style={{ color: "#003366", fontWeight: "bold", marginBottom: 20, fontSize: 16, textAlign: "center" }}>📍 Daerah Asal Pekerja</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  { label: "ACEH", value: 43, color: "#003366" },
                  { label: "MEDAN", value: 29, color: "#FFD700" },
                  { label: "PADANG", value: 17, color: "#10B981" },
                  { label: "Daerah Lain", value: 11, color: "#F59E0B" },
                ].map((item, i) => (
                  <div key={i}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                      <span style={{ fontSize: 13, color: "#333" }}>{item.label}</span>
                      <span style={{ fontSize: 13, fontWeight: "bold", color: "#003366" }}>{item.value}%</span>
                    </div>
                    <div style={{ width: "100%", height: 20, backgroundColor: "#E5E7EB", borderRadius: 10, overflow: "hidden" }}>
                      <div style={{ width: `${item.value}%`, height: "100%", backgroundColor: item.color, borderRadius: 10, transition: "width 0.5s ease" }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Testimoni Gajian */}
          <div style={{ marginBottom: 32 }}>
            <h3 style={{ color: "#003366", fontWeight: "bold", marginBottom: 16, fontSize: 18, textAlign: "center" }}>💰 Testimoni Gajian</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
              {testimoniResmi.length > 0 ? testimoniResmi.map((item) => (
                <div key={item.id} style={{ position: "relative", borderRadius: 8, overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
                  <img src={item.imageUrl} alt={item.keterangan || "Testimoni Gajian"} style={{ width: "100%", height: 200, objectFit: "cover" }} />
                  {item.keterangan && (
                    <div style={{ padding: 8, backgroundColor: "rgba(0,51,102,0.9)", color: "white", fontSize: 12 }}>{item.keterangan}</div>
                  )}
                  {isAdminLoggedIn && (
                    <button 
                      onClick={() => handleDeleteTestimoni(item.id)}
                      style={{ position: "absolute", top: 8, right: 8, backgroundColor: "#EF4444", color: "white", border: "none", borderRadius: 4, padding: "4px 8px", fontSize: 12, cursor: "pointer" }}
                    >
                      🗑️ Hapus
                    </button>
                  )}
                </div>
              )) : (
                <p style={{ textAlign: "center", color: "#9CA3AF", fontSize: 13, gridColumn: "1/-1" }}>📸 * Belum ada testimoni gajian yang diupload</p>
              )}
            </div>
          </div>

          {/* Bukti Legal/Resmi */}
          <div>
            <h3 style={{ color: "#003366", fontWeight: "bold", marginBottom: 16, fontSize: 18, textAlign: "center" }}>✅ Bukti Legal/Resmi</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
              {testimoniIlegal.length > 0 ? testimoniIlegal.map((item) => (
                <div key={item.id} style={{ position: "relative", borderRadius: 8, overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
                  <img src={item.imageUrl} alt={item.keterangan || "Bukti Legal"} style={{ width: "100%", height: 200, objectFit: "cover" }} />
                  {item.keterangan && (
                    <div style={{ padding: 8, backgroundColor: "rgba(16,185,129,0.9)", color: "white", fontSize: 12 }}>{item.keterangan}</div>
                  )}
                  {isAdminLoggedIn && (
                    <button 
                      onClick={() => handleDeleteTestimoni(item.id)}
                      style={{ position: "absolute", top: 8, right: 8, backgroundColor: "#EF4444", color: "white", border: "none", borderRadius: 4, padding: "4px 8px", fontSize: 12, cursor: "pointer" }}
                    >
                      🗑️ Hapus
                    </button>
                  )}
                </div>
              )) : (
                <p style={{ textAlign: "center", color: "#9CA3AF", fontSize: 13, gridColumn: "1/-1" }}>📸 * Belum ada bukti legal/resmi yang diupload</p>
              )}
            </div>
          </div>

          {/* Hidden Admin Access */}
          <div style={{ textAlign: "center", marginTop: 16 }}>
            <button 
              onClick={() => setShowAdminModal(true)}
              style={{ 
                backgroundColor: "transparent", 
                color: "#D1D5DB", 
                padding: "4px 8px", 
                border: "none", 
                borderRadius: 4, 
                fontSize: 10, 
                cursor: "pointer",
                opacity: 0.4,
                transition: "opacity 0.3s"
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = "1"}
              onMouseLeave={(e) => e.currentTarget.style.opacity = "0.4"}
              title="Admin Access"
            >
              🔒
            </button>
          </div>
        </div>
      </section>

      {/* Admin Modal */}
      {showAdminModal && (
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
          <div style={{ backgroundColor: "white", borderRadius: 12, maxWidth: 500, width: "100%", maxHeight: "90vh", overflow: "auto", position: "relative" }}>
            <button onClick={() => { setShowAdminModal(false); setIsAdminLoggedIn(false); setAdminPassword(""); }} style={{ position: "absolute", top: 16, right: 16, background: "#f3f4f6", border: "none", borderRadius: "50%", width: 32, height: 32, cursor: "pointer", fontSize: 18 }}>✕</button>
            
            <div style={{ padding: 24 }}>
              <h2 style={{ fontSize: 18, fontWeight: "bold", color: "#003366", marginBottom: 20, textAlign: "center" }}>🔐 Admin Panel</h2>

              {!isAdminLoggedIn ? (
                <div>
                  <label style={{ display: "block", marginBottom: 8, fontWeight: 500, color: "#003366", fontSize: 14 }}>🔑 Password Admin</label>
                  <input 
                    type="password" 
                    value={adminPassword} 
                    onChange={(e) => setAdminPassword(e.target.value)} 
                    placeholder="Masukkan password admin"
                    style={{ width: "100%", padding: 12, border: "1px solid #e5e7eb", borderRadius: 6, fontSize: 14, outline: "none", boxSizing: "border-box", marginBottom: 16 }}
                  />
                  <button 
                    onClick={handleAdminLogin}
                    style={{ width: "100%", padding: 14, backgroundColor: "#003366", color: "white", border: "none", borderRadius: 6, fontSize: 14, fontWeight: 600, cursor: "pointer" }}
                  >
                    🚀 Login
                  </button>
                </div>
              ) : (
                <div>
                  <p style={{ color: "#10B981", fontSize: 14, marginBottom: 20, textAlign: "center" }}>✅ Login berhasil! Anda dapat mengupload testimoni.</p>
                  
                  <div style={{ marginBottom: 16 }}>
                    <label style={{ display: "block", marginBottom: 8, fontWeight: 500, color: "#003366", fontSize: 14 }}>📁 Kategori</label>
                    <select 
                      value={uploadKategori} 
                      onChange={(e) => setUploadKategori(e.target.value)}
                      style={{ width: "100%", padding: 12, border: "1px solid #e5e7eb", borderRadius: 6, fontSize: 14, outline: "none", backgroundColor: "white", boxSizing: "border-box" }}
                    >
                      <option value="resmi">💰 Testimoni Gajian</option>
                      <option value="ilegal">✅ Bukti Legal/Resmi</option>
                    </select>
                  </div>

                  <div style={{ marginBottom: 16 }}>
                    <label style={{ display: "block", marginBottom: 8, fontWeight: 500, color: "#003366", fontSize: 14 }}>🖼️ Upload Gambar</label>
                    <label style={{ display: "block", border: "2px dashed #d1d5db", borderRadius: 8, padding: 20, textAlign: "center", cursor: "pointer" }}>
                      <input type="file" accept="image/*" onChange={handleTestimoniImageChange} style={{ display: "none" }} />
                      {uploadImage ? (
                        <img src={uploadImage} alt="Preview" style={{ maxWidth: "100%", maxHeight: 150, objectFit: "contain" }} />
                      ) : (
                        <span style={{ color: "#9ca3af", fontSize: 13 }}>📷 Klik untuk upload gambar</span>
                      )}
                    </label>
                  </div>

                  <div style={{ marginBottom: 16 }}>
                    <label style={{ display: "block", marginBottom: 8, fontWeight: 500, color: "#003366", fontSize: 14 }}>📝 Keterangan (Opsional)</label>
                    <input 
                      type="text" 
                      value={uploadKeterangan} 
                      onChange={(e) => setUploadKeterangan(e.target.value)} 
                      placeholder="Contoh: Transfer gaji pekerja tanggal..."
                      style={{ width: "100%", padding: 12, border: "1px solid #e5e7eb", borderRadius: 6, fontSize: 14, outline: "none", boxSizing: "border-box" }}
                    />
                  </div>

                  <button 
                    onClick={handleUploadTestimoni}
                    disabled={isUploading || !uploadImage}
                    style={{ width: "100%", padding: 14, backgroundColor: isUploading || !uploadImage ? "#9ca3af" : "#003366", color: "white", border: "none", borderRadius: 6, fontSize: 14, fontWeight: 600, cursor: isUploading || !uploadImage ? "not-allowed" : "pointer" }}
                  >
                    {isUploading ? "⏳ Mengupload..." : "📤 Upload Testimoni"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Contact Section */}
      <section id="kontak" style={{ padding: "60px 16px", backgroundColor: "#F8FAFC" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <span style={{ display: "inline-block", backgroundColor: "rgba(255, 215, 0, 0.2)", color: "#003366", padding: "6px 16px", borderRadius: 20, fontSize: 12, marginBottom: 12 }}>📝 Pendaftaran</span>
            <h2 style={{ fontSize: "clamp(1.5rem, 4vw, 2rem)", fontWeight: "bold", color: "#003366", marginBottom: 12 }}>Formulir Pendaftaran</h2>
            <p style={{ color: "#666", fontSize: "clamp(0.875rem, 2.5vw, 1rem)" }}>Isi formulir untuk mendaftar</p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {/* Contact Info */}
            <div style={{ backgroundColor: "white", borderRadius: 12, padding: 20, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
              <h3 style={{ color: "#003366", fontWeight: "bold", marginBottom: 16, fontSize: 16 }}>📞 Informasi Kontak</h3>
              
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
                  <p style={{ fontWeight: 600, color: "#003366", marginBottom: 4, fontSize: 14 }}>⏰ Jam Operasional</p>
                  <p style={{ color: "#666", fontSize: 13 }}>Senin - Minggu: 24 Jam</p>
                </div>
              </div>
            </div>

            {/* Registration Form */}
            <div style={{ backgroundColor: "white", borderRadius: 12, padding: 20, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
              <h3 style={{ color: "#003366", fontWeight: "bold", marginBottom: 16, fontSize: 16 }}>📋 Form Pendaftaran</h3>
              
              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: 14 }}>
                  <label style={{ display: "block", marginBottom: 6, fontWeight: 500, color: "#003366", fontSize: 13 }}>👤 Nama Lengkap <span style={{ color: "red" }}>*</span></label>
                  <input type="text" name="namaLengkap" value={formData.namaLengkap} onChange={handleInputChange} placeholder="Masukkan nama lengkap" style={{ width: "100%", padding: 12, border: "1px solid #e5e7eb", borderRadius: 6, fontSize: 14, outline: "none", boxSizing: "border-box" }} required />
                </div>

                <div style={{ marginBottom: 14 }}>
                  <label style={{ display: "block", marginBottom: 6, fontWeight: 500, color: "#003366", fontSize: 13 }}>📱 Nomor HP/WA <span style={{ color: "red" }}>*</span></label>
                  <input type="tel" name="nomorHP" value={formData.nomorHP} onChange={handleInputChange} placeholder="Contoh: 08123456789" style={{ width: "100%", padding: 12, border: "1px solid #e5e7eb", borderRadius: 6, fontSize: 14, outline: "none", boxSizing: "border-box" }} required />
                </div>

                <div style={{ display: "flex", gap: 12, marginBottom: 14, flexWrap: "wrap" }}>
                  <div style={{ flex: "1 1 140px", minWidth: 140 }}>
                    <label style={{ display: "block", marginBottom: 6, fontWeight: 500, color: "#003366", fontSize: 13 }}>📑 Jenis Layanan <span style={{ color: "red" }}>*</span></label>
                    <select name="jenisLayanan" value={formData.jenisLayanan} onChange={handleInputChange} style={{ width: "100%", padding: 12, border: "1px solid #e5e7eb", borderRadius: 6, fontSize: 14, outline: "none", backgroundColor: "white", boxSizing: "border-box" }} required>
                      <option value="">Pilih Layanan</option>
                      <option value="Setengah">Setengah Badan</option>
                      <option value="Full">Badan Penuh</option>
                    </select>
                  </div>

                  <div style={{ flex: "1 1 140px", minWidth: 140 }}>
                    <label style={{ display: "block", marginBottom: 6, fontWeight: 500, color: "#003366", fontSize: 13 }}>⏱️ Durasi <span style={{ color: "red" }}>*</span></label>
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
                    <label style={{ display: "block", marginBottom: 6, fontWeight: 500, color: "#003366", fontSize: 13 }}>🏦 Nama Bank <span style={{ color: "red" }}>*</span></label>
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
                    <label style={{ display: "block", marginBottom: 6, fontWeight: 500, color: "#003366", fontSize: 13 }}>💳 No. Rekening <span style={{ color: "red" }}>*</span></label>
                    <input type="text" name="nomorRekening" value={formData.nomorRekening} onChange={handleInputChange} placeholder="No. Rek" style={{ width: "100%", padding: 12, border: "1px solid #e5e7eb", borderRadius: 6, fontSize: 14, outline: "none", boxSizing: "border-box" }} required />
                  </div>
                </div>

                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: "block", marginBottom: 6, fontWeight: 500, color: "#003366", fontSize: 13 }}>📷 Upload Pas Foto <span style={{ color: "red" }}>*</span></label>
                  <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
                    <label style={{ flex: 1, border: "2px dashed #d1d5db", borderRadius: 8, padding: 20, textAlign: "center", cursor: "pointer", minWidth: 150 }}>
                      <input type="file" accept="image/*" onChange={handlePhotoChange} style={{ display: "none" }} required />
                      <span style={{ color: "#9ca3af", fontSize: 13 }}>📸 {formData.foto ? formData.foto.name : "Klik untuk upload foto"}</span>
                    </label>
                    {photoPreview && <img src={photoPreview} alt="Preview" style={{ width: 70, height: 90, objectFit: "cover", borderRadius: 8, border: "1px solid #e5e7eb" }} />}
                  </div>
                </div>

                <button type="submit" disabled={isSubmitting} style={{ width: "100%", padding: 14, backgroundColor: isSubmitting ? "#9ca3af" : "#003366", color: "white", border: "none", borderRadius: 6, fontSize: 14, fontWeight: 600, cursor: isSubmitting ? "not-allowed" : "pointer" }}>
                  {isSubmitting ? "⏳ Memproses..." : "🚀 DAFTAR SEKARANG"}
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
          header nav > div > a > div > span {
            display: inline !important;
          }
          
          header nav > div > div:first-of-type {
            display: flex !important;
          }
          
          header nav > div > button {
            display: none !important;
          }
          
          #tentang > div > div:last-child {
            flex-direction: row;
            align-items: flex-start;
          }
          
          #tentang > div > div:last-child > div:first-child {
            text-align: left;
          }
          
          #tentang > div > div:last-child > div:last-child {
            max-width: none;
          }
          
          #layanan > div > div:last-child {
            flex-direction: row;
          }
          
          #kontak > div > div:last-child {
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
