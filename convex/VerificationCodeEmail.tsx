import {
  Container,
  Head,
  Heading,
  Html,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
// @ts-ignore
import * as React from "react";

export function VerificationCodeEmail({
  code,
  expires,
}: {
  code: string;
  expires: Date;
}) {
  return (
    <Html>
      <Tailwind>
        <Head />
        <Container className="container px-20 font-sans">
          <Heading className="text-xl font-bold mb-4">
            Sign in to Cronvex
          </Heading>
          <Text className="text-sm">
            Please enter the following code on the sign in page.
          </Text>
          <Section className="text-center">
            <Text className="font-semibold">Verification code</Text>
            <Text className="font-bold text-4xl">
              <span className="mr-2">{code.slice(0, 3)}</span>
              <span>{code.slice(3)}</span>
            </Text>
            <Text>
              (This code is valid for{" "}
              {Math.floor((+expires - Date.now()) / (60 * 1000))} minutes)
            </Text>
          </Section>
        </Container>
      </Tailwind>
    </Html>
  );
}
