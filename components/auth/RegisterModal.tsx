import { useEffect, useState } from "react";
import Modal from "../ui/modal/Modal";
import RegisterStepOne from "./RegisterStepOne";
import RegisterStepTwo from "./RegisterStepTwo";
import RegisterStepOTP from "./RegisterStepOTP";
import RegisterSuccessModal from "./RegisterSuccessModal";

export default function RegisterModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    otp: "",
  });

  useEffect(() => {
    if (!isOpen) {
      setStep(1);
      setFormData({
        email: "",
        name: "",
        password: "",
        otp: "",
      });
    }
  }, [isOpen]);

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);
  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      variantBG="bg-[#4c4c4c]"
      title={
        step === 1
          ? "Buat akun baru"
          : step === 2
          ? "Tentukan password anda"
          : step === 3
          ? "Verifikasi OTP dikirim melalui email anda"
          : ""
      }
    >
      <div className="flex flex-col gap-4 text-center">
        {step === 1 && (
          <RegisterStepOne nextStep={nextStep} onChange={handleChange} data={formData} />
        )}
        {step === 2 && (
          <RegisterStepTwo
            nextStep={nextStep}
            prevStep={prevStep}
            onChange={handleChange}
            data={formData}
          />
        )}
        {step === 3 && (
          <RegisterStepOTP
            nextStep={nextStep}
            prevStep={prevStep}
            onChange={handleChange}
            data={formData}
          />
        )}
        {step === 4 && <RegisterSuccessModal onClose={onClose} />}
      </div>
    </Modal>
  );
}
