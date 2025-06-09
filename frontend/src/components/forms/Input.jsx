import React from "react";

const Input = ({
  label,
  id,
   type = "text",
   placeholder,
   register,
   errors
}) => {
  return (
    <div className="mb-4">
        <label
          className="block text-gray-600 dark:text-white text-sm font-bold mb-2"
          htmlFor={id}
        >
          {label}
        </label>
        <input
          {...register(id)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 dark:text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
          id={id}
          type={type}
          placeholder={placeholder}
        />
        {errors[id] && (
          <p class="text-red-500 text-xs italic">{errors[id].message}</p>
        )}
      </div>
  );
};

export default Input;
