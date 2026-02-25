"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
Menu,
Phone,
Mail,
MapPin,
Clock,
Wallet,
Briefcase,
Users,
Award,
ChevronRight,
Zap,
Target,
TrendingUp,
Upload,
FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
Sheet,
SheetContent,
SheetHeader,
SheetTitle,
SheetTrigger,
} from "@/components/ui/sheet";
import {
Dialog,
DialogContent,
DialogHeader,
DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const ADMIN_WHATSAPP = "6285215573737";

interface FormData {
namaLengkap: string;
nomorHP: string;
durasiKontrak: string;
foto: File | null;
nomorRekening: string;
namaBank: string;
jenisLayanan: string;
}

interface PendaftaranData {
id: string;
namaLengkap: string;
nomorHP: string;
durasiKontrak: string;
fotoUrl: string | null;
nomorRekening: string;
namaBank: string;
jenisLayanan: string;
nomorKontrak: string;
tanggalKontrak: string;
}

const fadeInUp = {
hidden: { opacity: 0, y: 30 },
visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const fadeIn = {
hidden: { opacity: 0 },
visible: { opacity: 1, transition: { duration: 0.6 } },
};

const staggerContainer = {
hidden: { opacity: 0 },
visible: {
opacity: 1,
transition: { staggerChildren: 0.1, delayChildren: 0.1 },
},
};

const scaleIn = {
hidden: { opacity: 0, scale: 0.95 },
visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
};

function Toast({ message, type, onClose }: { message: string; type: "success" | "error"; onClose: () => void }) {
useEffect(() => {
const timer = setTimeout(onClose, 5000);
return () => clearTimeout(timer);
}, [onClose]);

return (
<div
className={fixed top-20 right-4 z-[9999] px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 animate-in slide-in-from-right ${ type === "success" ? "bg-green-500" : "bg-red-500" } text-white}
>
<span className="text-xl">{type === "success" ? "✓" : "✕"}</span>
<span className="font-medium">{message}</span>
<button onClick={onClose} className="ml-2 hover:opacity-70">✕</button>
</div>
);
}

function AnimatedSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
const ref = useRef(null);
const isInView = useInView(ref, { once: true, margin: "-100px" });

return (
<motion.div
ref={ref}
initial="hidden"
animate={isInView ? "visible" : "hidden"}
variants={fadeInUp}
className={className}
>
{children}
</motion.div>
);
}

const navItems = [
{ label: "Beranda", href: "#beranda" },
{ label: "Tentang Kami", href: "#tentang" },
{ label: "Layanan", href: "#layanan" },
{ label: "Portofolio", href: "#portofolio" },
{ label: "Kontak", href: "#kontak" },
];

const services = [
{
title: "Bidang Setengah",
subtitle: "Kontrak pelayanan yg cepat dan instan",
description: "Pelayanan yang mudah, cepat dengan gaji fantastis",
icon: Zap,
packages: [
{ duration: "3 Hari", salary: "Rp 45-65 Juta" },
{ duration: "7 Hari", salary: "Rp 170-200 Juta" },
{ duration: "30 Hari", salary: "Rp 1-1.5 Miliar" },
],
highlight: false,
},
{
title: "Bidang Full",
subtitle: "Pelayanan yg sama namun Gaji 3X lipat",
description: "Sedikit nekat, profesional dan sanggup maka akan mendapatkan hasil maximal",
icon: Target,
packages: [
{ duration: "3 Hari", salary: "Rp 90-130 Juta" },
{ duration: "7 Hari", salary: "Rp 340-400 Juta" },
{ duration: "30 Hari", salary: "Rp 2-3 Miliar" },
],
highlight: true,
},
];

const portfolios = [
{ title: "Pelayanan Setengah Badan", company: "PT. ANDIKA PRATAMA", location: "Indonesia", duration: "3 Hari", salary: "Rp 45-65 Juta", type: "Setengah", requirements: ["Harus dan wajib setuju dan bersedia bekerja dengan profesional, dimana pun dan kapan pun"] },
{ title: "Pelayanan Badan Penuh", company: "PT. ANDIKA PRATAMA", location: "Indonesia", duration: "30 Hari", salary: "Rp 2-3 Miliar", type: "Full", requirements: ["Harus berani terjun untuk menuju sukses, anggap saja seperti pacaran yg di gaji"] },
{ title: "Pelayanan Setengah Badan", company: "PT. ANDIKA PRATAMA", location: "Indonesia", duration: "7 Hari", salary: "Rp 170-200 Juta", type: "Setengah", requirements: ["Harus dan wajib setuju dan bersedia bekerja dengan profesional, dimana pun dan kapan pun"] },
{ title: "Pelayanan Badan Penuh", company: "PT. ANDIKA PRATAMA", location: "Indonesia", duration: "30 Hari", salary: "Rp 1.5-2 Miliar", type: "Full", requirements: ["Harus berani terjun untuk menuju sukses, anggap saja seperti pacaran yg di gaji"] },
{ title: "Pelayanan Badan Penuh", company: "PT. ANDIKA PRATAMA", location: "Indonesia", duration: "7 Hari", salary: "Rp 340-400 Juta", type: "Full", requirements: ["Harus berani terjun untuk menuju sukses, anggap saja seperti pacaran yg di gaji"] },
{ title: "Pelayanan Badan Penuh", company: "PT. ANDIKA PRATAMA", location: "Indonesia", duration: "3 Hari", salary: "Rp 90-130 Juta", type: "Full", requirements: ["Harus berani terjun untuk menuju sukses, anggap saja seperti pacaran yg di gaji"] },
];

function ContractTemplate({ data, onSendWhatsApp, onPrint }: { data: PendaftaranData; onSendWhatsApp: () => void; onPrint: () => void }) {
const formatDate = (dateStr: string) => {
return new Date(dateStr).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
};

return (
<div className="bg-white p-6 rounded-lg text-[#003366] text-sm">
<div className="text-center mb-4">
<h1 className="text-xl font-bold">SURAT PERJANJIAN KONTRAK KERJA</h1>
<p className="text-gray-600">No: {data.nomorKontrak}</p>
</div>

<Separator className="my-4" />

<div className="mb-4 space-y-1">
<p><strong>PIHAK PERTAMA (Perusahaan):</strong></p>
<p className="ml-4">PT. ANDIKA PRATAMA</p>
<p className="ml-4">Medan, Sumatera Utara / Banda Aceh, Indonesia</p>
<p className="mt-3"><strong>PIHAK KEDUA (Pekerja):</strong></p>
<p className="ml-4">Nama: {data.namaLengkap}</p>
<p className="ml-4">Nomor HP/WA: {data.nomorHP}</p>
<p className="ml-4">Nama Bank: {data.namaBank}</p>
<p className="ml-4">Nomor Rekening: {data.nomorRekening}</p>
</div>

<Separator className="my-4" />

<div className="mb-4 space-y-2 text-sm">
<p className="font-bold">PASAL 1 - JENIS DAN DURASI KERJA</p>
<p className="ml-4">1. Jenis Layanan: <strong>{data.jenisLayanan === 'Setengah' ? 'Pelayanan Setengah Badan' : 'Pelayanan Badan Penuh'}</strong></p>
<p className="ml-4">2. Durasi Kontrak: <strong>{data.durasiKontrak}</strong></p>
<p className="ml-4">3. Tanggal Mulai: <strong>{formatDate(data.tanggalKontrak)}</strong></p>
<p className="font-bold mt-3">PASAL 2 - PEMBAYARAN</p>
<p className="ml-4">Pembayaran dilakukan via transfer bank setelah kontrak selesai.</p>
</div>

{data.fotoUrl && (
<div className="text-center mb-4">
<p className="font-bold mb-2">Foto:</p>
<img src={data.fotoUrl} alt="Foto" className="w-24 h-32 object-cover mx-auto border rounded" />
</div>
)}

<div className="grid grid-cols-2 gap-8 mt-6">
<div className="text-center">
<p className="font-bold mb-12">PIHAK PERTAMA</p>
<p className="border-t pt-2">PT. ANDIKA PRATAMA</p>
</div>
<div className="text-center">
<p className="font-bold mb-12">PIHAK KEDUA</p>
<p className="border-t pt-2">{data.namaLengkap}</p>
</div>
</div>

<div className="flex gap-3 mt-6">
<Button onClick={onSendWhatsApp} className="flex-1 bg-green-500 hover:bg-green-600 text-white">
Kirim ke WhatsApp Admin
</Button>
<Button onClick={onPrint} className="flex-1 bg-[#003366] hover:bg-[#001a33] text-white">
Cetak Kontrak
</Button>
</div>
</div>
);
}

export default function HomePage() {
const [isScrolled, setIsScrolled] = useState(false);
const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
const [showContract, setShowContract] = useState(false);
const [pendaftaranData, setPendaftaranData] = useState<PendaftaranData | null>(null);
const [photoPreview, setPhotoPreview] = useState<string | null>(null);
const [isSubmitting, setIsSubmitting] = useState(false);

const [formData, setFormData] = useState<FormData>({
namaLengkap: "",
nomorHP: "",
durasiKontrak: "",
foto: null,
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
setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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

const handleSubmit = (e: React.FormEvent) => {
e.preventDefault();
setIsSubmitting(true);

try {
const timestamp = Date.now().toString(36).toUpperCase();
const random = Math.random().toString(36).substring(2, 6).toUpperCase();
const nomorKontrak = `AP-${timestamp}-${random}`;

const newData: PendaftaranData = {
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
setToast({ message: "Pendaftaran berhasil! Klik tombol WhatsApp untuk kirim ke admin.", type: "success" });

setFormData({ namaLengkap: "", nomorHP: "", durasiKontrak: "", foto: null, nomorRekening: "", namaBank: "", jenisLayanan: "" });
setPhotoPreview(null);
} catch {
setToast({ message: "Terjadi kesalahan. Silakan coba lagi.", type: "error" });
} finally {
setIsSubmitting(false);
}
};

const handleSendWhatsApp = () => {
if (!pendaftaranData) return;
const formatDate = (dateStr: string) => new Date(dateStr).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
const message = `PENDAFTARAN BARU

Nomor Kontrak: 
pendaftaranData.nomorKontrakNama:
{pendaftaranData.namaLengkap}
No. HP: 
pendaftaranData.nomorHPLayanan:
{pendaftaranData.jenisLayanan === 'Setengah' ? 'Pelayanan Setengah Badan' : 'Pelayanan Badan Penuh'}
Durasi: 
pendaftaranData.durasiKontrakBank:
{pendaftaranData.namaBank}
No. Rekening: 
pendaftaranData.nomorRekeningTanggal:
{formatDate(pendaftaranData.tanggalKontrak)}

Terima kasih.; window.open(https://wa.me/${ADMIN_WHATSAPP}?text=${encodeURIComponent(message)}`, '_blank');
};

const handlePrint = () => {
window.print();
};

return (
<div className="min-h-screen flex flex-col">
{toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

<Dialog open={showContract} onOpenChange={setShowContract}>
<DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
<DialogHeader>
<DialogTitle className="text-[#003366]">Surat Perjanjian Kontrak</DialogTitle>
</DialogHeader>
{pendaftaranData && (
<ContractTemplate
data={pendaftaranData}
onSendWhatsApp={handleSendWhatsApp}
onPrint={handlePrint}
/>
)}
</DialogContent>
</Dialog>

<motion.header
initial={{ y: -100 }}
animate={{ y: 0 }}
transition={{ duration: 0.5 }}
className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
isScrolled ? "bg-white/95 backdrop-blur-md shadow-lg" : "bg-transparent"
}`}
>
<nav className="container mx-auto px-4 lg:px-8">
<div className="flex items-center justify-between h-16 lg:h-20">
<a href="#beranda" className="flex items-center gap-3">
<div className={`font-bold text-lg lg:text-xl flex items-center gap-2 ${isScrolled ? "text-[#003366]" : "text-white"}`}>
<img src="/logo.png" alt="Logo" className="w-12 h-12 rounded-lg object-cover" />
<span className="hidden sm:inline">PT. ANDIKA PRATAMA</span>
</div>
</a>

<div className="hidden lg:flex items-center gap-8">
{navItems.map((item) => (
<a key={item.label} href={item.href} className={`text-sm font-medium hover:text-[#FFD700] ${isScrolled ? "text-[#003366]" : "text-white"}`}>
{item.label}
</a>
))}
</div>

<div className="hidden lg:block">
<Button asChild className="bg-[#FFD700] text-[#003366] hover:bg-[#E6C200] font-semibold px-6">
<a href="#kontak">Hubungi Kami</a>
</Button>
</div>

<Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
<SheetTrigger asChild>
<Button variant="ghost" size="icon" className={`lg:hidden ${isScrolled ? "text-[#003366]" : "text-white"}`}>
<Menu className="h-6 w-6" />
</Button>
</SheetTrigger>
<SheetContent side="right" className="w-[300px] bg-white">
<SheetHeader>
<SheetTitle className="text-[#003366] flex items-center gap-2">
<img src="/logo.png" alt="Logo" className="w-10 h-10 rounded-lg object-cover" />
PT. ANDIKA PRATAMA
</SheetTitle>
</SheetHeader>
<div className="flex flex-col gap-4 mt-8">
{navItems.map((item) => (
<a key={item.label} href={item.href} onClick={() => setMobileMenuOpen(false)} className="text-[#003366] font-medium py-2 px-4 rounded-lg hover:bg-[#003366]/5">
{item.label}
</a>
))}
<Separator className="my-2" />
<Button asChild className="bg-[#FFD700] text-[#003366] hover:bg-[#E6C200] font-semibold">
<a href="#kontak" onClick={() => setMobileMenuOpen(false)}>Hubungi Kami</a>
</Button>
</div>
</SheetContent>
</Sheet>
</div>
</nav>
</motion.header>

<section id="beranda" className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ background: "linear-gradient(135deg, #003366 0%, #001a33 50%, #000000 100%)" }}>
<div className="absolute inset-0 overflow-hidden">
<div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#FFD700]/10 rounded-full blur-3xl animate-pulse" />
<div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#003366]/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
</div>

<div className="container mx-auto px-4 lg:px-8 relative z-10 pt-20">
<motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-4xl mx-auto text-center">
<motion.div variants={fadeIn} className="mb-6">
<Badge className="bg-[#FFD700]/20 text-[#FFD700] border-[#FFD700]/30 px-4 py-1 text-sm">Pendaftaran Gratis</Badge>
</motion.div>

<motion.h1 variants={fadeInUp} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
PT. ANDIKA PRATAMA: <span className="text-[#FFD700]">Solusi Kerja dengan penghasilan tertinggi di dunia</span> hanya dalam beberapa hari
</motion.h1>

<motion.p variants={fadeInUp} className="text-lg sm:text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto">
Pendaftaran Gratis – Kontrak Langsung, Gaji Transparan untuk Para Wanita yg menganggap mereka berharga dan pacaran versi premium
</motion.p>

<motion.div variants={fadeInUp} className="flex justify-center">
<Button asChild size="lg" className="bg-[#FFD700] text-[#003366] hover:bg-[#E6C200] font-semibold px-12 py-6 text-lg">
<a href="#kontak">HUBUNGI KAMI <ChevronRight className="ml-2 h-5 w-5" /></a>
</Button>
</motion.div>

<motion.div variants={fadeInUp} className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 pt-8 border-t border-white/10">
{[{ value: "4000+", label: "Wanita seluruh Indonesia Telah bekerja dan merasa puas" }, { value: "5+", label: "Tahun telah berdiri" }, { value: "100%", label: "Gaji Transparan" }].map((stat, i) => (
<div key={i} className="text-center">
<div className="text-2xl md:text-3xl font-bold text-[#FFD700]">{stat.value}</div>
<div className="text-white/60 text-sm mt-1">{stat.label}</div>
</div>
))}
</motion.div>
</motion.div>
</div>

<motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.5, repeat: Infinity, repeatType: "reverse" }} className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
<div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
<div className="w-1.5 h-3 bg-[#FFD700] rounded-full mt-2 animate-bounce" />
</div>
</motion.div>
</section>

