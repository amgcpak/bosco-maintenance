import { useState, useEffect } from "react";
import { Mail, Wrench } from "lucide-react";

const COMPANY = "Bosco Global FZ LLC";
const EMAIL = "info@bosco.ae";

function GearIcon({ size = 80, className = "" }: { size?: number; className?: string }) {
  const cx = size / 2;
  const cy = size / 2;
  const r = size * 0.28;
  const innerR = size * 0.13;
  const teethCount = 8;
  const teethOuter = size * 0.42;
  const teethWidth = 12;

  const teeth: string[] = [];
  for (let i = 0; i < teethCount; i++) {
    const angle = (i * 360) / teethCount;
    const rad = (angle * Math.PI) / 180;
    const halfW = ((teethWidth / 2) * Math.PI) / 180;
    const x1 = cx + r * Math.cos(rad - halfW);
    const y1 = cy + r * Math.sin(rad - halfW);
    const x2 = cx + r * Math.cos(rad + halfW);
    const y2 = cy + r * Math.sin(rad + halfW);
    const x3 = cx + teethOuter * Math.cos(rad + halfW);
    const y3 = cy + teethOuter * Math.sin(rad + halfW);
    const x4 = cx + teethOuter * Math.cos(rad - halfW);
    const y4 = cy + teethOuter * Math.sin(rad - halfW);
    teeth.push(`M ${x1} ${y1} L ${x4} ${y4} L ${x3} ${y3} L ${x2} ${y2} Z`);
  }

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className={className}>
      <circle cx={cx} cy={cy} r={r} fill="currentColor" />
      {teeth.map((d, i) => (
        <path key={i} d={d} fill="currentColor" />
      ))}
      <circle cx={cx} cy={cy} r={innerR} fill="hsl(220, 25%, 8%)" />
    </svg>
  );
}

function WaveBar({ delay = 0 }: { delay?: number }) {
  return (
    <div
      className="w-1 bg-primary rounded-full"
      style={{
        height: "24px",
        animation: `wave 1.2s ease-in-out ${delay}s infinite`,
        transformOrigin: "bottom",
      }}
    />
  );
}

function FloatingParticle({ x, y, size, delay }: { x: number; y: number; size: number; delay: number }) {
  return (
    <div
      className="absolute rounded-full bg-primary/20"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size,
        animation: `float-up ${3 + delay}s ease-out ${delay}s infinite`,
        filter: "blur(1px)",
      }}
    />
  );
}

