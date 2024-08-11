// LoginForm.tsx
import React, { useState } from "react";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { cn } from "../lib/utils";
import { cva } from "class-variance-authority";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import AuthWrapper from "@/components/AuthWrapper";
import { Toaster } from "@/components/ui/toaster";
import { useAuth } from "@/components/AuthContext";
import { authInstance } from "@/api/axios";

const formContainerVariants = cva(
  "flex items-center justify-center min-h-screen bg-gray-100",
  {
    variants: {
      variant: {
        primary: "bg-white shadow-lg",
        secondary: "bg-gray-50 shadow-md",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
);

type LoginFormProps = {
  variant?: "primary" | "secondary";
};

const LoginForm: React.FC<LoginFormProps> = ({ variant }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setToken } = useAuth();

  const loginUser = async (credentials: { loginId: string; password: string }) => {
    const response = await authInstance.post("user/login", credentials);
    return response.data;
  };

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: async (data) => {
      await localStorage.setItem("userId", data.userId);
      await setToken(data.accessToken);
      // navigate("/");
    },
    onError: (error: any) => {
      toast({
        title: "Login failed",
        description: error.response.data.message,
        action: <ToastAction altText="Undo">Undo</ToastAction>,
        variant: "destructive",
        duration: 2000,
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({ loginId: email, password });
  };

  return (
    <AuthWrapper>
      <div className={cn(formContainerVariants({ variant }))}>
        <div className="w-full max-w-md p-6 bg-white rounded-md shadow-md">
          <h2 className="mb-4 text-2xl font-semibold">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <Input
                type="email"
                id="email"
                variant={variant}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <Input
                type="password"
                id="password"
                variant={variant}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" variant="secondary">
              Sign In
            </Button>
          </form>
          <Link to="/signup">
          <p className="text-primary underline">signup?</p></Link>
          <Toaster />
        </div>
      </div>
    </AuthWrapper>
  );
};

export default LoginForm;
