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
  Linkedin,
  Twitter,
  Instagram,
  Send,
  Zap,
  Target,
  TrendingUp,
  Upload,
  FileText,
  Download,
  CheckCircle,
  Loader2,
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
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import AdminDashboard from "@/components/AdminDashboard";

// Types
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

// Animation variants
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
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
};

// Section wrapper component for scroll animations
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

// Bukti type
interface BuktiItem {
  id: string;
  jenis: string;
  judul: string;
  deskripsi: string | null;
  fotoUrl: string;
  urutan: number;
}

// Testimoni Grid Component
function TestimoniGrid() {
  const [testimoni, setTestimoni] = useState<BuktiItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<BuktiItem | null>(null);

  useEffect(() => {
    fetchTestimoni();
  }, []);

  const fetchTestimoni = async () => {
    try {
      const response = await fetch("/api/bukti?jenis=testimoni");
      const result = await response.json();
      if (result.success && result.data) {
        setTestimoni(result.data);
      }
    } catch (error) {
      console.error("Error fetching testimoni:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Memuat testimoni...</p>
      </div>
    );
  }

  if (testimoni.length === 0) {
    return (
      <div className="text-center py-8 bg-white rounded-xl border border-gray-200">
        <p className="text-gray-500">Belum ada testimoni</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimoni.map((item, index) => (
          <Card key={item.id} className="overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setSelectedImage(item)}>
            <div className="aspect-square relative">
              <img
                src={item.fotoUrl}
                alt={item.judul}
                className="w-full h-full object-cover"
              />
            </div>
            <CardContent className="p-4">
              <h4 className="font-semibold text-[#003366]">{item.judul}</h4>
              {item.deskripsi && (
                <p className="text-gray-600 text-sm mt-1">{item.deskripsi}</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Image Preview Dialog */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-[#003366]">{selectedImage?.judul}</DialogTitle>
          </DialogHeader>
          {selectedImage && (
            <div className="space-y-4">
              <img
                src={selectedImage.fotoUrl}
                alt={selectedImage.judul}
                className="w-full rounded-lg"
              />
              {selectedImage.deskripsi && (
                <p className="text-gray-600">{selectedImage.deskripsi}</p>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

// Sertifikat Grid Component
function SertifikatGrid() {
  const [sertifikat, setSertifikat] = useState<BuktiItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<BuktiItem | null>(null);

  useEffect(() => {
    fetchSertifikat();
  }, []);

  const fetchSertifikat = async () => {
    try {
      const response = await fetch("/api/bukti?jenis=sertifikat");
      const result = await response.json();
      if (result.success && result.data) {
        setSertifikat(result.data);
      }
    } catch (error) {
      console.error("Error fetching sertifikat:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Memuat bukti resmi...</p>
      </div>
    );
  }

  if (sertifikat.length === 0) {
    return (
      <div className="text-center py-8 bg-white rounded-xl border border-gray-200">
        <p className="text-gray-500">Belum ada bukti resmi</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sertifikat.map((item, index) => (
          <Card key={item.id} className="overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setSelectedImage(item)}>
            <div className="aspect-[4/3] relative">
              <img
                src={item.fotoUrl}
                alt={item.judul}
                className="w-full h-full object-cover"
              />
            </div>
            <CardContent className="p-4">
              <h4 className="font-semibold text-[#003366]">{item.judul}</h4>
              {item.deskripsi && (
                <p className="text-gray-600 text-sm mt-1">{item.deskripsi}</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Image Preview Dialog */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-[#003366]">{selectedImage?.judul}</DialogTitle>
          </DialogHeader>
          {selectedImage && (
            <div className="space-y-4">
              <img
                src={selectedImage.fotoUrl}
                alt={selectedImage.judul}
                className="w-full rounded-lg"
              />
              {selectedImage.deskripsi && (
                <p className="text-gray-600">{selectedImage.deskripsi}</p>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

// Navigation items
const navItems = [
  { label: "Beranda", href: "#beranda" },
  { label: "Tentang Kami", href: "#tentang" },
  { label: "Layanan", href: "#layanan" },
  { label: "Portofolio", href: "#portofolio" },
  { label: "Bukti", href: "#bukti" },
  { label: "Kontak", href: "#kontak" },
];

// Service data
const services = [
  {
    title: "Bidang Setengah",
    subtitle: "Kontrak pelayanan yg cepat dan instan",
    description: "Pelayanan yang mudah, cepat dengan gaji fantastis",
    icon: Zap,
    packages: [
      { duration: "3 Hari", salary: "Rp 45-65 Juta", icon: Clock },
      { duration: "7 Hari", salary: "Rp 170-200 Juta", icon: Clock },
      { duration: "30 Hari", salary: "Rp 1-1.5 Miliar", icon: Clock },
    ],
    highlight: false,
  },
  {
    title: "Bidang Full",
    subtitle: "Pelayanan yg sama namun Gaji 3X lipat",
    description: "Sedikit nekat, profesional dan sanggup maka akan mendapatkan hasil maximal",
    icon: Target,
    packages: [
      { duration: "3 Hari", salary: "Rp 90-130 Juta", icon: Clock },
      { duration: "7 Hari", salary: "Rp 340-400 Juta", icon: Clock },
      { duration: "30 Hari", salary: "Rp 2-3 Miliar", icon: Clock },
    ],
    highlight: true,
  },
];

// Portfolio data - FIXED: Setengah 30 Hari added, Full 30 Hari remains
const portfolios = [
  {
    title: "Pelayanan Setengah Badan",
    company: "PT. ANDIKA PRATAMA",
    location: "Indonesia",
    duration: "3 Hari",
    salary: "Rp 45-65 Juta",
    type: "Setengah",
    requirements: ["Harus dan wajib setuju dan bersedia bekerja dengan profesional, dimana pun dan kapan pun"],
  },
  {
    title: "Pelayanan Setengah Badan",
    company: "PT. ANDIKA PRATAMA",
    location: "Indonesia",
    duration: "7 Hari",
    salary: "Rp 170-200 Juta",
    type: "Setengah",
    requirements: ["Harus dan wajib setuju dan bersedia bekerja dengan profesional, dimana pun dan kapan pun"],
  },
  {
    title: "Pelayanan Setengah Badan",
    company: "PT. ANDIKA PRATAMA",
    location: "Indonesia",
    duration: "30 Hari",
    salary: "Rp 1-1.5 Miliar",
    type: "Setengah",
    requirements: ["Harus dan wajib setuju dan bersedia bekerja dengan profesional, dimana pun dan kapan pun"],
  },
  {
    title: "Pelayanan Badan Penuh",
    company: "PT. ANDIKA PRATAMA",
    location: "Indonesia",
    duration: "3 Hari",
    salary: "Rp 90-130 Juta",
    type: "Full",
    requirements: ["Harus berani terjun untuk menuju sukses, anggap saja seperti pacaran yg di gaji"],
  },
  {
    title: "Pelayanan Badan Penuh",
    company: "PT. ANDIKA PRATAMA",
    location: "Indonesia",
    duration: "7 Hari",
    salary: "Rp 340-400 Juta",
    type: "Full",
    requirements: ["Harus berani terjun untuk menuju sukses, anggap saja seperti pacaran yg di gaji"],
  },
  {
    title: "Pelayanan Badan Penuh",
    company: "PT. ANDIKA PRATAMA",
    location: "Indonesia",
    duration: "30 Hari",
    salary: "Rp 2-3 Miliar",
    type: "Full",
    requirements: ["Harus berani terjun untuk menuju sukses, anggap saja seperti pacaran yg di gaji"],
  },
];

// Contract Template Component
function ContractTemplate({ data }: { data: PendaftaranData }) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const options: Intl.DateTimeFormatOptions = { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    };
    return date.toLocaleDateString('id-ID', options);
  };

  return (
    <div className="bg-white p-8 rounded-lg text-[#003366] text-sm leading-relaxed" id="contract-content">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-xl font-bold text-[#003366]">SURAT PERJANJIAN KONTRAK KERJA</h1>
        <p className="text-gray-600 mt-1">No: {data.nomorKontrak}</p>
      </div>

      <Separator className="my-4" />

      {/* Parties */}
      <div className="mb-6 space-y-2">
        <p><strong>PIHAK PERTAMA (Perusahaan):</strong></p>
        <p>PT. ANDIKA PRATAMA</p>
        <p>Beralamat di: Tapaktuan Kab Aceh Selatan Prov ACEH</p>
        
        <p className="mt-4"><strong>PIHAK KEDUA (Pekerja):</strong></p>
        <p>Nama: {data.namaLengkap}</p>
        <p>Nomor HP/WA: {data.nomorHP}</p>
        <p>Nama Bank: {data.namaBank}</p>
        <p>Nomor Rekening: {data.nomorRekening}</p>
      </div>

      <Separator className="my-4" />

      {/* Agreement Content */}
      <div className="mb-6">
        <p className="font-bold mb-4">PASAL 1 - DASAR PERJANJIAN</p>
        <p className="mb-4 pl-4">
          Pihak Pertama dan Pihak Kedua dengan ini sepakat untuk mengadakan perjanjian kerja 
          berdasarkan kesepakatan bersama dengan ketentuan sebagai berikut:
        </p>
        
        <p className="font-bold mb-4">PASAL 2 - JENIS DAN DURASI KERJA</p>
        <p className="mb-4 pl-4">
          1. Jenis Layanan: <strong>{data.jenisLayanan === 'Setengah' ? 'Pelayanan Setengah Badan' : 'Pelayanan Badan Penuh'}</strong><br/>
          2. Durasi Kontrak: <strong>{data.durasiKontrak}</strong><br/>
          3. Tanggal Mulai Kontrak: <strong>{formatDate(data.tanggalKontrak)}</strong>
        </p>

        <p className="font-bold mb-4">PASAL 3 - HAK DAN KEWAJIBAN PIHAK KEDUA</p>
        <p className="mb-4 pl-4">
          Pihak Kedua berkewajiban untuk:
        </p>
        <p className="mb-4 pl-8">
          a. Bekerja dengan profesional, penuh dedikasi, dan menghormati semua pihak yang terlibat<br/>
          b. Menjaga kerahasiaan dan nama baik PT. ANDIKA PRATAMA<br/>
          c. Melaksanakan tugas sesuai dengan kesepakatan yang telah ditetapkan<br/>
          d. {data.jenisLayanan === 'Setengah' 
            ? 'Menyetujui dan bersedia bekerja dengan profesional, dimana pun dan kapan pun' 
            : 'Berani terjun untuk menuju sukses, dengan komitmen penuh seperti hubungan yang saling menguntungkan'}
        </p>

        <p className="font-bold mb-4">PASAL 4 - PEMBAYARAN</p>
        <p className="mb-4 pl-4">
          1. Pembayaran akan dilakukan melalui transfer bank ke rekening Pihak Kedua<br/>
          2. Pembayaran dilakukan setelah kontrak kerja selesai<br/>
          3. Nilai pembayaran sesuai dengan kesepakatan yang tercantum dalam penawaran layanan
        </p>

        <p className="font-bold mb-4">PASAL 5 - KERAHASIAAN</p>
        <p className="mb-4 pl-4">
          Pihak Kedua wajib menjaga kerahasiaan semua informasi yang diperoleh selama masa kontrak, 
          termasuk namun tidak terbatas pada identitas klien, detail pekerjaan, dan informasi finansial.
        </p>

        <p className="font-bold mb-4">PASAL 6 - PENGAKHIRAN KONTRAK</p>
        <p className="mb-4 pl-4">
          Perjanjian ini berakhir setelah:
        </p>
        <p className="mb-4 pl-8">
          a. Masa kontrak selesai sesuai durasi yang disepakati<br/>
          b. Kedua belah pihak sepakat untuk mengakhiri kontrak<br/>
          c. Terjadi pelanggaran berat terhadap ketentuan perjanjian
        </p>

        <p className="font-bold mb-4">PASAL 7 - PENYELESAIAN SENGKETA</p>
        <p className="mb-4 pl-4">
          Apabila terjadi perselisihan dalam pelaksanaan perjanjian ini, akan diselesaikan secara 
          musyawarah untuk mufakat. Apabila tidak tercapai kesepakatan, penyelesaian akan dilakukan 
          melalui pengadilan yang berwenang.
        </p>

        <p className="font-bold mb-4">PASAL 8 - PENUTUP</p>
        <p className="mb-4 pl-4">
          Demikian perjanjian ini dibuat dalam dua rangkap bermaterai cukup, masing-masing mempunyai 
          kekuatan hukum yang sama. Perjanjian ini berlaku sejak tanggal ditandatangani.
        </p>
      </div>

      {/* Signatures */}
      <div className="grid grid-cols-2 gap-8 mt-12">
        <div className="text-center">
          <p className="font-bold mb-20">PIHAK PERTAMA</p>
          <p className="border-t border-gray-400 pt-2 mt-2">PT. ANDIKA PRATAMA</p>
        </div>
        <div className="text-center">
          <p className="font-bold mb-20">PIHAK KEDUA</p>
          <p className="border-t border-gray-400 pt-2 mt-2">{data.namaLengkap}</p>
        </div>
      </div>

      {/* Photo */}
      {data.fotoUrl && (
        <div className="mt-8 text-center">
          <p className="font-bold mb-2">Foto Pihak Kedua:</p>
          <img 
            src={data.fotoUrl} 
            alt="Foto Pihak Kedua" 
            className="w-32 h-40 object-cover mx-auto border border-gray-300 rounded"
          />
        </div>
      )}

      {/* Footer */}
      <div className="mt-8 text-center text-xs text-gray-500">
        <p>Dokumen ini dibuat secara elektronik oleh sistem PT. ANDIKA PRATAMA</p>
        <p>Tanggal: {formatDate(data.tanggalKontrak)}</p>
      </div>
    </div>
  );
}

export default function HomePage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { toast } = useToast();
  
  // Form states
  const [formData, setFormData] = useState<FormData>({
    namaLengkap: "",
    nomorHP: "",
    durasiKontrak: "",
    foto: null,
    nomorRekening: "",
    namaBank: "",
    jenisLayanan: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showContract, setShowContract] = useState(false);
  const [pendaftaranData, setPendaftaranData] = useState<PendaftaranData | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [showAdminDashboard, setShowAdminDashboard] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
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
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const submitFormData = new FormData();
      submitFormData.append("namaLengkap", formData.namaLengkap);
      submitFormData.append("nomorHP", formData.nomorHP);
      submitFormData.append("durasiKontrak", formData.durasiKontrak);
      submitFormData.append("nomorRekening", formData.nomorRekening);
      submitFormData.append("namaBank", formData.namaBank);
      submitFormData.append("jenisLayanan", formData.jenisLayanan);
      if (formData.foto) {
        submitFormData.append("foto", formData.foto);
      }

      const response = await fetch("/api/pendaftaran", {
        method: "POST",
        body: submitFormData,
      });

      const result = await response.json();

      if (result.success) {
        setPendaftaranData(result.data);
        setShowContract(true);
        toast({
          title: "Pendaftaran Berhasil!",
          description: "Surat perjanjian kontrak Anda telah dibuat.",
        });
        
        // Reset form
        setFormData({
          namaLengkap: "",
          nomorHP: "",
          durasiKontrak: "",
          foto: null,
          nomorRekening: "",
          namaBank: "",
          jenisLayanan: "",
        });
        setPhotoPreview(null);
      } else {
        toast({
          title: "Error",
          description: result.error || "Terjadi kesalahan saat mendaftar",
          variant: "destructive",
        });
      }
    } catch {
      toast({
        title: "Error",
        description: "Terjadi kesalahan saat mengirim data",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header/Navbar */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg"
            : "bg-transparent"
        }`}
      >
        <nav className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <a href="#beranda" className="flex items-center gap-3">
              <div className={`font-bold text-lg lg:text-xl transition-colors flex items-center gap-2 ${isScrolled ? "text-[#003366]" : "text-white"}`}>
                <img 
                  src="/logo-ap.svg" 
                  alt="PT. ANDIKA PRATAMA Logo" 
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <span className="hidden sm:inline">PT. ANDIKA PRATAMA</span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className={`text-sm font-medium transition-colors hover:text-[#FFD700] ${
                    isScrolled ? "text-[#003366]" : "text-white"
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* CTA Button Desktop */}
            <div className="hidden lg:block">
              <Button
                asChild
                className="bg-[#FFD700] text-[#003366] hover:bg-[#E6C200] font-semibold px-6"
              >
                <a href="#kontak">Hubungi Kami</a>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`lg:hidden ${isScrolled ? "text-[#003366]" : "text-white"}`}
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[350px] bg-white">
                <SheetHeader>
                  <SheetTitle className="text-[#003366] flex items-center gap-2">
                    <img 
                      src="/logo-ap.svg" 
                      alt="PT. ANDIKA PRATAMA Logo" 
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                    PT. ANDIKA PRATAMA
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-4 mt-8">
                  {navItems.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-[#003366] font-medium py-2 px-4 rounded-lg hover:bg-[#003366]/5 transition-colors"
                    >
                      {item.label}
                    </a>
                  ))}
                  <Separator className="my-2" />
                  <Button
                    asChild
                    className="bg-[#FFD700] text-[#003366] hover:bg-[#E6C200] font-semibold"
                  >
                    <a href="#kontak" onClick={() => setMobileMenuOpen(false)}>
                      Hubungi Kami
                    </a>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </motion.header>

      {/* Hero Section */}
      <section
        id="beranda"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #003366 0%, #001a33 50%, #000000 100%)",
        }}
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#FFD700]/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#003366]/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10 pt-20">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div variants={fadeIn} className="mb-6">
              <Badge className="bg-[#FFD700]/20 text-[#FFD700] border-[#FFD700]/30 px-4 py-1 text-sm">
                Pendaftaran Gratis
              </Badge>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
            >
              PT. ANDIKA PRATAMA:{" "}
              <span className="text-[#FFD700]">Solusi Kerja dengan penghasilan tertinggi di dunia</span> hanya dalam beberapa hari
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-lg sm:text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto"
            >
              Pendaftaran Gratis – Kontrak Langsung, Gaji Transparan untuk
              Para Wanita yg menganggap mereka berharga dan pacaran versi premium
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex justify-center items-center"
            >
              <Button
                asChild
                size="lg"
                className="bg-[#FFD700] text-[#003366] hover:bg-[#E6C200] font-semibold px-12 py-6 text-lg"
              >
                <a href="#kontak">
                  HUBUNGI KAMI
                  <ChevronRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={fadeInUp}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 pt-8 border-t border-white/10"
            >
              {[
                { value: "4000+", label: "Wanita seluruh Indonesia Telah bekerja dan merasa puas" },
                { value: "5+", label: "Tahun telah berdiri" },
                { value: "100%", label: "Gaji Transparan" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-[#FFD700]">
                    {stat.value}
                  </div>
                  <div className="text-white/60 text-sm mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1.5 h-3 bg-[#FFD700] rounded-full mt-2 animate-bounce" />
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="tentang" className="py-20 lg:py-32 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-16">
              <Badge className="bg-[#003366]/10 text-[#003366] mb-4">
                Tentang Kami
              </Badge>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#003366] mb-6">
                Mengapa PT. Andika Pratama?
              </h2>
              <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                Kami adalah mitra terpercaya untuk kontrak kerja premium di sektor energi
              </p>
            </div>
          </AnimatedSection>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <div className="space-y-6">
                <p className="text-lg text-gray-700 leading-relaxed">
                  <strong className="text-[#003366]">PT. ANDIKA PRATAMA</strong> Adalah perusahaan individu yg bergerak di bidang kecerdasan dan penghormatan wanita, Dengan pengalaman beberapa tahun dan yang telah buktiin ribuan orang semenjak tahun 2020, menjadikan kami sebagai alternatif penghasilan fantastis hanya bermodal kan apa yang membuat pacaran itu ada.
                </p>
                <div className="flex flex-wrap gap-4 mt-8">
                  {[
                    { icon: Award, text: "Berpengalaman" },
                    { icon: Users, text: "Individu Profesional" },
                    { icon: TrendingUp, text: "Gaji Kompetitif" },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 bg-[#003366]/5 px-4 py-2 rounded-full"
                    >
                      <item.icon className="w-5 h-5 text-[#FFD700]" />
                      <span className="text-[#003366] font-medium text-sm">
                        {item.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  {
                    icon: Briefcase,
                    step: "1",
                    title: "PENDAFTARAN",
                    desc: "Gratis",
                  },
                  {
                    icon: Users,
                    step: "2",
                    title: "BEKERJA",
                    desc: "Secara Profesional",
                  },
                  {
                    icon: Wallet,
                    step: "3",
                    title: "TERIMA GAJI",
                    desc: "Ketika Selesai Kontrak",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className="bg-gradient-to-br from-[#003366] to-[#001a33] p-6 rounded-2xl text-white relative"
                  >
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

      {/* Services Section */}
      <section id="layanan" className="py-20 lg:py-32 bg-[#F8FAFC]">
        <div className="container mx-auto px-4 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-16">
              <Badge className="bg-[#FFD700]/20 text-[#003366] mb-4">
                Layanan Kami
              </Badge>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#003366] mb-6">
                Pilihan Kontrak Premium
              </h2>
              <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                Dua bidang utama dengan gaji puluhan dan ratusan juta bahkan milyaran rupiah hanya hitungan hari, kerja mudah, cepat tanpa gangguan
              </p>
            </div>
          </AnimatedSection>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto"
          >
            {services.map((service, index) => (
              <motion.div key={index} variants={scaleIn}>
                <Card
                  className={`relative overflow-hidden h-full card-hover ${
                    service.highlight
                      ? "border-2 border-[#FFD700] shadow-xl"
                      : "border border-gray-200"
                  }`}
                >
                  {service.highlight && (
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-[#FFD700] text-[#003366] font-semibold">
                        Recommended
                      </Badge>
                    </div>
                  )}
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-4 mb-2">
                      <div
                        className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                          service.highlight
                            ? "bg-gradient-to-br from-[#FFD700] to-[#E6C200]"
                            : "bg-[#003366]/10"
                        }`}
                      >
                        <service.icon
                          className={`w-7 h-7 ${
                            service.highlight ? "text-[#003366]" : "text-[#003366]"
                          }`}
                        />
                      </div>
                      <div>
                        <CardTitle className="text-xl text-[#003366]">
                          {service.title}
                        </CardTitle>
                        <CardDescription className="text-sm">
                          {service.subtitle}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-600">{service.description}</p>
                    <Separator />
                    <div className="space-y-3">
                      {service.packages.map((pkg, pkgIndex) => (
                        <div
                          key={pkgIndex}
                          className="flex items-center justify-between p-3 bg-[#003366]/5 rounded-lg"
                        >
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-[#003366]" />
                            <span className="font-medium text-[#003366]">
                              {pkg.duration}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Wallet className="w-4 h-4 text-[#FFD700]" />
                            <span className="font-bold text-[#003366]">
                              {pkg.salary}
                            </span>
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

      {/* Portfolio Section */}
      <section id="portofolio" className="py-20 lg:py-32 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-16">
              <Badge className="bg-[#003366]/10 text-[#003366] mb-4">
                Portofolio
              </Badge>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#003366] mb-6">
                Proyek & Lowongan Terbaru
              </h2>
              <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                Peluang karir premium di sektor pelayanan profesional, pacaran bisa kerja kenapa tidak??
              </p>
            </div>
          </AnimatedSection>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {portfolios.map((item, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full card-hover border border-gray-200 overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-[#003366] to-[#001a33] pb-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-white text-lg">
                          {item.title}
                        </CardTitle>
                        <CardDescription className="text-white/70 text-sm mt-1">
                          {item.company}
                        </CardDescription>
                      </div>
                      <Badge
                        className={`${
                          item.type === "Full"
                            ? "bg-[#FFD700] text-[#003366]"
                            : "bg-white/20 text-white"
                        }`}
                      >
                        {item.type}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4 space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4 text-[#003366]" />
                        {item.location}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="w-4 h-4 text-[#003366]" />
                        {item.duration}
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
                        {item.requirements.map((req, reqIndex) => (
                          <Badge
                            key={reqIndex}
                            variant="outline"
                            className="text-xs border-gray-200 text-gray-600"
                          >
                            {req}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Button
                      asChild
                      className="w-full bg-[#003366] hover:bg-[#001a33] text-white mt-2"
                    >
                      <a href="#kontak">Lamar Sekarang</a>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Bukti Section */}
      <section id="bukti" className="py-20 lg:py-32 bg-[#F8FAFC]">
        <div className="container mx-auto px-4 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-16">
              <Badge className="bg-[#003366]/10 text-[#003366] mb-4">
                Bukti & Testimoni
              </Badge>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#003366] mb-6">
                Bukti Nyata Kepuasan Klien
              </h2>
              <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                Testimoni dan bukti resmi dari klien yang telah bekerja sama dengan kami
              </p>
            </div>
          </AnimatedSection>

          {/* Tabs */}
          <div className="flex justify-center gap-4 mb-12">
            <Button
              variant="outline"
              className="border-[#003366] text-[#003366] hover:bg-[#003366] hover:text-white"
              onClick={() => {
                document.getElementById('testimoni-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              💬 Testimoni
            </Button>
            <Button
              variant="outline"
              className="border-[#003366] text-[#003366] hover:bg-[#003366] hover:text-white"
              onClick={() => {
                document.getElementById('sertifikat-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              📜 Bukti Resmi
            </Button>
          </div>

          {/* Testimoni Section */}
          <div id="testimoni-section" className="mb-16">
            <h3 className="text-2xl font-bold text-[#003366] mb-8 text-center">
              💬 Testimoni Klien
            </h3>
            <TestimoniGrid />
          </div>

          {/* Sertifikat Section */}
          <div id="sertifikat-section">
            <h3 className="text-2xl font-bold text-[#003366] mb-8 text-center">
              📜 Bukti Resmi & Sertifikat
            </h3>
            <SertifikatGrid />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="kontak" className="py-20 lg:py-32 bg-[#F8FAFC]">
        <div className="container mx-auto px-4 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-16">
              <Badge className="bg-[#FFD700]/20 text-[#003366] mb-4">Pendaftaran</Badge>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#003366] mb-6">
                Formulir Pendaftaran
              </h2>
              <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                Isi formulir di bawah untuk mendaftar dan mendapatkan surat perjanjian kontrak
              </p>
            </div>
          </AnimatedSection>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Registration Form */}
            <AnimatedSection>
              <Card className="border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-[#003366] flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Form Pendaftaran
                  </CardTitle>
                  <CardDescription>
                    Lengkapi semua data untuk mendapatkan surat perjanjian kontrak
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    {/* Nama Lengkap */}
                    <div>
                      <label className="text-sm font-medium text-[#003366] mb-1 block">
                        Nama Lengkap <span className="text-red-500">*</span>
                      </label>
                      <Input
                        name="namaLengkap"
                        value={formData.namaLengkap}
                        onChange={handleInputChange}
                        placeholder="Masukkan nama lengkap Anda"
                        className="border-gray-200 focus:border-[#003366]"
                        required
                      />
                    </div>

                    {/* Nomor HP/WA */}
                    <div>
                      <label className="text-sm font-medium text-[#003366] mb-1 block">
                        Nomor HP/WA <span className="text-red-500">*</span>
                      </label>
                      <Input
                        name="nomorHP"
                        value={formData.nomorHP}
                        onChange={handleInputChange}
                        placeholder="Contoh: 08123456789"
                        className="border-gray-200 focus:border-[#003366]"
                        required
                      />
                    </div>

                    {/* Jenis Layanan */}
                    <div>
                      <label className="text-sm font-medium text-[#003366] mb-1 block">
                        Jenis Layanan <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="jenisLayanan"
                        value={formData.jenisLayanan}
                        onChange={handleInputChange}
                        className="w-full h-9 px-3 rounded-md border border-gray-200 text-sm focus:border-[#003366] focus:outline-none"
                        required
                      >
                        <option value="">Pilih Jenis Layanan</option>
                        <option value="Setengah">Pelayanan Setengah Badan</option>
                        <option value="Full">Pelayanan Badan Penuh</option>
                      </select>
                    </div>

                    {/* Durasi Kontrak */}
                    <div>
                      <label className="text-sm font-medium text-[#003366] mb-1 block">
                        Durasi Kontrak <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="durasiKontrak"
                        value={formData.durasiKontrak}
                        onChange={handleInputChange}
                        className="w-full h-9 px-3 rounded-md border border-gray-200 text-sm focus:border-[#003366] focus:outline-none"
                        required
                      >
                        <option value="">Pilih Durasi</option>
                        <option value="3 Hari">3 Hari</option>
                        <option value="7 Hari">7 Hari</option>
                        <option value="30 Hari">30 Hari</option>
                      </select>
                    </div>

                    {/* Upload Foto */}
                    <div>
                      <label className="text-sm font-medium text-[#003366] mb-1 block">
                        Upload Pas Foto <span className="text-red-500">*</span>
                      </label>
                      <div className="flex items-center gap-4">
                        <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-[#003366] transition-colors">
                          <div className="flex flex-col items-center justify-center">
                            <Upload className="w-6 h-6 text-gray-400 mb-1" />
                            <p className="text-sm text-gray-500">
                              {formData.foto ? formData.foto.name : "Klik untuk upload foto"}
                            </p>
                          </div>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handlePhotoChange}
                            className="hidden"
                            required
                          />
                        </label>
                        {photoPreview && (
                          <img
                            src={photoPreview}
                            alt="Preview"
                            className="w-20 h-24 object-cover rounded-lg border"
                          />
                        )}
                      </div>
                    </div>

                    {/* Nama Bank */}
                    <div>
                      <label className="text-sm font-medium text-[#003366] mb-1 block">
                        Nama Bank <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="namaBank"
                        value={formData.namaBank}
                        onChange={handleInputChange}
                        className="w-full h-9 px-3 rounded-md border border-gray-200 text-sm focus:border-[#003366] focus:outline-none"
                        required
                      >
                        <option value="">Pilih Bank</option>
                        <option value="BCA">BCA</option>
                        <option value="BRI">BRI</option>
                        <option value="Mandiri">Mandiri</option>
                        <option value="BNI">BNI</option>
                        <option value="CIMB Niaga">CIMB Niaga</option>
                        <option value="Permata">Permata</option>
                        <option value="Danamon">Danamon</option>
                        <option value="Panin">Panin</option>
                        <option value="Lainnya">Lainnya</option>
                      </select>
                    </div>

                    {/* Nomor Rekening */}
                    <div>
                      <label className="text-sm font-medium text-[#003366] mb-1 block">
                        Nomor Rekening <span className="text-red-500">*</span>
                      </label>
                      <Input
                        name="nomorRekening"
                        value={formData.nomorRekening}
                        onChange={handleInputChange}
                        placeholder="Masukkan nomor rekening"
                        className="border-gray-200 focus:border-[#003366]"
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#FFD700] text-[#003366] hover:bg-[#E6C200] font-semibold py-6 mt-4"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Memproses...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Daftar Sekarang
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </AnimatedSection>

            {/* Contact Info */}
            <AnimatedSection>
              <div className="space-y-6">
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-[#003366]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-6 h-6 text-[#003366]" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-[#003366] mb-1">Alamat</h4>
                        <p className="text-gray-600">
                          Tapaktuan Kab Aceh Selatan Prov ACEH
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-[#003366]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Mail className="w-6 h-6 text-[#003366]" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-[#003366] mb-1">Email</h4>
                        <a
                          href="mailto:Pt.Andikapratama20@gmail.com"
                          className="text-[#003366] hover:text-[#FFD700] transition-colors"
                        >
                          Pt.Andikapratama20@gmail.com
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-[#003366]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Phone className="w-6 h-6 text-[#003366]" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-[#003366] mb-1">WhatsApp</h4>
                        <a
                          href="https://wa.me/6285215573737"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#003366] hover:text-[#FFD700] transition-colors"
                        >
                          0852-1557-3737
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Info Card */}
                <Card className="border-0 shadow-lg bg-gradient-to-br from-[#003366] to-[#001a33]">
                  <CardContent className="p-6 text-white">
                    <h4 className="font-semibold text-[#FFD700] mb-2">Proses Pendaftaran</h4>
                    <ul className="space-y-2 text-sm text-white/80">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-[#FFD700]" />
                        Isi formulir dengan data lengkap
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-[#FFD700]" />
                        Sistem otomatis generate surat perjanjian
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-[#FFD700]" />
                        Download atau cetak surat perjanjian
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#003366] text-white py-12 mt-auto">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <img 
                  src="/logo-ap.svg" 
                  alt="PT. ANDIKA PRATAMA Logo" 
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <span className="font-bold text-xl">PT. ANDIKA PRATAMA</span>
              </div>
              <p className="text-white/70 max-w-md mb-4">
                PT. ANDIKA PRATAMA Adalah perusahaan individu yg bergerak di bidang kecerdasan dan penghormatan wanita, Dengan pengalaman beberapa tahun dan yang telah buktiin ribuan orang semenjak tahun 2020, menjadikan kami sebagai alternatif penghasilan fantastis hanya bermodal kan apa yang membuat pacaran itu ada.
              </p>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#FFD700] transition-colors group"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5 text-white group-hover:text-[#003366]" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#FFD700] transition-colors group"
                  aria-label="Twitter"
                >
                  <Twitter className="w-5 h-5 text-white group-hover:text-[#003366]" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#FFD700] transition-colors group"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5 text-white group-hover:text-[#003366]" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-[#FFD700] mb-4">Tautan Cepat</h4>
              <ul className="space-y-2">
                {navItems.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="text-white/70 hover:text-[#FFD700] transition-colors"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold text-[#FFD700] mb-4">Kontak</h4>
              <ul className="space-y-2 text-white/70">
                <li className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#FFD700]" />
                  Tapaktuan Kab Aceh Selatan Prov ACEH
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#FFD700]" />
                  Pt.Andikapratama20@gmail.com
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#FFD700]" />
                  0852-1557-3737 (WhatsApp)
                </li>
              </ul>
            </div>
          </div>

          <Separator className="bg-white/10 mb-8" />

          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <p className="text-white/50 text-sm text-center md:text-left">
                © 2026 PT. ANDIKA PRATAMA. All rights reserved.
              </p>
            </div>
            <div className="flex items-center gap-4">
              {/* Admin Link */}
              <button
                onClick={() => setShowAdminDashboard(true)}
                className="text-[#FFD700]/60 text-xs hover:text-[#FFD700] transition-colors cursor-pointer flex items-center gap-1"
                title="Admin Dashboard"
              >
                🔐 Admin
              </button>
              <p className="text-white/50 text-xs text-center md:text-right max-w-lg">
                Gaji estimasi berdasarkan pasar high-value, sesuai UU Ketenagakerjaan
                Indonesia.
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Contract Dialog */}
      <Dialog open={showContract} onOpenChange={setShowContract}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-[#003366] flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              Surat Perjanjian Kontrak
            </DialogTitle>
            <DialogDescription>
              Pendaftaran Anda berhasil! Berikut adalah surat perjanjian kontrak Anda.
            </DialogDescription>
          </DialogHeader>
          
          {pendaftaranData && <ContractTemplate data={pendaftaranData} />}
          
          <div className="flex gap-3 mt-4">
            <Button
              onClick={() => {
                // Print functionality
                const printContent = document.getElementById("contract-content");
                if (printContent) {
                  const printWindow = window.open("", "_blank");
                  if (printWindow) {
                    printWindow.document.write(`
                      <html>
                        <head>
                          <title>Surat Perjanjian Kontrak - ${pendaftaranData?.nomorKontrak}</title>
                          <style>
                            body { font-family: Arial, sans-serif; padding: 40px; }
                            h1 { text-align: center; color: #003366; }
                            .separator { border-top: 1px solid #ccc; margin: 16px 0; }
                          </style>
                        </head>
                        <body>
                          ${printContent.innerHTML}
                        </body>
                      </html>
                    `);
                    printWindow.document.close();
                    printWindow.print();
                  }
                }
              }}
              className="bg-[#003366] text-white hover:bg-[#001a33]"
            >
              <Download className="w-4 h-4 mr-2" />
              Cetak / Download
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowContract(false)}
            >
              Tutup
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Admin Dashboard */}
      <AdminDashboard 
        isOpen={showAdminDashboard} 
        onClose={() => setShowAdminDashboard(false)} 
      />
    </div>
  );
}
