const Input = ({
  type = "text",
  onClick = () => {},
  placeholder = "",
  className = "",
  value = "",
  onChange = () => {},
  formData = {},
  error = "",
  disabled = false,
}) => {
  return (
    <>
      <input
        type={type}
        placeholder={placeholder}
        className={`w-full p-2 mb-4 border border-gray-300 ${className} rounded outline-none focus:border-2 focus:border-green-600`}
        value={value}
        onChange={onChange}
        onClick={onClick}
      />
    </>
  );
};
export default Input;
