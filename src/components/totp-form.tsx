"use client";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function TotpForm({ username }: { username: string }) {
  const [otp, setOtp] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const timer = useRef<NodeJS.Timeout | null>(null);
  const [seconds, setSeconds] = useState(5);

  useEffect(() => {
    if (success) {
      if (seconds === 0) {
        router.push("/dashboard");
      }

      timer.current = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
    }

    return () => {
      if (timer.current) {
        clearInterval(timer.current);
        timer.current = null;
      }
    };
  }, [success, seconds, timer, router]);

  const onSubmit = async (otp: string) => {
    setPending(true);
    setError(null);

    try {
      const response = await fetch("/api/verifyMfa", {
        method: "POST",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          code: otp,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message);
        return;
      }

      await response.json();
      // no error -> sucess
      setSuccess(true);
    } catch (error) {
      if (error) {
        setError(String(error));
      }
    } finally {
      setPending(false);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        onSubmit(otp);
      }}
      className="flex flex-col gap-4"
    >
      <p className="text-sm text-gray-500">One-Time Password</p>
      <InputOTP
        maxLength={6}
        pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
        value={otp}
        onChange={setOtp}
      >
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
      <Button type="submit" disabled={pending}>
        Submit
      </Button>
      {error !== null && (
        <div className="text-sm mt-2 text-center">
          <p className="text-red-500">{error}</p>
        </div>
      )}
      {success && (
        <div className="mt-2 text-center">
          <p className="text-primary">Login Successful</p>
          <p className="text-sm text-gray-500">
            Redirect to dashboard: {seconds}
          </p>
        </div>
      )}
    </form>
  );
}
