import { useState } from 'react';

const Navbar = ({ navItems, brand = "MyApp" }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = (index, onClick) => {
    setActiveIndex(index);
    onClick();
    setIsMenuOpen(false); // close mobile menu
  };

  return (
    <nav className="bg-zinc-900 border-b border-zinc-800 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="h-16 flex items-center justify-between">
          {/* Brand */}
          <div className="text-white font-semibold text-xl">
            {brand}
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item, index) => (
              <button
                key={index}
                onClick={() => handleNavClick(index, item.onClick)}
                className={`text-sm font-medium transition-colors px-3 py-2 rounded-lg
                  ${activeIndex === index 
                    ? 'text-white bg-zinc-800' 
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                  }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-zinc-400 hover:text-white p-2"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d={isMenuOpen 
                  ? "M6 18L18 6M6 6h12v12" 
                  : "M4 6h16M4 12h16M4 18h16"} 
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-zinc-800 py-4 bg-zinc-900">
            <div className="flex flex-col gap-2">
              {navItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleNavClick(index, item.onClick)}
                  className={`text-left px-4 py-3 text-base font-medium rounded-lg mx-2 transition-colors
                    ${activeIndex === index 
                      ? 'bg-zinc-800 text-white' 
                      : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
                    }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;