import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Code } from "lucide-react"

const AboutUs = () => {
    return (
        <>
            <section className="w-full pt-12 md:pt-24 lg:pt-32">
                <div className="container space-y-12 px-4 md:px-6">
                    <div className="flex flex-col items-center space-y-4 text-center">
                        <img
                            src="https://img.freepik.com/free-photo/3d-illustration-cute-cartoon-boy-with-backpack-his-back_1142-40542.jpg?size=338&ext=jpg&ga=GA1.1.1141335507.1718323200&semt=ais_user"
                            width="200"
                            height="200"
                            alt="Profile Picture"
                            className="w-48 h-48 rounded-full object-cover"
                            style={{ aspectRatio: "200/200", objectFit: "cover" }}
                        />
                        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">About Me</h1>
                        <p className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            I'm a full-stack developer with over 2+ years of experience in the tech industry. I specialize in
                            building high-performance web applications using modern technologies.
                        </p>
                    </div>
                </div>
            </section>
            <section className="w-full py-12 md:py-24 lg:py-32">
                <div className="container space-y-12 px-4 md:px-6">
                    <div className="flex flex-col items-center space-y-4 text-center">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Skills</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                            <div className="flex flex-col items-center">
                                <Code className="h-10 w-10" />
                                <p className="mt-2 font-medium">JavaScript</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <Code className="h-10 w-10" />
                                <p className="mt-2 font-medium">React</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <Code className="h-10 w-10" />
                                <p className="mt-2 font-medium">Node.js</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <Code className="h-10 w-10" />
                                <p className="mt-2 font-medium">Python</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="w-full py-12 md:py-24 lg:py-32">
                <div className="container space-y-12 px-4 md:px-6">
                    <div className="flex flex-col items-center space-y-4 text-center">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Experience</h2>
                        <div className="flex flex-col space-y-4">
                            <div className="flex flex-col space-y-2">
                                <h3 className="text-lg font-bold">Software Engineer at The 10x Academy</h3>
                                <p>2022 - Present</p>
                                <p>
                                    Working on Data Crawling and Scraping Chrome Extensions.
                                </p>
                            </div>
                            <div className="flex flex-col space-y-2">
                                <h3 className="text-lg font-bold">Full-Stack Developer at Start-up</h3>
                                <p>2015 - 2018</p>
                                <p>
                                    Developed and maintained the company's main web application, leading to a 50% increase in user
                                    engagement.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="w-full py-12 md:py-24 lg:py-32">
                <div className="container space-y-12 px-4 md:px-6">
                    <div className="flex flex-col items-center space-y-4 text-center">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Contact Me</h2>
                        <form className="w-full max-w-md mx-auto space-y-4">
                            <Input id="name" placeholder="Name" required />
                            <Input id="email" type="email" placeholder="Email" required />
                            <Textarea id="message" placeholder="Message" required />
                            <Button type="submit" className="w-full">
                                Send Message
                            </Button>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}

export default AboutUs;