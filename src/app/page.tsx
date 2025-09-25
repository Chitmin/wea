import Link from "next/link";

export default function Home() {
  return (
    <div className="font-sans px-2">
      <div className="text-right">
        <Link href="/login" className="text-blue-500 hover:text-blue-700">
          Login
        </Link>
      </div>
    </div>
  );
}
