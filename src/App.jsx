import React, { useState, useEffect, useRef } from "react";
import { 
  motion, 
  AnimatePresence, 
  useScroll, 
  useSpring, 
  useTransform, 
  useMotionValue, 
  useMotionTemplate,
  useInView
} from "framer-motion";
import {
  ShieldCheck, MessageCircle, Car, Heart, Building2, CheckCircle2,
  Phone, Mail, MapPin, TrendingUp, Lock, ArrowUpRight, Stethoscope,
  Briefcase, ShieldAlert, Menu, X, Send, Zap, Gem, Scale, Coins,
  Globe, Quote, Star, Users, Award, BriefcaseBusiness, XCircle,
  BarChart3, Clock, Check
} from "lucide-react";

/* ======================================================
   CONFIGURAÇÕES GLOBAIS & PALETA (MIDNIGHT LUXURY VIBRANT)
====================================================== */

const PALETTE = {
  sky: "#78bccf",       
  lavender: "#c5bccf",  
  blue: "#7093cc",      
  gold: "#decd3f",      
  bg: "#020617",        
  darkBg: "#0f172a",    
  card: "#1e293b",      
  text: "#f1f5f9"       
};

const CONTACT_INFO = {
  phone: "+55 11 4318 3734",
  address1: "Alameda Terracota, 215 - Salas 720 e 721, Espaço Cerâmica - São Caetano do Sul, SP.",
  address2: "Alameda Terracota, 185 - Sala 716, Espaço Cerâmica - São Caetano do Sul, SP.",
  hours: "Segunda à Sexta: 08:30 - 18:30"
};

const WHATSAPP_MAIN = "551143183734";
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_MAIN}?text=${encodeURIComponent(
  "Olá! Vim pelo site e desejo uma consultoria exclusiva."
)}`;

/* ======================================================
   HOOKS & UTILITÁRIOS VISUAIS
====================================================== */

function Counter({ value, suffix = "" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const spring = useSpring(0, { mass: 1, stiffness: 50, damping: 20 });
  const display = useTransform(spring, (current) => 
    Math.round(current).toLocaleString() + suffix
  );

  useEffect(() => {
    if (isInView) {
      spring.set(value); 
    }
  }, [isInView, value, spring]);

  return <motion.span ref={ref}>{display}</motion.span>;
}

/* ======================================================
   COMPONENTES UI AVANÇADOS
====================================================== */

const PrimeButton = ({ children, onClick, className = "", variant = "gold" }) => { 
  const variants = {
    primary: {
      background: `linear-gradient(135deg, ${PALETTE.blue} 0%, ${PALETTE.sky} 100%)`,
      text: "text-white",
      border: "border-blue-400/50"
    },
    gold: {
      background: `linear-gradient(135deg, ${PALETTE.gold} 0%, #d4c030 100%)`, 
      text: "text-[#020617]", 
      border: "border-yellow-400/50"
    },
    dark: {
      background: "rgba(255,255,255,0.05)",
      text: "text-white",
      border: "border-white/10"
    }
  };
  const style = variants[variant] || variants.gold;

  return (
    <motion.button
      whileHover={{ scale: 1.05, boxShadow: `0 0 25px ${variant === 'gold' ? PALETTE.gold : PALETTE.blue}40` }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`relative group px-8 py-4 rounded-xl font-black uppercase text-[10px] tracking-[2px] shadow-lg overflow-hidden border ${style.border} ${style.text} ${className}`}
      style={{ background: style.background }}
    >
      <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-shimmer" />
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </motion.button>
  );
};

const SpotlightCard = ({ children, className = "", borderColor = "rgba(255,255,255,0.1)", glowColor = "rgba(255,255,255,0.1)" }) => {
  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className={`relative border bg-[#0f172a]/40 backdrop-blur-sm group rounded-[30px] on-hover-trigger transition-colors duration-500 ${className}`}
      onMouseMove={handleMouseMove}
      style={{ borderColor: borderColor }}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[30px] opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              ${glowColor},
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
};

