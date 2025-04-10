
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { ShoppingCart, Receipt, Smartphone, Plus, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  dueDate: z.string().min(1, "Due date is required"),
  notes: z.string().optional(),
  category: z.string().min(1, "Category is required"),
  remindMe: z.boolean().default(false),
});

export function TaskManagementContent() {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      dueDate: "",
      notes: "",
      category: "",
      remindMe: false,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className="py-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl">Manage your life with ease with our task management tool</h1>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Task Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter task title"
                    className="bg-white text-black border-none"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="dueDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Due Date</FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    className="bg-white text-black border-none"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notes</FormLabel>
                <FormControl>
                  <div className="bg-white rounded-md border">
                    <textarea
                      className="w-full min-h-[100px] bg-transparent p-3 text-black outline-none"
                      placeholder="Add notes"
                      {...field}
                    />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="bg-white text-black border-none">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="work">Work</SelectItem>
                    <SelectItem value="personal">Personal</SelectItem>
                    <SelectItem value="shopping">Shopping</SelectItem>
                    <SelectItem value="health">Health</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="remindMe"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="border-gray-400 data-[state=checked]:bg-[#00A16C] data-[state=checked]:border-[#00A16C]"
                  />
                </FormControl>
                <FormLabel className="text-sm">Remind me about this task</FormLabel>
              </FormItem>
            )}
          />
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                type="button"
                className="w-full bg-[#00A16C] text-white font-medium py-6 rounded"
              >
                <Plus className="mr-1" size={18} />
                Add
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem onClick={() => form.handleSubmit(onSubmit)()}>
                <Calendar className="mr-2 h-4 w-4" />
                <span>Add Task</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/grocery-add")}>
                <ShoppingCart className="mr-2 h-4 w-4" />
                <span>Add Grocery</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/grocery-receipt")}>
                <Receipt className="mr-2 h-4 w-4" />
                <span>Scan Receipt</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/devices")}>
                <Smartphone className="mr-2 h-4 w-4" />
                <span>Manage Devices</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </form>
      </Form>
    </div>
  );
}