<section id="tentang" className="py-20 lg:py-32 bg-white">
<div className="container mx-auto px-4 lg:px-8">
<AnimatedSection>
<div className="text-center mb-16">
<Badge className="bg-[#003366]/10 text-[#003366] mb-4">Tentang Kami</Badge>
<h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#003366] mb-6">Mengapa PT. Andika Pratama?</h2>
<p className="text-gray-600 text-lg max-w-3xl mx-auto">Kami adalah mitra terpercaya untuk kontrak kerja premium</p>
</div>
</AnimatedSection>

<div className="grid lg:grid-cols-2 gap-12 items-center">
<AnimatedSection>
<div className="space-y-6">
<p className="text-lg text-gray-700 leading-relaxed">
<strong className="text-[#003366]">PT. ANDIKA PRATAMA</strong> Adalah perusahaan individu yg bergerak di bidang kecerdasan dan penghormatan wanita, Dengan pengalaman beberapa tahun dan yang telah buktiin ribuan orang semenjak tahun 2020, menjadikan kami sebagai alternatif penghasilan fantastis hanya bermodal kan apa yang membuat pacaran itu ada.
</p>
<div className="flex flex-wrap gap-4 mt-8">
{[{ icon: Award, text: "Berpengalaman" }, { icon: Users, text: "Individu Profesional" }, { icon: TrendingUp, text: "Gaji Kompetitif" }].map((item, i) => (
<div key={i} className="flex items-center gap-2 bg-[#003366]/5 px-4 py-2 rounded-full">
<item.icon className="w-5 h-5 text-[#FFD700]" />
<span className="text-[#003366] font-medium text-sm">{item.text}</span>
</div>
))}
</div>
</div>
</AnimatedSection>

