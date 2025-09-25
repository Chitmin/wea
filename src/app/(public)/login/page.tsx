import { LoginForm } from "@/components/login-form";

export default function Login() {
  return (
    <div className="flex flex-col space-x-4 items-center justify-center">
      <LoginForm className="min-w-sm max-w-lg" />
    </div>
  );
}
