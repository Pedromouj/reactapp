import { RadioGroup } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/20/solid";

const RadioButton = ({ options, selected, setSelected }) => {
  return (
    <div className="w-full">
      <RadioGroup value={selected} onChange={setSelected}>
        <div className="flex gap-2 flex-wrap w-full">
          {options.map((type) => (
            <RadioGroup.Option
              key={type.name}
              value={type}
              className={({ active, checked }) =>
                `${checked ? "bg-blue-800 text-white" : "bg-white"}
                      relative flex cursor-pointer rounded-lg border focus:outline-none`
              }
            >
              {({ active, checked }) => (
                <div className="flex w-full items-center justify-between gap-2 px-4 py-2">
                  <div className="flex items-center">
                    <RadioGroup.Label
                      as="p"
                      className={`capitalize font-medium ${
                        checked ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {type.name}
                    </RadioGroup.Label>
                  </div>
                  <div className="shrink-0 text-white">
                    {checked && <CheckCircleIcon className="h-4 w-4" />}
                  </div>
                </div>
              )}
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
    </div>
  );
};

export default RadioButton;
