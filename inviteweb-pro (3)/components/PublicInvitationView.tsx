
import React, { useState, useEffect } from 'react';
import { Invitation, RSVP } from '../types';
import { storage } from '../storage';

interface Props {
  invitationId: string;
  onNavigate: (to: string) => void;
}

const PublicInvitationView: React.FC<Props> = ({ invitationId, onNavigate }) => {
  const [invitation, setInvitation] = useState<Invitation | null>(null);
  const [rsvps, setRsvps] = useState<RSVP[]>([]);
  const [isRsvped, setIsRsvped] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  
  const [rsvpData, setRsvpData] = useState({
    guestName: '',
    guestEmail: '',
    status: 'hadir' as 'hadir' | 'tidak',
    message: ''
  });

  useEffect(() => {
    const inv = storage.getInvitations().find(i => i.id === invitationId);
    if (inv) {
      setInvitation(inv);
      setRsvps(storage.getRSVPs().filter(r => r.invitationId === invitationId));
      
      const timer = setInterval(() => {
        const eventDate = new Date(`${inv.eventDate}T${inv.eventTime}`).getTime();
        const now = new Date().getTime();
        const distance = eventDate - now;

        if (distance < 0) {
          clearInterval(timer);
          setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        } else {
          setTimeLeft({
            days: Math.floor(distance / (1000 * 60 * 60 * 24)),
            hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((distance % (1000 * 60)) / 1000)
          });
        }
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [invitationId]);

  const handleRSVP = (e: React.FormEvent) => {
    e.preventDefault();
    if (!invitation) return;

    const newRsvp: RSVP = {
      id: Math.random().toString(36).substr(2, 9),
      invitationId: invitation.id,
      guestName: rsvpData.guestName,
      guestEmail: rsvpData.guestEmail,
      status: rsvpData.status,
      message: rsvpData.message,
      createdAt: new Date().toISOString()
    };
    storage.addRSVP(newRsvp);
    setRsvps([newRsvp, ...rsvps]);
    setIsRsvped(true);

    const phoneNumber = "6285782559412";
    const statusText = rsvpData.status === 'hadir' ? 'bersedia hadir' : 'belum bisa hadir';
    const waMessage = `Halo, saya ${rsvpData.guestName} mengonfirmasi bahwa saya ${statusText} untuk acara "${invitation.eventName}".\nPesan: ${rsvpData.message || '-'}`;
    const waUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(waMessage)}`;
    
    window.open(waUrl, '_blank');
  };

  if (!invitation) return <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] font-serif text-[#D4AF37] text-xl animate-pulse">Menyiapkan Pengalaman Eksklusif...</div>;

  const themes = {
    wedding: {
      bg: 'bg-[#000000]',
      pattern: 'opacity-5 absolute inset-0 bg-[url("https://www.transparenttextures.com/patterns/black-paper.png")]',
      card: 'bg-[#0a0a0a] border-x border-white/5 shadow-[0_0_100px_rgba(0,0,0,0.9)]',
      accent: 'text-[#D4AF37]',
      accentBg: 'bg-[#D4AF37]',
      fontTitle: 'font-script',
      imgStyle: 'w-full h-[400px] object-cover rounded-[2.5rem]',
    },
    birthday: {
      bg: 'bg-[#f8faff]',
      pattern: 'opacity-5 absolute inset-0 bg-[url("https://www.transparenttextures.com/patterns/circles.png")]',
      card: 'bg-white shadow-2xl text-slate-800',
      accent: 'text-[#6c7aff]',
      accentBg: 'bg-[#6c7aff]',
      fontTitle: 'font-cursive',
      imgStyle: 'w-56 h-56 object-cover rounded-full border-[10px] border-white shadow-2xl mx-auto'
    },
    tahlilan: {
      bg: 'bg-[#0a4a3c]',
      pattern: 'islamic-pattern absolute inset-0 opacity-10 pointer-events-none',
      card: 'bg-transparent text-white',
      accent: 'text-[#D4AF37]',
      accentBg: 'bg-[#D4AF37]',
      fontTitle: 'font-cinzel',
      imgStyle: 'w-32 h-32 object-cover rounded-full border-4 border-[#D4AF37] shadow-xl mx-auto',
    },
    costume: {
      bg: 'bg-[#8c8216]', 
      pattern: 'opacity-10 absolute inset-0 bg-[url("https://www.transparenttextures.com/patterns/pinstripe-light.png")]',
      card: 'bg-white shadow-2xl',
      accent: 'text-white',
      accentBg: 'bg-[#B59449]', 
      fontTitle: 'font-script',
      imgStyle: 'w-52 h-52 object-cover rounded-full border-4 border-white mx-auto'
    }
  };

  const theme = themes[invitation.eventType] || themes.wedding;
  const mainImg = invitation.photos?.[0] || 'https://images.unsplash.com/photo-1512389055488-8d82cb26ba6c?q=80&w=1000&auto=format&fit=crop';

  if (!isOpen) {
    return (
      <div className={`min-h-screen flex items-center justify-center p-6 ${theme.bg} relative overflow-hidden font-quicksand`}>
        <div className={theme.pattern}></div>
        <div className="max-w-md w-full text-center z-10 animate-fade-up">
          <div className={`${invitation.eventType === 'wedding' ? 'bg-[#111111]/90' : (invitation.eventType === 'tahlilan' ? 'bg-[#0a4a3c]/90' : (invitation.eventType === 'birthday' ? 'bg-white/95 shadow-2xl rounded-[3.5rem]' : (invitation.eventType === 'costume' ? 'bg-[#8c8216]/90 border border-white/20 rounded-[3rem]' : 'bg-white/90')))} backdrop-blur-xl p-10 md:p-14`}>
            {invitation.eventType === 'tahlilan' && <p className="text-[#D4AF37] font-arabic text-3xl mb-6">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم</p>}
            {invitation.eventType === 'birthday' && <p className="text-[#6c7aff] font-cursive text-3xl mb-8">Special Invitation</p>}
            {invitation.eventType === 'costume' && <p className="text-white font-outfit font-bold text-xl mb-8 uppercase tracking-[0.2em]">Merry Christmas</p>}
            
            <div className="mb-10 relative inline-block">
                <img src={mainImg} className={`${invitation.eventType === 'tahlilan' ? 'w-48 h-48 rounded-full' : (invitation.eventType === 'costume' ? 'w-52 h-52 rounded-full border-4 border-white' : 'w-52 h-72 rounded-[2.5rem]')} object-cover mx-auto shadow-2xl`} alt="Cover" />
                <div className={`absolute -bottom-4 left-1/2 -translate-x-1/2 w-12 h-12 ${theme.accentBg} rounded-full flex items-center justify-center shadow-lg border-2 border-white`}>
                  <i className={`fas ${invitation.eventType === 'birthday' ? 'fa-birthday-cake' : (invitation.eventType === 'wedding' ? 'fa-heart' : (invitation.eventType === 'costume' ? 'fa-tree' : 'fa-envelope'))} text-white`}></i>
                </div>
            </div>
            
            <h2 className={`text-3xl md:text-4xl ${theme.fontTitle} ${theme.accent} mb-8 leading-tight tracking-wider font-bold uppercase`}>{invitation.eventName}</h2>
            <p className={`${invitation.eventType === 'costume' || invitation.eventType === 'tahlilan' || invitation.eventType === 'wedding' ? 'text-white/70' : 'text-slate-400'} mb-2 text-[10px] uppercase tracking-[0.3em] font-bold`}>Kepada Yth. Tamu Undangan,</p>
            
            <button 
              onClick={() => setIsOpen(true)}
              className={`${theme.accentBg} text-white w-full py-4 rounded-full font-bold uppercase tracking-widest text-xs shadow-xl hover:scale-105 transition transform active:scale-95 mt-4`}
            >
              <i className="fas fa-arrow-right mr-2"></i> BUKA UNDANGAN
            </button>
          </div>
        </div>
      </div>
    );
  }

  // TAHLILAN VIEW
  if (invitation.eventType === 'tahlilan') {
    return (
        <div className="min-h-screen bg-[#0a4a3c] selection:bg-[#D4AF37] selection:text-[#0a4a3c] relative overflow-x-hidden">
            <div className="max-w-xl mx-auto py-24 px-6 relative z-10 text-center animate-fade-up">
                <p className="font-arabic text-4xl text-[#D4AF37] mb-8">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم</p>
                <h2 className="text-white text-4xl font-cinzel font-bold mb-4">Yasin & Tahlil</h2>
                <div className="mb-12">
                    <img src={mainImg} className="w-48 h-48 object-cover rounded-full border-4 border-[#D4AF37] shadow-2xl mx-auto mb-6" alt="Foto" />
                    <h1 className="text-[#D4AF37] text-4xl font-serif font-bold tracking-tight mb-2">{invitation.eventName}</h1>
                    <p className="text-slate-400 text-xs uppercase tracking-[0.3em] font-bold">Rahimahullah</p>
                </div>
                <div className="bg-white rounded-[2rem] p-8 mb-12 shadow-2xl text-left max-w-sm mx-auto space-y-6">
                    <div className="flex items-center gap-6"><i className="fas fa-calendar-day text-[#0a4a3c] text-xl"></i><p className="text-slate-800 font-bold">{invitation.eventDate}</p></div>
                    <div className="flex items-center gap-6"><i className="fas fa-clock text-[#0a4a3c] text-xl"></i><p className="text-slate-800 font-bold">{invitation.eventTime} WIB</p></div>
                    <div className="flex items-center gap-6"><i className="fas fa-location-dot text-[#0a4a3c] text-xl"></i><p className="text-slate-800 font-bold text-sm">{invitation.eventLocation}</p></div>
                </div>
                <p className="text-slate-300 italic mb-12 px-6">"{invitation.eventMessage}"</p>
                <div className="bg-black/20 p-8 rounded-3xl text-left">
                   <h4 className="text-[#D4AF37] font-bold mb-4">Doa & Ucapan</h4>
                   <div className="space-y-3 max-h-60 overflow-y-auto custom-scrollbar">
                     {rsvps.map(r => (
                       <div key={r.id} className="bg-white/5 p-4 rounded-xl">
                         <p className="text-white font-bold text-xs">{r.guestName}</p>
                         <p className="text-slate-400 text-[11px] mt-1">{r.message}</p>
                       </div>
                     ))}
                   </div>
                </div>
            </div>
        </div>
    );
  }

  // BIRTHDAY VIEW
  if (invitation.eventType === 'birthday') {
    const eventDate = new Date(invitation.eventDate);
    const month = eventDate.toLocaleString('id-ID', { month: 'long' }).toUpperCase();
    const dayNum = eventDate.getDate();

    return (
        <div className="min-h-screen bg-[#f8faff] font-quicksand relative overflow-hidden flex items-center justify-center py-10 px-4">
            <div className="max-w-md w-full bg-white rounded-[4rem] shadow-2xl overflow-hidden relative z-10 animate-fade-up p-8 text-center">
                <div className="flex justify-center gap-1.5 mb-8">
                    {[1,2,3,4,5,6,7].map(i => <div key={i} className={`w-8 h-10 clip-flag ${['bg-[#93c5fd]','bg-[#a5b4fc]','bg-[#fca5a5]','bg-[#fef08a]'][i%4]}`}></div>)}
                </div>
                <h1 className="font-cursive text-[#6c7aff] text-4xl mb-12">{invitation.eventName} is turning!</h1>
                <img src={mainImg} className="w-56 h-56 object-cover rounded-full border-[10px] border-white shadow-2xl mx-auto mb-10" alt="Birthday" />
                
                <div className="flex justify-center border-y border-slate-100 py-6 mb-10">
                    <div className="px-6 border-r border-slate-200"><p className="text-[10px] font-bold text-[#6c7aff] uppercase">Bulan</p><p className="text-xl font-bold">{month}</p></div>
                    <div className="px-6 border-r border-slate-200"><p className="text-[10px] font-bold text-[#6c7aff] uppercase">Hari</p><p className="text-4xl font-black">{dayNum}</p></div>
                    <div className="px-6"><p className="text-[10px] font-bold text-[#6c7aff] uppercase">Waktu</p><p className="text-xl font-bold">{invitation.eventTime}</p></div>
                </div>

                <p className="text-slate-600 font-bold mb-10">{invitation.eventLocation}</p>
                <div className="bg-[#eef2ff] rounded-3xl p-6 mb-10">
                   <p className="text-[#6c7aff] text-xl font-bold tracking-widest">+62 857 8255 9412</p>
                </div>

                {!isRsvped && (
                  <form onSubmit={handleRSVP} className="space-y-4">
                    <input placeholder="Nama Anda" required className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-none outline-none focus:ring-2 ring-[#6c7aff] transition" value={rsvpData.guestName} onChange={(e) => setRsvpData({...rsvpData, guestName: e.target.value})} />
                    <textarea placeholder="Ucapan Ulang Tahun..." className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-none outline-none focus:ring-2 ring-[#6c7aff] h-24 transition" value={rsvpData.message} onChange={(e) => setRsvpData({...rsvpData, message: e.target.value})} />
                    <button type="submit" className="w-full bg-[#6c7aff] text-white py-4 rounded-2xl font-bold shadow-xl">Kirim Ucapan</button>
                  </form>
                )}
            </div>
            <style>{`.clip-flag { clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 50% 80%, 0% 100%); }`}</style>
        </div>
    );
  }

  // COSTUME (NATAL) VIEW
  if (invitation.eventType === 'costume') {
    return (
      <div className="min-h-screen bg-[#8c8216] font-quicksand relative overflow-hidden py-10 px-4">
        <div className="absolute top-0 left-0 right-0 h-20 flex justify-between px-10 opacity-60">
           {[1,2,3,4,5].map(i => <i key={i} className={`fas fa-lightbulb text-yellow-200 animate-pulse delay-[${i*100}ms]`}></i>)}
        </div>
        <div className="max-w-lg mx-auto relative z-10 animate-fade-up text-center">
            <p className="text-white text-sm font-bold tracking-widest mb-4">Keluarga Besar {invitation.organizerName} mengucapkan:</p>
            <div className="relative mb-8">
                <p className="text-white text-3xl font-bold">Selamat</p>
                <h1 className="font-script text-white text-8xl md:text-9xl -mt-6 filter drop-shadow-2xl">Natal</h1>
            </div>
            <p className="text-white/90 px-12 mb-8 leading-relaxed font-medium">"{invitation.eventMessage}"</p>
            
            <div className="relative h-24 mb-12 flex items-center justify-center">
              <div className="absolute w-full h-8 bg-gradient-to-r from-[#8c8216] via-[#B59449] to-[#8c8216] border-y border-white/20"></div>
              <i className="fas fa-ribbon text-[#B59449] text-7xl relative z-10 drop-shadow-xl"></i>
            </div>

            <div className="bg-white rounded-[2rem] p-10 mx-auto max-w-sm shadow-2xl">
               <div className="space-y-4">
                  <h4 className="text-[#8c8216] font-bold text-xl uppercase tracking-tighter">{invitation.eventDate}</h4>
                  <p className="text-slate-600 font-bold">{invitation.eventTime} WIB - Selesai</p>
                  <div className="w-full border-t border-dashed border-slate-300 my-6"></div>
                  <p className="text-slate-500 font-medium leading-relaxed">{invitation.eventLocation}</p>
               </div>
            </div>

            {!isRsvped && (
              <form onSubmit={handleRSVP} className="mt-12 space-y-4 bg-white/10 backdrop-blur p-8 rounded-[3rem] border border-white/20">
                <input placeholder="Nama Tamu" required className="w-full px-6 py-4 rounded-2xl bg-white outline-none border-none text-slate-800 font-bold" value={rsvpData.guestName} onChange={(e) => setRsvpData({...rsvpData, guestName: e.target.value})} />
                <textarea placeholder="Pesan Natal..." className="w-full px-6 py-4 rounded-2xl bg-white outline-none border-none text-slate-800 h-24 font-bold" value={rsvpData.message} onChange={(e) => setRsvpData({...rsvpData, message: e.target.value})} />
                <button type="submit" className="w-full bg-[#B59449] text-white py-4 rounded-2xl font-black uppercase tracking-widest shadow-xl">Konfirmasi Kehadiran</button>
              </form>
            )}
            <div className="flex justify-between items-end mt-12 px-6">
              <span className="text-5xl">🎄</span>
              <span className="text-white/30 text-[8px] uppercase tracking-[1em]">InviteWeb Pro</span>
              <span className="text-5xl">🎁</span>
            </div>
        </div>
      </div>
    );
  }

  // WEDDING (DEFAULT) VIEW
  return (
    <div className={`min-h-screen py-6 md:py-12 px-4 ${theme.bg} relative overflow-x-hidden transition-colors duration-700`}>
      <div className={theme.pattern}></div>
      <div className={`max-w-md mx-auto rounded-[3rem] overflow-hidden relative z-10 animate-fade-up ${theme.card}`}>
        <div className="p-8 md:p-10 text-center">
            <img src={mainImg} className={theme.imgStyle} alt="Main Image" />
            <h1 className={`text-4xl md:text-5xl ${theme.fontTitle} ${theme.accent} my-8 font-bold`}>{invitation.eventName}</h1>
            <p className="text-slate-500 italic mb-12">"{invitation.eventMessage}"</p>
            
            <div className="grid grid-cols-4 gap-3 mb-16 bg-slate-50 p-5 rounded-[2rem] border border-slate-100">
               {[{v:timeLeft.days, l:'HARI'}, {v:timeLeft.hours, l:'JAM'}, {v:timeLeft.minutes, l:'MENIT'}, {v:timeLeft.seconds, l:'DETIK'}].map(t => (
                 <div key={t.l}><p className="text-xl font-bold text-[#D4AF37]">{t.v}</p><p className="text-[7px] font-black text-slate-400">{t.l}</p></div>
               ))}
            </div>

            <div className="text-left border-l-2 border-[#D4AF37]/30 pl-6 mb-16">
               <h4 className={`${theme.accent} font-serif text-2xl mb-4`}>Detail Acara</h4>
               <p className="text-slate-800 font-bold mb-1">{invitation.eventDate}</p>
               <p className="text-slate-400 text-sm mb-4">{invitation.eventTime} WIB</p>
               <p className="text-slate-600 text-sm leading-relaxed">{invitation.eventLocation}</p>
            </div>

            {!isRsvped && (
              <form onSubmit={handleRSVP} className="bg-slate-50 p-6 rounded-3xl space-y-4">
                <input placeholder="Nama Lengkap" required className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200" value={rsvpData.guestName} onChange={(e) => setRsvpData({...rsvpData, guestName: e.target.value})} />
                <textarea placeholder="Ucapan..." className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 h-24" value={rsvpData.message} onChange={(e) => setRsvpData({...rsvpData, message: e.target.value})} />
                <button type="submit" className="w-full py-4 bg-[#D4AF37] text-white rounded-xl font-bold uppercase text-xs tracking-widest">Kirim RSVP</button>
              </form>
            )}
        </div>
      </div>
    </div>
  );
};

export default PublicInvitationView;
