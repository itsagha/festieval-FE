"use client"
import React from "react"
import {motion, AnimatePresence} from "framer-motion"

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  showFooter?: boolean;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
  variantBG?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  showFooter = false,
  onConfirm,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variantBG = "",
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`${variantBG} w-full max-w-md rounded-2xl shadow-xl p-6 relative mx-4 md:mx-0`}
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              {title && <h2 className="font-bold">{title}</h2>}
              <button
                onClick={onClose}
                className="text-gray-300 hover:text-gray-700 dark:hover:text-gray-300 transition-colors cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 12 12"
                  width="1.5em"
                  height="1.5em"
                >
                  <path
                    fill="currentColor"
                    d="M3.85 3.15a.5.5 0 0 0-.707.707l2.15 2.15l-2.15 2.15a.5.5 0 0 0 .707.707L6 6.714l2.15 2.15a.5.5 0 0 0 .707-.707l-2.15-2.15l2.15-2.15a.5.5 0 0 0-.707-.707L6 5.3z"
                  ></path>
                </svg>
              </button>
            </div>

            {/* Body */}
            <div className="text-sm text-gray-700 dark:text-gray-300">
              {children}
            </div>

            {/* Footer */}
            {showFooter && (
              <div className="flex justify-end mt-6 space-x-3">
                <button
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-200 dark:bg-gray-700 hover:opacity-90 transition"
                >
                  {cancelText}
                </button>
                <button
                  onClick={onConfirm}
                  className="px-4 py-2 rounded-lg text-sm font-medium bg-primary text-black hover:opacity-90 transition"
                >
                  {confirmText}
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
