import { useForm, FormProvider } from "react-hook-form";
import { forwardRef, useImperativeHandle } from "react";

import styles from "./Form.module.css";

const Form = forwardRef(({ onSubmit, defaultValues, children }, ref) => {
  const methods = useForm({ defaultValues });

  useImperativeHandle(ref, () => ({
    reset: methods.reset,
  }));

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className={styles.form}>
        {children}
      </form>
    </FormProvider>
  );
});

export default Form;
