import qs from "query-string";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSocket } from "@/components/providers/socket-provider";
interface ChatQueryProps {
  queryKey: string;
  apiUrl: string;
  paramKey: "channelId" | "conversationId";
  paramValue: string;
}
export const useChatQuery = ({
  queryKey,
  apiUrl,
  paramKey,
  paramValue,
}: ChatQueryProps) => {
  const { isConnected } = useSocket();

  const query = useInfiniteQuery({
    initialPageParam: undefined,
    queryKey: [queryKey],
    getNextPageParam: (lastPage: any) => lastPage?.nextCursor,
    refetchInterval: isConnected ? false : 1000,
    queryFn: async ({ pageParam }) => {
      const url = qs.stringifyUrl(
        {
          url: apiUrl,
          query: {
            cursor: pageParam,
            [paramKey]: paramValue,
          },
        },
        { skipNull: true }
      );
      const res = await fetch(url);
      return res.json();
    },
  });

  return query;
};
