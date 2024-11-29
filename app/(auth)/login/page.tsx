"use client";
import React, { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const API = process.env.BACKEND_API_URL;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      console.log("API URL:", API);
      const response = await axios.post(`${API}/login`, formData, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      setSuccess("Login successful!");
      console.log("Response:", response.data);

      // Save the token and redirect to dashboard or homepage
      localStorage.setItem("token", response.data.access_token);
      window.location.href = "/dashboard";
    } catch (err: any) {
      console.error(err);
      if (err.response && err.response.data) {
        setError(err.response.data.message || "Invalid login credentials.");
      } else {
        setError("Unable to connect to the server.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <h2 className="text-center text-2xl font-bold">Login</h2>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {success && <p className="text-green-500 text-sm">{success}</p>}
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="mt-2"
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
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
              onClick={() =>
                (window.location.href = `${API}/auth/google/redirect`)
              }
            >
              Login with Google
            </Button>
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white mx-2"
              onClick={() =>
                (window.location.href = `${API}/auth/facebook/redirect`)
              }
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
