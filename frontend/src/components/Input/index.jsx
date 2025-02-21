import { useFormContext } from "react-hook-form"

const Input = ({
    name, label, type = "text"
}) => {
    const { register } = useFormContext();

  return (
    <div>
        <label htmlFor={name}>{label}</label>
        <input {...register(name)} type={type} />
    </div>
  )
}

export default Input