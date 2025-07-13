const Input = ({ label, id, register, errors }) => {
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
        id={id}
        multiple={false}
        type="file"
        accept="image/*"
        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 dark:text-gray-200 leading-tight focus:outline-none focus:shadow-outline ${
          errors[id] ? 'border-red-400 dark:border-red-500' : ''
        }`}
      />
      {errors[id] && (
        <p className="text-red-400 dark:text-red-500 text-xs italic">
          {errors[id].message}
        </p>
      )}
    </div>
  );
};

export default Input;
