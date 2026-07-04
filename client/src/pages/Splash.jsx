import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Clicker from '../components/Clicker'

const Splash = ({callback}) => {
    const [showTitle, setShowTitle] = useState(false);

    useEffect(() => {
        // Trigger pop-in animation after mount
        const timer = setTimeout(() => {
        setShowTitle(true);
        }, 300);
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
        <div className="min-h-screen relative overflow-hidden bg-black font-sans">
      {/* Dynamic swirling colorful background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,#ff00ff_0%,transparent_50%)] animate-[spin_25s_linear_infinite]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,#00ffff_0%,transparent_50%)] animate-[spin_35s_linear_infinite_reverse]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_80%,#ffff00_0%,transparent_60%)] animate-[spin_20s_linear_infinite]" />
      
      {/* Subtle grid overlay for 90s retro feel */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:60px_60px]" />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center">
        
        {/* deHank! Title with 90s pop styling */}
        <div 
          className={`transition-all duration-1000 ease-out ${
            showTitle 
              ? 'opacity-100 scale-100 translate-y-0' 
              : 'opacity-0 scale-75 translate-y-12'
          }`}
        >
          <h1 
            className="text-[9rem] md:text-[12rem] font-black tracking-[-0.05em] leading-none select-none"
            style={{
              fontFamily: '"Comic Sans MS", "Impact", sans-serif',
              textShadow: `
                6px 6px 0 #ff00ff,
                -6px -6px 0 #00ffff,
                8px -8px 0 #ffff00,
                -8px 8px 0 #ff00ff
              `,
              WebkitTextStroke: '4px #000',
              color: '#fff',
              filter: 'drop-shadow(0 25px 25px rgba(0,0,0,0.6))',
              animation: 'float 3s ease-in-out infinite'
            }}
          >
            de'Hank!!
          </h1>
          
          {/* Extra depth layer for "pop" */}
          <div 
            className="absolute -inset-4 bg-gradient-to-r from-transparent via-white/20 to-transparent -rotate-3 pointer-events-none"
            style={{ animation: 'shine 4s linear infinite' }}
          />
        </div>

        {/* Tagline */}
        <p 
          className={`mt-6 text-3xl md:text-5xl font-bold text-white tracking-widest drop-shadow-lg transition-all duration-700 ${
            showTitle ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ animationDelay: '800ms' }}
        >
          THE MOST RADICAL SPOT ON THE WEB 🌈
        </p>

        {/* Buttons */}
        <div className={`mt-16 flex flex-col sm:flex-row gap-6 transition-all duration-700 ${showTitle ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <Link to="/login">
          <button 
            
            className="group relative px-12 py-6 text-3xl font-black tracking-wider bg-white text-black border-8 border-black hover:scale-110 active:scale-95 transition-all duration-200 shadow-[8px_8px_0_#000] hover:shadow-[12px_12px_0_#000]"
          >
            LOGIN
            <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xl px-3 py-1 font-mono border-4 border-black rotate-12 group-hover:rotate-6 transition-transform">
              NOW
            </span>
          </button>
          </Link>

          <button 
            onClick={() => callback()}
            className="group relative px-12 py-6 text-3xl font-black tracking-wider bg-transparent text-white border-8 border-white hover:bg-white hover:text-black transition-all duration-200 shadow-[8px_8px_0_#fff] hover:shadow-[12px_12px_0_#000]"
          >
            EXPLORE
          </button>

          
        </div>

        <div className="m-10">
            <Clicker />
        </div>

        {/* Fun footer badge */}
        <div className="absolute bottom-8 text-white/70 text-sm font-mono tracking-[4px] flex items-center gap-2">
          <div className="w-3 h-3 bg-lime-400 rounded-full animate-pulse" />
          EST. 2026 • ALWAYS BANGIN'
        </div>
      </div>

      {/* Global keyframes - Add these to your Tailwind config or global CSS */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(-2deg); }
          50% { transform: translateY(-25px) rotate(2deg); }
        }
        
        @keyframes shine {
          0% { transform: translateX(-150%) rotate(-3deg); }
          100% { transform: translateX(300%) rotate(-3deg); }
        }
        
        .animate-spin-slow {
          animation: spin 40s linear infinite;
        }
      `}</style>
    </div>
        </>
    );
}

export default Splash;