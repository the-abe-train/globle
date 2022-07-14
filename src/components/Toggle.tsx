function Toggle({ checked }: { checked: boolean }) {
  if (checked) {
    return (
      <div className="relative cursor-pointer ">
        <div className="block bg-gray-100 w-14 h-8 rounded-full border-2 border-gray-500"></div>
        <div
          className="dot absolute left-1 top-1 
        bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800
        w-6 h-6 rounded-full transition"
        ></div>
      </div>
    );
  } else {
    return (
      <div className="relative cursor-pointer ">
        <div className="block bg-gray-100  w-14 h-8 rounded-full border-2 border-gray-500"></div>
        <div
          className="dot absolute left-1 top-1 
        bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800
        w-6 h-6 rounded-full transition translate-x-full"
        ></div>
      </div>
    );
  }
}

type Props = {
  name: string;
  toggle: boolean;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
  on: string;
  off: string;
};

export default function Switch({ name, toggle, setToggle, on, off }: Props) {
  function keyPressToggle(
    e: React.KeyboardEvent<HTMLLabelElement>,
    toggle: boolean,
    setToggle: React.Dispatch<React.SetStateAction<boolean>>
  ) {
    const keys = ["Enter", " ", "Return"];
    if (keys.includes(e.key)) {
      setToggle(!toggle);
    }
  }
  return (
    <label
      htmlFor={name}
      key={name}
      className="flex items-center justify-between space-x-4 min-w-[8rem]"
      onKeyPress={(e) => keyPressToggle(e, toggle, setToggle)}
      tabIndex={0}
    >
      <span className="dark:text-gray-200">{toggle ? off : on}</span>
      <input
        id={name}
        type="checkbox"
        className="sr-only relative focus-visible:ring hidden"
        checked={toggle}
        onChange={() => setToggle(!toggle)}
        tabIndex={-1}
        aria-hidden="true"
      />
      <Toggle checked={toggle} />
    </label>
  );
}
