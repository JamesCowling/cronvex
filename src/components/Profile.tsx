"use client";

import { useAuthActions } from "@xixixao/convex-auth/react";
import { Authenticated, Unauthenticated } from "convex/react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

export function Profile() {
  return (
    <div>
      <Authenticated>
        <SignOut />
      </Authenticated>
      <Unauthenticated>
        <SignIn />
      </Unauthenticated>
    </div>
  );
}

export function SignIn() {
  const { signIn, verifyCode } = useAuthActions();
  const [step, setStep] = useState<"signIn" | "code">("signIn");
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" className="gap-2">
          Sign in
        </Button>
      </DialogTrigger>
      {step === "signIn" ? (
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-2xl">Sign in</DialogTitle>
            <DialogDescription>
              Enter your email for an access code to sign in immediately.
            </DialogDescription>
          </DialogHeader>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              void signIn("resend-otp", formData).then(() => setStep("code"));
              event.currentTarget.reset();
            }}
          >
            <div className="grid gap-2 py-4">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <DialogFooter>
              <Button type="submit" className="w-full">
                Send sign-in link
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      ) : (
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-2xl">Enter code</DialogTitle>
            <DialogDescription>
              Enter the one-time access code sent to your email.
            </DialogDescription>
          </DialogHeader>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              console.log("this is the form data", formData);
              void verifyCode("resend-otp", formData);
              event.currentTarget.reset();
            }}
          >
            <div className="grid gap-2 py-4">
              <Label htmlFor="code">Code</Label>
              <InputOTP maxLength={6} name="code" required>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setStep("signIn")}
                className="w-full"
              >
                Cancel
              </Button>
              <Button type="submit" className="w-full">
                Continue
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      )}
    </Dialog>
  );
}

function SignOut() {
  const { signOut } = useAuthActions();

  return (
    <Button variant="outline" className="gap-2" onClick={() => signOut()}>
      <div>Sign Out</div>
    </Button>
  );
}
