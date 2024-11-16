import { SignedIn, UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div>
      <SignedIn>
          <UserButton />
      </SignedIn>
    </div>
  )
}