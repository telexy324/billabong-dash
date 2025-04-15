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
import { createTopic, fetchTopicGroup } from "@/lib/nezha-api.ts"
import { FileUploader } from "@/components/FileUploader.tsx"
import { useQuery } from "@tanstack/react-query"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"

const formSchema = z.object({
  title: z.string().min(2, {
    message: 'Product name must be at least 2 characters.'
  }),
  content: z.string(),
  affixes: z.any(),
  topicGroup: z.number().min(1)
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
  const { data: topicGroupData } = useQuery({
    queryKey: ["topicGroup"],
    queryFn: () => fetchTopicGroup(),
  })

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
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 my-2">
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>标题</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter product name' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='topicGroup'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>选择分类</FormLabel>
                    <Select
                      // value={field.value?.toString()}
                      value={field.value?.toString()}
                      onValueChange={(val) => field.onChange(Number(val))}
                    >
                      <FormControl>
                      <SelectTrigger>
                      {/*<SelectTrigger className="w-full border rounded-md px-3 py-2 bg-background focus:outline-none focus:ring-2 focus:ring-ring">*/}
                        <SelectValue placeholder="请选择" />
                      </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {/*<SelectContent className="bg-background z-50">*/}
                        {topicGroupData?.data.map(group => (
                          <SelectItem
                            key={group.group.id}
                            value={group.group.id.toString()}
                          >
                            {group.group.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
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
            <FormField
              control={form.control}
              name='affixes'
              render={({field}) => (
                <div className='space-y-6'>
                  <FormItem className='w-full'>
                    <FormLabel>files</FormLabel>
                    <FormControl>
                      <FileUploader
                        value={field.value}
                        onValueChange={(files) => {
                          // console.log("上传的文件：", files) // ✅ 调试
                          // console.log("手动获取 values.files：", form.getValues("files"));
                          // console.log("手动获取 values.name：", form.getValues("name"));
                          field.onChange(files)
                        }}
                        maxFiles={4}
                        maxSize={4 * 1024 * 1024}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </div>
              )}
            />
            <Button type='submit' className='bg-green-500'>发表</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
