import RegisterForm from "./RegisterForm";

export default function registerPage() {
  return (
    <div>
      <h1 className="text-2xl text-center mb-6">Create an <span className="font-bold">account</span></h1>
      <RegisterForm />
    </div>
  );
}
