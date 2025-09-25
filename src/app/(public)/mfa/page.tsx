import TotpForm from "@/components/totp-form";

interface MfaProps {
  searchParams: {
    username?: string;
    [key: string]: string | undefined;
  };
}

export default async function Mfa({ searchParams }: MfaProps) {
  const { username } = await searchParams; // has to use await: https://nextjs.org/docs/messages/sync-dynamic-apis

  if (!username) {
    return null;
  }

  return (
    <div className="flex flex-col space-x-4 items-center justify-center">
      <TotpForm username={username} />
    </div>
  );
}
