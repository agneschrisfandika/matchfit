
import React, { useState, useEffect } from 'react';
import { User, Theme } from '../types';

interface LandingPageProps {
  user: User | null;
  onLogout: () => void;
  onNavigate: (to: string) => void;
  toggleTheme: () => void;
  theme: Theme;
}

const LandingPage: React.FC<LandingPageProps> = ({ user, onLogout, onNavigate, toggleTheme, theme }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const invitationTypes = [
    { 
      title: "Pernikahan", 
      icon: "💍", 
      desc: "Desain elegan dengan fitur RSVP otomatis, galeri foto, dan navigasi lokasi untuk momen sakral Anda." 
    },
    { 
      title: "Tahlilan & Doa", 
      icon: "🙏", 
      desc: "Format sopan dan religius untuk mengundang kerabat dalam acara doa bersama atau peringatan." 
    },
    { 
      title: "Ulang Tahun", 
      icon: "🎂", 
      desc: "Tema ceria dan interaktif yang bisa dikustomisasi sesuai keinginan untuk pesta tak terlupakan." 
    },
    { 
      title: "Bisnis & UMKM", 
      icon: "💼", 
      desc: "Undangan grand opening, peluncuran produk, atau webinar dengan tampilan profesional." 
    },
  ];

  return (
    <div className="relative overflow-x-hidden">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-5'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo(0,0)}>
            <div className="w-10 h-10 gold-gradient rounded-lg flex items-center justify-center shadow-lg shadow-amber-500/20">
              <span className="text-white font-serif font-bold text-xl">A</span>
            </div>
            <span className="text-2xl font-serif font-bold text-zinc-900 dark:text-white tracking-tight">Aureum</span>
          </div>

          <div className="hidden md:flex items-center gap-10">
            <a href="#home" className="text-zinc-700 dark:text-zinc-300 hover:text-amber-600 dark:hover:text-amber-500 font-medium transition-colors">Home</a>
            <a href="#about" className="text-zinc-700 dark:text-zinc-300 hover:text-amber-600 dark:hover:text-amber-500 font-medium transition-colors">Keunggulan</a>
            <a href="#services" className="text-zinc-700 dark:text-zinc-300 hover:text-amber-600 dark:hover:text-amber-500 font-medium transition-colors">Produk</a>
            <a href="#contact" className="text-zinc-700 dark:text-zinc-300 hover:text-amber-600 dark:hover:text-amber-500 font-medium transition-colors">Kontak</a>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={toggleTheme}
              className="p-2.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-amber-100 dark:hover:bg-amber-900/30 transition-all"
              aria-label="Toggle Theme"
            >
              {theme === Theme.LIGHT ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 9H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              )}
            </button>

            {user ? (
              <div className="flex items-center gap-4">
                <span className="hidden md:inline text-zinc-600 dark:text-zinc-400">Halo, <span className="font-bold text-zinc-900 dark:text-white">{user.fullName}</span></span>
                <button 
                  onClick={onLogout}
                  className="px-6 py-2.5 rounded-full border-2 border-amber-600 text-amber-600 dark:text-amber-500 font-bold hover:bg-amber-600 hover:text-white transition-all active:scale-95"
                >
                  Keluar
                </button>
              </div>
            ) : (
              <button 
                onClick={() => onNavigate('#/login')}
                className="px-8 py-2.5 rounded-full gold-gradient text-white font-bold shadow-lg shadow-amber-600/20 hover:scale-105 transition-all active:scale-95"
              >
                Buat Undangan
              </button>
            )}

            <button 
              className="md:hidden text-zinc-900 dark:text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" /></svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-zinc-900 border-t border-zinc-100 dark:border-zinc-800 p-6 flex flex-col gap-6 shadow-xl animate-fade-in">
            <a href="#home" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium dark:text-white">Home</a>
            <a href="#about" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium dark:text-white">Keunggulan</a>
            <a href="#services" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium dark:text-white">Produk</a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium dark:text-white">Kontak</a>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 -right-20 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-amber-600/10 rounded-full blur-[120px]"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
          <div className="space-y-8 animate-slide-up">
            <div className="inline-block px-4 py-2 rounded-full bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
              <span className="text-amber-700 dark:text-amber-500 font-bold text-sm uppercase tracking-widest">E-Invitation Generator</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-zinc-900 dark:text-white leading-[1.1]">
              Undangan <span className="gold-text-gradient">Digital</span> Otomatis & Mewah
            </h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-lg">
              Buat undangan eksklusif untuk pernikahan, bisnis, atau momen berharga lainnya dalam hitungan detik. Praktis, modern, dan tanpa kertas.
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => onNavigate('#/register')}
                className="px-10 py-4 rounded-2xl gold-gradient text-white font-bold text-lg shadow-xl shadow-amber-600/25 hover:translate-y-[-4px] transition-all"
              >
                Coba Gratis
              </button>
              <button className="px-10 py-4 rounded-2xl border-2 border-zinc-200 dark:border-zinc-800 dark:text-white font-bold text-lg hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all">
                Lihat Katalog
              </button>
            </div>
            <div className="flex items-center gap-6 pt-4">
              <div className="flex -space-x-4">
                {[1,2,3,4].map(i => (
                  <img key={i} src={`https://picsum.photos/seed/user-${i}/100/100`} className="w-12 h-12 rounded-full border-4 border-white dark:border-zinc-950 object-cover shadow-md" alt="Avatar" />
                ))}
              </div>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm">Bergabung dengan <span className="text-zinc-900 dark:text-white font-bold">10,000+</span> pengguna yang puas.</p>
            </div>
          </div>
          <div className="hidden md:block relative animate-fade-in delay-300">
            <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-700">
              <img src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800" className="w-full h-auto" alt="Luxury Invitation Design" />
            </div>
            <div className="absolute -bottom-10 -left-10 w-64 h-64 border-[12px] border-amber-500/20 rounded-full"></div>
            <div className="absolute top-1/2 -translate-y-1/2 -right-12 w-48 h-48 gold-gradient rounded-3xl -rotate-12 blur-2xl opacity-30"></div>
          </div>
        </div>
      </section>

      {/* About/Features Section */}
      <section id="about" className="py-24 bg-zinc-50 dark:bg-zinc-900/50 transition-colors">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <h2 className="text-amber-600 font-bold uppercase tracking-[0.2em] text-sm">Kenapa Aureum?</h2>
            <h3 className="text-4xl md:text-5xl font-serif font-bold text-zinc-900 dark:text-white">Teknologi dalam Tradisi</h3>
            <div className="w-20 h-1.5 gold-gradient mx-auto rounded-full"></div>
            <p className="text-zinc-600 dark:text-zinc-400 text-lg pt-4">
              Kami menggabungkan keindahan desain tradisional dengan kecepatan teknologi otomatisasi modern.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-zinc-900 p-10 rounded-[2.5rem] shadow-xl border border-zinc-100 dark:border-zinc-800 hover:translate-y-[-8px] transition-all group">
              <div className="w-16 h-16 rounded-2xl bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h4 className="text-2xl font-serif font-bold text-zinc-900 dark:text-white mb-4">Sangat Cepat</h4>
              <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed">Cukup isi formulir singkat, dan sistem AI kami akan menggenerasi undangan digital cantik dalam hitungan detik.</p>
            </div>
            <div className="bg-white dark:bg-zinc-900 p-10 rounded-[2.5rem] shadow-xl border border-zinc-100 dark:border-zinc-800 hover:translate-y-[-8px] transition-all group">
              <div className="w-16 h-16 rounded-2xl bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" /></svg>
              </div>
              <h4 className="text-2xl font-serif font-bold text-zinc-900 dark:text-white mb-4">Kustomisasi Luas</h4>
              <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed">Pilih musik latar, skema warna, hingga font yang sesuai dengan kepribadian acara unik Anda.</p>
            </div>
            <div className="bg-white dark:bg-zinc-900 p-10 rounded-[2.5rem] shadow-xl border border-zinc-100 dark:border-zinc-800 hover:translate-y-[-8px] transition-all group">
              <div className="w-16 h-16 rounded-2xl bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
              </div>
              <h4 className="text-2xl font-serif font-bold text-zinc-900 dark:text-white mb-4">Ramah Mobile</h4>
              <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed">Undangan tampil sempurna di semua perangkat, memberikan kenyamanan maksimal bagi para tamu Anda.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services/Invitation Types Section */}
      <section id="services" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="space-y-4">
              <h2 className="text-amber-600 font-bold uppercase tracking-[0.2em] text-sm">Produk Kami</h2>
              <h3 className="text-4xl md:text-5xl font-serif font-bold text-zinc-900 dark:text-white">Satu Platform, Semua Kebutuhan</h3>
            </div>
            <p className="text-zinc-500 dark:text-zinc-400 max-w-md text-lg">
              Dari momen sakral hingga promosi bisnis, kami menyediakan format undangan yang tepat untuk setiap narasi.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {invitationTypes.map((type, idx) => (
              <div key={idx} className="group p-8 rounded-[2rem] bg-zinc-50 dark:bg-zinc-900 border border-transparent hover:border-amber-500/30 transition-all cursor-default hover:shadow-2xl">
                <span className="text-5xl mb-6 block transform group-hover:scale-125 transition-transform duration-300">{type.icon}</span>
                <h5 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">{type.title}</h5>
                <p className="text-zinc-500 dark:text-zinc-400 mb-6 leading-relaxed">{type.desc}</p>
                <button className="text-amber-600 font-bold flex items-center gap-2 group-hover:gap-4 transition-all">
                  Lihat Demo <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-zinc-900 dark:bg-black relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full gold-gradient opacity-10 blur-[100px]"></div>
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center relative z-10">
          <div className="space-y-8">
            <h2 className="text-amber-500 font-bold uppercase tracking-[0.2em] text-sm">Konsultasi</h2>
            <h3 className="text-4xl md:text-6xl font-serif font-bold text-white leading-tight">Siap Untuk Membuat Undangan Anda?</h3>
            <p className="text-zinc-400 text-lg leading-relaxed">
              Tim dukungan kami siap membantu Anda memilih desain terbaik atau menjawab pertanyaan teknis seputar platform Aureum.
            </p>
            <div className="space-y-6">
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-xl bg-zinc-800 flex items-center justify-center">
                  <svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </div>
                <div>
                  <p className="text-zinc-500 text-xs uppercase font-bold tracking-widest">Email Support</p>
                  <p className="text-white font-medium">cs@aureum-invitation.com</p>
                </div>
              </div>
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-xl bg-zinc-800 flex items-center justify-center">
                  <svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-3.44A22.942 22.942 0 0010 11.002V7c0-5.034 4.066-9 9-9h1a2 2 0 012 2v2.5" /></svg>
                </div>
                <div>
                  <p className="text-zinc-500 text-xs uppercase font-bold tracking-widest">WhatsApp</p>
                  <p className="text-white font-medium">+62 812-3456-7890</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl animate-slide-up">
            <h4 className="text-2xl font-serif font-bold text-zinc-900 mb-6">Kirim Pertanyaan</h4>
            <form className="space-y-6" onSubmit={(e) => {e.preventDefault(); alert("Pesan terkirim! Tim kami akan segera menghubungi Anda.")}}>
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest ml-1">Nama</label>
                <input type="text" className="w-full px-5 py-4 rounded-2xl bg-zinc-50 border-zinc-100 focus:border-amber-500 outline-none transition text-zinc-900" placeholder="Nama Lengkap" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest ml-1">Email</label>
                <input type="email" className="w-full px-5 py-4 rounded-2xl bg-zinc-50 border-zinc-100 focus:border-amber-500 outline-none transition text-zinc-900" placeholder="email@example.com" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest ml-1">Subjek Acara</label>
                <select className="w-full px-5 py-4 rounded-2xl bg-zinc-50 border-zinc-100 focus:border-amber-500 outline-none transition text-zinc-900">
                  <option>Pernikahan</option>
                  <option>Tahlilan</option>
                  <option>Ulang Tahun</option>
                  <option>Bisnis/UMKM</option>
                </select>
              </div>
              <button className="w-full py-5 gold-gradient text-white font-bold rounded-2xl shadow-xl shadow-amber-500/20 hover:opacity-90 active:scale-[0.98] transition">Hubungi Sekarang</button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-zinc-100 dark:bg-zinc-950 pt-20 pb-10 transition-colors">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-2 space-y-8">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 gold-gradient rounded-lg flex items-center justify-center shadow-md">
                  <span className="text-white font-serif font-bold text-xl">A</span>
                </div>
                <span className="text-2xl font-serif font-bold text-zinc-900 dark:text-white tracking-tight">Aureum</span>
              </div>
              <p className="text-zinc-500 dark:text-zinc-400 max-w-sm leading-relaxed text-lg">
                Memberikan solusi undangan digital modern yang menghubungkan emosi dan kemudahan dalam satu klik.
              </p>
              <div className="flex gap-4">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center hover:bg-amber-600 hover:text-white transition-all cursor-pointer">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12c0-5.523-4.477-10-10-10z"/></svg>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <h6 className="font-bold text-zinc-900 dark:text-white uppercase tracking-widest text-sm">Navigasi</h6>
              <ul className="space-y-4">
                <li><a href="#home" className="text-zinc-500 dark:text-zinc-400 hover:text-amber-600 transition-colors">Home</a></li>
                <li><a href="#about" className="text-zinc-500 dark:text-zinc-400 hover:text-amber-600 transition-colors">Keunggulan</a></li>
                <li><a href="#services" className="text-zinc-500 dark:text-zinc-400 hover:text-amber-600 transition-colors">Katalog Produk</a></li>
                <li><a href="#contact" className="text-zinc-500 dark:text-zinc-400 hover:text-amber-600 transition-colors">Kontak Kami</a></li>
              </ul>
            </div>
            <div className="space-y-6">
              <h6 className="font-bold text-zinc-900 dark:text-white uppercase tracking-widest text-sm">Undangan</h6>
              <ul className="space-y-4">
                <li><a href="#" className="text-zinc-500 dark:text-zinc-400 hover:text-amber-600 transition-colors">Pernikahan Premium</a></li>
                <li><a href="#" className="text-zinc-500 dark:text-zinc-400 hover:text-amber-600 transition-colors">Tahlilan Digital</a></li>
                <li><a href="#" className="text-zinc-500 dark:text-zinc-400 hover:text-amber-600 transition-colors">Birthday Party</a></li>
                <li><a href="#" className="text-zinc-500 dark:text-zinc-400 hover:text-amber-600 transition-colors">Business Launch</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-10 border-t border-zinc-200 dark:border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-zinc-500 dark:text-zinc-600 text-sm">© 2024 Aureum Digital Invitation. Seluruh hak cipta dilindungi.</p>
            <div className="flex gap-8 text-sm text-zinc-500 dark:text-zinc-600">
              <a href="#" className="hover:text-amber-600 transition-colors">Syarat & Ketentuan</a>
              <a href="#" className="hover:text-amber-600 transition-colors">Kebijakan Privasi</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
