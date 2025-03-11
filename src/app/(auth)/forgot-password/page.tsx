import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { forgotPasswordAction } from "@/db/auth-actions";
import Link from "next/link";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function ForgotPasswordPage(props: {
  searchParams: SearchParams;
}) {
  const searchParams = await props.searchParams;

  // Create a properly formatted Message object
  const formMessage: Message | null = searchParams.message
    ? { message: searchParams.message as string }
    : null;

  return (
    <form className="flex-1 max-w-96 pt-4 md:pt-8 lg:pt-16 mx-auto w-full px-4">
      <div>
        <h1 className="text-2xl font-medium">Reset Password</h1>
        <p className="text-sm text-secondary-foreground">
          Already have an account?{" "}
          <Link className="text-primary underline" href="/sign-in">
            Sign in
          </Link>
        </p>
      </div>
      <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
        <Label htmlFor="email">Email</Label>
        <Input name="email" placeholder="you@example.com" required />
        <SubmitButton formAction={forgotPasswordAction}>
          Reset Password
        </SubmitButton>
        {formMessage && <FormMessage message={formMessage} />}
      </div>
    </form>
  );
}
