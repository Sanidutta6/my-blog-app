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

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ACCEPTED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/jpg'];
const CATEGORIES = ["Software Development", "Technology", "Culture", "Work", "Society", "Self Improvement", "World", "Life", "Media", "Productivity", "Politics", "Nature", "Travel", "Food", "Health", "Business"];
const STATUS = ["active", "draft", "archieved"];

const FormSchema = z.object({
    title: z.string().min(5, {
        message: 'Title must be at least 5 characters.',
    }).max(150, {
        message: 'Title must be at most 150 characters',
    }),
    description: z.string().min(5, {
        message: 'Description must be at least 5 characters.',
    }).max(150, {
        message: 'Description must be at most 150 characters',
    }),
    content: z.string().min(15, {
        message: 'Content must be at least 15 characters.'
    }),
    category: z.enum(CATEGORIES, {
        errorMap: () => ({ message: 'Category must be one of given options' }),
    }),
    status: z.enum(STATUS, {
        errorMap: () => ({ message: 'Status must be one of the given options.' }),
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
    console.log("PostForm::", post)
    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            title: post?.title || "",
            description: post?.description || "",
            content: post?.content || "",
            category: post?.category || "",
            status: post?.status || "active",
            feturedImage: post?.feturedImage || null,
        },
    });

    const [slug, setSlug] = useState('');
    const { watch } = form;
    const title = watch('title');
    const description = watch('description');
    const content = watch('content');
    const category = watch('category');
    const status = watch('status');
    const feturedImage = watch('feturedImage');

    useEffect(() => {
        const newSlug = generateSlug(title);
        setSlug(newSlug);
    }, [title]);

    useEffect(() => {
        onFormChange({
            title,
            description,
            content,
            category,
            status,
            feturedImage,
        })
    }, [title, description, content, category, status, feturedImage]);

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
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Input placeholder="shadcn" {...field} />
                            </FormControl>
                            <FormDescription>
                                Write a small description of the blog post.
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
                                        {CATEGORIES.map((category, index) => (
                                            <SelectItem key={index} value={category}>{category}</SelectItem>
                                        ))}
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
                                <TiptapEditor content={field.value} onChange={field.onChange} />
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
                                        {STATUS.map((status, index) => (
                                            <SelectItem key={index} value={status}>{status}</SelectItem>
                                        ))}
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