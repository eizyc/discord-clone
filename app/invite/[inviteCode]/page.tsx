import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { currentProfile } from "@/lib/current-profile";
interface InviteCodePageProps {
  params: {
    inviteCode: string;
  };
};
const InviteCodePage = async ({
  params
}: InviteCodePageProps) => {
  const profile = await currentProfile();
  const { redirectToSignIn } = await auth();
  const { inviteCode } = await params
  if (!profile) {
    return redirectToSignIn();
  }
  if (!inviteCode) {
    return redirect("/");
  }
  const existingServer = await db.server.findFirst({
    where: {
      inviteCode: inviteCode,
      members: {
        some: {
          profileId: profile.id
        }
      }
    }
  });
  if (existingServer) {
    return redirect(`/servers/${existingServer.id}`);
  }
  const server = await db.server.update({
    where: {
      inviteCode: inviteCode,
    },
    data: {
      members: {
        create: [
          {
            profileId: profile.id,
          }
        ]
      }
    }
  });
  if (server) {
    return redirect(`/servers/${server.id}`);
  }
  
  return null;
}
 
export default InviteCodePage;