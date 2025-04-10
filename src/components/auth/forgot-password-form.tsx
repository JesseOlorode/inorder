
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Link } from "react-router-dom";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export function ForgotPasswordForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <>
      <div className="text-[#00C853] text-2xl font-medium mb-2">
        Forgot Your Password?
      </div>
      <div className="text-sm mb-6">
        Enter your email for a password reset
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm uppercase">EMAIL</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="hello@reallygreatsite.com"
                    className="w-full bg-transparent border rounded text-base p-3 border-[#333]"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full bg-[#00C853] text-black font-medium rounded text-base py-6 hover:bg-[#00B84D]"
          >
            Send
          </Button>

          <div className="flex items-center justify-center gap-1 text-xs mt-4">
            <span>Remember Password?</span>
            <Link to="/login" className="text-[#00C853] hover:underline">
              Log In
            </Link>
          </div>
        </form>
      </Form>
    </>
  );
}
