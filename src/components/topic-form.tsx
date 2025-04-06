import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import MDEditor from "@/components/MDEditor"
import { createTopic } from "@/lib/nezha-api.ts"

const formSchema = z.object({
  title: z.string().min(2, {
    message: 'Product name must be at least 2 characters.'
  }),
  content: z.any(),
});

export default function TopicForm({
  // initialData,
  pageTitle
}: {
  // initialData: Product | null;
  pageTitle?: string;
}) {
  // const defaultValues = {
  //   name: initialData?.name || '',
  //   category: initialData?.category || '',
  //   price: initialData?.price || 0,
  //   description: initialData?.description || ''
  // };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    // values: defaultValues
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    try {
      await createTopic(values)
    } catch (e) {
      console.error(e)
      return
    }
    form.reset()
  }

  return (
    <Card className='mx-auto w-full'>
      <CardHeader>
        <CardTitle className='text-left text-2xl font-bold'>
          {pageTitle?pageTitle:"发帖"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter product name' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='content'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <MDEditor
                      onValueChange={field.onChange}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type='submit' className='bg-green-500'>发表</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
