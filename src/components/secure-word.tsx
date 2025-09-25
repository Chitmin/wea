import { Input } from "@/components/ui/input";
import { CopyButton } from "@/components/ui/copy-button";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useExpiresIn } from "@/hooks/use-expires-in";

export default function SecureWord({
  word,
  expired,
}: Readonly<{ word: string; expired: number }>) {
  const [isExpires, seconds] = useExpiresIn(expired);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2 items-center">
        <Input disabled value={word} />
        <CopyButton variant="ghost" content={word} />
      </div>
      {!isExpires ? (
        <>
          <p className="text-center text-gray-500">Expires in: {seconds}</p>
          <Button className="w-full">
            <Link href="/password">Next</Link>
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
