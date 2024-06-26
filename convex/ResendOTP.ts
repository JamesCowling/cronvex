import Resend from "@auth/core/providers/resend";
import { ConvexError } from "convex/values";
import { Resend as ResendAPI } from "resend";
import { VerificationCodeEmail } from "./VerificationCodeEmail";
import { alphabet, generateRandomString } from "oslo/crypto";

export const ResendOTP = Resend({
  id: "resend-otp",
  apiKey: process.env.AUTH_RESEND_KEY,
  async generateVerificationToken() {
    return generateRandomString(6, alphabet("0-9"));
  },
  async sendVerificationRequest({
    identifier: email,
    provider,
    token,
    expires,
  }) {
    const resend = new ResendAPI(provider.apiKey);
    const { error } = await resend.emails.send({
      // NOTE: Make sure you change the from address if you fork this code. The
      // default email for sending via Resend is onboarding@resend.dev.
      from: "Cronvex <admin@cronvex.com>",
      to: [email],
      subject: `Sign in to Cronvex`,
      react: VerificationCodeEmail({ code: token, expires }),
    });

    if (error) {
      throw new ConvexError("Could not send verification code email");
    }
  },
});
