import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

export default function ImgModal({ url, setUrl }) {
  function closeModal() {
    setUrl("");
  }
  
  return (
    <Transition appear show={!!url} as={Fragment}>
      <Dialog as="div" className="relative z-[51]" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/80" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel>
                <img
                  onClick={(e) => (e.target.style.height = +e.target.height + 30 + "px")}
                  src={url}
                  className="min-h-[150px] h-auto max-h-[90vh] rounded-lg cursor-zoom-in"
                  alt=""
                />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
