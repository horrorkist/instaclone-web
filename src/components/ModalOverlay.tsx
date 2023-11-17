import { ReactElement } from "react";

function ModalOverlay({
  children,
  exit,
}: {
  children: ReactElement;
  exit?: () => void;
}) {
  return (
    <div
      onClick={exit}
      className="fixed inset-0 w-screen h-screen bg-black bg-opacity-30 z-20 flex justify-center items-center"
    >
      {children}
    </div>
  );
}

export default ModalOverlay;
