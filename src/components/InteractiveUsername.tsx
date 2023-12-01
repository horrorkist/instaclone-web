import { Link } from "react-router-dom";
import FloatProfile from "./FloatProfile";
import { useRef, useState } from "react";

function InteractiveUsername({ username }: { username: string }) {
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const [show, setShow] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  const onMouseOver = () => {
    if (timer) clearTimeout(timer);

    setTimer(
      setTimeout(() => {
        setShow(true);
      }, 500)
    );
  };

  const onMouseLeave = () => {
    if (timer) clearTimeout(timer);

    setShow(false);
  };

  return (
    <span
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
      className="font-medium text-black dark:text-white hover:text-gray-300 text-sm relative"
    >
      <Link to={`/${username}`}>{username}</Link>
      {show && (
        <div
          ref={ref}
          onClick={(e) => e.stopPropagation()}
          className="absolute top-full w-[400px] z-50 overflow-hidden dark:border bg-white rounded-lg shadow-float flex justify-center items-center animate-fadeInWithoutScale"
        >
          <FloatProfile username={username} />
        </div>
      )}
    </span>
  );
}

export default InteractiveUsername;
