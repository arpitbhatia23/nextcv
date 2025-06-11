import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
const Beam = () => {
  return (
    <div>
      <motion.svg
        width="80"
        height="62"
        viewBox="0 0 80 62"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          d="M75.9434 33.75L75.9902 33.9395L77 37.9932L78.0098 33.9395L78.0566 33.75H79.3242L79.2422 34.0635L77.6729 40.0635L77.624 40.25H76.376L76.3271 40.0635L74.7578 34.0635L74.6758 33.75H75.9434Z"
          fill="black"
          stroke="url(#paint0_linear_8_14)"
          strokeWidth="0.2"
        />
        <motion.path
          d="M71.0771 33.75C71.4615 33.75 71.812 33.8378 72.1211 34.0195L72.2373 34.0889C72.5007 34.2604 72.7153 34.4951 72.8828 34.7852L72.9512 34.9121C73.1031 35.2162 73.2005 35.568 73.248 35.9629L73.2793 36.2197L73.0215 36.2422L72.2695 36.3066L72.0322 36.3271L72 36.0908C71.9538 35.7464 71.84 35.5133 71.6816 35.3613L71.6787 35.3584L71.8545 35.1807L71.6787 35.3574C71.5166 35.1965 71.3213 35.1163 71.0771 35.1162C70.7564 35.1162 70.5088 35.2554 70.3164 35.5703L70.3145 35.5723C70.1149 35.8929 70.002 36.3606 70.002 37C70.002 37.639 70.1156 38.1115 70.3164 38.4404H70.3154C70.5067 38.7469 70.7546 38.8838 71.0771 38.8838C71.3186 38.8837 71.513 38.8019 71.6758 38.6348C71.8345 38.4717 71.9524 38.2066 72 37.8047L72.0283 37.5645L72.2695 37.585L73.0215 37.6494L73.2793 37.6719L73.248 37.9287C73.1937 38.38 73.075 38.7829 72.8867 39.1328L72.8857 39.1348C72.6968 39.478 72.4464 39.7514 72.1348 39.9492L72.1357 39.9502C71.824 40.1519 71.4683 40.25 71.0771 40.25C70.6032 40.25 70.1804 40.1102 69.8203 39.8281L69.8184 39.8271C69.5128 39.5833 69.2736 39.2568 69.0957 38.8574L69.0225 38.6816V38.6797C68.8388 38.1907 68.75 37.6293 68.75 37C68.75 36.3708 68.8382 35.8117 69.0225 35.3291L69.0957 35.1543C69.2736 34.7546 69.5125 34.4276 69.8184 34.1836C70.1782 33.8938 70.6017 33.75 71.0771 33.75Z"
          fill="black"
          stroke="url(#paint1_linear_8_14)"
          strokeWidth="0.2"
        />
        <motion.path
          d="M72.2492 17.53V20.7185H65.177V40.7497H61.925V20.7185H54.8528V17.53H72.2492Z"
          fill="black"
          stroke="url(#paint2_linear_8_14)"
          strokeWidth="0.2"
        />
        <motion.path
          d="M64.2134 1.13086L47.1245 29.0391L54.5581 40.3633L54.813 40.75H50.9497L50.8755 40.6357L45.1011 31.6816L39.3277 40.6357L39.2534 40.75H35.4546L35.7085 40.3633L43.0747 29.1064L35.772 17.917L35.52 17.5303H39.3814L39.4556 17.6445L45.1636 26.4688L50.8111 17.6455L50.8169 17.6357L50.8237 17.627L63.8023 0.84668L64.2134 1.13086Z"
          fill="black"
          stroke="url(#paint3_linear_8_14)"
          strokeWidth="0.2"
        />
        <motion.path
          d="M33.6227 17.53V20.7185H22.1022V27.5456H33.2379V30.6696H22.1022V37.5622H33.8786V40.7497H18.8503V17.53H33.6227Z"
          fill="black"
          stroke="url(#paint4_linear_8_14)"
          strokeWidth="0.2"
        />
        <motion.path
          d="M5.0498 17.53L5.12207 17.657L16.3516 37.6228H16.3525L29.7725 60.8747L29.3516 61.1433L18.8535 46.1462V46.1472L14.8457 40.6364L14.8398 40.6247L4.00195 21.8493V40.7497H0.75V17.53H5.0498Z"
          fill="black"
          stroke="url(#paint5_linear_8_14)"
          strokeWidth="0.2"
        />
        <defs>
          <motion.linearGradient
            id="paint0_linear_8_14"
            x1="77"
            y1="34"
            x2="77"
            y2="40"
            gradientUnits="userSpaceOnUse"
            initial={{ x1: 1, x2: 0, y1: 2, y2: 9 }}
            animate={{
              x1: -10,
              x2: -10,
              y1: 0,
              y2: 0,
            }}
            transition={{
              duration: 2,
              ease: "linear",
              repeat: Infinity,
            }}
          >
            <stop stopColor="#0F13EC" />
            <stop offset="1" stopColor="#E606ED" />
          </motion.linearGradient>
          <motion.linearGradient
            id="paint1_linear_8_14"
            x1="71"
            y1="34"
            x2="71"
            y2="40"
            gradientUnits="userSpaceOnUse"
            initial={{ x1: 1, x2: 0, y1: 2, y2: 9 }}
            animate={{
              x1: -10,
              x2: -10,
              y1: 0,
              y2: 0,
            }}
            transition={{
              duration: 2,
              ease: "linear",
              repeat: Infinity,
            }}
          >
            <stop stopColor="#0F13EC" />
            <stop offset="1" stopColor="#E606ED" />
          </motion.linearGradient>
          <motion.linearGradient
            id="paint2_linear_8_14"
            x1="63.5508"
            y1="17.78"
            x2="63.5508"
            y2="40.5"
            gradientUnits="userSpaceOnUse"
            initial={{ x1: 1, x2: 0, y1: 2, y2: 9 }}
            animate={{
              x1: -10,
              x2: -10,
              y1: 0,
              y2: 0,
            }}
            transition={{
              duration: 2,
              ease: "linear",
              repeat: Infinity,
            }}
          >
            <stop stopColor="#0508D4" />
            <stop offset="1" stopColor="#E606ED" />
          </motion.linearGradient>
          <motion.linearGradient
            id="paint3_linear_8_14"
            x1="49.9587"
            y1="1"
            x2="49.9587"
            y2="40.5"
            gradientUnits="userSpaceOnUse"
            initial={{ x1: 1, x2: 0, y1: 2, y2: 9 }}
            animate={{
              x1: -10,
              x2: -10,
              y1: 0,
              y2: 0,
            }}
            transition={{
              duration: 2,
              ease: "linear",
              repeat: Infinity,
            }}
          >
            <stop stopColor="#0F13EC" />
            <stop offset="1" stopColor="#E606ED" />
          </motion.linearGradient>
          <motion.linearGradient
            id="paint4_linear_8_14"
            x1="26.3643"
            y1="17.78"
            x2="26.3643"
            y2="40.5"
            gradientUnits="userSpaceOnUse"
            initial={{ x1: 1, x2: 0, y1: 2, y2: 9 }}
            animate={{
              x1: -10,
              x2: -10,
              y1: 0,
              y2: 0,
            }}
            transition={{
              duration: 2,
              ease: "linear",
              repeat: Infinity,
            }}
          >
            <stop stopColor="#0508D4" />
            <stop offset="1" stopColor="#E606ED" />
          </motion.linearGradient>
          <motion.linearGradient
            id="paint5_linear_8_14"
            x1="15.278"
            y1="17.78"
            x2="15.278"
            y2="61"
            gradientUnits="userSpaceOnUse"
            initial={{ x1: 12, x2: 13, y1: 2, y2: 9 }}
            animate={{
              x1: -2,
              x2: -4,
              y1: 0,
              y2: 0,
            }}
            transition={{
              duration: 2,
              ease: "linear",
              repeat: Infinity,
            }}
          >
            <stop stopColor="#0F13EC" />
            <stop offset="1" stopColor="#E606ED" />
          </motion.linearGradient>
        </defs>
      </motion.svg>
    </div>
  );
};

export default Beam;
