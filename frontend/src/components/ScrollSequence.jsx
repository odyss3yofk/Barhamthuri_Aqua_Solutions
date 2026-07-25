import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const frameCount = 240;
const currentFrame = index => (
  `/productframes/ezgif-frame-${(index + 1).toString().padStart(3, '0')}.jpg`
);

export default function ScrollSequence() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    // 1. Preload images
    const images = [];
    let loadedCount = 0;
    
    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      img.onload = () => {
        loadedCount++;
        setProgress(Math.round((loadedCount / frameCount) * 100));
        if (loadedCount === frameCount) {
          setLoaded(true);
        }
      };
      images.push(img);
    }
  }, []); // Run preloader only once on mount

  useEffect(() => {
    if (!loaded) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const images = [];
    
    // We already cached them in the browser, but we need the Image objects again to draw.
    // Since they are cached, this will be instantaneous.
    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      images.push(img);
    }
    
    // 2. Adjust canvas size to match window
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      render(seq.frame);
    };
    
    const seq = { frame: 0 };
    
    const render = (index) => {
      const img = images[index];
      if (!img || !img.width) return; // Prevent drawing if not fully parsed
      
      const canvasRatio = canvas.width / canvas.height;
      const imgRatio = img.width / img.height;
      
      let renderWidth, renderHeight, x, y;
      
      // Implement object-fit: cover behavior
      if (canvasRatio > imgRatio) {
        renderWidth = canvas.width;
        renderHeight = canvas.width / imgRatio;
        x = 0;
        y = (canvas.height - renderHeight) / 2;
      } else {
        renderWidth = canvas.height * imgRatio;
        renderHeight = canvas.height;
        x = (canvas.width - renderWidth) / 2;
        y = 0;
      }
      
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(img, x, y, renderWidth, renderHeight);
    };

    window.addEventListener('resize', resizeCanvas);
    // Draw the very first frame immediately
    images[0].onload = resizeCanvas;
    if (images[0].complete) {
        resizeCanvas();
    }
    
    // 3. Set up GSAP ScrollTrigger
    let ctx = gsap.context(() => {
      gsap.to(seq, {
        frame: frameCount - 1,
        snap: 'frame',
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=400%', // Makes the pin last for 4x the viewport height
          scrub: 0.5,    // Smooth scrubbing
          pin: true,
        },
        onUpdate: () => render(seq.frame)
      });
    }, containerRef);
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      ctx.revert(); // Safely clean up GSAP animations and ScrollTriggers
    };
  }, [loaded]);

  return (
    <div ref={containerRef} className="relative w-full h-screen bg-charcoal overflow-hidden">
      {!loaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10 bg-charcoal">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan mb-4"></div>
          <p className="font-semibold tracking-wider text-sm opacity-80">LOADING SEQUENCE {progress}%</p>
        </div>
      )}
      
      {/* Canvas takes up the full container */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />
      
      {/* Overlay Text */}
      <div className="absolute top-1/4 left-10 md:left-20 z-10 text-white max-w-sm pointer-events-none drop-shadow-xl" style={{ mixBlendMode: 'difference' }}>
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Precision Engineering</h2>
        <p className="text-lg opacity-90">Experience every detail of our advanced water purification systems, built to last.</p>
      </div>
    </div>
  );
}
