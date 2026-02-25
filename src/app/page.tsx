"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Menu, Phone, Mail, MapPin, Clock, Wallet, Briefcase, Users, ChevronRight, Send, Zap, Target, Upload, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const fadeInUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };
const fadeIn = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.6 } } };
const staggerContainer = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const scaleIn = { hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } } };

function AnimatedSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <motion.div ref={ref} initial="hidden" animate={isInView ? "visible" : "hidden"} variants={fadeInUp} className={className}>
      {children}
    </motion.div>
  );
}

const navItems = [
  { label: "Beranda", href: "#beranda" },
  { label: "Tentang", href: "#tentang" },
  { label: "Layanan", href: "#layanan" },
  { label: "Portofolio", href: "#portofolio" },
  { label: "Kontak", href: "#kontak" },
];

const services = [
  { title: "Bidang Setengah", subtitle: "Kontrak cepat dan instan", icon: Zap, packages: [{ duration: "3 Hari", salary: "Rp 45-65 Juta" }, { duration: "7 Hari", salary: "Rp 170-200 Juta" }, { duration: "30 Hari", salary: "Rp 1-1.5 Miliar" }], highlight: false },
  { title: "Bidang Full", subtitle: "Gaji 3X lipat", icon: Target, packages: [{ duration: "3 Hari", salary: "Rp 90-130 Juta" }, { duration: "7 Hari", salary: "Rp 340-400 Juta" }, { duration: "30 Hari", salary: "Rp 2-3 Miliar" }], highlight: true },
];

const portfolios = [
  { title: "Pelayanan Setengah Badan", company: "PT. ANDIKA PRATAMA", location: "Indonesia", duration: "3 Hari", salary: "Rp 45-65 Juta", type: "Setengah" },
  { title: "Pelayanan Setengah Badan", company: "PT. ANDIKA PRATAMA", location: "Indonesia", duration: "7 Hari", salary: "Rp 170-200 Juta", type: "Setengah" },
  { title: "Pelayanan Setengah Badan", company: "PT. ANDIKA PRATAMA", location: "Indonesia", duration: "30 Hari", salary: "Rp 1-1.5 Miliar", type: "Setengah" },
  { title: "Pelayanan Badan Penuh", company: "PT. ANDIKA PRATAMA", location: "Indonesia", duration: "3 Hari", salary: "Rp 90-130 Juta", type: "Full" },
  { title: "Pelayanan Badan Penuh", company: "PT. ANDIKA PRATAMA", location: "Indonesia", duration: "7 Hari", salary: "Rp 340-400 Juta", type: "Full" },
  { title: "Pelayanan Badan Penuh", company: "PT. ANDIKA PRATAMA", location: "Indonesia", duration: "30 Hari", salary: "Rp 2-3 Miliar", type: "Full" },
];

