"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const LoginPage: React.FC = () => {
  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add login functionality here
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <h2 className="text-center text-2xl font-bold">Login</h2>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="mt-2"
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="mt-2"
                required
              />
            </div>
            <Button className="w-full mt-4" type="submit">
              Login
            </Button>
          </form>
          <div className="mt-4 text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <a href="/register" className="text-blue-600 hover:underline">
              Register here
            </a>
          </div>
          <div className="flex justify-center mt-4">
            <Button
              className="bg-red-500 hover:bg-red-600 text-white mx-2"
              onClick={() => (window.location.href = "/api/auth/google/redirect")}
            >
              Login with Google
            </Button>
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white mx-2"
              onClick={() => (window.location.href = "/api/auth/facebook/redirect")}
            >
              Login with Facebook
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
