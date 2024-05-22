import Select from "react-select";

interface SelectProps {
  options: any[];
  placeholder?: string;
  onChange: any;
  name?: string;
}

export default function SelectData({
  options,
  placeholder,
  onChange,
  name,
}: SelectProps) {
  return (
    <Select
      placeholder={placeholder}
      onChange={onChange}
      name={name}
      options={options}
    />
  );
}