export default function HomePage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <motion.header initial={{ y: -100 }} animate={{ y: 0 }} className={`fixed top-0 left-0 right-0 z-50 transition-all ${isScrolled ? "bg-white/95 shadow-lg" : "bg-transparent"}`}>
        <nav className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <a href="#beranda" className="flex items-center gap-3">
              <div className={`font-bold text-lg flex items-center gap-2 ${isScrolled ? "text-[#003366]" : "text-white"}`}>
                <img src="/logo-ap.svg" alt="Logo" className="w-12 h-12 rounded-lg" />
                <span className="hidden sm:inline">PT. ANDIKA PRATAMA</span>
              </div>
            </a>
            <div className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <a key={item.label} href={item.href} className={`text-sm font-medium hover:text-[#FFD700] ${isScrolled ? "text-[#003366]" : "text-white"}`}>{item.label}</a>
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
                <SheetHeader><SheetTitle className="text-[#003366]">PT. ANDIKA PRATAMA</SheetTitle></SheetHeader>
                <div className="flex flex-col gap-4 mt-8">
                  {navItems.map((item) => (
                    <a key={item.label} href={item.href} onClick={() => setMobileMenuOpen(false)} className="text-[#003366] font-medium py-2 px-4 rounded-lg hover:bg-[#003366]/5">{item.label}</a>
                  ))}
                  <Button asChild className="bg-[#FFD700] text-[#003366] font-semibold">
                    <a href="#kontak" onClick={() => setMobileMenuOpen(false)}>Hubungi Kami</a>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </motion.header>

      {/* Hero */}
      <section id="beranda" className="relative min-h-screen flex items-center justify-center" style={{ background: "linear-gradient(135deg, #003366 0%, #001a33 50%, #000000 100%)" }}>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#FFD700]/10 rounded-full blur-3xl animate-pulse" />
        </div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10 pt-20">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-4xl mx-auto text-center">
            <motion.div variants={fadeIn} className="mb-6">
              <Badge className="bg-[#FFD700]/20 text-[#FFD700] px-4 py-1">Pendaftaran Gratis</Badge>
            </motion.div>
            <motion.h1 variants={fadeInUp} className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              PT. ANDIKA PRATAMA: <span className="text-[#FFD700]">Solusi Kerja dengan Penghasilan Tertinggi</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg sm:text-xl text-white/80 mb-8 max-w-3xl mx-auto">
              Pendaftaran Gratis – Kontrak Langsung, Gaji Transparan
            </motion.p>
            <motion.div variants={fadeInUp} className="flex justify-center">
              <Button asChild size="lg" className="bg-[#FFD700] text-[#003366] hover:bg-[#E6C200] font-semibold px-12 py-6 text-lg">
                <a href="#kontak">HUBUNGI KAMI<ChevronRight className="ml-2 h-5 w-5" /></a>
              </Button>
            </motion.div>
            <motion.div variants={fadeInUp} className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 pt-8 border-t border-white/10">
              {[{ value: "4000+", label: "Wanita telah bekerja" }, { value: "5+", label: "Tahun berdiri" }, { value: "100%", label: "Gaji Transparan" }].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-[#FFD700]">{stat.value}</div>
                  <div className="text-white/60 text-sm mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About */}
      <section id="tentang" className="py-20 lg:py-32 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-16">
              <Badge className="bg-[#003366]/10 text-[#003366] mb-4">Tentang Kami</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-[#003366] mb-6">Mengapa PT. Andika Pratama?</h2>
              <p className="text-gray-600 text-lg max-w-3xl mx-auto">PT. ANDIKA PRATAMA adalah perusahaan profesional dengan pengalaman sejak 2020.</p>
            </div>
          </AnimatedSection>
          <AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
              {[{ icon: Briefcase, step: "1", title: "PENDAFTARAN", desc: "Gratis" }, { icon: Users, step: "2", title: "BEKERJA", desc: "Profesional" }, { icon: Wallet, step: "3", title: "TERIMA GAJI", desc: "Selesai Kontrak" }].map((item, index) => (
                <motion.div key={index} whileHover={{ scale: 1.05 }} className="bg-gradient-to-br from-[#003366] to-[#001a33] p-6 rounded-2xl text-white relative">
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
      </section>

      {/* Services */}
      <section id="layanan" className="py-20 lg:py-32 bg-[#F8FAFC]">
        <div className="container mx-auto px-4 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-16">
              <Badge className="bg-[#FFD700]/20 text-[#003366] mb-4">Layanan Kami</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-[#003366] mb-6">Pilihan Kontrak Premium</h2>
            </div>
          </AnimatedSection>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {services.map((service, index) => (
              <motion.div key={index} variants={scaleIn}>
                <Card className={`relative overflow-hidden h-full ${service.highlight ? "border-2 border-[#FFD700] shadow-xl" : "border border-gray-200"}`}>
                  {service.highlight && <Badge className="absolute top-4 right-4 bg-[#FFD700] text-[#003366]">Recommended</Badge>}
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-4">
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
                    <Separator />
                    <div className="space-y-3">
                      {service.packages.map((pkg, pkgIndex) => (
                        <div key={pkgIndex} className="flex items-center justify-between p-3 bg-[#003366]/5 rounded-lg">
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

      {/* Portfolio */}
      <section id="portofolio" className="py-20 lg:py-32 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-16">
              <Badge className="bg-[#003366]/10 text-[#003366] mb-4">Portofolio</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-[#003366] mb-6">Proyek & Lowongan Terbaru</h2>
            </div>
          </AnimatedSection>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolios.map((item, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full border border-gray-200 overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-[#003366] to-[#001a33] pb-4">
                    <CardTitle className="text-white text-lg">{item.title}</CardTitle>
                    <CardDescription className="text-white/70">{item.company}</CardDescription>
                    <Badge className={`w-fit mt-2 ${item.type === "Full" ? "bg-[#FFD700] text-[#003366]" : "bg-white/20 text-white"}`}>{item.type}</Badge>
                  </CardHeader>
                  <CardContent className="pt-4 space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-center gap-2 text-sm text-gray-600"><MapPin className="w-4 h-4" />{item.location}</div>
                      <div className="flex items-center gap-2 text-sm text-gray-600"><Clock className="w-4 h-4" />{item.duration}</div>
                    </div>
                    <div className="bg-[#003366]/5 p-3 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Wallet className="w-5 h-5 text-[#FFD700]" />
                        <span className="font-bold text-[#003366]">{item.salary}</span>
                      </div>
                    </div>
                    <Button asChild className="w-full bg-[#003366] hover:bg-[#001a33] text-white">
                      <a href="#kontak">Lamar Sekarang</a>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact */}
      <section id="kontak" className="py-20 lg:py-32 bg-[#F8FAFC]">
        <div className="container mx-auto px-4 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-16">
              <Badge className="bg-[#003366]/10 text-[#003366] mb-4">Kontak</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-[#003366] mb-6">Hubungi Kami</h2>
            </div>
          </AnimatedSection>
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <AnimatedSection>
              <Card className="border border-gray-200">
                <CardHeader><CardTitle className="text-[#003366]">Informasi Kontak</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4">
                    <MapPin className="w-6 h-6 text-[#003366]" />
                    <div>
                      <h3 className="font-semibold text-[#003366]">Alamat</h3>
                      <p className="text-gray-600">Tapaktuan, Kab. Aceh Selatan, ACEH</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Phone className="w-6 h-6 text-[#003366]" />
                    <div>
                      <h3 className="font-semibold text-[#003366]">WhatsApp</h3>
                      <p className="text-gray-600">+62 852-7021-8007</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Mail className="w-6 h-6 text-[#003366]" />
                    <div>
                      <h3 className="font-semibold text-[#003366]">Email</h3>
                      <p className="text-gray-600">Pt.andikapratama20@gmail.com</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
            <AnimatedSection>
              <Card className="border border-gray-200">
                <CardHeader><CardTitle className="text-[#003366]">Kirim Pesan</CardTitle></CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Button asChild className="w-full bg-[#003366] hover:bg-[#001a33] text-white" size="lg">
                      <a href="https://wa.me/6285270218007" target="_blank" rel="noopener noreferrer">
                        Hubungi via WhatsApp
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#003366] text-white py-12 mt-auto">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <img src="/logo-ap.svg" alt="Logo" className="w-10 h-10 rounded-lg" />
              <span className="font-bold text-lg">PT. ANDIKA PRATAMA</span>
            </div>
            <p className="text-white/60 text-sm">© 2024 PT. ANDIKA PRATAMA. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
