import { Link } from 'react-router-dom';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"


export default function Home() {
    return (
        <main className="flex-1">
            <section className="bg-muted py-12 md:py-16 lg:py-20">
                <div className="container px-4 md:px-6">
                    <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
                        <div>
                            <img
                                src="/banner.jpg"
                                width={800}
                                height={450}
                                alt="Featured Post"
                                className="aspect-video overflow-hidden rounded-lg object-cover"
                            />
                        </div>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                                    Featured
                                </div>
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Introducing Our New Product Line</h2>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center gap-2">
                                    <Avatar className="w-6 h-6 border">
                                        <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
                                        <AvatarFallback>AC</AvatarFallback>
                                    </Avatar>
                                    <span>John Doe</span>
                                </div>
                                <span>•</span>
                                <time dateTime="2023-07-07">July 7, 2023</time>
                            </div>
                            <p className="text-muted-foreground">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl nec ultricies lacinia, nisl
                                nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.
                            </p>
                            <Link
                                to="/"
                                className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"

                            >
                                Read More
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-12 md:py-16 lg:py-20">
                <div className="container px-4 md:px-6">
                    <div className="space-y-6 md:space-y-8">
                        <div className="space-y-2">
                            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Recent Posts</h2>
                            <p className="text-muted-foreground">Check out the latest articles from our blog.</p>
                        </div>
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            <Link
                                to="/"
                                className="group grid h-auto w-full justify-start gap-4 rounded-lg bg-background p-4 transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"

                            >
                                <div className="aspect-video overflow-hidden rounded-lg">
                                    <img
                                        src="/banner.jpg"
                                        width={400}
                                        height={225}
                                        alt="Post Image"
                                        className="h-full w-full object-cover transition-all group-hover:scale-105"
                                        style={{ aspectRatio: "400/225", objectFit: "cover" }}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-lg font-semibold leading-tight group-hover:underline">
                                        The Future of Web Development
                                    </h3>
                                    <p className="line-clamp-2 text-muted-foreground">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl nec ultricies lacinia,
                                        nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.
                                    </p>
                                </div>
                            </Link>
                            <Link
                                to="/"
                                className="group grid h-auto w-full justify-start gap-4 rounded-lg bg-background p-4 transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"

                            >
                                <div className="aspect-video overflow-hidden rounded-lg">
                                    <img
                                        src="/banner.jpg"
                                        width={400}
                                        height={225}
                                        alt="Post Image"
                                        className="h-full w-full object-cover transition-all group-hover:scale-105"
                                        style={{ aspectRatio: "400/225", objectFit: "cover" }}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-lg font-semibold leading-tight group-hover:underline">Mastering React Hooks</h3>
                                    <p className="line-clamp-2 text-muted-foreground">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl nec ultricies lacinia,
                                        nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.
                                    </p>
                                </div>
                            </Link>
                            <Link
                                to="/"
                                className="group grid h-auto w-full justify-start gap-4 rounded-lg bg-background p-4 transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"

                            >
                                <div className="aspect-video overflow-hidden rounded-lg">
                                    <img
                                        src="/banner.jpg"
                                        width={400}
                                        height={225}
                                        alt="Post Image"
                                        className="h-full w-full object-cover transition-all group-hover:scale-105"
                                        style={{ aspectRatio: "400/225", objectFit: "cover" }}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-lg font-semibold leading-tight group-hover:underline">
                                        Designing for Accessibility
                                    </h3>
                                    <p className="line-clamp-2 text-muted-foreground">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl nec ultricies lacinia,
                                        nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.
                                    </p>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}