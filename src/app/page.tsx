import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">Hello, Talka!</h1>
      <Image
        src="/logo.svg"
        alt="Talka Logo"
        width={180}
        height={180}
        priority
      />
    </main>
  );
}
