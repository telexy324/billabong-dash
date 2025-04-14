import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { createComment } from "@/lib/nezha-api.ts"
import { TextEditor } from "@/components/TextEditor.tsx"
import { ModelCommentForm } from "@/types/nezha-api.ts"

const formSchema = z.object({
  content: z.any(),
  entityId: z.number(),
  entityType: z.number(),
});

export default function CommentForm({initialData, className, onValueCommit}: {
  initialData: ModelCommentForm | null;
  className?: string;
  onValueCommit: () => void
}) {
  const defaultValues = {
    entityId: initialData?.entityId || 0,
    entityType: initialData?.entityType || 1,
    content: initialData?.content || null,
  };
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: defaultValues
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await createComment(values)
    } catch (e) {
      console.error(e)
      return
    }
    onValueCommit()
    form.reset()
  }

  return (
    <Card className='mx-auto w-full rounded-none border-0 shadow-none'>
      <CardContent className='p-0'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
            <FormField
              control={form.control}
              name='content'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <TextEditor
                      {...field.onChange}
                      {...field}
                      className={className}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type='submit' className='rounded bg-cyan-500'>发表</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
