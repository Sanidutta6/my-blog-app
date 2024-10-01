import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Edit, Search, TrendingUp, Users, Mountain } from "lucide-react"

export default function Home() {
    return (
        <>
            <section className="w-full py-12 md:pb-24 lg:pb-32 xl:pb-48 bg-muted">
                <div className="container px-4 md:px-6">
                    <div className="flex flex-col items-center space-y-4 text-center">
                        <Mountain className="w-36 h-36" />
                        <div className="space-y-2">
                            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                                Welcome to Acme Blog
                            </h1>
                            <p className="mx-auto max-w-[700px] md:text-xl">
                                Discover stories, thinking, and expertise from writers on any topic.
                            </p>
                        </div>
                        <div className="w-full max-w-sm space-y-2">
                            <form className="flex space-x-2">
                                <Input className="max-w-lg flex-1 border border-primary" placeholder="Search articles..." type="search" />
                                <Button type="submit">
                                    <Search className="h-4 w-4" />
                                    <span className="sr-only">Search</span>
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            <section className="w-full py-12 md:py-24 lg:py-32">
                <div className="container px-4 md:px-6">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8 text-center">Why Choose Acme Blog?</h2>
                    <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
                        <div className="flex flex-col items-center space-y-3 text-center">
                            <div className="bg-primary text-primary-foreground p-3 rounded-full">
                                <Edit className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-bold">Easy Writing Tools</h3>
                            <p>
                                Our intuitive editor makes it simple to create beautiful, engaging content without any technical skills.
                            </p>
                        </div>
                        <div className="flex flex-col items-center space-y-3 text-center">
                            <div className="bg-primary text-primary-foreground p-3 rounded-full">
                                <Users className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-bold">Vibrant Community</h3>
                            <p>
                                Connect with millions of readers and writers from around the world, sharing ideas and perspectives.
                            </p>
                        </div>
                        <div className="flex flex-col items-center space-y-3 text-center">
                            <div className="bg-primary text-primary-foreground p-3 rounded-full">
                                <TrendingUp className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-bold">Grow Your Audience</h3>
                            <p>
                                Our intelligent recommendation system helps your content reach the right readers, expanding your influence.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
                <div className="container px-4 md:px-6">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8 text-center">Frequently Asked Questions</h2>
                    <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
                        <AccordionItem value="item-1">
                            <AccordionTrigger>Is it free to join Acme Blog?</AccordionTrigger>
                            <AccordionContent>
                                Yes, it's completely free to join Acme Blog and start writing. We also offer premium features for those who want to enhance their experience.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger>How do I get started with writing on Acme Blog?</AccordionTrigger>
                            <AccordionContent>
                                Getting started is easy! Simply sign up for an account, verify your email, and you can start writing right away. Our user-friendly editor makes it simple to create and publish your first post.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                            <AccordionTrigger>What kind of support does Acme Blog offer to writers?</AccordionTrigger>
                            <AccordionContent>
                                We offer comprehensive support to our writers, including writing workshops, community forums, and dedicated support staff to help with any technical issues or questions you may have.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            </section>
            <section className="w-full py-12 md:py-24 lg:py-32">
                <div className="container px-4 md:px-6">
                    <div className="flex flex-col items-center justify-center space-y-4 text-center">
                        <div className="space-y-2">
                            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Start Your Writing Journey</h2>
                            <p className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                Join our community of writers and readers. Share your stories, ideas, and expertise with the world.
                            </p>
                        </div>
                        <div className="w-full max-w-sm space-y-2">
                            <form className="flex flex-col space-y-2">
                                <Input className="max-w-lg border border-primary" placeholder="Enter your email" type="email" />
                                <Button type="submit">Get Started</Button>
                            </form>
                            <p className="text-xs">
                                By signing up, you agree to our{" "}
                                <Link className="underline underline-offset-2" to="/">
                                    Terms & Conditions
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}