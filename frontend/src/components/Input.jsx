import React from "react";

const Input = () => {
  return (
    <div class="mb-4">
      <label
        class="block text-gray-600 dark:text-white text-sm font-bold mb-2"
        for="username"
      >
        Username
      </label>
      <input
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 dark:text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
        id="username"
        type="text"
        placeholder="Username"
      />
      <p class="text-red-500 text-xs italic">Place Error Here.</p>
    </div>
  );
};

export default Input;