<AnimatedSection>
<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
{[{ icon: Briefcase, step: "1", title: "PENDAFTARAN", desc: "Gratis" }, { icon: Users, step: "2", title: "BEKERJA", desc: "Secara Profesional" }, { icon: Wallet, step: "3", title: "TERIMA GAJI", desc: "Ketika Selesai Kontrak" }].map((item, i) => (
<motion.div key={i} whileHover={{ scale: 1.05 }} className="bg-gradient-to-br from-[#003366] to-[#001a33] p-6 rounded-2xl text-white relative">
<div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#FFD700] flex items-center justify-center">
<span className="text-[#003366] font-bold text-sm">{item.step}</span>
</div>
<item.icon className="w-10 h-10 text-[#FFD700] mb-4" />
<h4 className="font-bold text-lg">{item.title}</h4>
<p className="text-white/70 text-sm mt-1">{item.desc}</p>
</motion.div>
))}
</div>
</AnimatedSection>
</div>
</div>
</section>

<section id="layanan" className="py-20 lg:py-32 bg-[#F8FAFC]">
<div className="container mx-auto px-4 lg:px-8">
<AnimatedSection>
<div className="text-center mb-16">
<Badge className="bg-[#FFD700]/20 text-[#003366] mb-4">Layanan Kami</Badge>
<h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#003366] mb-6">Pilihan Kontrak Premium</h2>
<p className="text-gray-600 text-lg max-w-3xl mx-auto">Dua bidang utama dengan kompensasi kompetitif sesuai kebutuhan proyek</p>
</div>
</AnimatedSection>

<motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
{services.map((service, i) => (
<motion.div key={i} variants={scaleIn}>
<Card className={`relative overflow-hidden h-full ${service.highlight ? "border-2 border-[#FFD700] shadow-xl" : "border border-gray-200"}`}>
{service.highlight && (
<div className="absolute top-4 right-4">
<Badge className="bg-[#FFD700] text-[#003366] font-semibold">Recommended</Badge>
</div>
)}
<CardHeader className="pb-4">
<div className="flex items-center gap-4 mb-2">
<div className={`w-14 h-14 rounded-xl flex items-center justify-center ${service.highlight ? "bg-gradient-to-br from-[#FFD700] to-[#E6C200]" : "bg-[#003366]/10"}`}>
<service.icon className="w-7 h-7 text-[#003366]" />
</div>
<div>
<CardTitle className="text-xl text-[#003366]">{service.title}</CardTitle>
<CardDescription className="text-sm">{service.subtitle}</CardDescription>
</div>
</div>
</CardHeader>
<CardContent className="space-y-4">
<p className="text-gray-600">{service.description}</p>
<Separator />
<div className="space-y-3">
{service.packages.map((pkg, j) => (
<div key={j} className="flex items-center justify-between p-3 bg-[#003366]/5 rounded-lg">
<div className="flex items-center gap-2">
<Clock className="w-4 h-4 text-[#003366]" />
<span className="font-medium text-[#003366]">{pkg.duration}</span>
</div>
<div className="flex items-center gap-2">
<Wallet className="w-4 h-4 text-[#FFD700]" />
<span className="font-bold text-[#003366]">{pkg.salary}</span>
</div>
</div>
))}
</div>
</CardContent>
</Card>
</motion.div>
))}
</motion.div>
</div>
</section>

