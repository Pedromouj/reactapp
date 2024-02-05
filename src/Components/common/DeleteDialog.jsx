import { InformationCircleIcon } from "@heroicons/react/24/outline";
import Modal from "./Modal";

const DeleteDialog = ({ isOpen, setIsOpen, onConfirm }) => {
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="relative w-full h-full max-w-md md:h-auto">
        <div className="px-2 text-center text-gray-500">
          <div className="flex justify-center">
            <InformationCircleIcon className="w-12 h-12 " />
          </div>
          <h3 className="mb-5 text-lg font-normal text-inherit">
            Are you sure you want to delete this record?
          </h3>
          <div className="space-x-2">
            <button
              onClick={onConfirm}
              data-modal-toggle="popup-modal"
              type="button"
              className={`text-white font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center bg-red-700 hover:bg-red-800`}
            >
              Yes, I'm sure
            </button>
            <button
              onClick={() => setIsOpen(false)}
              data-modal-toggle="popup-modal"
              type="button"
              className="text-gray-500 bg-white hover:bg-gray-100 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
            >
              No, cancel
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteDialog;
