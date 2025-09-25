"use client";

import { Input } from "@/components/ui/input";
// import { CopyButton } from "@/components/ui/copy-button";
import { Button } from "@/components/ui/button";
import { useExpiresIn } from "@/hooks/use-expires-in";
import { Auth } from "@/stores/credentials";

export default function SecureWord({
  auth,
  expired,
  onNext,
}: Readonly<{ auth: Auth; expired: number; onNext: () => void }>) {
  const [isExpires, seconds] = useExpiresIn(expired);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2 items-center">
        <Input disabled value={auth.secureWord} />
        {/* <CopyButton variant="ghost" content={word} /> */}
      </div>
      {!isExpires ? (
        <>
          <p className="text-center text-gray-500">Expires in: {seconds}</p>
          <Button className="w-full" onClick={onNext}>
            Next
          </Button>
        </>
      ) : (
        <>
          <p className="text-center text-gray-500">
            Your token is expired. Login Again.
          </p>
          <Button className="w-full" asChild={true}>
            <a href="/login">Login</a>
          </Button>
        </>
      )}
    </div>
  );
}