<section id="portofolio" className="py-20 lg:py-32 bg-white">
<div className="container mx-auto px-4 lg:px-8">
<AnimatedSection>
<div className="text-center mb-16">
<Badge className="bg-[#003366]/10 text-[#003366] mb-4">Portofolio</Badge>
<h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#003366] mb-6">Proyek & Lowongan Terbaru</h2>
<p className="text-gray-600 text-lg max-w-3xl mx-auto">Peluang karir premium di sektor migas, tambang, dan energi</p>
</div>
</AnimatedSection>

<motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
{portfolios.map((item, i) => (
<motion.div key={i} variants={fadeInUp}>
<Card className="h-full border border-gray-200 overflow-hidden">
<CardHeader className="bg-gradient-to-r from-[#003366] to-[#001a33] pb-4">
<div className="flex items-start justify-between">
<div>
<CardTitle className="text-white text-lg">{item.title}</CardTitle>
<CardDescription className="text-white/70 text-sm mt-1">{item.company}</CardDescription>
</div>
<Badge className={item.type === "Full" ? "bg-[#FFD700] text-[#003366]" : "bg-white/20 text-white"}>{item.type}</Badge>
</div>
</CardHeader>
<CardContent className="pt-4 space-y-4">
<div className="grid grid-cols-2 gap-3">
<div className="flex items-center gap-2 text-sm text-gray-600">
<MapPin className="w-4 h-4 text-[#003366]" />{item.location}
</div>
<div className="flex items-center gap-2 text-sm text-gray-600">
<Clock className="w-4 h-4 text-[#003366]" />{item.duration}
</div>
</div>
<div className="bg-[#003366]/5 p-3 rounded-lg">
<div className="flex items-center gap-2">
<Wallet className="w-5 h-5 text-[#FFD700]" />
<span className="font-bold text-[#003366]">{item.salary}</span>
</div>
</div>
<div>
<p className="text-xs text-gray-500 mb-2">Persyaratan:</p>
<div className="flex flex-wrap gap-1">
{item.requirements.map((req, j) => (
<Badge key={j} variant="outline" className="text-xs border-gray-200 text-gray-600">{req}</Badge>
))}
</div>
</div>
<Button asChild className="w-full bg-[#003366] hover:bg-[#001a33] text-white mt-2">
<a href="#kontak">Lamar Sekarang</a>
</Button>
</CardContent>
</Card>
</motion.div>
))}
</motion.div>
</div>
</section>

