import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import ModalOverlay from "../components/ModalOverlay";
import SendMessageModal from "../components/Modals/SendMessageModal";
import { useTranslation } from "react-i18next";

function ChatDefault() {
  const [inModal, setInModal] = useState<boolean>(false);
  const { t } = useTranslation();

  const closeModal = () => setInModal(false);

  return (
    <>
      {inModal && (
        <ModalOverlay exit={closeModal}>
          <SendMessageModal />
        </ModalOverlay>
      )}
      <div className="w-full h-full flex justify-center items-center flex-col space-y-4">
        <FontAwesomeIcon
          icon={faPaperPlane}
          size="8x"
          className="text-gray-300 mb-4"
        />
        <span>{t("messages:title")}</span>
        <button
          onClick={() => setInModal(true)}
          className="px-4 py-2 text-white rounded-lg bg-blue-500 text-center text-sm font-semibold"
        >
          {t("messages:sendMessage")}
        </button>
      </div>
    </>
  );
}

export default ChatDefault;
