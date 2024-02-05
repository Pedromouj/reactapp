import { Fragment, useState } from "react";
import { Menu as HeadlessMenu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

const Menu = ({ title, items = [], icon, active = false }) => {
  const [isShowing, setIsShowing] = useState(false);

  return (
    <HeadlessMenu
      as="div"
      className="inline-flex flex-col relative z-1 w-full"
      onMouseEnter={() => setIsShowing(true)}
      onMouseLeave={() => setIsShowing(false)}
    >
      <HeadlessMenu.Button
        className={`inline-flex justify-center bg-white border border-gray-400 rounded-md  px-2 py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 ${
          active ? "!border-blue-600 !text-blue-800" : ""
        }`}
      >
        <div className="flex justify-between items-center gap-2 w-full">
          <div className="flex items-center gap-1">
            {icon}
            <span>{title}</span>
          </div>
          <ChevronDownIcon className="h-4 w-4" />
        </div>
      </HeadlessMenu.Button>
      <Transition
        as={Fragment}
        show={isShowing}
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <HeadlessMenu.Items className="absolute z-50 top-[34px] left-0 inline-flex p-1 rounded-lg flex-col translate-y-1 bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none transform opacity-100 scale-100 w-full border border-gray-400">
          {items.map(
            (item) =>
              !item.hidden && (
                <HeadlessMenu.Item
                  as="div"
                  key={item.id}
                  className="cursor-pointer p-2 rounded-lg hover:bg-gray-100 flex justify-between"
                  {...item}
                >
                  <span>{item.label}</span>
                  {item.information ? (
                    <InformationCircleIcon className="w-5 h-5" title={item.information} />
                  ) : null}
                </HeadlessMenu.Item>
              )
          )}
        </HeadlessMenu.Items>
      </Transition>
    </HeadlessMenu>
  );
};

export default Menu;
