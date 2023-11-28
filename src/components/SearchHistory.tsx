import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useSearchHistory from "../hooks/useSearchHistory";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import NameCard from "./NameCard";

function SearchHistory() {
  const { searchHistory, removeSearchHistory, clearSearchHistory } =
    useSearchHistory();
  return searchHistory.length === 0 ? (
    <>
      <div className="text-lg font-semibold">Recent</div>
      <div className="flex flex-1 justify-center items-center">
        <span className="text-gray-500 text-sm font-medium">
          No recent searches.
        </span>
      </div>
    </>
  ) : (
    <div>
      <header className="flex justify-between">
        <h2 className="text-lg font-semibold">Recent</h2>
        <button
          onClick={clearSearchHistory}
          className="text-sm font-medium text-blue-500"
        >
          Clear all
        </button>
      </header>
      <div className="flex flex-col gap-y-2 mt-10">
        {searchHistory.map((history) => (
          <div
            key={history.username}
            className="flex justify-between items-center"
          >
            <NameCard username={history.username} avatar={history.avatar} />
            <button onClick={() => removeSearchHistory(history.username)}>
              <FontAwesomeIcon icon={faXmark} size="xs" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchHistory;
