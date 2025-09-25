"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { GetSecureWordResponse } from "@/app/api/getSecureWord/route";
import SecureWord from "./secure-word";
import Link from "next/link";

type LoginFromProps = React.ComponentProps<"div">;

export function LoginForm({ className, ...props }: LoginFromProps) {
  const [username, setUserName] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [secureWord, setSecureWord] = useState<GetSecureWordResponse | null>(
    null
  );

  const onSubmit = async () => {
    setPending(true);
    setError(null);
    setSecureWord(null);

    try {
      const response = await fetch("/api/getSecureWord", {
        method: "POST",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message);
        return;
      }

      const data = (await response.json()) as GetSecureWordResponse;
      setSecureWord(data);
    } catch (error) {
      error && setError(String(error));
    } finally {
      setPending(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          {secureWord === null ? (
            <>
              <CardTitle>Login to your account</CardTitle>
              <CardDescription>Enter your user name</CardDescription>
            </>
          ) : (
            <>
              <CardTitle>Get your token</CardTitle>
              <CardDescription>
                Copy your token and go to next step
              </CardDescription>
            </>
          )}
        </CardHeader>
        <CardContent>
          {secureWord == null ? (
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                await onSubmit();
              }}
            >
              <div className="flex flex-col gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    type="name"
                    placeholder="User Name"
                    value={username}
                    required
                    onChange={(e) => setUserName(e.target.value)}
                    minLength={3}
                    autoComplete="off"
                  />
                </div>
                <div className="flex flex-col">
                  <Button type="submit" className="w-full" disabled={pending}>
                    Submit
                  </Button>
                </div>
              </div>
              {error !== null && (
                <div className="text-sm mt-2 text-center">
                  <p className="text-red-500">{error}</p>
                </div>
              )}
            </form>
          ) : (
            <div className="text-sm mt-2 text-left text-wrap flex flex-col space-y-4">
              <SecureWord word={secureWord.secureWord} expired={60} />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
