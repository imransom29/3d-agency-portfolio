'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import Container from '../ui/Container';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Nav menu items
  const navItems = [
    { name: 'WORK', href: '/work' },
    { name: 'SERVICES', href: '/services' },
    { name: 'STUDIO', href: '/studio' },
    { name: 'BRAND', href: '/brand' },
    { name: 'NEWS', href: '/news' }
  ];

  // Animation variants
  const headerVariants: Variants = {
    hidden: { y: -100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const mobileMenuVariants: Variants = {
    closed: { 
      opacity: 0,
      scale: 0.95,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    open: { 
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1,
        staggerDirection: 1
      }
    }
  };

  const menuItemVariants: Variants = {
    closed: { 
      opacity: 0,
      y: 20
    },
    open: { 
      opacity: 1,
      y: 0,
      transition: {
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.header
      initial="hidden"
      animate="visible"
      variants={headerVariants}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-black/80 backdrop-blur-md py-3' : 'bg-transparent py-5'}`}
    >
      <Container>
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center group z-50">
            <motion.span 
              className="text-primary font-bold text-2xl sm:text-3xl"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              NK
            </motion.span>
            <motion.span 
              className="text-white font-light ml-1 text-2xl sm:text-3xl"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              STUDIO
            </motion.span>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navItems.map((item, index) => (
              <Link 
                key={index}
                href={item.href}
                className="text-white hover:text-primary transition-colors duration-300 text-sm font-medium tracking-wider"
              >
                {item.name}
              </Link>
            ))}
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary text-black px-6 py-2 rounded-full font-medium hover:bg-primary/90 transition-colors duration-300 text-sm tracking-wider"
            >
              CONTACT
            </motion.button>
          </nav>

          {/* Mobile menu button */}
          <motion.button 
            whileTap={{ scale: 0.9 }}
            className="lg:hidden text-white focus:outline-none z-50"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              )}
            </svg>
          </motion.button>
        </div>
      </Container>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
            className="lg:hidden fixed inset-0 z-40 bg-black/98 flex flex-col justify-center items-center"
          >
            <motion.div className="flex flex-col space-y-6 text-center">
              {navItems.map((item, index) => (
                <motion.div key={index} variants={menuItemVariants}>
                  <Link 
                    href={item.href}
                    className="text-2xl text-white hover:text-primary transition-colors duration-300 inline-block"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div variants={menuItemVariants}>
                <button className="bg-primary text-black px-8 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors duration-300 mt-4">
                  CONTACT
                </button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
