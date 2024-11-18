import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

type Params = Promise<{
  serverId: string;
}>;

const ServerIdPage = async ({ params }: { params: Params }) => {
  const { redirectToSignIn } = await auth();
  const profile = await currentProfile();
  const { serverId } = await params;

  if (!profile) {
    return redirectToSignIn();
  }
  const server = await db.server.findUnique({
    where: {
      id: serverId,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
    include: {
      channels: {
        where: {
          name: "general",
        },
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  });
  const initialChannel = server?.channels[0];
  if (initialChannel?.name !== "general") {
    return null;
  }
  return redirect(`/servers/${serverId}/channels/${initialChannel?.id}`);
};

export default ServerIdPage;
