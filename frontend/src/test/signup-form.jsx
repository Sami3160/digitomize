import React, { useEffect, useState } from "react";
import { Label } from "../components/ui/label"; // Adjust import path as per your folder structure
import { Input } from "../components/ui/input"; // Adjust import path as per your folder structure
import { cn } from "../utils/cn"; // Adjust import path accordingly
import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";
import signin from "../assets/signin.svg";
import axios from "axios";
import { ErrorMessage, SuccessMessages } from "../components/messages";
import { Link, useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL; 
export function SignupFormDemo() {
  useEffect(() => {
    document.title = "First time? Signup here";
  }, []);
  const navigate = useNavigate();

  const [isError, setError] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const [error, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmpassword: "",
  });
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        // Extract the access_token from the tokenResponse
        const { access_token } = tokenResponse;

        console.log("got access token");
        // Send the access_token to your backend for authentication
        const response = await axios.post(
          `${apiBaseUrl}/auth/google`,
          {
            access_token,
          }
        );

        // Handle the response from your backend
        if (response.data.token) {
          console.log("hehe ifff");
          console.log(response.data)
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("user", JSON.stringify(response.data.savedUser._id));
          setSuccess(true);
          setTimeout(() => setSuccess(false), 2500);
          setTimeout(() => navigate("/home"), 3000);
        } else {
          console.log("hehe elseee");
        }
      } catch (error) {
        console.error("Google login error:", error);
        setError(true);
        setErrorMsg("Google login failed. Please try again.");
        setTimeout(() => setError(false), 3000);
      }
    },
    onError: (error) => {
      console.log(error);
      alert("Error occurred");
    },
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    for (let key in formData) {
      if (formData[key] === "" && key != "lastname") {
        alert("All fields are required");
        return;
      }
    }
    console.log(formData);
    axios
      .post(`${apiBaseUrl}/users/register`, formData)
      .then((res) => {
        console.log(res);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.savedUser._id));
        console.log(res.data);
        setSuccess(true);
        setTimeout(() => setSuccess(false), 2500);
        setLoading(false);
        setTimeout(() => navigate("/home"), 3000);
        // navigate("/login");
      })
      .catch((err) => {
        console.log("error cane : ", err);
        setError(true);
        setErrorMsg(err.response.data.message);
        setTimeout(() => setError(false), 3000);
        setLoading(false);
      });

    console.log("Form submitted");
  };

  return (
    <div className="w-[90%] mx-auto flex flex-col-reverse md:flex-row relative gap-6 md:gap-0  rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-black">
      {isSuccess && (
        <div className="absolute left-1/2  transform -translate-x-1/2 ">
          <SuccessMessages
            head={"Success"}
            description={"Successfully user regisitered"}
          />
        </div>
      )}
      {isError && (
        <div className="absolute left-1/2  transform -translate-x-1/2 ">
          <ErrorMessage head={"Error"} description={error} />
        </div>
      )}

      <div className="max-w-md w-full  rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-black md:border border-white">
        <h2 className="font-bold text-xl text-neutral-200">
          Welcome to Digitest
        </h2>
        <p className=" text-sm max-w-sm mt-2 text-neutral-300">
          Signin to Digitest if you can because we don&apos;t have a login flow
          yet.
        </p>
        <form className="my-8" onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
            <LabelInputContainer>
              <Label htmlFor="firstname">First name</Label>
              <Input
                id="firstname"
                placeholder="John"
                type="text"
                value={formData.firstname}
                onChange={handleChange}
              />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="lastname">Last name</Label>
              <Input
                id="lastname"
                placeholder="Doe"
                type="text"
                value={formData.lastname}
                onChange={handleChange}
              />
            </LabelInputContainer>
          </div>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              placeholder="dyp@abc.com"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              placeholder="••••••••"
              type="password"
              value={formData.password}
              onChange={handleChange}
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-8">
            <Label htmlFor="confirmpassword">Your Confirm password</Label>
            <Input
              id="confirmpassword"
              placeholder="••••••••"
              type="password"
              value={formData.confirmpassword}
              onChange={handleChange}
            />
          </LabelInputContainer>

          <button
            className="bg-gradient-to-br relative group/btn from-zinc-900 to-zinc-900  block bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
          >
            {loading ? "Loading..." : "Sign up"} &rarr;
            <BottomGradient />
          </button>

          <p className=" text-sm max-w-sm mt-2 text-neutral-300">
            Already have an account?{" "}
            <Link to="/login" className="text-cyan-400">
              Login
            </Link>
          </p>
          <div className="bg-gradient-to-r from-transparent via-neutral-700 to-transparent my-8 h-[1px] w-full" />

          <div className="flex flex-col space-y-4">
            <button
              className="relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium bg-zinc-900 shadow-[0px_0px_1px_1px_var(--neutral-800)]"
              type="button"
            >
              <IconBrandGithub className="h-4 w-4 text-neutral-300" />
              <span className="text-neutral-300 text-sm">GitHub</span>
              <BottomGradient />
            </button>
            <button
              className="relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium  bg-zinc-900 shadow-[0px_0px_1px_1px_var(--neutral-800)]"
              type="button"
              onClick={() => login()}
            >
              <IconBrandGoogle className="h-4 w-4 text-neutral-300" />
              <span className="text-neutral-300 text-sm">Google</span>
              <BottomGradient />
            </button>
          </div>
        </form>
      </div>
      <div className="w-full flex justify-center">
        <img src={signin} alt="signin image" className="md:ml-auto max-w-[80%]" />
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
