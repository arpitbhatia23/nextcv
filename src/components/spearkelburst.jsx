import { motion, AnimatePresence } from "framer-motion";

const sparkles = Array.from({ length: 12 });

const SparkleBurst = ({ show, onComplete, x = "50%", y = "50%" }) => (
  <AnimatePresence>
    {show && (
      <motion.div
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          width: "100vw",
          height: "100vh",
          pointerEvents: "none",
          zIndex: 9999,
        }}
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.3 } }}
        onAnimationComplete={onComplete}
      >
        <svg
          style={{
            position: "absolute",
            left: x,
            top: y,
            transform: "translate(-50%, -50%)",
            pointerEvents: "none",
          }}
          width={180}
          height={180}
        >
          {sparkles.map((_, i) => {
            const angle = (i / sparkles.length) * Math.PI * 2;
            const x1 = 90 + Math.cos(angle) * 10;
            const y1 = 90 + Math.sin(angle) * 10;
            const x2 = 90 + Math.cos(angle) * 80;
            const y2 = 90 + Math.sin(angle) * 80;
            return (
              <motion.line
                key={i}
                x1={x1}
                y1={y1}
                x2={x1}
                y2={y1}
                stroke={["#fbbf24", "#818cf8", "#a7f3d0", "#f472b6"][i % 4]}
                strokeWidth="3"
                strokeLinecap="round"
                initial={{ x2: x1, y2: y1, opacity: 1, scale: 0.75 }}
                animate={{
                  x2,
                  y2,
                  opacity: [1, 1, 0],
                  scale: [0.75, 1.2, 1.1],
                }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.02,
                  times: [0, 0.7, 1],
                }}
              />
            );
          })}
        </svg>
      </motion.div>
    )}
  </AnimatePresence>
);

export default SparkleBurst;
