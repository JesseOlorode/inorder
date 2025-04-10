
import { motion } from "framer-motion";

export function AccessGranted() {
  return (
    <motion.div 
      className="absolute inset-0 flex flex-col items-center justify-center bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ 
          duration: 0.5,
          delay: 0.2,
          type: "spring",
          stiffness: 100
        }}
        className="text-center"
      >
        <div className="text-4xl font-bold text-[#00FF41] mb-4">ACCESS GRANTED</div>
        <div className="text-sm text-[#00FF41]/80">
          Welcome to InOrder System
        </div>
      </motion.div>
    </motion.div>
  );
}
