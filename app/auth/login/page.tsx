import { LoginForm } from "@/components/form/form-login";

export default function Page() {
  return (
    <div className="flex min-h-[calc(100vh-64px)] w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
