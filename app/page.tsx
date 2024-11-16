import { ModeToggle } from "@/components/mode-toggle";
import { SignedIn, UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div>
      <SignedIn>
          <UserButton />
      </SignedIn>
      <ModeToggle />
    </div>
  )
}