<section id="kontak" className="py-20 lg:py-32 bg-[#F8FAFC]">
<div className="container mx-auto px-4 lg:px-8">
<AnimatedSection>
<div className="text-center mb-16">
<Badge className="bg-[#FFD700]/20 text-[#003366] mb-4">Pendaftaran</Badge>
<h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#003366] mb-6">Formulir Pendaftaran</h2>
<p className="text-gray-600 text-lg max-w-3xl mx-auto">Isi formulir di bawah untuk mendaftar dan mendapatkan surat perjanjian kontrak</p>
</div>
</AnimatedSection>

<div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
<AnimatedSection>
<Card className="border-0 shadow-xl h-full">
<CardHeader>
<CardTitle className="text-[#003366] flex items-center gap-2">
<FileText className="w-5 h-5" />
Informasi Kontak
</CardTitle>
<CardDescription>Hubungi kami untuk informasi lebih lanjut</CardDescription>
</CardHeader>
<CardContent className="space-y-6">
<div className="flex items-start gap-4">
<div className="w-12 h-12 bg-[#003366]/10 rounded-lg flex items-center justify-center">
<Phone className="w-6 h-6 text-[#003366]" />
</div>
<div>
<p className="font-semibold text-[#003366]">Telepon</p>
<p className="text-gray-600">+62 852-1557-3737</p>
</div>
</div>
<div className="flex items-start gap-4">
<div className="w-12 h-12 bg-[#003366]/10 rounded-lg flex items-center justify-center">
<Mail className="w-6 h-6 text-[#003366]" />
</div>
<div>
<p className="font-semibold text-[#003366]">Email</p>
<p className="text-gray-600">info@andikapratama.com</p>
</div>
</div>
<div className="flex items-start gap-4">
<div className="w-12 h-12 bg-[#003366]/10 rounded-lg flex items-center justify-center">
<MapPin className="w-6 h-6 text-[#003366]" />
</div>
<div>
<p className="font-semibold text-[#003366]">Alamat</p>
<p className="text-gray-600">Medan, Sumatera Utara / Banda Aceh, Indonesia</p>
</div>
</div>
<Separator />
<div className="bg-[#003366]/5 p-4 rounded-lg">
<p className="font-semibold text-[#003366] mb-2">Jam Operasional</p>
<div className="flex items-center gap-2 text-gray-600">
<Clock className="w-4 h-4" />
<span>Senin - Minggu: 24 Jam</span>
</div>
</div>
</CardContent>
</Card>
</AnimatedSection>

