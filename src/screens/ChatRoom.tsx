import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import {
  DirectRoomQuery,
  DirectRoomQueryVariables,
  OnMessageCreatedSubscription,
  OnMessageCreatedSubscriptionVariables,
  SendMessageMutation,
  SendMessageMutationVariables,
} from "../__generated__/graphql";
import {
  DIRECT_ROOM_QUERY,
  ROOM_UPDATE_SUBSCRIPTION,
  SEND_MESSAGE_MUTATION,
} from "../libs/queries";
import { formatDate } from "../libs/utils";
import Message from "../components/Message";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

interface IChatForm {
  payload: string;
}

function ChatRoom() {
  const { roomId, username } = useParams();
  const { t } = useTranslation();

  const { loading, data, subscribeToMore, client } = useQuery<
    DirectRoomQuery,
    DirectRoomQueryVariables
  >(DIRECT_ROOM_QUERY, {
    variables: {
      id: Number(roomId!),
    },
  });

  const {
    register,
    handleSubmit,
    formState: { isValid },
    setValue,
  } = useForm<IChatForm>();

  const [ref, setRef] = useState<HTMLDivElement | null>(null);

  const [sendingMessage, setSendingMessage] = useState<boolean>(false);

  const onSubmit = async ({ payload }: IChatForm) => {
    if (sendingMessage) return;
    setSendingMessage(true);
    setValue("payload", "");

    const receiver = data?.getRoom.room?.users?.find(
      (user) => user?.isMe === false
    );

    if (!receiver) return;

    await client.mutate<SendMessageMutation, SendMessageMutationVariables>({
      mutation: SEND_MESSAGE_MUTATION,
      variables: {
        payload,
        roomId: Number(roomId!),
      },
    });

    setSendingMessage(false);
  };

  useEffect(() => {
    if (ref && !loading) {
      ref.scrollTop = ref.scrollHeight;
    }
  }, [ref, loading, data?.getRoom.room?.messages?.length]);

  useEffect(() => {
    let unsubscribe: () => void;
    if (!loading && data?.getRoom.room) {
      unsubscribe = subscribeToMore<
        OnMessageCreatedSubscription,
        OnMessageCreatedSubscriptionVariables
      >({
        document: ROOM_UPDATE_SUBSCRIPTION,
        variables: {
          roomId: data.getRoom.room.id,
        },
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;

          const newMessage = subscriptionData.data.roomUpdates;

          if (!newMessage) return prev;

          if (!prev.getRoom.room?.id) return prev;

          const ret: DirectRoomQuery = {
            getRoom: {
              ...prev.getRoom,
              room: {
                ...prev.getRoom.room,
                messages: [...(prev.getRoom.room?.messages || []), newMessage],
              },
            },
          };

          client.cache.modify({
            id: `Room:${prev.getRoom.room?.id}`,
            fields: {
              lastMessage: () => newMessage,
            },
          });

          return ret;
        },
      });
    }

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [loading, data?.getRoom.room]);

  return (
    <div className="flex flex-col divide-y-2 h-screen w-full">
      <Helmet>
        <title>@{username} &bull; Direct</title>
      </Helmet>
      <div
        ref={setRef}
        className="flex flex-col gap-y-5 p-4 flex-1 overflow-scroll w-full"
      >
        {data?.getRoom.room?.messages?.map((message, index) => {
          if (!message) return null;

          let shouldRenderDate = false;
          const prevMessage = data?.getRoom.room?.messages?.[index - 1];
          if (prevMessage) {
            const prevDate = formatDate(prevMessage.createdAt);
            const currentDate = formatDate(message.createdAt);
            shouldRenderDate = prevDate !== currentDate;
          }

          return (
            <div key={message.id} className="flex flex-col gap-y-5">
              {!prevMessage && (
                <div className="text-center">
                  <span className="py-1 px-2 rounded-full bg-gray-200 text-black text-xs font-medium">
                    {formatDate(message.createdAt)}
                  </span>
                </div>
              )}
              {shouldRenderDate && (
                <div className="text-center">
                  <span className="py-1 px-2 rounded-full bg-gray-200 text-black text-xs font-medium">
                    {formatDate(message.createdAt)}
                  </span>
                </div>
              )}
              <Message message={message} reversed={message.author.isMe} />
            </div>
          );
        })}
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="p-2 flex gap-x-2">
        <input
          {...register("payload", { required: true })}
          type="text"
          className="flex-1 p-2 rounded-lg border outline-none dark:bg-black"
          placeholder={t("chatRoom:writeAMessage")}
        />
        <button
          disabled={!isValid}
          className="flex justify-center items-center p-2"
        >
          <FontAwesomeIcon
            icon={faPaperPlane}
            className={`${
              isValid
                ? "text-black dark:text-white active:text-gray-300"
                : "text-gray-200"
            }`}
          />
        </button>
      </form>
    </div>
  );
}

export default ChatRoom;
