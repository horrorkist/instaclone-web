interface CircularLoadingIndicatorProps {
  size?: "sm" | "md" | "lg";
}

function CircularLoadingIndicator({ size }: CircularLoadingIndicatorProps) {
  const getSize = (size: "sm" | "md" | "lg" | undefined) => {
    switch (size) {
      case "sm":
        return "w-4 h-4";
      case "md":
        return "w-8 h-8";
      case "lg":
        return "w-12 h-12";
      default:
        return "w-4 h-4";
    }
  };
  return (
    <div
      className={`border ${getSize(
        size
      )} rounded-full border-t-transparent animate-spin`}
    ></div>
  );
}

export default CircularLoadingIndicator;
