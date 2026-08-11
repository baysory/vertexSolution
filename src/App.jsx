import React, { useState, useEffect, useRef, useId } from "react";
import {
  Menu,
  X,
  ArrowRight,
  ArrowDown,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  AtSign,
  CheckCircle2,
  ChevronDown,
  Smartphone,
  Globe,
  Layers,
  Rocket,
  Palette,
  ShieldCheck,
  Zap,
  Building2,
  User,
  Store,
  Wrench,
  Sparkles,
  Utensils,
  Compass,
  PenTool,
  Code,
  Gauge,
} from "lucide-react";

// ---------------------------------------------------------------------------
// TODO (Vertex): trocar pelo número real de WhatsApp, formato 55DDDNUMERO
// ---------------------------------------------------------------------------
const WHATSAPP_NUMBER = "5500000000000";
const WHATSAPP_TEXT = encodeURIComponent(
  "Olá! Vim pelo site da Vertex Solutions e quero criar meu site."
);
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_TEXT}`;

const NAV_LINKS = [
  { label: "Serviços", href: "#servicos" },
  { label: "Diferenciais", href: "#diferenciais" },
  { label: "Metodologia", href: "#metodologia" },
  { label: "Projetos", href: "#projetos" },
  { label: "Contato", href: "#contato" },
];

// Paleta estendida: azul-violeta continua sendo a cor de marca (logo, CTAs
// principais, nav). As outras 4 entram como acentos temáticos em itens
// repetidos (cards, ícones), pra tirar o site do monocromático.
const ACCENT_GRADIENTS = {
  brand: { strong: "from-blue-500 to-violet-600", soft: "from-blue-50 to-violet-50", text: "text-blue-600" },
  warm: { strong: "from-amber-500 to-orange-600", soft: "from-amber-50 to-orange-50", text: "text-orange-600" },
  creative: { strong: "from-rose-500 to-fuchsia-600", soft: "from-rose-50 to-fuchsia-50", text: "text-fuchsia-600" },
  fresh: { strong: "from-teal-500 to-emerald-600", soft: "from-teal-50 to-emerald-50", text: "text-teal-600" },
  cool: { strong: "from-sky-500 to-blue-600", soft: "from-sky-50 to-blue-50", text: "text-sky-600" },
};

const PROBLEMS = [
  { icon: AtSign, text: "Seu cliente te procura e encontra só o seu Instagram." },
  { icon: MessageCircle, text: "Você não tem uma página própria pra apresentar seus serviços direito." },
  { icon: Sparkles, text: "Sua marca não transmite todo o profissionalismo que o seu trabalho merece." },
  { icon: Smartphone, text: "Você depende 100% das redes sociais pra existir online." },
];

const SERVICES = [
  {
    icon: Layers,
    accent: "brand",
    title: "Landing Pages",
    text: "Páginas focadas em apresentar um produto, serviço ou campanha — feitas pra gerar conversão de verdade.",
  },
  {
    icon: Globe,
    accent: "cool",
    title: "Sites Profissionais",
    text: "Sites completos pra empresas e profissionais que querem apresentar a marca inteira na internet.",
  },
  {
    icon: Palette,
    accent: "creative",
    title: "Sites Personalizados",
    text: "Projeto construído em cima da identidade e da necessidade real de cada cliente — nada de template genérico.",
  },
  {
    icon: ShieldCheck,
    accent: "fresh",
    title: "Domínio e Presença Online",
    text: "Ajuda pra colocar o negócio oficialmente no ar, com domínio próprio e hospedagem.",
  },
  {
    icon: Zap,
    accent: "warm",
    title: "Automação",
    text: "Soluções que facilitam processos ligados à presença digital e ao atendimento.",
  },
];

const DIFFERENTIALS = [
  { icon: Palette, accent: "creative", title: "Design personalizado", text: "Seu site não precisa parecer igual ao de todo mundo." },
  { icon: Smartphone, accent: "cool", title: "Responsivo", text: "Experiência profissional em qualquer aparelho, do celular ao monitor grande." },
  { icon: Zap, accent: "brand", title: "Tecnologia moderna", text: "Construído com tecnologias atuais como React, Tailwind e Next.js." },
  { icon: CheckCircle2, accent: "warm", title: "Preço acessível", text: "Qualidade profissional pensada pra negócio real, não só pra grande empresa." },
  { icon: Sparkles, accent: "fresh", title: "Feito pra sua marca", text: "Cores, identidade, conteúdo e estrutura adaptados ao seu negócio — não o contrário." },
];

const METHOD_PHASES = [
  {
    number: "01",
    icon: Compass,
    accent: "warm",
    title: "Imersão na marca",
    text: "Entendemos seu negócio, seu público e o que te diferencia antes de desenhar qualquer coisa.",
  },
  {
    number: "02",
    icon: PenTool,
    accent: "creative",
    title: "Arquitetura e design",
    text: "Cada tela é pensada com intenção pra contar a história certa, validada antes de virar código.",
  },
  {
    number: "03",
    icon: Code,
    accent: "brand",
    title: "Desenvolvimento com React e Tailwind",
    text: "Componentes modulares, código limpo e performance de verdade — sem gambiarra.",
  },
  {
    number: "04",
    icon: Gauge,
    accent: "fresh",
    title: "Otimização e publicação",
    text: "Revisão de carregamento, testes em todos os dispositivos e o site no ar, pronto pra converter.",
  },
];

const MOCKUP_SCENES = [
  { label: "Loja Online", gradient: "from-rose-400 via-fuchsia-500 to-fuchsia-600" },
  { label: "Restaurante", gradient: "from-amber-400 via-orange-500 to-orange-600" },
  { label: "Prestador de Serviço", gradient: "from-teal-400 via-emerald-500 to-emerald-600" },
];

const DEMO_PROJECTS = [
  { icon: Utensils, accent: "warm", title: "Restaurante", text: "Cardápio digital, localização e contato direto pelo WhatsApp." },
  { icon: User, accent: "cool", title: "Profissional Autônomo", text: "Apresentação do trabalho, portfólio e formas de contato." },
  { icon: Building2, accent: "brand", title: "Empresa de Tecnologia", text: "Apresentação institucional, serviços e captação de leads." },
  { icon: Store, accent: "creative", title: "Loja", text: "Vitrine de produtos com visual moderno e chamadas pra venda." },
  { icon: Wrench, accent: "fresh", title: "Prestador de Serviço", text: "Página direta, com foco em gerar contato e orçamento rápido." },
];

const AUDIENCES = [
  { icon: User, accent: "cool", title: "Profissional autônomo?", text: "Apresente seu trabalho de um jeito que gera confiança à primeira vista." },
  { icon: Building2, accent: "brand", title: "Tem uma empresa?", text: "Crie uma presença digital que representa a marca inteira, não só um serviço." },
  { icon: Rocket, accent: "warm", title: "Começando agora?", text: "Comece já com uma estrutura profissional, sem precisar remendar depois." },
  { icon: Sparkles, accent: "creative", title: "Já tem uma marca?", text: "Eleve sua presença digital pro nível que sua marca já alcançou fora da internet." },
];

const FAQS = [
  {
    q: "Quanto custa um site?",
    a: "Varia de acordo com o tipo de projeto, número de páginas e funcionalidades. Manda uma mensagem que a gente monta uma proposta clara pro seu caso, sem compromisso.",
  },
  {
    q: "Quanto tempo leva pra ficar pronto?",
    a: "Depende do escopo — uma landing page costuma ser mais rápida que um site institucional completo. A gente alinha um prazo real logo na primeira conversa.",
  },
  {
    q: "O que eu preciso te mandar pra começar?",
    a: "O básico: informações sobre o seu negócio, textos e imagens que você já tenha, e referências visuais que você curte. O que faltar, a gente ajuda a construir junto.",
  },
  {
    q: "O site funciona bem no celular?",
    a: "Sim, sempre. Todo projeto é pensado primeiro pro celular e depois adaptado pras telas maiores — é onde a maioria dos seus clientes vai te encontrar.",
  },
  {
    q: "Depois que o site fica no ar, vocês somem?",
    a: "Não. A gente acompanha de perto logo após a publicação pra ajustes e dúvidas, e segue disponível se você precisar de alguma mudança depois.",
  },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function Reveal({ children, className = "", delay = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function Logo({ variant = "light" }) {
  const isDark = variant === "dark";
  const uid = useId();
  const gradId = `vertexGrad-${uid}`;

  return (
    <div className="flex items-center gap-2.5">
      <svg width="32" height="32" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <linearGradient id={gradId} x1="4" y1="4" x2="30" y2="30" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#7c3aed" />
          </linearGradient>
        </defs>
        <line x1="17" y1="17" x2="6" y2="9" stroke={`url(#${gradId})`} strokeWidth="1.6" strokeLinecap="round" />
        <line x1="17" y1="17" x2="28" y2="9" stroke={`url(#${gradId})`} strokeWidth="1.6" strokeLinecap="round" />
        <line x1="17" y1="17" x2="6" y2="25" stroke={`url(#${gradId})`} strokeWidth="1.6" strokeLinecap="round" />
        <line x1="17" y1="17" x2="28" y2="25" stroke={`url(#${gradId})`} strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="17" cy="17" r="4.2" fill={`url(#${gradId})`} />
        <circle cx="6" cy="9" r="2.4" fill={`url(#${gradId})`} />
        <circle cx="28" cy="9" r="2.4" fill={`url(#${gradId})`} />
        <circle cx="6" cy="25" r="2.4" fill={`url(#${gradId})`} />
        <circle cx="28" cy="25" r="2.4" fill={`url(#${gradId})`} />
      </svg>
      <div className="leading-none">
        <div className={`font-display font-bold tracking-tight text-lg ${isDark ? "text-white" : "text-slate-900"}`}>
          VERTEX
        </div>
        <div className={`font-body text-xs tracking-widest ${isDark ? "text-slate-400" : "text-slate-500"}`}>
          SOLUTIONS
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Sections
// ---------------------------------------------------------------------------

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-sm border-b border-slate-100" : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="flex items-center justify-between h-20">
          <a href="#top" className="shrink-0">
            <Logo variant="light" />
          </a>

          <nav className="hidden lg:flex items-center gap-9">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden lg:block">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 px-5 py-2.5 text-sm text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-600"
            >
              Criar meu site
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <button
            className="lg:hidden p-2 text-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-md"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-slate-100 shadow-lg">
          <div className="px-6 py-5 flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-base font-medium text-slate-700 hover:text-slate-900"
              >
                {link.label}
              </a>
            ))}
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 px-5 py-3 text-white font-semibold"
            >
              Criar meu site
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

