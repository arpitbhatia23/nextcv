import React from "react";
import { motion } from "framer-motion";

const Logo2 = ({ ClassName, size, color = "black" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className={`${ClassName}`}
    >
      <motion.svg
        width={size || "70"}
        height={size || "60"}
        viewBox={`0 0 80 80`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
        {/* Sparkle animation */}
        <motion.path
          d="M77.3536 39L75 36H76.1219L78 38.5132L79.878 36H81L78.6463 39H77.3536Z"
          fill={color}
        />

        {/* Text path, animate opacity */}
        <motion.path
          d="M72.1154 39C71.4829 39 70.9316 38.9386 70.4615 38.8159C70 38.6931 69.641 38.5199 69.3846 38.296C69.1282 38.0686 69 37.8032 69 37.5C69 37.1968 69.1282 36.9332 69.3846 36.7094C69.641 36.4856 70 36.3123 70.4615 36.1895C70.9316 36.0632 71.4829 36 72.1154 36C72.6368 36 73.0983 36.0397 73.5 36.1191C73.9103 36.1949 74.2436 36.3069 74.5 36.4549C74.7564 36.6029 74.9231 36.7834 75 36.9964L73.8718 37.0289C73.7949 36.8375 73.5983 36.6913 73.2821 36.5903C72.9658 36.4856 72.5769 36.4332 72.1154 36.4332C71.4915 36.4332 71.0043 36.5289 70.6538 36.7202C70.3034 36.9079 70.1282 37.1679 70.1282 37.5C70.1282 37.8321 70.3034 38.0939 70.6538 38.2852C71.0043 38.4729 71.4915 38.5668 72.1154 38.5668C72.5769 38.5668 72.9658 38.5126 73.2821 38.4043C73.5983 38.296 73.7949 38.1336 73.8718 37.917L75 37.9495C74.9231 38.1625 74.7564 38.3484 74.5 38.5072C74.2436 38.6625 73.9103 38.7834 73.5 38.87C73.0983 38.9567 72.6368 39 72.1154 39Z"
          fill={color}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        />

        {/* Other shapes fade-in with slight scale animation */}
        {[
          "M61.1748 39.5V19.468H54.1028V16.78H70.9988V19.468H63.9268V39.5H61.1748Z",
          "M34.9175 39.5L42.3735 28.108L34.9815 16.78H38.2455L44.1655 25.932L50.0215 16.78L63 0L45.8295 28.044L53.3495 39.5H50.0855L44.1015 30.22L38.1175 39.5H34.9175Z",
          "M18.1003 39.5V16.78H32.3723V19.468H20.8522V26.796H31.9883V29.42H20.8522V36.812H32.6283V39.5H18.1003Z",
          "M0 16.78V39.5H2.752V19.916L14.056 39.5L18.056 45L28.556 60L15.136 36.748L3.904 16.78H0Z",
        ].map((d, i) => (
          <motion.path
            key={i}
            d={d}
            fill={color}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + i * 0.2, duration: 0.8 }}
          />
        ))}
      </motion.svg>
    </motion.div>
  );
};

export default Logo2;