<AnimatedSection>
<Card className="border-0 shadow-xl">
<CardHeader>
<CardTitle className="text-[#003366] flex items-center gap-2">
<FileText className="w-5 h-5" />
Form Pendaftaran
</CardTitle>
<CardDescription>Lengkapi semua data untuk mendapatkan surat perjanjian kontrak</CardDescription>
</CardHeader>
<CardContent>
<form onSubmit={handleSubmit} className="space-y-4">
<div>
<label className="text-sm font-medium text-[#003366] mb-1 block">Nama Lengkap <span className="text-red-500">*</span></label>
<Input name="namaLengkap" value={formData.namaLengkap} onChange={handleInputChange} placeholder="Masukkan nama lengkap Anda" className="border-gray-200 focus:border-[#003366]" required />
</div>

<div>
<label className="text-sm font-medium text-[#003366] mb-1 block">Nomor HP/WA <span className="text-red-500">*</span></label>
<Input name="nomorHP" value={formData.nomorHP} onChange={handleInputChange} placeholder="Contoh: 08123456789" className="border-gray-200 focus:border-[#003366]" required />
</div>

<div>
<label className="text-sm font-medium text-[#003366] mb-1 block">Jenis Layanan <span className="text-red-500">*</span></label>
<select name="jenisLayanan" value={formData.jenisLayanan} onChange={handleInputChange} className="w-full h-9 px-3 rounded-md border border-gray-200 text-sm focus:border-[#003366] focus:outline-none" required>
<option value="">Pilih Jenis Layanan</option>
<option value="Setengah">Pelayanan Setengah Badan</option>
<option value="Full">Pelayanan Badan Penuh</option>
</select>
</div>

