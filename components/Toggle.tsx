import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import Image from "next/image";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/20/solid";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface DropDownProps {
  isGPT: boolean;
  setIsGPT: (value: boolean) => void;
}

export default function Toggle({ isGPT, setIsGPT }: DropDownProps) {
  const options = [
    {
      label: "Mixtral 8x7B",
      value: false,
    },
    {
      label: "Llama 3.1 8B",
      value: true,
    },
  ];

  const selectedOption = options.find((option) => option.value === isGPT);

  return (
    <Menu as="div" className="relative block text-left w-full">
      <div>
        <Menu.Button className="inline-flex w-full justify-between items-center rounded-md border border-gray-300 bg-stone-900 px-4 py-2 text-white shadow-sm hover:bg-stone-800 focus:outline-none focus:ring-2 focus:ring-black">
          <div className="flex items-center gap-2">
            <span>{selectedOption?.label}</span>
          </div>
          <ChevronUpIcon
            className="-mr-1 ml-2 h-5 w-5 ui-open:hidden"
            aria-hidden="true"
          />
          <ChevronDownIcon
            className="-mr-1 ml-2 h-5 w-5 hidden ui-open:block"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute left-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div>
            {options.map((option) => (
              <Menu.Item key={option.label}>
                {({ active }) => (
                  <button
                    onClick={() => setIsGPT(option.value)}
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      isGPT === option.value ? "bg-gray-200" : "",
                      "px-4 py-2 text-sm w-full text-left flex items-center space-x-2 justify-between"
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <span>{option.label}</span>
                    </div>
                    {isGPT === option.value && (
                      <CheckIcon className="w-4 h-4 text-bold" />
                    )}
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
