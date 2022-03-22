import { Input } from "native-base";
import { TextFieldType } from "./text-field.types";

/**
 * @param
 * Components mandatory props are initialValue, handleOnChange (callback function), placeholder, size
 * and for other props refere nativebase.io
 * */

export function OutlineTextField(props: TextFieldType) {
  const { initialValue, handleOnChange, placeholder, ...rest } = props;
  return (
    <Input
      {...rest}
      variant="outline"
      value={initialValue}
      onChangeText={(val) => handleOnChange(val)}
      placeholder={placeholder}
    />
  );
}
export default OutlineTextField;
