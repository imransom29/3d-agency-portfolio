import { motion, Variants } from 'framer-motion';

interface LoadingAnimationProps {
  isLoading: boolean;
}

export default function LoadingAnimation({ isLoading }: LoadingAnimationProps) {
  const containerVariants: Variants = {
    initial: { opacity: 1 },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.5,
        when: 'afterChildren',
      },
    },
  };

  const logoVariants: Variants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.6, 0.01, -0.05, 0.95],
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black ${
        isLoading ? 'block' : 'hidden'
      }`}
    >
      <motion.div
        variants={logoVariants}
        initial="initial"
        animate="animate"
        className="flex items-center"
      >
        <span className="text-primary font-bold text-5xl">NK</span>
        <span className="text-white font-light ml-2 text-5xl">STUDIO</span>
      </motion.div>
      <motion.div
        initial={{ width: '0%' }}
        animate={{ width: '100%' }}
        transition={{ duration: 2, ease: 'easeInOut' }}
        className="absolute bottom-20 left-1/2 transform -translate-x-1/2 h-1 bg-primary"
        style={{ width: '200px', maxWidth: '80vw' }}
      />
    </motion.div>
  );
}
