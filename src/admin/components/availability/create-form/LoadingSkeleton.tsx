const Item = () => {
  return (
    <div className="flex items-center justify-between h-16 border rounded-lg">
      <div className="bg-gray-300 w-20 h-16 min-h-full rounded-tl-lg rounded-bl-lg" />

      <div className="flex flex-1 flex-col mx-4 my-2 justify-between">
        <div className="h-2.5 bg-gray-300 rounded-full mb-2.5 w-24" />

        <div className="flex justify-between items-center">
          <div className="w-32 h-2 bg-gray-200 rounded-full" />
          <div className="h-4 bg-gray-300 rounded-full w-12" />
        </div>
      </div>
    </div>
  );
};
const LoadingSkeleton = () => {
  return (
    <div role="status" className="space-y-2 mt-8 rounded animate-pulse">
      <Item />
      <Item />
      <Item />
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default LoadingSkeleton;
