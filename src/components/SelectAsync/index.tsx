import AsyncSelect from "react-select/async";

interface AsyncSelectProps {
  loadOptions: any;
  defaultOptions?: [];
  placeholder?: string;
  onChange: any;
  name?: string;
}

export default function SelectAsync({
  loadOptions,
  defaultOptions,
  placeholder,
  onChange,
  name,
}: AsyncSelectProps) {
  return (
    <AsyncSelect
      loadOptions={loadOptions}
      defaultOptions={defaultOptions}
      placeholder={placeholder}
      onChange={onChange}
      name={name}
    />
  );
}
