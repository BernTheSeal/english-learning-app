import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Input = ({ value, setter, placeholder, type = "text" }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const isPassword = type === "password";

  const inputType = isPassword ? (isPasswordVisible ? "text" : "password") : type;
  const hasValue = value.length > 0;
  const shouldLabelFloat = isFocused || hasValue;

  return (
    <div className="relative flex items-center">
      <input
        id={placeholder}
        className={`w-full  text-white  h-12 border-2 border-gray-400 
          focus:outline-none rounded  focus:border-blue-400 peer ${
            isPassword ? "pl-4 pr-12" : "px-4"
          }`}
        type={inputType}
        value={value}
        onChange={(e) => setter(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder=" "
      />
      <label
        htmlFor={placeholder}
        className={`
          absolute bg-black px-2  left-4 top-0 transform -translate-y-1/2  font-semibold
          transition-all  ease-in-out cursor-text
          ${isFocused ? "text-blue-400" : "text-gray-400"}
          ${
            shouldLabelFloat
              ? "text-sm text-center"
              : "top-1/2 -translate-y-1/2 text-base font-normal  "
          }
        `}
      >
        {placeholder}
      </label>

      {isPassword && (
        <>
          {isPasswordVisible ? (
            <AiOutlineEye
              onClick={() => setIsPasswordVisible(false)}
              className="text-white absolute right-5 text-lg sm:cursor-pointer"
            />
          ) : (
            <AiOutlineEyeInvisible
              onClick={() => setIsPasswordVisible(true)}
              className="text-white absolute right-5 text-lg sm:cursor-pointer"
            />
          )}
        </>
      )}
    </div>
  );
};

export default Input;
