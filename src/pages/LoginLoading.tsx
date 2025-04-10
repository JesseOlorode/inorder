
import { AuthLayout } from "@/components/auth/auth-layout";
import { LoginLoadingScreen } from "@/components/auth/login-loading-screen";

const LoginLoading = () => {
  return (
    <AuthLayout>
      <LoginLoadingScreen />
    </AuthLayout>
  );
};

export default LoginLoading;
