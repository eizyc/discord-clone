import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { currentProfile } from "@/lib/current-profile";
import { ChatHeader } from "@/components/chat/chat-header";
import { db } from "@/lib/db";
import { ChatInput } from "@/components/chat/chat-input";
interface ChannelIdPageProps {
  params: {
    serverId: string;
    channelId: string;
  }
}
const ChannelIdPage = async ({
  params
}: ChannelIdPageProps) => {
  const { redirectToSignIn } = await auth();
  const profile = await currentProfile();
  const { channelId, serverId } = await params
  if (!profile) {
    return redirectToSignIn();
  }
  const channel = await db.channel.findUnique({
    where: {
      id: channelId,
    },
  });
  const member = await db.member.findFirst({
    where: {
      serverId: serverId,
      profileId: profile.id,
    }
  });
  if (!channel || !member) {
    redirect("/");
  }
  return ( 
    <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
      <ChatHeader
        name={channel.name}
        serverId={channel.serverId}
        type="channel"
      />
      <div className="flex-1">Future Messages</div>
      <ChatInput
        name={channel.name}
        type="channel"
        apiUrl="/api/socket/messages"
        query={{
          channelId: channel.id,
          serverId: channel.serverId,
        }}
      />
    </div>
   );
}

export default ChannelIdPage;
