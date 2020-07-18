import React from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import FileInput from "./FileInput";

const FormElement = (props) => {
  let inputChildren = undefined;

  let inputComponent = (
    <TextField
      fullWidth
      multiline={props.multiline}
      size={props.size}
      variant={props.variant}
      label={props.title}
      error={!!props.error}
      type={props.type}
      name={props.propertyName}
      id={props.propertyName}
      value={props.value}
      onChange={props.onChange}
      required={props.required}
      placeholder={props.placeholder}
      children={inputChildren}
      helperText={props.error}
    >
      {inputChildren}
    </TextField>
  );

  if (props.type === "file") {
    inputComponent = (
      <FileInput
        label={props.title}
        name={props.propertyName}
        onChange={props.onChange}
        error={props.error}
        helperText={props.error}
        size={props.size}
        variant={props.variant}
        placeholder={props.placeholder}
      />
    );
  }

  return inputComponent;
};

FormElement.propTypes = {
  propertyName: PropTypes.string.isRequired,
  title: PropTypes.string,
  required: PropTypes.bool,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
  ]),
  options: PropTypes.arrayOf(PropTypes.object),
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  multiline: PropTypes.bool,
  size: PropTypes.string,
  variant: PropTypes.string
};

export default FormElement;
