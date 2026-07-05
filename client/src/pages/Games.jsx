import { useEffect, useState, useContext } from 'react';
import AuthContext from '../context/AuthContext'


const Games = () => {
  const { user } = useContext(AuthContext)

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);
  return (
    <>
      <div className="min-h-screen relative overflow-hidden bg-black font-sans">
        {/* Same swirling background as reference */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,#ff00ff_0%,transparent_50%)] animate-[spin_25s_linear_infinite]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,#00ffff_0%,transparent_50%)] animate-[spin_35s_linear_infinite_reverse]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_80%,#ffff00_0%,transparent_60%)] animate-[spin_20s_linear_infinite]" />
        
        {/* Grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:60px_60px]" />

        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center">
          
          {/* Success Title */}
          <div className="mb-8">
            <h1
              className="text-[7rem] md:text-[9rem] font-black tracking-[-0.05em] leading-none select-none"
              style={{
                fontFamily: '"Comic Sans MS", "Impact", sans-serif',
                textShadow: `
                  6px 6px 0 #00ff00,
                  -6px -6px 0 #ffff00,
                  8px -8px 0 #00ffff,
                  -8px 8px 0 #ff00ff
                `,
                WebkitTextStroke: '4px #000',
                color: '#fff',
                animation: 'float 2.5s ease-in-out infinite',
              }}
            >
              LOGIN<br />SUCCESS!
            </h1>
          </div>

          {/* Welcome Message */}
          <div className="mb-12">
            <p className="text-5xl md:text-6xl font-bold text-white tracking-widest mb-4 drop-shadow-lg">
              WELCOME BACK
            </p>
            <p 
              className="text-6xl md:text-7xl font-black text-lime-400 tracking-wider drop-shadow-[0_0_20px_#84cc16]"
              style={{ fontFamily: '"Comic Sans MS", cursive' }}
            >
              {user || "COOL PERSON"}!
            </p>
          </div>

          {/* Current Time */}
          <div className="bg-black/70 border-4 border-white p-8 mb-16">
            <p className="text-white/70 text-xl font-mono tracking-[3px] mb-2">CURRENT TIME</p>
            <p className="text-4xl font-mono text-white tabular-nums">
              {currentTime.toLocaleDateString('en-US', { 
                weekday: 'long', 
                month: 'long', 
                day: 'numeric', 
                year: 'numeric' 
              })}
            </p>
            <p className="text-5xl font-mono text-cyan-400 tracking-widest">
              {currentTime.toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit', 
                second: '2-digit' 
              })}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6">
            <button
              onClick={() => window.location.href = '/'}
              className="group relative px-12 py-6 text-3xl font-black tracking-wider bg-white text-black border-8 border-black hover:scale-110 active:scale-95 transition-all duration-200 shadow-[8px_8px_0_#000] hover:shadow-[12px_12px_0_#000]"
            >
              ENTER THE SITE
            </button>

            <button
              onClick={() => window.location.href = '/login'}
              className="group relative px-12 py-6 text-3xl font-black tracking-wider bg-transparent text-white border-8 border-white hover:bg-white hover:text-black transition-all duration-200 shadow-[8px_8px_0_#fff] hover:shadow-[12px_12px_0_#000]"
            >
              LOG OUT
            </button>
          </div>

          {/* Footer badge */}
          <div className="absolute bottom-8 text-white/70 text-sm font-mono tracking-[4px] flex items-center gap-2">
            <div className="w-3 h-3 bg-lime-400 rounded-full animate-pulse" />
            LOGGED IN • EST. 2026 • STAY RAD
          </div>
        </div>

        <style jsx global>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(-3deg); }
            50% { transform: translateY(-20px) rotate(3deg); }
          }
        `}</style>
      </div>
    </>
  );
};

export default Games;