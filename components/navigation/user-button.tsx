"use client";
import { UserButton as ClerkUserButton, SignedIn } from "@clerk/nextjs";

export const UserButton = () => {
  return (
    <SignedIn>
      <ClerkUserButton
        appearance={{
          elements: {
            avatarBox: "h-[48px] w-[48px]",
          },
        }}
      />
    </SignedIn>
  );
};