function ProgressBar({ progress }: { progress: number }) {
  return (
    <div className="relative w-full h-2 bg-white/5 rounded-full overflow-hidden border border-white/5">
      <div
        className="absolute left-0 top-0 h-full rounded-full progress-shimmer bg-gradient-to-r from-amber-500 via-amber-400 to-amber-300 transition-all duration-1000 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

export default function MaintenancePage() {
  const [progress, setProgress] = useState(0);
  const [dots, setDots] = useState(".");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const target = 73;
    let current = 0;
    const interval = setInterval(() => {
      current += 0.8;
      if (current >= target) {
        setProgress(target);
        clearInterval(interval);
      } else {
        setProgress(current);
      }
    }, 30);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((d) => (d.length >= 3 ? "." : d + "."));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const particles = [
    { x: 15, y: 60, size: 6, delay: 0 },
    { x: 25, y: 75, size: 4, delay: 1.2 },
    { x: 75, y: 65, size: 5, delay: 0.6 },
    { x: 85, y: 55, size: 7, delay: 1.8 },
    { x: 50, y: 80, size: 4, delay: 0.3 },
    { x: 65, y: 70, size: 6, delay: 2.1 },
    { x: 35, y: 85, size: 5, delay: 1.5 },
    { x: 90, y: 45, size: 3, delay: 0.9 },
  ];

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-hidden grid-lines flex flex-col items-center justify-center px-4">
      {/* Background Orbs */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((p, i) => (
          <FloatingParticle key={i} {...p} />
        ))}
      </div>

      {/* Top decorative line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-primary/60 to-transparent" />

      {/* Main Content */}
      <div
        className="relative z-10 flex flex-col items-center text-center max-w-2xl w-full"
        style={{ opacity: visible ? 1 : 0, transition: "opacity 0.5s ease" }}
      >
        {/* Gear Animation */}
        <div
          className="relative mb-8 animate-scale-in"
          style={{ animationDelay: "0.1s", opacity: 0 }}
        >
          {/* Pulse rings */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="absolute w-40 h-40 rounded-full border border-primary/20 pulse-ring" />
            <div className="absolute w-40 h-40 rounded-full border border-primary/15 pulse-ring-delay" />
          </div>

          {/* Gear cluster */}
          <div className="relative flex items-center justify-center w-40 h-40">
            {/* Large gear */}
            <div className="absolute text-primary/70 gear-spin" style={{ top: "8px", left: "10px" }}>
              <GearIcon size={90} />
            </div>
            {/* Small gear */}
            <div className="absolute text-amber-300/50 gear-spin-reverse" style={{ bottom: "6px", right: "4px" }}>
              <GearIcon size={52} />
            </div>
            {/* Center wrench icon */}
            <div className="relative z-10 w-12 h-12 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center backdrop-blur-sm">
              <Wrench size={20} className="text-primary" />
            </div>
          </div>
        </div>

        {/* Company name */}
        <div
          className="animate-fade-in-up delay-200 opacity-0 mb-2"
        >
          <span className="text-xs font-semibold tracking-[0.3em] text-primary/70 uppercase">
            {COMPANY}
          </span>
        </div>

        {/* Main headline */}
        <div className="animate-fade-in-up delay-300 opacity-0 mb-3">
          <h1 className="text-5xl sm:text-6xl font-serif font-bold text-white leading-tight">
            Under
            <span className="relative ml-3 text-primary">
              Maintenance
              <span className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-primary/0 via-primary to-primary/0" />
            </span>
          </h1>
        </div>

        {/* Animated dots subline */}
        <div className="animate-fade-in-up delay-400 opacity-0 mb-8">
          <p className="text-muted-foreground text-lg">
            We're working hard to improve your experience
            <span className="text-primary font-bold">{dots}</span>
          </p>
        </div>

        {/* Progress section */}
        <div className="animate-fade-in-up delay-500 opacity-0 w-full mb-8">
          <div
            className="glow-card rounded-2xl border border-white/8 bg-card/60 backdrop-blur-md p-6"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-sm font-medium text-white/80">Restoration Progress</span>
              </div>
              <span className="text-primary font-bold text-sm">{Math.round(progress)}%</span>
            </div>
            <ProgressBar progress={progress} />
            <div className="flex items-center justify-between mt-3">
              <span className="text-xs text-muted-foreground">Systems update in progress</span>
              <div className="flex items-center gap-1">
                {[0, 0.15, 0.3, 0.45].map((d) => (
                  <WaveBar key={d} delay={d} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Contact section */}
        <div className="animate-fade-in-up delay-700 opacity-0 w-full">
          <div className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase mb-4">
            Need Immediate Assistance?
          </div>

          <div className="flex justify-center">
            {/* Email */}
            <a
              href={`mailto:${EMAIL}`}
              data-testid="link-email"
              className="group flex flex-row items-center gap-3 rounded-xl border border-white/8 bg-card/50 backdrop-blur-sm px-6 py-3 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300"
            >
              <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors shrink-0">
                <Mail size={15} className="text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Email Us</p>
                <p className="text-sm font-semibold text-white/90">{EMAIL}</p>
              </div>
            </a>
          </div>
        </div>

      </div>

      {/* Bottom decorative line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      {/* Footer */}
      <div className="absolute bottom-6 left-0 right-0 text-center">
        <p className="text-xs text-muted-foreground/50">
          &copy; {new Date().getFullYear()} {COMPANY}. All rights reserved.
        </p>
      </div>
    </div>
  );
}
