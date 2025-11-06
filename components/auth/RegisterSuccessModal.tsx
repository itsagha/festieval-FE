import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export default function RegisterSuccessModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex flex-col items-center gap-4">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200 }}
      >
        <CheckCircle2 className="text-primary w-16 h-16" />
      </motion.div>
      <h2 className="text-lg font-bold">Akun Berhasil Dibuat!</h2>
    </div>
  );
}