// Componente de Logo Atualizado com Tratamento de Erro Robusto
const MasterPrimeLogo = () => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="h-10 md:h-12 w-48 relative flex items-center">
      {!imgError ? (
        <img 
          src="/logo.png" 
          alt="Master Prime Elite" 
          className="h-full w-auto object-contain"
          onError={() => setImgError(true)}
        />
      ) : (
        <div className="w-full h-full border border-dashed border-white/20 rounded-lg flex items-center justify-center bg-white/5 text-[10px] text-slate-400 uppercase tracking-widest font-bold px-2 text-center">
            LOGO.PNG (404)
        </div>
      )}
    </div>
  );
};

const TextReveal = ({ text, className, delay = 0 }) => {
  const words = text.split(" ");
  return (
    <motion.h2 className={className}>
      {words.map((word, i) => {
        // Verifica se a palavra é "protegido" para aplicar o destaque
        const isHighlight = word.toLowerCase().includes("protegido");
        return (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: delay + (i * 0.1), ease: "easeOut" }}
            className={`inline-block mr-2 ${isHighlight ? 'text-transparent bg-clip-text' : ''}`}
            style={isHighlight ? { 
              backgroundImage: `linear-gradient(to right, ${PALETTE.sky}, ${PALETTE.lavender})`,
              filter: `drop-shadow(0 0 15px ${PALETTE.sky}40)` 
            } : {}}
          >
            {word}
          </motion.span>
        );
      })}
    </motion.h2>
  );
};

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  return (
    <motion.div 
      className="fixed top-0 left-0 right-0 h-1 origin-left z-[200]" 
      style={{ 
        scaleX, 
        background: `linear-gradient(to right, ${PALETTE.sky}, ${PALETTE.blue}, ${PALETTE.gold})` 
      }} 
    />
  );
};

