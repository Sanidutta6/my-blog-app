import { useAuth } from "@/hooks/use-auth"
import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card"

function Auth() {
    const navigate = useNavigate();
    const { loading, isAuthenticated, role, signUp, signIn } = useAuth();
    const [signUpData, setSignUpData] = useState({});
    const [signInData, setSignInData] = useState({});

    useEffect(() => {
        if (!loading && isAuthenticated) {
            if (role === "admin") {
                navigate("/admin")
            } else if (role === "author") {
                navigate("/author")
            } else if (role === "user") {
                navigate("/user")
            }
        }
    }, [isAuthenticated, loading]);

    const handleSignUpData = (e) => {
        const { id, type } = e.target;

        if (type === 'checkbox') {
            const { checked } = e.target;
            setSignUpData({ ...signUpData, [id]: checked });
        } else if (type === 'file') {
            const { files } = e.target;
            setSignUpData({ ...signUpData, [id]: files[0] });
        } else {
            const { value } = e.target;
            setSignUpData({ ...signUpData, [id]: value });
        }
    }

    const handleSignInData = (e) => {
        const { id, value } = e.target;
        setSignInData({ ...signInData, [id]: value });
    }

    const handleSignup = () => {
        const { name, isAuthor, profilePicture, signupEmail, signupPassword } = signUpData;
        signUp(name, signupEmail, signupPassword, isAuthor, profilePicture);
    }

    return (
        <Tabs defaultValue="sign-up" className="w-[400px]">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="sign-up">Sign Up</TabsTrigger>
                <TabsTrigger value="sign-in">Sign In</TabsTrigger>
            </TabsList>
            <TabsContent value="sign-up">
                <Card>
                    <CardHeader>
                        <CardTitle>Sign Up</CardTitle>
                        <CardDescription>
                            Enter all details below to create your account.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="space-y-1">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" placeholder="Pedro Duarte" onChange={handleSignUpData} />
                        </div>
                        <div className="flex items-center gap-2">
                            <Checkbox id="isAuthor" onCheckedChange={(e) => { handleSignUpData({ target: { id: "isAuthor", type: "checkbox", checked: e } }) }} />
                            <label
                                htmlFor="isAuthor"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Are you an Author?
                            </label>
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="profilePicture">Profile Picture</Label>
                            <Input id="profilePicture" className="placeholder-gray-400" placeholder="Pedro Duarte" type="file" onChange={handleSignUpData} />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="signupEmail">Email</Label>
                            <Input id="signupEmail" placeholder="email@peduarte.com" onChange={handleSignUpData} />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="signupPassword">Password</Label>
                            <Input id="signupPassword" type="password" onChange={handleSignUpData} />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button onClick={() => { handleSignup() }}>
                            Sign Up
                        </Button>
                    </CardFooter>
                </Card>
            </TabsContent>
            <TabsContent value="sign-in">
                <Card>
                    <CardHeader>
                        <CardTitle>Sign In</CardTitle>
                        <CardDescription>
                            Enter the details below to login to your account.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="space-y-1">
                            <Label htmlFor="signinEmail">Email</Label>
                            <Input id="signinEmail" placeholder="email@peduarte.com" onChange={handleSignInData} />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="signinPassword">Password</Label>
                            <Input id="signinPassword" type="password" onChange={handleSignInData} />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button onClick={() => {
                            const { signinEmail, signinPassword } = signInData;
                            signIn(signinEmail, signinPassword);
                        }}>
                            Sign In
                        </Button>
                    </CardFooter>
                </Card>
            </TabsContent>
        </Tabs>
    )
}

export default Auth;