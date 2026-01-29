import { useState, useEffect } from 'react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const threshold = 100;
      const progress = Math.min(scrollY / threshold, 1);
      setScrollProgress(progress);
      setIsScrolled(progress > 0.5);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <nav
      className="
        fixed top-0 left-0 right-0 z-50 
        transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]
        transform-gpu will-change-transform
      "
      style={{
        height: `${Math.max(56, 70 - scrollProgress * 14)}px`,
        width: isScrolled ? '90%' : '100%',
        maxWidth: '2000px',
        margin: '0 auto',
        marginTop: `${scrollProgress * 16}px`,
        borderRadius: `${scrollProgress * 50}px`,
        transform: `scale(${1 - scrollProgress * 0.02})`,
        transformOrigin: 'top',
        backdropFilter: `blur(${8 + scrollProgress * 4}px)`,
        backgroundColor: `rgba(107, 209, 209, ${0.3 + scrollProgress * 0.2})`,
        boxShadow: `0 ${scrollProgress * 8}px ${scrollProgress * 12}px rgba(0,0,0,${0.05 + scrollProgress * 0.05})`
      }}
    >
      <div className="h-full flex items-center justify-between px-6 md:px-10 container mx-auto">
        {/* Logo */}
        <button
          onClick={scrollToTop}
          className="text-white font-black flex-shrink-0 hover:scale-105 transition-transform duration-300"
          aria-label="Go to homepage"
          style={{
            fontSize: `${Math.max(18, 24 - scrollProgress * 6)}px`,
            transition: 'all 700ms cubic-bezier(0.34, 1.56, 0.64, 1)',
            fontFamily: 'Orbitron, sans-serif',
            letterSpacing: '0.05em',
          }}
        >
          HABITFLOW
        </button>

        {/* Right Side - Auth Buttons */}
        <div className="flex items-center gap-3">
          <button
            className="
              text-white font-semibold
              hover:text-cream transition-colors duration-300
              relative overflow-hidden group
              py-1.5 px-3
            "
            style={{
              fontSize: `${Math.max(13, 15 - scrollProgress * 2)}px`,
            }}
          >
            <span className="transition-all duration-500 ease-out inline-block group-hover:translate-y-[-2px]">
              Login
            </span>
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white transform origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100" />
          </button>
          
          <button
            className="
              bg-white text-teal-primary font-semibold
              px-5 py-2 rounded-full
              hover:bg-cream hover:scale-105
              transition-all duration-300
              shadow-lg
            "
            style={{
              fontSize: `${Math.max(13, 15 - scrollProgress * 2)}px`,
            }}
          >
            Sign Up
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
