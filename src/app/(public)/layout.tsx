import { NavigationBar } from "@/components/navigation-bar";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <NavigationBar />
      <div className="container mx-auto">{children}</div>
    </main>
  );
}
