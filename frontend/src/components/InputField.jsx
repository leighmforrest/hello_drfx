const InputField = ({
  label,
  id,
  type = "text",
  placeholder,
  register,
  errors,
}) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-bold mb-2" htmlFor={id}>
        {label}
      </label>
      <input
        {...register(id)}
        className={`shadow appearance-none border dark:border-gray-300 ${
          errors[id] ? "border-red-500" : ""
        } rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline`}
        id={id}
        type={type}
        placeholder={placeholder}
      />
      {errors[id] && (
        <p className="text-red-500 dark:text-red-300 text-xs italic">
          {errors[id].message}
        </p>
      )}
    </div>
  );
};

export default InputField;
