import { LoginForm } from "@/features/admin/auth/LoginForm";

export function LoginPage({ secret }: { secret: string }) {
  return <LoginForm secret={secret} />;
}
