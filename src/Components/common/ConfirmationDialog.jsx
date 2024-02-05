import { InformationCircleIcon } from "@heroicons/react/24/outline";
import Modal from "./Modal";

const ConfirmationDialog = ({
  isOpen,
  setIsOpen,
  onConfirm,
  message = "Are you sure?",
  confirmMessage = "Yes, I'm sure",
  confirmButtonBg = "darkblue",
  icon = <InformationCircleIcon className="w-10 h-10" />,
}) => {
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="relative w-full h-full max-w-md md:h-auto">
        <div className="px-2 text-center text-gray-500">
          <div className="flex justify-center">{icon}</div>
          <h3 className="mb-5 text-lg font-normal text-inherit">{message}</h3>
          <div className="space-x-2">
            <button
              onClick={onConfirm}
              data-modal-toggle="popup-modal"
              type="button"
              className={`text-white font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center`}
              style={{ backgroundColor: confirmButtonBg }}
            >
              {confirmMessage}
            </button>
            <button
              onClick={() => setIsOpen(false)}
              data-modal-toggle="popup-modal"
              type="button"
              className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
            >
              No, cancel
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmationDialog;
