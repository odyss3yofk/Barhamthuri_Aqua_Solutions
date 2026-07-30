import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const frameCount = 240;
const currentFrame = index =>
  `/productframes/ezgif-frame-${(index + 1).toString().padStart(3, '0')}.jpg`;

export default function ScrollSequence() {
  const canvasRef = useRef(null);
  const wrapperRef = useRef(null);
  const stickyRef = useRef(null);
  const imagesRef = useRef([]);
  const [loaded, setLoaded] = useState(false);
  const [progress, setProgress] = useState(0);

  // Preload frames (deferred)
  useEffect(() => {
    let loadedCount = 0;
    let cancelled = false;

    const preload = () => {
      for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        img.src = currentFrame(i);
        img.onload = () => {
          if (cancelled) return;
          loadedCount++;
          setProgress(Math.round((loadedCount / frameCount) * 100));
          if (loadedCount === frameCount) setLoaded(true);
        };
        img.onerror = () => {
          if (cancelled) return;
          loadedCount++;
          if (loadedCount === frameCount) setLoaded(true);
        };
        imagesRef.current[i] = img;
      }
    };

    if ('requestIdleCallback' in window) {
      const id = requestIdleCallback(preload, { timeout: 500 });
      return () => { cancelled = true; cancelIdleCallback(id); };
    } else {
      const t = setTimeout(preload, 100);
      return () => { cancelled = true; clearTimeout(t); };
    }
  }, []);

  // Wire GSAP ScrollTrigger (NO pin — uses CSS sticky instead)
  useEffect(() => {
    if (!loaded) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const images = imagesRef.current;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      drawFrame(seq.frame);
    };

    const drawFrame = (index) => {
      const img = images[Math.round(index)];
      if (!img || !img.naturalWidth) return;

      const cw = canvas.offsetWidth;
      const ch = canvas.offsetHeight;
      const imgRatio = img.naturalWidth / img.naturalHeight;
      const canvasRatio = cw / ch;

      let rw, rh, rx, ry;
      if (canvasRatio > imgRatio) {
        rw = cw; rh = cw / imgRatio;
        rx = 0;  ry = (ch - rh) / 2;
      } else {
        rw = ch * imgRatio; rh = ch;
        rx = (cw - rw) / 2; ry = 0;
      }

      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, rx, ry, rw, rh);
    };

    const seq = { frame: 0 };
    window.addEventListener('resize', resize, { passive: true });
    resize();

    // ScrollTrigger WITHOUT pin — the wrapper div's height creates the scroll room,
    // and CSS sticky keeps the canvas visible. No DOM manipulation on body.
    const st = ScrollTrigger.create({
      trigger: wrapperRef.current,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.5,
      onUpdate: (self) => {
        const frame = Math.round(self.progress * (frameCount - 1));
        seq.frame = frame;
        drawFrame(frame);
      },
    });

    return () => {
      window.removeEventListener('resize', resize);
      st.kill();
    };
  }, [loaded]);

  return (
    <div ref={wrapperRef} className="relative" style={{ height: '500vh' }}>
      {/* Sticky container — CSS does the pinning, not GSAP */}
      <div ref={stickyRef} className="sticky top-0 w-full h-screen bg-void overflow-hidden">

        {/* Loading Screen */}
        {!loaded && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-void">
            <div className="absolute inset-0 grid-bg opacity-50" />
            <div className="relative w-24 h-24 mb-8">
              <svg className="w-24 h-24 -rotate-90" viewBox="0 0 96 96">
                <circle cx="48" cy="48" r="40" fill="none" stroke="rgba(45,212,191,0.1)" strokeWidth="4" />
                <circle
                  cx="48" cy="48" r="40" fill="none"
                  stroke="#2DD4BF" strokeWidth="4"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 40}`}
                  strokeDashoffset={`${2 * Math.PI * 40 * (1 - progress / 100)}`}
                  className="transition-all duration-150"
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-accent font-bold text-xl display-font">
                {progress}
              </span>
            </div>
            <p className="text-ink-2 text-xs font-semibold tracking-[0.3em] uppercase">Loading sequence</p>
          </div>
        )}

        {/* Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full block"
          style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.6s ease' }}
        />

        {/* Dark gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent pointer-events-none" />

        {/* Hero Text */}
        <div
          className="absolute inset-0 z-10 flex flex-col justify-center px-8 md:px-16 lg:px-24"
          style={{ opacity: loaded ? 1 : 0, transition: 'opacity 1s ease 0.3s' }}
        >
          <div className="max-w-xl">
            <span className="inline-block text-accent text-xs font-semibold tracking-[0.3em] uppercase mb-5">
              ✦ Water Purification Technology
            </span>
            <h1 className="display-font text-5xl sm:text-6xl md:text-7xl font-bold text-white leading-tight mb-6">
              Pure Water.<br />
              <span className="text-gradient">Pure Life.</span>
            </h1>
            <p className="text-white drop-shadow-md font-medium text-lg md:text-xl leading-relaxed mb-10 max-w-md">
              Scroll to explore our advanced water purification systems — engineered for homes and industries across North East India.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/products" className="btn-primary">
                Explore Products
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
              </Link>
              <Link to="/service" className="btn-ghost bg-white/10 border-transparent hover:bg-white/20 hover:border-white/10 text-white backdrop-blur-sm">
                Book a Service
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        {loaded && (
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 animate-fade-in" style={{ animationDelay: '1s' }}>
            <span className="text-white/50 text-xs tracking-widest uppercase">Scroll</span>
            <div className="w-px h-10 bg-gradient-to-b from-accent to-transparent" />
          </div>
        )}
      </div>
    </div>
  );
}
