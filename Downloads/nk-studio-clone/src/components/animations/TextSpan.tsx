import { motion, Variants } from 'framer-motion';

interface TextSpanProps {
  text: string;
  delay?: number;
  duration?: number;
}

export default function TextSpan({ text, delay = 0, duration = 0.05 }: TextSpanProps) {
  // Split the text into individual characters
  const characters = text.split('');

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: duration, delayChildren: delay * i },
    }),
  };

  const child: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.span
      variants={container}
      initial="hidden"
      animate="visible"
      style={{ display: 'inline-block' }}
    >
      {characters.map((char, index) => (
        <motion.span key={index} variants={child} style={{ display: 'inline-block', whiteSpace: 'pre' }}>
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
}
