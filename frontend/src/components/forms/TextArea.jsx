import { Controller } from "react-hook-form";


const TextArea = ({name, control, label, placeholder, rows = 4}) => {
    const commonTextStyles =
    'w-full border rounded p-2 text-base leading-relaxed';
  
  return <Controller 
    name={name}
    control={control}
    render={({field, fieldState}) => (
        <div>
        {label && <label htmlFor={name}>{label}</label>}
        <textarea
            id={name}
            {...field}
            placeholder={placeholder}
            className={`${commonTextStyles} resize-none`}
            rows={rows}
        />
        {fieldState.error && <p className="text-xs text-red-500">{fieldState.error.message}</p>}
    </div>
    )}
  />
}

export default TextArea