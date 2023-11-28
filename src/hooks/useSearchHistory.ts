import { useEffect, useState } from "react";

type SearchUser = {
  username: string;
  avatar?: string;
};

function useSearchHistory() {
  const [searchHistory, setSearchHistory] = useState<SearchUser[]>([]);

  useEffect(() => {
    const searchHistory = localStorage.getItem("searchHistory");
    if (searchHistory) {
      setSearchHistory(JSON.parse(searchHistory));
    }
  }, []);

  const addSearchHistory = (user: SearchUser) => {
    const newSearchHistory = [user, ...searchHistory];
    setSearchHistory(newSearchHistory);
    localStorage.setItem("searchHistory", JSON.stringify(newSearchHistory));
  };

  const removeSearchHistory = (username: string) => {
    const newSearchHistory = searchHistory.filter(
      (user) => user.username !== username
    );
    setSearchHistory(newSearchHistory);
    localStorage.setItem("searchHistory", JSON.stringify(newSearchHistory));
  };

  const clearSearchHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem("searchHistory");
  };

  return {
    searchHistory,
    addSearchHistory,
    removeSearchHistory,
    clearSearchHistory,
  };
}

export default useSearchHistory;
