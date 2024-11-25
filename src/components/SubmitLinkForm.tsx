import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";

const formSchema = z.object({
  url: z.string().url("Please enter a valid URL"),
  title: z.string().min(1, "Title is required"),
});

export function SubmitLinkForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
      title: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const { error } = await supabase
        .from('links')
        .insert([values]);

      if (error) throw error;
      
      toast.success("Link submitted successfully!");
      form.reset();
    } catch (error) {
      toast.error("Failed to submit link");
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto border-2 border-gray-800 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
      <CardHeader className="bg-[#c0c0c0] border-b-2 border-gray-800">
        <CardTitle className="text-black">Submit a Link</CardTitle>
      </CardHeader>
      <CardContent className="bg-[#c0c0c0] p-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black">Title</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter a title" 
                      {...field}
                      className="border-2 border-gray-800 bg-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black">URL</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="https://" 
                      {...field}
                      className="border-2 border-gray-800 bg-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button 
              type="submit"
              className="w-full bg-[#c0c0c0] border-2 border-gray-800 hover:bg-[#d4d4d4] text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
            >
              Submit
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}