import React, { useEffect, useState } from "react";
import { Label } from "../components/ui/label"; // Adjust import path as per your folder structure
import { Input } from "../components/ui/input"; // Adjust import path as per your folder structure
import { cn } from "../utils/cn"; // Adjust import path accordingly
import {
    IconBrandGithub,
    IconBrandGoogle,
} from "@tabler/icons-react";
import signin from "../assets/signin.svg";
import axios from "axios";
import { ErrorMessage, SuccessMessages } from "../components/messages";
import { useNavigate } from "react-router-dom";
export function LoginFormDemo() {
    const navigate = useNavigate()
    useEffect(() => {
        document.title = "First time? Signup here"
    }, [])

    const [isError, setError] = useState(false);
    const [isSuccess, setSuccess] = useState(false);
    const [error, setErrorMsg] = useState("");
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        for (let key in formData) {
            if (formData[key] === "") {
                alert("All fields are required");
                return;
            }
        }
        console.log(formData);
        // if(formData || !formData){
        //     return;
        // }
        setLoading(true);
        axios.post("http://localhost:5000/api/users/login", formData).then((res) => {

            console.log(res);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user._id));
            console.log(res.data)
            setSuccess(true);
            setTimeout(() => setSuccess(false), 2500);
            setLoading(false);
            setTimeout(() => navigate("/home"), 3000);
            // navigate("/login");
        }).catch((err) => {
            console.log(err);
            setError(true);
            setErrorMsg(err.response.data.message);
            setTimeout(() => setError(false), 3000)
            setError(false)
            setLoading(false);

        });

        console.log("Form submitted");
    };


    return (
        <div className='w-full h-full p-20 flex mt-14 '>


            <div className="w-[90%] mx-auto flex   rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black"
            >
                {
                    isSuccess && (
                        <div className="absolute left-1/2  transform -translate-x-1/2 ">
                            <SuccessMessages head={"Success"} description={"Successfully logged in"} />
                        </div>
                    )
                }
                {
                    isError && (
                        <div className="absolute left-1/2  transform -translate-x-1/2 ">
                            <ErrorMessage head={"Error"} description={error} />
                        </div>
                    )
                }

                <div className="max-w-md w-full  rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black border bborder-white">
                    <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
                        Welcome back to Digitest
                    </h2>
                    <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
                        Login to Digitest if you can because we don&apos;t have a login flow yet.
                    </p>
                    <form className="my-8" onSubmit={handleSubmit}>
                        <LabelInputContainer className="mb-4">
                            <Label htmlFor="email">Email Address</Label>
                            <Input id="email" placeholder="dyp@abc.com" type="email" value={formData.email} onChange={handleChange} />
                        </LabelInputContainer>
                        <LabelInputContainer className="mb-4">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" placeholder="••••••••" type="password" value={formData.password} onChange={handleChange} />
                        </LabelInputContainer>

                        <button
                            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                            type="submit"
                        >
                            {loading ? "Loading..." : "Login"}
                            &rarr;
                            <BottomGradient />
                        </button>

                        <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
                            Don't have an account? <a href="/signin" className="text-cyan-600 dark:text-cyan-400">Signin</a>
                        </p>
                        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

                        <div className="flex flex-col space-y-4">
                            <button
                                className="relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
                                type="button"
                            >
                                <IconBrandGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
                                <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                                    GitHub
                                </span>
                                <BottomGradient />
                            </button>
                            <button
                                className="relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
                                type="button"
                            >
                                <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
                                <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                                    Google
                                </span>
                                <BottomGradient />
                            </button>

                        </div>
                    </form>
                </div>
                <div className="w-full flex justify-center">
                    <img src={signin} alt="signin image" className="ml-auto max-w-[80%]" />
                </div>
            </div>
        </div>

    );
}

const BottomGradient = () => {
    return (
        <>
            <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
            <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
        </>
    );
};

const LabelInputContainer = ({ children, className }) => {
    return (
        <div className={cn("flex flex-col space-y-2 w-full", className)}>
            {children}
        </div>
    );
};