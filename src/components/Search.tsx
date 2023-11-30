import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SearchHistory from "./SearchHistory";
import { useEffect, useRef, useState } from "react";
import { useQuery } from "@apollo/client";
import {
  SearchUsersQuery,
  SearchUsersQueryVariables,
} from "../__generated__/graphql";
import { SEARCH_USERS_QUERY } from "../libs/queries";
import { Link } from "react-router-dom";
import NameCard from "./NameCard";
import useSearchHistory from "../hooks/useSearchHistory";
import CircularLoadingIndicator from "./CircularLoadingIndicator";

function Search() {
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const [keyword, setKeyword] = useState<string>("");
  const { data, refetch, fetchMore } = useQuery<
    SearchUsersQuery,
    SearchUsersQueryVariables
  >(SEARCH_USERS_QUERY, {
    variables: {
      keyword,
    },
    skip: keyword === "",
  });
  const ref = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadMoreLoading, setLoadMoreLoading] = useState<boolean>(false);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
    setLoading(true);
    setReachEnd(false);
  };

  const [reachEnd, setReachEnd] = useState<boolean>(false);
  const onLoadMore = async () => {
    if (loadMoreLoading) return;
    setLoadMoreLoading(true);

    if (reachEnd) return;

    await fetchMore({
      variables: {
        keyword,
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

  const { addSearchHistory } = useSearchHistory();

  // search debounce
  useEffect(() => {
    if (timer) clearTimeout(timer);
    if (keyword) {
      setTimer(
        setTimeout(async () => {
          await refetch({
            keyword,
          });
          setLoading(false);
        }, 500)
      );
    }
  }, [keyword]);

  return (
    <div className="search fixed w-[500px] h-screen bg-white border-r z-20 left-[80px] animate-slide-in-left-to-right  rounded-br-2xl rounded-tr-2xl shadow-xl flex flex-col">
      <header className="p-5">
        <h1 className="text-3xl font-bold">Search</h1>
      </header>
      <div className="py-5 border-b">
        <div className="px-5 relative flex items-center">
          <input
            ref={ref}
            onChange={onChange}
            type="text"
            className="outline-none bg-gray-100 pl-4 pr-12 py-2 w-full rounded-lg placeholder-gray-500"
            placeholder="Search"
          />
          <button
            onClick={() => {
              setKeyword("");
              if (ref.current) {
                ref.current.value = "";
              }
            }}
            className="flex justify-center items-center p-4 absolute right-6"
          >
            <FontAwesomeIcon icon={faXmark} size="xs" />
          </button>
        </div>
      </div>
      <div className="p-5 flex h-full flex-col overflow-scroll">
        {!keyword && <SearchHistory />}
        {keyword &&
          (loading ? (
            <div className="flex flex-col justify-start items-start flex-1 gap-y-4 ">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((_) => (
                <div key={_} className="flex gap-x-2 w-full items-center">
                  <div className="w-7 h-7 rounded-full bg-gray-200"></div>
                  <div className="w-60 h-4 rounded-lg bg-gray-200"></div>
                </div>
              ))}
            </div>
          ) : data?.searchUsers.users?.length === 0 ? (
            <div className="flex flex-1 justify-center items-center">
              <span className="text-sm font-semibold text-gray-400">
                No results
              </span>
            </div>
          ) : (
            <>
              <div className="flex flex-col justify-start items-start flex-1 gap-y-4 overflow-scroll">
                {data?.searchUsers.users?.map((user) => (
                  <Link
                    onClick={() =>
                      addSearchHistory({
                        username: user?.username || "",
                        avatar: user?.avatar || undefined,
                      })
                    }
                    to={`/${user?.username}`}
                    key={user?.id}
                    className="flex gap-x-2 w-full items-center"
                  >
                    <NameCard
                      username={user?.username || ""}
                      avatar={user?.avatar || undefined}
                    />
                    {/* <span className="text-xs text-gray-400">
                      {user?.firstName}&nbsp;{user?.lastName}
                    </span> */}
                  </Link>
                ))}
                {!reachEnd && (
                  <div className="w-full flex justify-center items-center">
                    {loadMoreLoading ? (
                      <CircularLoadingIndicator size="md" />
                    ) : (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onLoadMore();
                        }}
                        className="lodeMore p-1 border-2 border-black rounded-full flex justify-center items-center"
                      >
                        <FontAwesomeIcon icon={faPlus} className="text-black" />
                      </button>
                    )}
                  </div>
                )}
              </div>
            </>
          ))}
      </div>
    </div>
  );
}

export default Search;
