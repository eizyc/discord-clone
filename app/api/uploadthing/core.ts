import { auth } from '@clerk/nextjs/server';
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

const handleAuth = async () => {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");
    return { userId: userId };
  }

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  serverImage: f({ image: { maxFileSize: "4MB" } })
    .middleware(async () => {
      const user = await handleAuth();
      if (!user) throw new UploadThingError("Unauthorized");
      return { userId: user.userId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);
      console.log("file url", file.url);
      return { uploadedBy: metadata.userId };
    }),
    messageFile: f(["image", "pdf"])
    .middleware(async () => {
        const user = await handleAuth();
        if (!user) throw new UploadThingError("Unauthorized");
        return { userId: user.userId };
      })
    .onUploadComplete(async ({ metadata, file }) => {
    console.log("Upload complete for userId:", metadata.userId);
    console.log("file url", file.url);
    return { uploadedBy: metadata.userId };
    })
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
