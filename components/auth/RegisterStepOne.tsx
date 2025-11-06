import Button from "../ui/Button";

export default function RegisterStepOne ({ nextStep, onChange, data }: any) {
  return (
    <div className="flex flex-col gap-4">
      {/* input email */}
      <input 
        type="email" 
        placeholder="Email"
        value={data.email}
        onChange={(e) => onChange("email", e.target.value)}
        className="p-3 rounded-xl bg-white text-gray-600 focus:outline-none"
        required  
      />

      {/* input username */}
      <input 
        type="text" 
        placeholder="Username"
        value={data.name}
        onChange={(e) => onChange("name", e.target.value)}
        className="p-3 rounded-xl bg-white text-gray-600 focus:outline-none"
        required  
      />
      <Button
        onClick={() => {
          if (!data.email || !data.name) {
            alert("Email dan Username wajib diisi!");
            return;
          }
          nextStep();
        }}
        variant="bg-primary text-black mt-4"
      >
        Selanjutnya
      </Button>
    </div>
  )
}