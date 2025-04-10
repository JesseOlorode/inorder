
import { AuthLayout } from "@/components/auth/auth-layout";
import { LoginForm } from "@/components/auth/login-form";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  
  return (
    <AuthLayout>
      <LoginForm />
      <div className="mt-6 text-center">
        <Button 
          variant="outline" 
          onClick={() => navigate("/dashboard")}
          className="border-[#00C853] text-[#00C853] hover:bg-[#00C853]/10"
        >
          Go directly to Dashboard
        </Button>
      </div>
    </AuthLayout>
  );
};

export default Login;
