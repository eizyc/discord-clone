"use client";

import { CreateServerModal } from "@/components/modals/create-server-modal";
import { InviteModal } from "@/components/modals/invite-modal";

import { useClient } from "@/hooks/use-client";

export const ModalProvider = () => {
  const onlyClient = useClient();

  return (
    onlyClient && (
      <>
        <CreateServerModal />
        <InviteModal />
      </>
    )
  );
};
