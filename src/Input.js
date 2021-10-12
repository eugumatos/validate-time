import { useField } from "@unform/core";
import { useEffect, useRef } from "react";
import { TextField } from "@material-ui/core";

export const Input = ({ name, label, ...rest }) => {
  const inputRef = useRef(null);
  const { fieldName, defaultValue, error, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: "value"
    });
  }, [fieldName, registerField]);
  return (
    <>
      <TextField
        name={name}
        label={label}
        variant="outlined"
        inputRef={inputRef}
        error={!!error}
        helperText={error}
        defaultValue={defaultValue}
        {...rest}
      />
    </>
  );
};
