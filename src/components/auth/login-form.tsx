
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Link, useNavigate } from "react-router-dom";
import { Checkbox } from "@/components/ui/checkbox";

const formSchema = z.object({
  username: z.string().min(2, "Username must be at least 2 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean().default(false),
});

export function LoginForm() {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      rememberMe: false,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    navigate("/dashboard");
  }

  return (
    <>
      <div className="text-center mb-5">
        <div className="flex justify-center items-center mb-2">
          <div className="relative h-36 w-14">
            {/* Top dash */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-10 h-1.5 bg-[#00C853]"></div>
            
            {/* Full green "I" in the background */}
            <div className="absolute inset-0 text-[#00C853] text-9xl font-bold flex items-center justify-center pt-1">
              I
            </div>
            
            {/* Black overlay covering top half */}
            <div className="absolute inset-0 h-1/2 bg-black" />
            
            {/* Top half green "I" that shows through the clip */}
            <div className="absolute inset-0 h-1/2 overflow-hidden text-[#00C853] text-9xl font-bold flex items-center justify-center pt-1" style={{ clipPath: 'inset(0 0 50% 0)' }}>
              I
            </div>
            
            {/* Bottom dash */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-10 h-1.5 bg-[#00C853]"></div>
          </div>
        </div>
        <div className="text-white text-3xl font-medium">InOrder</div>
        <div className="text-sm text-gray-400 mt-2">Time is a precious commodity</div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm uppercase text-gray-400">USERNAME</FormLabel>
                <FormControl>
                  <Input
                    placeholder="username"
                    className="w-full bg-[#333] border-none rounded text-base p-3 text-white"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm uppercase text-gray-400">PASSWORD</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="password"
                    className="w-full bg-[#333] border-none rounded text-base p-3 text-white"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <div className="flex justify-between items-center mb-4">
            <FormField
              control={form.control}
              name="rememberMe"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="border-gray-400 data-[state=checked]:bg-[#00C853] data-[state=checked]:border-[#00C853]"
                    />
                  </FormControl>
                  <FormLabel className="text-xs text-gray-400">Remember me</FormLabel>
                </FormItem>
              )}
            />
            <Link to="/forgot-password" className="text-xs text-[#00C853] hover:underline">
              Forgot Password?
            </Link>
          </div>

          <Button
            type="submit"
            className="w-full bg-[#00C853] text-black font-medium rounded text-base py-6 hover:bg-[#00B84D]"
          >
            Log In
          </Button>

          <div className="text-center text-xs mt-4 text-gray-400">
            Don't have an account? <Link to="/" className="text-[#00C853] hover:underline">Sign up</Link>
          </div>
        </form>
      </Form>
    </>
  );
}
