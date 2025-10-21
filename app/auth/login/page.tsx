import LoginForm from "./LoginForm";

export default function LoginPage() {
  return (
    <div>
      <h1 className="text-2xl text-center mb-6">Welcome <span className="font-bold">back!</span></h1>
      <LoginForm />
    </div>
  );
}