import { useEffect, useState } from "react";

const Logo = ({text}) => {
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
            {text}
          </h1>
          
          {/* Extra depth layer for "pop" */}
          <div 
            className="absolute -inset-4 bg-gradient-to-r from-transparent via-white/20 to-transparent -rotate-3 pointer-events-none"
            style={{ animation: 'shine 4s linear infinite' }}
          />
        </div>
        </>
    );
}

export default Logo;