<div>
<label className="text-sm font-medium text-[#003366] mb-1 block">Durasi Kontrak <span className="text-red-500">*</span></label>
<select name="durasiKontrak" value={formData.durasiKontrak} onChange={handleInputChange} className="w-full h-9 px-3 rounded-md border border-gray-200 text-sm focus:border-[#003366] focus:outline-none" required>
<option value="">Pilih Durasi</option>
<option value="3 Hari">3 Hari</option>
<option value="7 Hari">7 Hari</option>
<option value="30 Hari">30 Hari</option>
</select>
</div>

<div>
<label className="text-sm font-medium text-[#003366] mb-1 block">Nama Bank <span className="text-red-500">*</span></label>
<select name="namaBank" value={formData.namaBank} onChange={handleInputChange} className="w-full h-9 px-3 rounded-md border border-gray-200 text-sm focus:border-[#003366] focus:outline-none" required>
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

<div>
<label className="text-sm font-medium text-[#003366] mb-1 block">Nomor Rekening <span className="text-red-500">*</span></label>
<Input name="nomorRekening" value={formData.nomorRekening} onChange={handleInputChange} placeholder="Masukkan nomor rekening" className="border-gray-200 focus:border-[#003366]" required />
</div>

<div>
<label className="text-sm font-medium text-[#003366] mb-1 block">Upload Pas Foto <span className="text-red-500">*</span></label>
<div className="flex items-center gap-4">
<label className="flex flex-col items-center justify-center flex-1 h-24 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-[#003366] transition-colors">
<div className="flex flex-col items-center justify-center">
<Upload className="w-6 h-6 text-gray-400 mb-1" />
<p className="text-sm text-gray-500">{formData.foto ? formData.foto.name : "Klik untuk upload foto"}</p>
</div>
<input type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" required />
</label>
{photoPreview && <img src={photoPreview} alt="Preview" className="w-20 h-24 object-cover rounded-lg border" />}
</div>
</div>

<Button type="submit" disabled={isSubmitting} className="w-full bg-[#003366] hover:bg-[#001a33] text-white py-3 text-lg font-semibold">
{isSubmitting ? "Memproses..." : "DAFTAR SEKARANG"}
</Button>
</form>
</CardContent>
</Card>
</AnimatedSection>
</div>
</div>
</section>

<footer className="bg-[#001a33] text-white py-12 mt-auto">
<div className="container mx-auto px-4 lg:px-8">
<div className="grid md:grid-cols-3 gap-8 mb-8">
<div>
<div className="flex items-center gap-3 mb-4">
<img src="/logo.png" alt="Logo" className="w-12 h-12 rounded-lg object-cover" />
<span className="font-bold text-xl">PT. ANDIKA PRATAMA</span>
</div>
<p className="text-white/60 text-sm">Solusi kerja dengan penghasilan tertinggi di Indonesia. Berpengalaman sejak 2020.</p>
</div>
<div>
<h4 className="font-bold mb-4">Kontak</h4>
<div className="space-y-2 text-white/60 text-sm">
<p className="flex items-center gap-2"><Phone className="w-4 h-4" /> +62 852-1557-3737</p>
<p className="flex items-center gap-2"><Mail className="w-4 h-4" /> info@andikapratama.com</p>
<p className="flex items-center gap-2"><MapPin className="w-4 h-4" /> Medan / Banda Aceh, Indonesia</p>
</div>
</div>
<div>
<h4 className="font-bold mb-4">Layanan</h4>
<div className="space-y-2 text-white/60 text-sm">
<p>Pelayanan Setengah Badan</p>
<p>Pelayanan Badan Penuh</p>
<p>Kontrak 3, 7, 30 Hari</p>
</div>
</div>
</div>
<Separator className="bg-white/10 mb-8" />
<div className="text-center text-white/40 text-sm">
<p>2024 PT. ANDIKA PRATAMA. All rights reserved.</p>
</div>
</div>
</footer>
</div>
);
}
