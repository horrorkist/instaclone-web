import { useQuery } from "@apollo/client";
import { Link, Outlet, useParams } from "react-router-dom";
import {
  DirectRoomsQuery,
  DirectRoomsQueryVariables,
  OnMessageCreatedSubscription,
  OnMessageCreatedSubscriptionVariables,
  OnRoomCreatedSubscription,
  OnRoomCreatedSubscriptionVariables,
} from "../__generated__/graphql";
import {
  DIRECT_ROOMS_QUERY,
  NEW_ROOM_SUBSCRIPTION,
  ROOM_UPDATE_SUBSCRIPTION,
} from "../libs/queries";
import Avatar from "../components/Avatar";
import Splash from "./Splash";
import { formatPhotoCreatedAt } from "../libs/utils";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

function ChatRoomsList() {
  const { loading, data, subscribeToMore } = useQuery<
    DirectRoomsQuery,
    DirectRoomsQueryVariables
  >(DIRECT_ROOMS_QUERY);
  const { username } = useParams();
  const { t } = useTranslation();

  // Subscribe to new messages
  useEffect(() => {
    const unsubscribe: (() => void)[] = [];

    if (!loading && data && data.getRooms.rooms) {
      data.getRooms.rooms.forEach((room) => {
        if (!room) return;
        const unsubscribeFn = subscribeToMore<
          OnMessageCreatedSubscription,
          OnMessageCreatedSubscriptionVariables
        >({
          document: ROOM_UPDATE_SUBSCRIPTION,
          variables: {
            roomId: room.id,
          },
          updateQuery: (prev, { subscriptionData }) => {
            if (!subscriptionData.data) return prev;

            const newMessage = subscriptionData.data.roomUpdates;

            if (!newMessage) return prev;

            if (!prev.getRooms.rooms) return prev;

            const ret: DirectRoomsQuery = {
              getRooms: {
                ...prev.getRooms,
                rooms: prev.getRooms.rooms.map((room) => {
                  if (!room) return room;
                  if (room?.id === newMessage.room.id) {
                    return {
                      ...room,
                      lastMessage: newMessage,
                    };
                  }
                  return room;
                }),
              },
            };

            return ret;
          },
        });

        unsubscribe.push(unsubscribeFn);
      });
    }

    return () => {
      if (unsubscribe) {
        unsubscribe.forEach((fn) => fn());
      }
    };
  }, [loading, data]);

  // Subscribe to new rooms
  useEffect(() => {
    let unsubscribe: () => void;

    if (!loading && data) {
      unsubscribe = subscribeToMore<
        OnRoomCreatedSubscription,
        OnRoomCreatedSubscriptionVariables
      >({
        document: NEW_ROOM_SUBSCRIPTION,
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;

          const newRoom = subscriptionData.data.onRoomCreated;

          if (!newRoom) return prev;

          if (!prev.getRooms.rooms) return prev;

          const ret: DirectRoomsQuery = {
            getRooms: {
              ...prev.getRooms,
              rooms: [newRoom, ...prev.getRooms.rooms],
            },
          };

          return ret;
        },
      });
    }

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [loading, data]);

  if (loading) return <Splash />;

  return (
    <div className="w-full h-screen bg-white dark:bg-black text-black dark:text-white flex pl-72">
      <Helmet>
        <title>Inbox &bull; Direct</title>
      </Helmet>
      <aside className="w-80 bg-white dark:bg-black h-full border-r flex flex-col pt-10">
        <header className="p-4">
          <h1 className="text-2xl font-bold px-4">{t("messages:messages")}</h1>
        </header>
        <div className="flex flex-col gap-y-2 h-full">
          {data?.getRooms.rooms?.length === 0 && (
            <div className="flex flex-col items-center justify-center flex-1">
              <span className="text-gray-400 text-sm">
                {t("messages:noChatRoom")}
              </span>
            </div>
          )}
          {data?.getRooms.rooms?.map((room) => {
            if (!room || !room.users) return null;

            const roommate = room?.users.find((user) => user?.isMe === false);

            if (!roommate) return null;
            if (!room.lastMessage) return null;

            return (
              <div key={room.id} className="mx-2">
                <Link
                  to={`${room.id}/${roommate.username}`}
                  className={`${
                    username === roommate.username && "bg-gray-300"
                  } w-full flex flex-col p-2 gap-y-2 hover:bg-gray-100 rounded-md border`}
                >
                  <div className="relative flex items-start gap-x-2">
                    <Avatar avatar={roommate.avatar || undefined} size="lg" />
                    <span className="font-medium">{roommate.username}</span>
                    {/* {room.unreadMessagesCount > 0 && (
                      <div className="right-0 absolute flex justify-center items-center text-white font-medium bg-red-500 rounded-full p-1 text-xs">
                        10
                      </div>
                    )} */}
                  </div>
                  <div className=" w-full text-sm leading-4 text-gray-500 flex items-center">
                    <span className="flex-1 overflow-ellipsis line-clamp-2 break-all">
                      {room.lastMessage?.payload}
                    </span>
                    <span className="text-xs text-gray-400 ml-2">
                      {formatPhotoCreatedAt(room.lastMessage.createdAt)}
                    </span>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </aside>
      <Outlet />
    </div>
  );
}

export default ChatRoomsList;
