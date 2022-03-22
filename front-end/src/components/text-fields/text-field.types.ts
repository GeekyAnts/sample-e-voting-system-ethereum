import { IInputProps } from "native-base";

export interface TextFieldType extends IInputProps {
  initialValue: string;
  handleOnChange: Function;
  placeholder: string;
}
