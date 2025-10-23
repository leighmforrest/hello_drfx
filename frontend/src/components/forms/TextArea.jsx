import { Controller } from 'react-hook-form';

const TextArea = ({
  name,
  control,
  label,
  placeholder,
  rows = 4,
  fieldClassName,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <div>
          {label && <label htmlFor={name}>{label}</label>}
          <textarea
            id={name}
            {...field}
            placeholder={placeholder}
            className={fieldClassName}
            rows={rows}
          />
          {fieldState.error && (
            <p className="text-XSLTProcessor text-red-500">
              {fieldState.error.message}
            </p>
          )}
        </div>
      )}
    />
  );
};

export default TextArea;
