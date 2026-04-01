import React from "react";
import { motion } from "framer-motion";
import { AlertCircle, IndianRupee, ShieldCheck, Zap } from "lucide-react";
const RedirectToPayment = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-100 bg-slate-900/40 backdrop-blur-xl flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="max-w-md w-full bg-white rounded-[2.5rem] shadow-[0_40px_100px_rgba(0,0,0,0.2)] overflow-hidden border border-slate-100"
      >
        <div className="p-10 text-center space-y-8">
          <div className="relative mx-auto w-24 h-24">
            <div className="absolute inset-0 border-4 border-indigo-50 rounded-full"></div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute inset-0 border-4 border-indigo-600 rounded-full border-t-transparent"
            ></motion.div>
            <div className="absolute inset-0 flex items-center justify-center text-indigo-600">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <IndianRupee className="w-10 h-10" />
              </motion.div>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-3xl font-black text-slate-900 tracking-tight">Redirecting</h3>
            <p className="text-slate-500 font-medium">
              Initialising secure transaction with Paytm...
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-indigo-50 rounded-3xl p-6 border border-indigo-100 flex gap-4 text-left"
          >
            <AlertCircle className="w-6 h-6 text-indigo-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-black text-indigo-900 text-sm uppercase tracking-wider">
                Payment Protocol
              </p>
              <p className="text-indigo-700 text-xs font-semibold leading-relaxed">
                Please do not close this window. You will be redirected to the download page
                automatically after payment.
              </p>
            </div>
          </motion.div>

          <div className="flex items-center justify-center gap-6 opacity-30">
            <div className="flex items-center gap-1.5 grayscale">
              <ShieldCheck className="w-4 h-4" />
              <span className="text-[10px] font-black uppercase tracking-widest">256-bit</span>
            </div>
            <div className="flex items-center gap-1.5 grayscale">
              <Zap className="w-4 h-4" />
              <span className="text-[10px] font-black uppercase tracking-widest">Instant</span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default RedirectToPayment;
