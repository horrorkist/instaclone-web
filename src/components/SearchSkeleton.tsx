function SearchSkeleton() {
  return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((_) => (
    <div key={_} className="flex gap-x-2 w-full items-center">
      <div className="w-7 h-7 rounded-full bg-gray-200 dark:bg-gray-500"></div>
      <div className="w-60 h-4 rounded-lg bg-gray-200 dark:bg-gray-500"></div>
    </div>
  ));
}

export default SearchSkeleton;