/* ======================================================
   SEÇÕES DA PÁGINA
====================================================== */

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { name: "Seguro de Vida", href: "#seguro-vida" },
    { name: "Resultados", href: "#provas-sociais" },
    { name: "Comparativo", href: "#comparativo" },
    { name: "Depoimentos", href: "#depoimentos" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 w-full z-[100] transition-all duration-500 ${
        scrolled ? "bg-[#020617]/90 backdrop-blur-xl border-b border-blue-900/30 py-3 shadow-lg shadow-blue-900/5" : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        <a href="#" onClick={() => window.scrollTo(0,0)}>
           <MasterPrimeLogo /> 
        </a>

        <div className="hidden lg:flex items-center gap-8">
          {links.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-[10px] font-bold uppercase tracking-[2px] text-slate-400 hover:text-white transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#decd3f] transition-all group-hover:w-full" />
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <PrimeButton 
            onClick={() => window.open(WHATSAPP_LINK)} 
            className="hidden sm:flex !py-2.5 !px-6" 
            variant="gold"
          >
            Agendar Consultoria
          </PrimeButton>
          
          <button className="lg:hidden z-[120]" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="text-white" /> : <Menu className="text-white" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at 100% 0%)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 bg-[#020617] z-[110] flex flex-col items-center justify-center gap-8"
          >
            {links.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={() => setMobileMenuOpen(false)}
                className="text-2xl font-black text-white uppercase tracking-tighter"
              >
                {link.name}
              </a>
            ))}
            <PrimeButton onClick={() => window.open(WHATSAPP_LINK)} variant="gold">
              Agendar Consultoria
            </PrimeButton>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-24 overflow-hidden" style={{ backgroundColor: PALETTE.bg }}>
      {/* Background Dinâmico - Luzes de Neon/Luxo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
         <motion.div 
           animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360], opacity: [0.3, 0.5, 0.3] }}
           transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
           className="absolute -top-[10%] -right-[10%] w-[700px] h-[700px] rounded-full blur-[120px]" 
           style={{ backgroundColor: `${PALETTE.blue}15` }}
         />
         <motion.div 
           animate={{ scale: [1.2, 1, 1.2], x: [0, -50, 0], opacity: [0.2, 0.4, 0.2] }}
           transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
           className="absolute top-[40%] -left-[10%] w-[600px] h-[600px] rounded-full blur-[120px]" 
           style={{ backgroundColor: `${PALETTE.gold}08` }} // Brilho dourado sutil
         />
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        <div>
          {/* Badge removido conforme solicitado */}

          <TextReveal 
            text="Seu legado protegido com inteligência financeira." 
            className="text-5xl md:text-7xl font-black leading-[1.05] tracking-tighter text-white mb-6" 
          />
          
          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
            className="text-slate-400 text-lg md:text-xl mb-10 max-w-lg font-medium leading-relaxed"
          >
            Blindagem de ativos, liquidez tributária e <span className="font-bold px-1 rounded text-white border border-blue-500/30" style={{ backgroundColor: `${PALETTE.blue}20` }}>Consórcios High-End</span> para quem não aceita menos que a excelência.
          </motion.p>

          <div className="flex flex-col sm:flex-row gap-4">
            <PrimeButton variant="gold" onClick={() => window.open(WHATSAPP_LINK)}>
              Agendar Consultoria
            </PrimeButton>
            <button 
              onClick={() => document.getElementById('comparativo').scrollIntoView()}
              className="px-8 py-4 rounded-xl font-bold uppercase text-[10px] tracking-[2px] text-slate-400 border border-white/10 hover:border-sky-400/50 hover:bg-sky-400/5 hover:text-sky-300 transition-all flex items-center justify-center gap-2"
            >
              Ver Comparativo
            </button>
          </div>

          <div className="mt-12 flex items-center gap-6">
             <div className="flex -space-x-3">
               {[1,2,3,4].map(i => (
                 <div key={i} className="w-10 h-10 rounded-full border-2 border-[#020617] bg-slate-800 overflow-hidden ring-2 ring-white/5">
                    <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="Client" className="w-full h-full object-cover grayscale opacity-70 hover:opacity-100 transition-opacity" />
                 </div>
               ))}
             </div>
             <div>
                <div className="flex text-xs gap-0.5" style={{ color: PALETTE.gold }}>★★★★★</div>
                <p className="text-xs font-bold text-slate-500">Mais de <span className="text-slate-200">4.000</span> clientes protegidos</p>
             </div>
          </div>
        </div>

        {/* Hero Visual - Dark Glass Card */}
        <motion.div 
           initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
           animate={{ opacity: 1, scale: 1, rotateY: 0 }}
           transition={{ duration: 1.2, ease: "easeOut" }}
           className="relative hidden lg:block perspective-1000"
        >
           {/* Glow atrás do card */}
           <div className="absolute inset-0 bg-blue-500/20 blur-[60px] rounded-full transform translate-y-10" />
           
           <div className="relative z-10 bg-[#0f172a]/60 backdrop-blur-xl rounded-[40px] p-8 border border-blue-500/20 shadow-2xl transform transition-transform hover:scale-[1.01] duration-500 hover:border-blue-500/40">
              <div className="flex justify-between items-center mb-8">
                 <div>
                    <h3 className="text-lg font-bold text-white">Performance Patrimonial</h3>
                    <p className="text-xs text-slate-500 uppercase tracking-widest">Resumo Anual</p>
                 </div>
                 <div className="p-3 rounded-xl text-[#020617] shadow-[0_0_15px_rgba(222,205,62,0.4)]" style={{ backgroundColor: PALETTE.gold }}>
                    <TrendingUp size={24} />
                 </div>
              </div>

              {/* Gráficos Abstratos */}
              <div className="space-y-6">
                 {[
                   { l: "Eficiência Tributária", v: 92, c: PALETTE.sky },
                   { l: "Liquidez Sucessória", v: 98, c: PALETTE.blue },
                   { l: "Proteção de Ativos", v: 100, c: PALETTE.gold }
                 ].map((item, i) => (
                   <div key={i}>
                      <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                        <span>{item.l}</span>
                        <span>{item.v}%</span>
                      </div>
                      <div className="h-2 w-full bg-[#020617] rounded-full overflow-hidden border border-white/5">
                         <motion.div 
                           initial={{ width: 0 }}
                           animate={{ width: `${item.v}%` }}
                           transition={{ duration: 1.5, delay: 0.5 + (i * 0.2) }}
                           className="h-full rounded-full relative shadow-[0_0_10px_rgba(0,0,0,0.5)]"
                           style={{ backgroundColor: item.c, boxShadow: `0 0 10px ${item.c}60` }}
                         >
                            <div className="absolute right-0 top-0 bottom-0 w-full bg-gradient-to-l from-white/30 to-transparent" />
                         </motion.div>
                      </div>
                   </div>
                 ))}
              </div>

              {/* Floating Element */}
              <motion.div 
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-10 -left-10 bg-[#1e293b] p-5 rounded-2xl shadow-xl border border-sky-400/20 flex items-center gap-4"
              >
                 <div className="p-3 rounded-full shadow-[0_0_10px_rgba(120,188,207,0.3)]" style={{ backgroundColor: `${PALETTE.sky}20`, color: PALETTE.sky }}>
                    <ShieldCheck size={24} />
                 </div>
                 <div>
                    <p className="text-xs text-slate-500 font-bold uppercase">Status da Apólice</p>
                    <p className="text-sm font-black text-white">100% VIGENTE</p>
                 </div>
              </motion.div>
           </div>
        </motion.div>
      </div>
    </section>
  );
}

