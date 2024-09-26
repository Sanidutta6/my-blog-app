import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import TiptapEditor from "@/components/custom/TiptapEditor";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { generateSlug } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ACCEPTED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/jpg'];

const FormSchema = z.object({
    title: z.string().min(2, {
        message: 'Title must be at least 2 characters.',
    }).max(150, {
        message: 'Title must be at most 150 characters',
    }),
    content: z.string().min(15, {
        message: 'Content must be at least 15 characters.'
    }),
    category: z.enum(['technology', 'plants', 'health'], {
        errorMap: () => ({ message: 'Category must be one of: technology, plants, health.' }),
    }),
    status: z.enum(['active', 'in-active'], {
        errorMap: () => ({ message: 'Status must be one of: Active, In-active.' }),
    }),
    feturedImage: z.instanceof(File).optional()
        .refine((file) => !file || file.size <= MAX_FILE_SIZE, {
            message: `File size must be less than ${MAX_FILE_SIZE / (1024 * 1024)}MB.`,
        })
        .refine((file) => !file || ACCEPTED_FILE_TYPES.includes(file.type), {
            message: 'Invalid file type.',
        }),
});

export function PostForm({ post, onFormChange, onFormSubmit }) {
    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            title: post?.title || "",
            content: post?.content || "",
            category: post?.category || "",
            status: post?.status || "active",
            feturedImage: post?.feturedImage || null,
        },
    });

    const [slug, setSlug] = useState('');
    const { watch, setValue } = form;
    const title = watch('title');
    const content = watch('content');
    const category = watch('category');
    const status = watch('status');
    const feturedImage = watch('feturedImage');

    useEffect(() => {
        const newSlug = generateSlug(title);
        setSlug(newSlug);
        setValue('slug', newSlug); // Update the slug in form values if needed
    }, [title, setValue]);

    useEffect(() => {
        onFormChange({
            title,
            content,
            category,
            status,
            feturedImage,
        });
    }, [title, content, category, status, feturedImage, onFormChange]);

    const navigate = useNavigate();

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onFormSubmit)} className="w-full space-y-6 mx-auto my-5 p-9 border rounded-md">
                {/* Title */}
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input placeholder="shadcn" {...field} />
                            </FormControl>
                            <FormDescription>
                                Slug: {slug}
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="grid grid-cols-2 gap-2">
                    {/* Featured Image */}
                    <FormField
                        control={form.control}
                        name="feturedImage"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Featured Image</FormLabel>
                                <FormControl>
                                    <Controller
                                        name="feturedImage"
                                        control={form.control}
                                        render={({ field }) => (
                                            <Input
                                                type="file"
                                                accept=".jpg,.jpeg,.png"
                                                className='file:text-muted-foreground'
                                                onChange={(e) => {
                                                    field.onChange(e.target.files[0] || null);
                                                }}
                                            />
                                        )}
                                    />
                                </FormControl>
                                <FormDescription>
                                    Featured Image of the blog post.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* Category */}
                    <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Category</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a Category" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="technology">Technology</SelectItem>
                                        <SelectItem value="plants">Plants</SelectItem>
                                        <SelectItem value="health">Health</SelectItem>
                                        <SelectItem value="travel">Travel</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormDescription>
                                    Select Blog Post Category.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                {/* Content */}
                <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Content</FormLabel>
                            <FormControl>
                                <TiptapEditor value={field.value} onChange={field.onChange} />
                            </FormControl>
                            <FormDescription>
                                Content of the blog post.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="grid grid-cols-2 gap-2 items-center">
                    {/* Status */}
                    <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Status</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a Status" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="active">Active</SelectItem>
                                        <SelectItem value="in-active">In-active</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormDescription>
                                    Select Blog Post Status.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">{post ? "Update" : "Submit"}</Button>
                </div>
            </form>
        </Form>
    );
}

export default PostForm;