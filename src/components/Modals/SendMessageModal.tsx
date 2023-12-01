import { useQuery } from "@apollo/client";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {
  SearchUsersQuery,
  SearchUsersQueryVariables,
  SendMessageMutation,
  SendMessageMutationVariables,
} from "../../__generated__/graphql";
import { SEARCH_USERS_QUERY, SEND_MESSAGE_MUTATION } from "../../libs/queries";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import SearchSkeleton from "../SearchSkeleton";
import CircularLoadingIndicator from "../CircularLoadingIndicator";
import Avatar from "../Avatar";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import client from "../../apollo";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface ICreateChatForm {
  target: string;
  payload: string;
}

function SendMessageModal() {
  const { register, setValue, handleSubmit, watch } =
    useForm<ICreateChatForm>();

  const [selectedUsername, setSelectedUsername] = useState<string>("");
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [target, setTarget] = useState<string>("");
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const [searchLoading, setSearchLoading] = useState<boolean>(false);
  const [reachEnd, setReachEnd] = useState<boolean>(false);
  const [loadMoreLoading, setLoadMoreLoading] = useState<boolean>(false);
  const ref = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [sendingMessage, setSendingMessage] = useState<boolean>(false);
  const { t } = useTranslation();

  const { data, refetch, fetchMore } = useQuery<
    SearchUsersQuery,
    SearchUsersQueryVariables
  >(SEARCH_USERS_QUERY, {
    variables: {
      keyword: "",
    },
    skip: target === "",
  });

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTarget(e.target.value);
    if (e.target.value) {
      setReachEnd(false);
      setSearchLoading(true);
    } else {
      setReachEnd(true);
      setSearchLoading(false);
    }
  };

  const onLoadMore = async () => {
    if (loadMoreLoading) return;
    setLoadMoreLoading(true);

    if (reachEnd) return;

    await fetchMore({
      variables: {
        keyword: target,
        lastId: data?.searchUsers.lastId,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        if (fetchMoreResult.searchUsers.users?.length === 0) {
          setReachEnd(true);
          return prev;
        }
        return {
          searchUsers: {
            ...prev.searchUsers,
            users: [
              ...prev.searchUsers.users!,
              ...fetchMoreResult.searchUsers.users!,
            ],
            lastId: fetchMoreResult.searchUsers.lastId,
          },
        };
      },
    });

    setLoadMoreLoading(false);
  };

  // Debounce Search
  useEffect(() => {
    if (timer) clearTimeout(timer);

    if (target) {
      setTimer(
        setTimeout(async () => {
          await refetch({
            keyword: target,
          });
          setSearchLoading(false);
        }, 500)
      );
    }
  }, [target]);

  // Set value when selectedUsername changes
  useEffect(() => {
    if (selectedUsername) {
      setValue("target", selectedUsername);
      if (ref.current) {
        ref.current.value = selectedUsername;
      }
    }
  }, [selectedUsername]);

  const onSubmit = async (data: ICreateChatForm) => {
    if (!target || !selectedUsername) return;

    setSendingMessage(true);

    const result = await client.mutate<
      SendMessageMutation,
      SendMessageMutationVariables
    >({
      mutation: SEND_MESSAGE_MUTATION,
      variables: {
        receiverId: selectedUserId!,
        payload: data.payload,
      },
    });

    if (result.data?.sendMessage.ok === false) {
      alert(result.data?.sendMessage.error);
      setSelectedUsername("");

      if (ref.current) {
        ref.current.value = "";
      }
    } else {
      navigate(
        `/direct/${result.data?.sendMessage.roomId}/${selectedUsername}`
      );
    }
  };

  if (sendingMessage) return <CircularLoadingIndicator size="lg" />;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      onClick={(e) => e.stopPropagation()}
      className="bg-white dark:bg-black w-[500px] max-h-[95%] rounded-lg flex flex-col border"
    >
      <header>
        <h2 className="w-full text-center py-2 border-b font-semibold text-sm">
          {t("sendMessageModal:sendMessage")}
        </h2>
      </header>
      <div className="flex gap-x-4 px-4 py-2 border-b whitespace-nowrap">
        <span className="font-medium">{t("sendMessageModal:to")}:</span>
        <input
          ref={ref}
          {...(register("target"),
          {
            required: true,
            onChange,
          })}
          required={false}
          type="text"
          className="w-full outline-none placeholder-gray-400 text-sm dark:bg-black"
          placeholder={t("sendMessageModal:searchPlaceholder")}
        />
        <button
          onClick={() => {
            setValue("target", "");
            setSelectedUsername("");
            setSelectedUserId(null);
            if (ref.current) {
              ref.current.value = "";
            }
          }}
          className="flex justify-center items-center hover:text-gray-400"
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </div>
      <div className="h-[600px] flex flex-col p-4 gap-y-4 overflow-scroll">
        {searchLoading && <SearchSkeleton />}
        {!searchLoading &&
          (data?.searchUsers.users?.filter((user) => user?.isMe === false)
            .length === 0 ? (
            <div className="flex-1 flex justify-center items-center">
              No account found
            </div>
          ) : (
            <>
              {data?.searchUsers.users
                ?.filter((user) => user?.isMe === false)
                .map((user) => {
                  if (!user) return null;
                  return (
                    <button
                      onClick={() => {
                        setSelectedUsername(user.username);
                        setSelectedUserId(user.id);
                      }}
                      className="p-2 flex justify-between hover:bg-gray-100 dark:hover:bg-gray-500 rounded-lg"
                      key={user.id}
                    >
                      <div className="flex gap-x-2 items-center">
                        <Avatar avatar={user.avatar || undefined} />
                        <span>{user.username}</span>
                      </div>
                      <div
                        className={`w-7 h-7 rounded-full flex justify-center items-center ${
                          selectedUsername === user.username
                            ? "bg-green-500"
                            : "border border-gray-500"
                        }`}
                      >
                        {selectedUsername === user.username && (
                          <FontAwesomeIcon
                            icon={faCheck}
                            className="text-white"
                          />
                        )}
                      </div>
                    </button>
                  );
                })}
              {data && !reachEnd && (
                <div className="flex justify-center">
                  <button
                    onClick={onLoadMore}
                    className="p-1 border border-black rounded-full flex justify-center items-center"
                  >
                    {loadMoreLoading ? (
                      <CircularLoadingIndicator />
                    ) : (
                      <FontAwesomeIcon icon={faPlus} />
                    )}
                  </button>
                </div>
              )}
            </>
          ))}
      </div>
      <div className="p-2 flex justify-between items-center w-full border-t gap-x-2">
        <input
          {...register("payload", { required: true })}
          type="text"
          className="flex-1 p-2 outline-none rounded-lg border dark:bg-black"
          placeholder={t("sendMessageModal:writeAMessage")}
        />
        <button
          disabled={!selectedUsername || watch("payload").length === 0}
          className={`p-2 flex justify-center items-center rounded-lg h-full ${
            !selectedUsername || watch("payload").length === 0
              ? "text-gray-200"
              : "active:text-gray-400"
          }`}
        >
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </div>
    </form>
  );
}

export default SendMessageModal;
