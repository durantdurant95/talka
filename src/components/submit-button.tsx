"use client";

import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { type ComponentProps } from "react";
import { useFormStatus } from "react-dom";

export function SubmitButton({
  children,
  ...props
}: ComponentProps<typeof Button>) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" aria-disabled={pending} {...props}>
      {pending ? <Loader /> : children}
    </Button>
  );
}
