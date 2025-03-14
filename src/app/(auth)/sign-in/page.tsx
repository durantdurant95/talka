import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signInAction } from "@/db/auth-actions";
import Link from "next/link";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function SigninPage(props: {
  searchParams: SearchParams;
}) {
  const searchParams = await props.searchParams;

  // Create a properly formatted Message object
  const formMessage: Message | null = searchParams.message
    ? { message: searchParams.message as string }
    : null;

  return (
    <form className="flex-1 max-w-96 pt-4 md:pt-8 lg:pt-16 mx-auto w-full px-4">
      <h1 className="text-2xl font-medium">Sign in</h1>
      <p className="text-sm text-foreground">
        Do not have an account?{" "}
        <Link className="text-foreground font-medium underline" href="/sign-up">
          Sign up
        </Link>
      </p>
      <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
        <Label htmlFor="email">Email</Label>
        <Input name="email" placeholder="you@example.com" required />
        <div className="flex justify-between items-center">
          <Label htmlFor="password">Password</Label>
          <Link
            className="text-xs text-foreground underline"
            href="/forgot-password"
          >
            Forgot Password?
          </Link>
        </div>
        <Input
          type="password"
          name="password"
          placeholder="Your password"
          required
        />
        <SubmitButton formAction={signInAction}>Sign in</SubmitButton>
        {formMessage && <FormMessage message={formMessage} />}
      </div>
    </form>
  );
}
