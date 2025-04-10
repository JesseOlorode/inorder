
import { AuthLayout } from "@/components/auth/auth-layout";
import { LoginForm } from "@/components/auth/login-form";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  
  return (
    <AuthLayout>
      <LoginForm />
      <div className="mt-6 text-center flex flex-col gap-3">
        <Button 
          variant="outline" 
          onClick={() => navigate("/dashboard")}
          className="border-[#00A16C] text-[#00A16C] hover:bg-[#00A16C]/10"
        >
          Go directly to Dashboard
        </Button>
        
        <Button 
          variant="ghost" 
          onClick={() => {
            // Clear the visited flag so we can return to splash
            sessionStorage.removeItem("visited");
            navigate("/");
          }}
          className="text-gray-400 hover:text-white hover:bg-gray-800"
        >
          Back to Enter Screen
        </Button>
      </div>
    </AuthLayout>
  );
};

export default Login;
