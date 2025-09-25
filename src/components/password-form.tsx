"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { type Auth } from "@/stores/credentials";
import { SHA256 } from "crypto-js";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PasswordForm({ auth }: { auth: Auth }) {
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const onSubmit = async () => {
    const hashedPassword = SHA256(password).toString();

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: auth.username,
          hashedPassword,
          secureWord: auth.secureWord,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message);
        return;
      }

      await response.json();

      router.push(`/mfa?username=${auth.username}`);
    } catch (error) {
      if (error) {
        setError(String(error));
      }
    } finally {
      setPending(false);
    }
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>Enter your password</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="password-form"
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
        >
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>
          </div>
          {error !== null && (
            <div className="text-sm mt-2 text-center">
              <p className="text-red-500">{error}</p>
            </div>
          )}
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        {error !== null ? (
          <Button type="button" className="w-full" asChild={true}>
            <a href="/">Back to Home</a>
          </Button>
        ) : (
          <Button
            form="password-form"
            type="submit"
            className="w-full"
            disabled={pending}
          >
            Login
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