function HeroMockup() {
  const [sceneIndex, setSceneIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      const t = setTimeout(() => {
        setSceneIndex((i) => (i + 1) % MOCKUP_SCENES.length);
        setFade(true);
      }, 300);
      return () => clearTimeout(t);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  const scene = MOCKUP_SCENES[sceneIndex];

  return (
    <div className="relative">
      <div className="absolute -top-4 -right-4 z-10 flex items-center gap-2 rounded-full bg-white border border-slate-200 shadow-lg px-3 py-2">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
        </span>
        <span className="text-xs font-semibold text-slate-700">Site no ar</span>
      </div>

      <div className="animate-float relative rounded-2xl border border-slate-200 bg-white shadow-2xl overflow-hidden">
        <div className="flex items-center gap-1.5 border-b border-slate-100 bg-slate-50 px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
          <div className="ml-3 flex-1 flex items-center gap-1.5 rounded-full bg-white border border-slate-200 px-3 py-1 text-xs font-mono text-slate-400">
            <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-br from-blue-500 to-violet-600" />
            seunegocio.com.br
          </div>
        </div>
        <div className={`p-6 space-y-4 transition-opacity duration-300 ${fade ? "opacity-100" : "opacity-0"}`}>
          <div className={`h-24 rounded-xl bg-gradient-to-br ${scene.gradient} flex items-end p-3`}>
            <span className="text-xs font-semibold text-white bg-slate-900 rounded-full px-2.5 py-1">
              {scene.label}
            </span>
          </div>
          <div className="h-2.5 rounded-full bg-slate-200 w-3/4" />
          <div className="h-2.5 rounded-full bg-slate-200 w-1/2" />
          <div className="flex gap-3 pt-2">
            <div className="h-8 w-28 rounded-full bg-gradient-to-r from-blue-600 to-violet-600" />
            <div className="h-8 w-20 rounded-full border border-slate-200" />
          </div>
          <div className="grid grid-cols-3 gap-3 pt-3">
            <div className="h-14 rounded-lg bg-slate-100" />
            <div className="h-14 rounded-lg bg-slate-100" />
            <div className="h-14 rounded-lg bg-slate-100" />
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-center gap-2">
        {MOCKUP_SCENES.map((s, i) => (
          <span
            key={s.label}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === sceneIndex ? "w-6 bg-blue-600" : "w-1.5 bg-slate-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function Hero() {
  const microLabels = [
    { icon: Palette, label: "Personalizado" },
    { icon: Smartphone, label: "100% responsivo" },
    { icon: Rocket, label: "No ar rápido" },
  ];

  return (
    <section id="top" className="relative overflow-hidden pt-40 pb-24 md:pt-48 md:pb-32 bg-gradient-to-b from-white to-slate-50">
      <div
        className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-gradient-to-br from-sky-200 to-violet-300 opacity-40 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-gradient-to-br from-amber-200 to-orange-300 opacity-30 blur-3xl"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <Reveal>
              <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-semibold tracking-wide text-slate-600 shadow-sm">
                Sites & Landing Pages sob medida
              </span>
            </Reveal>

            <Reveal delay={100}>
              <h1 className="font-display mt-6 text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight text-slate-900">
                Seu negócio já existe.{" "}
                <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                  Sua presença digital, ainda não.
                </span>
              </h1>
            </Reveal>

            <Reveal delay={200}>
              <p className="font-body mt-6 text-lg text-slate-600 max-w-xl leading-relaxed">
                Criamos sites e landing pages profissionais, personalizados e responsivos pra empresas e
                profissionais que querem ser levados a sério na internet.
              </p>
            </Reveal>

            <Reveal delay={300}>
              <div className="mt-9 flex flex-col sm:flex-row gap-4">
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 px-7 py-3.5 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-600"
                >
                  Criar meu site
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="#servicos"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 px-7 py-3.5 text-slate-700 font-semibold hover:border-slate-400 hover:bg-white transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-400"
                >
                  Conhecer nossos serviços
                </a>
              </div>
            </Reveal>

            <Reveal delay={400}>
              <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
                {microLabels.map((item) => (
                  <div key={item.label} className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                    <item.icon className="h-4 w-4 text-blue-600" />
                    {item.label}
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={200} className="relative">
            <div className="flex items-center gap-3 text-sm text-slate-400 font-medium mb-3">
              <span className="line-through decoration-slate-300">Instagram + WhatsApp + cartão de visita</span>
            </div>
            <div className="flex items-center gap-2 mb-5 text-blue-600 font-semibold text-sm">
              <ArrowDown className="h-4 w-4" />
              Sua nova presença digital
            </div>

            <HeroMockup />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ProblemSolution() {
  return (
    <section className="bg-slate-50 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <Reveal>
          <span className="text-sm font-semibold text-blue-600 tracking-wide">O problema</span>
          <h2 className="font-display mt-3 text-3xl md:text-4xl font-bold text-slate-900 max-w-2xl leading-tight">
            Seu negócio já existe. Mas será que ele existe na internet do jeito certo?
          </h2>
        </Reveal>

        <div className="mt-12 grid sm:grid-cols-2 gap-5">
          {PROBLEMS.map((item, i) => (
            <Reveal key={item.text} delay={i * 80}>
              <div className="flex items-start gap-4 rounded-2xl bg-white border border-slate-200 p-6 h-full">
                <div className="shrink-0 flex items-center justify-center h-11 w-11 rounded-xl bg-slate-100">
                  <item.icon className="h-5 w-5 text-slate-500" />
                </div>
                <p className="font-body text-slate-700 leading-relaxed">{item.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <div className="mt-14 rounded-3xl bg-gradient-to-r from-blue-600 to-violet-600 p-10 md:p-12 text-center">
            <h3 className="font-display text-2xl md:text-3xl font-bold text-white">
              Transforme seu negócio em uma presença digital de verdade.
            </h3>
            <p className="font-body mt-3 text-blue-50 max-w-xl mx-auto">
              Uma vitrine própria, no ar, trabalhando por você 24 horas por dia — não só um perfil emprestado.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="servicos" className="scroll-mt-24 bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <Reveal>
          <span className="text-sm font-semibold text-blue-600 tracking-wide">O que fazemos</span>
          <h2 className="font-display mt-3 text-3xl md:text-4xl font-bold text-slate-900 max-w-2xl leading-tight">
            Tudo que sua presença digital precisa, num só lugar
          </h2>
        </Reveal>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, i) => {
            const accent = ACCENT_GRADIENTS[service.accent];
            return (
              <Reveal key={service.title} delay={i * 70}>
                <div className="group h-full rounded-2xl border border-slate-200 p-7 hover:border-slate-300 hover:shadow-lg transition-all duration-300">
                  <div className={`flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-br ${accent.soft}`}>
                    <service.icon className={`h-6 w-6 ${accent.text}`} />
                  </div>
                  <h3 className="font-display mt-5 text-lg font-semibold text-slate-900">{service.title}</h3>
                  <p className="font-body mt-2 text-slate-600 leading-relaxed">{service.text}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Differentials() {
  return (
    <section id="diferenciais" className="scroll-mt-24 bg-slate-900 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <Reveal>
          <span className="text-sm font-semibold text-violet-400 tracking-wide">Por que a Vertex</span>
          <h2 className="font-display mt-3 text-3xl md:text-4xl font-bold text-white max-w-2xl leading-tight">
            Profissionalismo não precisa custar uma fortuna.
          </h2>
        </Reveal>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {DIFFERENTIALS.map((item, i) => {
            const accent = ACCENT_GRADIENTS[item.accent];
            return (
              <Reveal key={item.title} delay={i * 70}>
                <div className="h-full rounded-2xl border border-slate-700 bg-slate-800 p-7">
                  <div className={`flex items-center justify-center h-11 w-11 rounded-xl bg-gradient-to-br ${accent.strong}`}>
                    <item.icon className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="font-display mt-5 text-lg font-semibold text-white">{item.title}</h3>
                  <p className="font-body mt-2 text-slate-400 leading-relaxed">{item.text}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Method() {
  const [index, setIndex] = useState(0);
  const total = METHOD_PHASES.length;

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % total);
    }, 5500);
    return () => clearInterval(timer);
  }, [total]);

  const goTo = (i) => setIndex(((i % total) + total) % total);
  const phase = METHOD_PHASES[index];
  const accent = ACCENT_GRADIENTS[phase.accent];

  return (
    <section id="metodologia" className="scroll-mt-24 bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <Reveal>
          <span className="text-sm font-semibold text-blue-600 tracking-wide">Metodologia</span>
          <h2 className="font-display mt-3 text-3xl md:text-4xl font-bold text-slate-900 max-w-2xl leading-tight">
            O método por trás de cada projeto Vertex
          </h2>
          <p className="font-body mt-4 text-slate-600 max-w-2xl leading-relaxed">
            Um processo claro, sem atalhos — da imersão no seu negócio até o site no ar.
          </p>
        </Reveal>

        <Reveal delay={150}>
          <div className="mt-12 relative rounded-3xl border border-slate-200 bg-slate-50 overflow-hidden">
            <div className="vertex-dot-grid pointer-events-none absolute inset-0" aria-hidden="true" />

            <div className="relative grid md:grid-cols-2 gap-10 items-center p-8 md:p-14 min-h-96">
              <div>
                <span className="font-mono block text-7xl md:text-8xl font-bold text-slate-200 leading-none">
                  {phase.number}
                </span>
                <div className="-mt-8 md:-mt-10">
                  <span className={`inline-flex items-center rounded-full bg-white border border-slate-200 px-3 py-1 text-xs font-mono font-semibold tracking-wide ${accent.text}`}>
                    FASE {phase.number}
                  </span>
                  <h3 className="font-display mt-4 text-2xl md:text-3xl font-bold text-slate-900 leading-tight">
                    {phase.title}
                  </h3>
                  <p className="font-body mt-4 text-slate-600 leading-relaxed max-w-md">{phase.text}</p>
                </div>
              </div>

              <div className="hidden md:flex items-center justify-center">
                <div className={`h-56 w-56 rounded-3xl bg-gradient-to-br ${accent.strong} flex items-center justify-center shadow-xl transition-colors duration-500`}>
                  <phase.icon className="h-20 w-20 text-white" strokeWidth={1.25} />
                </div>
              </div>
            </div>

            <div className="relative flex items-center justify-between px-8 md:px-14 pb-8">
              <div className="flex items-center gap-2">
                {METHOD_PHASES.map((p, i) => (
                  <button
                    key={p.number}
                    onClick={() => goTo(i)}
                    aria-label={`Ir pra fase ${p.number}`}
                    className={`h-2 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
                      i === index ? "w-8 bg-blue-600" : "w-2 bg-slate-300 hover:bg-slate-400"
                    }`}
                  />
                ))}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => goTo(index - 1)}
                  aria-label="Fase anterior"
                  className="flex items-center justify-center h-9 w-9 rounded-full border border-slate-300 bg-white text-slate-700 hover:bg-slate-100 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={() => goTo(index + 1)}
                  aria-label="Próxima fase"
                  className="flex items-center justify-center h-9 w-9 rounded-full border border-slate-300 bg-white text-slate-700 hover:bg-slate-100 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={250}>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 px-7 py-3.5 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-600"
            >
              Agendar uma conversa
            </a>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 px-7 py-3.5 text-slate-700 font-semibold hover:border-slate-400 hover:bg-slate-50 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-400"
            >
              Falar no WhatsApp
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function DemoProjects() {
  return (
    <section id="projetos" className="scroll-mt-24 bg-slate-50 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <Reveal>
          <span className="text-sm font-semibold text-blue-600 tracking-wide">O que podemos criar pra sua marca</span>
          <h2 className="font-display mt-3 text-3xl md:text-4xl font-bold text-slate-900 max-w-2xl leading-tight">
            Projetos demonstrativos
          </h2>
          <p className="font-body mt-4 text-slate-600 max-w-2xl leading-relaxed">
            A Vertex está começando agora — por isso, em vez de inventar cases, preferimos mostrar exemplos
            conceituais do tipo de projeto que desenvolvemos pra cada segmento.
          </p>
        </Reveal>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {DEMO_PROJECTS.map((project, i) => {
            const accent = ACCENT_GRADIENTS[project.accent];
            return (
              <Reveal key={project.title} delay={i * 70}>
                <div className="rounded-2xl overflow-hidden border border-slate-200 bg-white h-full">
                  <div className={`h-28 bg-gradient-to-br ${accent.strong} flex items-center justify-center`}>
                    <project.icon className="h-9 w-9 text-white" />
                  </div>
                  <div className="p-6">
                    <h3 className="font-display font-semibold text-slate-900">{project.title}</h3>
                    <p className="font-body mt-2 text-sm text-slate-600 leading-relaxed">{project.text}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function TechStack() {
  const techs = ["React", "Next.js", "Tailwind CSS", "GSAP"];
  return (
    <section className="bg-white py-12 border-t border-b border-slate-100">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-3 text-center">
          <span className="font-body text-sm text-slate-400">Construído com tecnologia moderna —</span>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {techs.map((tech) => (
              <span
                key={tech}
                className="font-mono text-xs font-medium text-slate-500 border border-slate-200 rounded-full px-3 py-1"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function WhoItsFor() {
  return (
    <section className="bg-slate-50 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <Reveal>
          <span className="text-sm font-semibold text-blue-600 tracking-wide">Pra quem é</span>
          <h2 className="font-display mt-3 text-3xl md:text-4xl font-bold text-slate-900 max-w-2xl leading-tight">
            Feito pra quem leva o próprio trabalho a sério
          </h2>
        </Reveal>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {AUDIENCES.map((item, i) => {
            const accent = ACCENT_GRADIENTS[item.accent];
            return (
              <Reveal key={item.title} delay={i * 70}>
                <div className="h-full rounded-2xl bg-white border border-slate-200 p-6">
                  <item.icon className={`h-6 w-6 ${accent.text}`} />
                  <h3 className="font-display mt-4 font-semibold text-slate-900">{item.title}</h3>
                  <p className="font-body mt-2 text-sm text-slate-600 leading-relaxed">{item.text}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-6 md:px-10">
        <Reveal>
          <span className="text-sm font-semibold text-blue-600 tracking-wide">Perguntas frequentes</span>
          <h2 className="font-display mt-3 text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
            Antes de você chamar no WhatsApp
          </h2>
        </Reveal>

        <div className="mt-10 space-y-3">
          {FAQS.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <Reveal key={item.q} delay={i * 60}>
                <div className="rounded-2xl border border-slate-200 overflow-hidden">
                  <button
                    className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-600"
                    onClick={() => setOpenIndex(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                  >
                    <span className="font-display font-semibold text-slate-900">{item.q}</span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-slate-400 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5">
                      <p className="font-body text-slate-600 leading-relaxed">{item.a}</p>
                    </div>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section id="contato" className="scroll-mt-24 relative overflow-hidden bg-slate-900 py-24 md:py-32">
      <div
        className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-gradient-to-br from-blue-600 to-violet-600 opacity-20 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 opacity-20 blur-3xl"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-3xl px-6 md:px-10 text-center">
        <Reveal>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white leading-tight">
            Vamos colocar sua marca na internet?
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <p className="font-body mt-5 text-lg text-slate-400 max-w-xl mx-auto leading-relaxed">
            Sua empresa já existe. Agora ela precisa de uma presença digital à altura.
          </p>
        </Reveal>
        <Reveal delay={200}>
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-9 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 px-8 py-4 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 focus-visible:ring-blue-500"
          >
            Quero criar meu site
            <ArrowRight className="h-4 w-4" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-slate-950 py-14">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid md:grid-cols-3 gap-10">
          <div>
            <Logo variant="dark" />
            <p className="font-body mt-4 text-sm text-slate-500 max-w-xs leading-relaxed">
              Sites e landing pages profissionais pra negócios que querem ser levados a sério na internet.
            </p>
          </div>
          <div>
            <h4 className="font-display text-sm font-semibold text-white tracking-wide">Navegação</h4>
            <ul className="mt-4 space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="font-body text-sm text-slate-400 hover:text-white transition-colors duration-200">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-display text-sm font-semibold text-white tracking-wide">Contato</h4>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-sm text-slate-400 hover:text-white transition-colors duration-200"
                >
                  WhatsApp
                </a>
              </li>
              <li className="font-body text-sm text-slate-400">Atendimento em todo o Brasil</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-slate-800 text-center">
          <p className="font-body text-xs text-slate-500">© 2026 Vertex Solutions. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}

function FloatingWhatsApp() {
  return (
    <a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center h-14 w-14 rounded-full bg-gradient-to-br from-blue-600 to-violet-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-600"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function VertexSolutionsLanding() {
  useEffect(() => {
    document.title = "Vertex Solutions | Sites e Landing Pages Profissionais";
  }, []);

  return (
    <div className="font-body bg-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');
        html { scroll-behavior: smooth; }
        .font-display { font-family: 'Space Grotesk', sans-serif; }
        .font-body { font-family: 'Inter', sans-serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
        .vertex-dot-grid {
          background-image: radial-gradient(circle, #cbd5e1 1px, transparent 1px);
          background-size: 22px 22px;
          opacity: 0.7;
        }
        @keyframes vertexFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        .animate-float { animation: vertexFloat 4s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
          }
        }
      `}</style>

      <Navbar />
      <main>
        <Hero />
        <ProblemSolution />
        <Services />
        <Differentials />
        <Method />
        <DemoProjects />
        <TechStack />
        <WhoItsFor />
        <FAQSection />
        <FinalCTA />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
