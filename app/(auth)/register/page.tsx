"use client";
import React, { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

const RegisterPage: React.FC = () => {
    const API = process.env.BACKEND_API_URL;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
        console.log("API URL:", API);

        const response = await axios.post(`${API}/register`, formData, {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          });

      setSuccess("Registration successful!");
      console.log("Response:", response.data);

      // Optionally, redirect to login or save token
      // localStorage.setItem("token", response.data.access_token);
    } catch (err: any) {
      console.error(err);
      if (err.response && err.response.data) {
        setError(err.response.data.message || "An error occurred during registration.");
      } else {
        setError("Unable to connect to the server.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <h2 className="text-center text-2xl font-bold">Register</h2>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister} className="space-y-4">
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {success && <p className="text-green-500 text-sm">{success}</p>}
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                className="mt-2"
                required
              />
            </div>
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
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                className="mt-2"
                required
              />
            </div>
            <div>
              <Label htmlFor="password_confirmation">Confirm Password</Label>
              <Input
                id="password_confirmation"
                name="password_confirmation"
                type="password"
                placeholder="Confirm your password"
                value={formData.password_confirmation}
                onChange={handleChange}
                className="mt-2"
                required
              />
            </div>
            <Button className="w-full mt-4" type="submit">
              Register
            </Button>
          </form>
          <div className="mt-4 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600 hover:underline">
              Login here
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterPage;
