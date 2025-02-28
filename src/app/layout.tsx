import { cn } from "@/lib/utils";
import { ThemeProvider } from "next-themes";
import { Figtree } from "next/font/google";
import "./globals.css";

export const metadata = {
  metadataBase: process.env.VERCEL_URL,
  title: "Talka - Social Media Platform",
  description: "Talka is a social media platform for everyone.",
};

const figtree = Figtree({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-figtree",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(figtree.variable, "dark")}
      style={{ colorScheme: "dark" }}
    >
      <body cz-shortcut-listen="true">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
          {/* <Toaster /> */}
        </ThemeProvider>
      </body>
    </html>
  );
}