function SocialProof() {
  const stats = [
    { label: "Vidas Impactadas", value: 2000, suffix: "+", icon: Users, color: PALETTE.blue },
    { label: "Anos de Mercado", value: 15, suffix: "+", icon: Award, color: PALETTE.gold },
    { label: "Negócios Gerados", value: 4000, suffix: "+", icon: BriefcaseBusiness, color: PALETTE.sky },
  ];

  return (
    <section id="provas-sociais" className="py-20 relative z-20 border-y border-white/5" style={{ backgroundColor: PALETTE.bg }}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-white/10">
          {stats.map((s, idx) => (
            <div key={idx} className="flex flex-col items-center text-center p-6 group cursor-default">
              <div className="mb-4 p-4 rounded-full transition-all duration-500 bg-white/5 group-hover:bg-white/10 border border-transparent group-hover:border-white/10"
                   style={{ borderColor: `${s.color}20` }}>
                 <s.icon size={32} style={{ color: s.color, filter: `drop-shadow(0 0 5px ${s.color}60)` }} strokeWidth={1.5} />
              </div>
              <div className="text-5xl font-black text-white tracking-tighter mb-2">
                 <Counter value={s.value} suffix={s.suffix} />
              </div>
              <p className="text-[10px] uppercase font-bold tracking-[3px] text-slate-500">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function LifeInsuranceSection() {
    const features = [
        { icon: Coins, title: "Isenção Fiscal", desc: "Capital segurado 100% isento de IR e ITCMD para beneficiários.", color: PALETTE.sky },
        { icon: Zap, title: "Liquidez Flash", desc: "Recursos liberados em dias, sem travas de inventário ou custos judiciais.", color: PALETTE.gold },
        { icon: Scale, title: "Sucessão Jurídica", desc: "Estrutura blindada para compra de quotas e continuidade empresarial.", color: PALETTE.sky },
        { icon: ShieldAlert, title: "Proteção em Vida", desc: "Receba o capital em vida para diagnósticos de doenças graves.", color: PALETTE.lavender }
    ];

    const partners = ["Prudential", "Allianz", "Mapfre", "Porto", "MetLife", "SulAmérica", "Tokio", "Liberty"];

    return (
        <section id="seguro-vida" className="py-24 relative overflow-hidden text-white" style={{ backgroundColor: "#0B1121" }}>
            {/* Elementos de fundo sutis */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none opacity-20" style={{ backgroundColor: PALETTE.blue }} />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-[100px] pointer-events-none opacity-10" style={{ backgroundColor: PALETTE.gold }} />

            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                <div className="grid lg:grid-cols-5 gap-16 items-center">
                    <div className="lg:col-span-2">
                        {/* Badge removido conforme solicitado */}
                        
                        <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
                            O Seguro de Vida <br/> 
                            <span className="text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(to right, ${PALETTE.sky}, ${PALETTE.lavender})` }}>
                                Estratégico.
                            </span>
                        </h2>
                        <p className="text-slate-400 text-lg font-light leading-relaxed mb-8">
                            Esqueça o seguro "padrão". Nossa consultoria desenha apólices de <strong>Alta Performance</strong> que funcionam como uma ferramenta de engenharia financeira para garantir que seu legado atravesse gerações intacto.
                        </p>
                        
                        <div className="p-6 rounded-2xl bg-white/5 border border-yellow-400/20 backdrop-blur-md mb-8">
                            <div className="flex items-start gap-4">
                                <Gem className="shrink-0 mt-1" style={{ color: PALETTE.gold, filter: "drop-shadow(0 0 8px rgba(222,205,62,0.5))" }} />
                                <div>
                                    <h4 className="font-bold text-white mb-1">Diferencial Master Prime</h4>
                                    <p className="text-sm text-slate-400">Acesso exclusivo às apólices "Black" das maiores seguradoras globais, com coberturas não listadas no varejo.</p>
                                </div>
                            </div>
                        </div>

                        <PrimeButton variant="gold" onClick={() => window.open(WHATSAPP_LINK)}>
                            Agendar Consultoria
                        </PrimeButton>
                    </div>

                    <div className="lg:col-span-3 grid sm:grid-cols-2 gap-5">
                        {features.map((f, i) => (
                            <motion.div 
                                key={i} 
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="p-8 rounded-[24px] bg-[#1e293b]/40 border hover:bg-[#1e293b]/60 transition-all duration-300 group hover:-translate-y-1 relative overflow-hidden"
                                style={{ borderColor: `${f.color}40` }}
                            >
                                <div className="absolute top-0 left-0 w-1 h-full" style={{ backgroundColor: f.color }} />
                                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <f.icon size={24} style={{ color: f.color, filter: `drop-shadow(0 0 5px ${f.color}60)` }} />
                                </div>
                                <h4 className="text-lg font-bold mb-3 text-slate-100">{f.title}</h4>
                                <p className="text-sm text-slate-400 font-light leading-relaxed">{f.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Marquee de Parceiros */}
                <div className="mt-24 pt-12 border-t border-white/5">
                    <p className="text-center text-[10px] font-black uppercase tracking-[4px] text-slate-600 mb-8">Seguradoras Parceiras Global</p>
                    <div className="relative overflow-hidden w-full mask-linear-gradient">
                         <div className="absolute left-0 top-0 bottom-0 w-24 z-10" style={{ background: `linear-gradient(to right, #0B1121, transparent)` }} />
                         <div className="absolute right-0 top-0 bottom-0 w-24 z-10" style={{ background: `linear-gradient(to left, #0B1121, transparent)` }} />
                         
                         <motion.div 
                           className="flex gap-12 whitespace-nowrap"
                           animate={{ x: ["0%", "-50%"] }}
                           transition={{ duration: 30, ease: "linear", repeat: Infinity }}
                         >
                            {[...partners, ...partners, ...partners].map((p, i) => (
                                <span key={i} className="text-2xl font-black uppercase text-slate-600 hover:text-white transition-colors cursor-default select-none hover:drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]">
                                    {p}
                                </span>
                            ))}
                         </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function ComparisonSection() {
    const rows = [
        { feat: "Juros", me: "0% (Apenas Taxa Adm)", bank: "8% a 14% a.a." },
        { feat: "Custo Total", me: "Baixo Custo Efetivo", bank: "Até 3x o valor do bem" },
        { feat: "Entrada", me: "Zero Obrigatória", bank: "Mínimo 20% a 30%" },
        { feat: "Poder de Compra", me: "À Vista (Descontos)", bank: "Condicionado" },
    ];

    return (
        <section id="comparativo" className="py-32 relative overflow-hidden" style={{ backgroundColor: PALETTE.bg }}>
             <div className="max-w-5xl mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <span className="font-black uppercase tracking-widest text-xs" style={{ color: PALETTE.gold }}>A Matemática não mente</span>
                    <h2 className="text-4xl font-black text-white mt-4">Consórcio vs. Financiamento</h2>
                </div>

                <div className="bg-[#0f172a] rounded-[30px] shadow-2xl border-t-2 border-x border-b border-white/5 overflow-hidden" style={{ borderTopColor: PALETTE.blue }}>
                    <div className="grid grid-cols-3 text-white p-6 text-[10px] font-black uppercase tracking-widest text-center border-b border-white/10" 
                         style={{ background: `linear-gradient(to right, #0B1121, ${PALETTE.blue}10, #0B1121)` }}>
                        <div className="text-left">Critério</div>
                        <div style={{ color: PALETTE.sky }}>Master Prime</div>
                        <div className="text-slate-500">Banco Comum</div>
                    </div>
                    
                    {rows.map((r, i) => (
                        <div key={i} className="grid grid-cols-3 p-6 border-b border-white/5 hover:bg-white/5 transition-colors items-center text-sm">
                            <div className="font-bold text-slate-300">{r.feat}</div>
                            <div className="text-center font-black flex justify-center items-center gap-2" style={{ color: PALETTE.sky }}>
                                <CheckCircle2 size={16} style={{ filter: `drop-shadow(0 0 5px ${PALETTE.sky}60)` }} /> {r.me}
                            </div>
                            <div className="text-center text-slate-600 font-medium">
                                {r.bank}
                            </div>
                        </div>
                    ))}
                    
                    <div className="p-8 flex flex-col md:flex-row items-center justify-between gap-6" style={{ backgroundColor: `${PALETTE.blue}10`, borderTop: `1px solid ${PALETTE.blue}30` }}>
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-white/10 rounded-full shadow-sm" style={{ color: '#4ade80' }}>
                                <TrendingUp />
                            </div>
                            <div>
                                <p className="font-bold text-white">Economia Inteligente</p>
                                <p className="text-xs text-slate-400">Em média 45% mais barato que financiamento.</p>
                            </div>
                        </div>
                        <PrimeButton className="!py-3 !px-6" onClick={() => window.open(WHATSAPP_LINK)}>
                            Agendar Consultoria
                        </PrimeButton>
                    </div>
                </div>
             </div>
        </section>
    );
}

function Solutions() {
  const cards = [
    { title: "Consórcio Imobiliário", desc: "Alavancagem patrimonial sem juros. Compre imóveis ou terrenos de forma estratégica.", Icon: Building2, color: PALETTE.blue },
    { title: "Auto Premium", desc: "Acelere seu sonho. Cartas de crédito para veículos de luxo com taxas administrativas mínimas.", Icon: Car, color: PALETTE.gold },
    { title: "Saúde Internacional", desc: "Acesso aos melhores hospitais do mundo. Seguro saúde com cobertura global e concierge.", Icon: Globe, color: PALETTE.sky },
    { title: "Empresarial", desc: "Proteção de sócios (Key Man), responsabilidade civil e riscos operacionais.", Icon: Briefcase, color: PALETTE.lavender }
  ];

  return (
    <section id="solucoes" className="py-24" style={{ backgroundColor: PALETTE.bg }}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-16">
            <h2 className="text-4xl font-black text-white mb-4">Soluções 360º</h2>
            <p className="text-slate-400 max-w-2xl">Um ecossistema completo para quem busca proteção e multiplicação de patrimônio em um só lugar.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((c, i) => (
            <motion.div
               key={i}
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ delay: i * 0.1 }}
            >
                <SpotlightCard 
                  className="p-8 h-full flex flex-col" 
                  borderColor={`${c.color}40`}
                  glowColor={`${c.color}30`}
                >
                    <div className="w-14 h-14 rounded-2xl bg-white/5 shadow-lg border flex items-center justify-center mb-6 text-white"
                         style={{ borderColor: `${c.color}30`, boxShadow: `0 0 15px ${c.color}10` }}>
                        <c.Icon size={28} style={{ color: c.color, filter: `drop-shadow(0 0 5px ${c.color}80)` }} />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-3">{c.title}</h3>
                    <p className="text-sm text-slate-400 leading-relaxed mb-6 flex-grow">{c.desc}</p>
                    <a href={WHATSAPP_LINK} className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest hover:text-white transition-colors" style={{ color: c.color }}>
                        Saiba Mais <ArrowUpRight size={14} />
                    </a>
                </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsCarousel() {
    const reviews = [
        { name: "Arnaldo Costa", role: "Contemplação Consórcio", text: "Fiz um consórcio de carro, ofertei o lance e fui contemplado no primeiro mês. Profissionais competentes, trabalho 100% consultivo." },
        { name: "Danilo Gobbo", role: "Planeamento Automóvel", text: "Recomendo. Fui contemplado e a Master apresentou as melhores propostas, respeitou meu tempo. Muito satisfeito com o profissionalismo." },
        { name: "Túlio Zozolotto", role: "Seguro Ágil", text: "O atendimento foi excelente. Tinha urgência e a equipe resolveu tudo em menos de 24h. Já estava com o novo seguro contratado. Demais!" },
        { name: "Paulo González", role: "Planeamento Patrimonial", text: "Não foi sorte e sim planeamento a minha contemplação! Satisfeito com a rapidez e confiabilidade em apresentar seus produtos. Obrigado!" },
        { name: "Gabriel Cestari", role: "Gestão Familiar", text: "Sempre fui muito bem atendido. Já tenho o seguro de 4 carros com a corretora. Recomendo pelo ótimo atendimento!" }
    ];

    const carouselItems = [...reviews, ...reviews, ...reviews];
    const colors = [PALETTE.gold, PALETTE.blue, PALETTE.sky];

    return (
        <section id="depoimentos" className="py-24 relative overflow-hidden" style={{ backgroundColor: "#0B1121" }}>
            <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
            <div className="max-w-[1400px] mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <span className="text-[10px] font-black uppercase tracking-[3px] text-slate-500">Feedback de Clientes</span>
                    <h2 className="text-3xl md:text-4xl font-black text-white mt-2">Confiança Consolidada</h2>
                </div>

                <div className="relative w-full overflow-hidden mask-linear-gradient">
                     <div className="absolute left-0 top-0 bottom-0 w-24 z-20" style={{ background: `linear-gradient(to right, #0B1121, transparent)` }} />
                     <div className="absolute right-0 top-0 bottom-0 w-24 z-20" style={{ background: `linear-gradient(to left, #0B1121, transparent)` }} />
                     
                     <motion.div 
                       className="flex gap-8"
                       animate={{ x: ["0%", "-33.33%"] }}
                       transition={{ 
                           duration: 40,
                           ease: "linear", 
                           repeat: Infinity 
                       }}
                     >
                        {carouselItems.map((r, i) => {
                            const borderColor = colors[i % colors.length];
                            return (
                                <div 
                                    key={i} 
                                    className="min-w-[85vw] md:min-w-[400px] lg:min-w-[calc(33.333%-22px)] bg-[#0f172a] border p-8 rounded-[30px] flex flex-col justify-between hover:bg-[#15203b] transition-all shadow-xl"
                                    style={{ borderColor: `${borderColor}30` }}
                                >
                                    <div>
                                        <div className="flex gap-1 mb-6" style={{ color: borderColor }}>
                                            {[...Array(5)].map((_, starI) => (
                                                <Star key={starI} size={14} fill="currentColor" style={{ filter: `drop-shadow(0 0 3px ${borderColor}80)` }} />
                                            ))}
                                        </div>
                                        <p className="text-slate-300 italic mb-8 leading-relaxed text-sm md:text-base">"{r.text}"</p>
                                    </div>
                                    <div className="flex items-center gap-4 border-t border-white/5 pt-6">
                                        <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-lg" style={{ background: `linear-gradient(135deg, ${PALETTE.blue}, ${PALETTE.sky})` }}>
                                            {r.name.charAt(0)}
                                        </div>
                                        <div>
                                            <h5 className="text-white font-bold text-sm">{r.name}</h5>
                                            <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">{r.role}</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                     </motion.div>
                </div>
            </div>
        </section>
    );
}

function Footer() {
  return (
    <footer className="pt-20 pb-10 border-t border-blue-900/30" style={{ backgroundColor: "#020617" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-2">
                <MasterPrimeLogo />
                <p className="mt-6 text-slate-400 text-sm leading-relaxed max-w-sm">
                    Especialistas em proteção patrimonial e alavancagem financeira. Nosso compromisso é com a segurança do seu legado e a prosperidade do seu futuro.
                </p>
                <div className="mt-8 flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer hover:bg-blue-600 hover:shadow-[0_0_10px_#2563eb]"><MessageCircle size={18}/></div>
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer hover:bg-blue-600 hover:shadow-[0_0_10px_#2563eb]"><Mail size={18}/></div>
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer hover:bg-blue-600 hover:shadow-[0_0_10px_#2563eb]"><MapPin size={18}/></div>
                </div>
            </div>
            
            <div>
                <h4 className="font-bold text-white mb-6 uppercase text-xs tracking-widest">Contato</h4>
                <ul className="space-y-4 text-sm text-slate-400">
                    <li className="flex items-start gap-3">
                        <Phone size={16} className="shrink-0 mt-0.5" style={{ color: PALETTE.blue }} />
                        {CONTACT_INFO.phone}
                    </li>
                    <li className="flex items-start gap-3">
                        <MapPin size={16} className="shrink-0 mt-0.5" style={{ color: PALETTE.blue }} />
                        <div className="flex flex-col">
                           <span>{CONTACT_INFO.address1}</span>
                           <span className="mt-2 text-xs opacity-70">{CONTACT_INFO.address2}</span>
                        </div>
                    </li>
                    <li className="flex items-start gap-3">
                        <Clock size={16} className="shrink-0 mt-0.5" style={{ color: PALETTE.blue }} />
                        {CONTACT_INFO.hours}
                    </li>
                </ul>
            </div>

            <div>
                <h4 className="font-bold text-white mb-6 uppercase text-xs tracking-widest">Links</h4>
                <ul className="space-y-3 text-sm text-slate-400 font-medium">
                    <li><a href="#seguro-vida" className="hover:text-sky-400 transition-colors">Seguro de Vida</a></li>
                    <li><a href="#comparativo" className="hover:text-sky-400 transition-colors">Consórcio vs Financiamento</a></li>
                    <li><a href="#solucoes" className="hover:text-sky-400 transition-colors">Soluções Corporativas</a></li>
                    <li><a href="#depoimentos" className="hover:text-sky-400 transition-colors">Depoimentos</a></li>
                </ul>
            </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 font-medium">
            <p>© 2025 Master Prime. Todos os direitos reservados.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
                <a href="#" className="hover:text-slate-300">Política de Privacidade</a>
                <a href="#" className="hover:text-slate-300">Termos de Uso</a>
            </div>
        </div>
    </footer>
  );
}

export default function App() {
  return (
    <div className="font-sans antialiased selection:text-white" style={{ backgroundColor: PALETTE.bg, selectionBackgroundColor: PALETTE.sky }}>
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <SocialProof />
        <LifeInsuranceSection />
        <ComparisonSection />
        <Solutions />
        <div className="py-20 px-6" style={{ backgroundColor: PALETTE.bg }}>
            <div 
                className="max-w-6xl mx-auto rounded-[40px] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl border border-white/10"
                style={{ background: `linear-gradient(to right, #1e3a8a, ${PALETTE.blue})` }}
            >
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
                <motion.div 
                   initial={{ scale: 0.9, opacity: 0 }}
                   whileInView={{ scale: 1, opacity: 1 }}
                   className="relative z-10"
                >
                    <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight">Pronto para elevar o nível?</h2>
                    <p className="text-blue-50 text-lg mb-10 max-w-2xl mx-auto">Agende uma consultoria gratuita de 15 minutos e descubra como proteger seu patrimônio hoje.</p>
                    <button 
                       onClick={() => window.open(WHATSAPP_LINK)}
                       className="bg-white px-10 py-5 rounded-xl font-black uppercase tracking-[2px] shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
                       style={{ color: PALETTE.bg }}
                    >
                        Agendar Consultoria
                    </button>
                </motion.div>
            </div>
        </div>
        <TestimonialsCarousel />
      </main>
      <Footer />
      
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800;900&display=swap');
        
        body, html { 
          font-family: "Montserrat", sans-serif !important; 
          background-color: ${PALETTE.bg};
          color: ${PALETTE.text};
        }
        
        .mask-linear-gradient {
            mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
            -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }

        @keyframes shimmer {
            100% { transform: translateX(100%); }
        }
        .animate-shimmer {
            animation: shimmer 2s infinite;
        }

        ::selection {
            background-color: ${PALETTE.sky};
            color: white;
        }
      `}} />
    </div>
  );
}