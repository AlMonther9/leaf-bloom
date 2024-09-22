const Input = ({
  type = "text",
  name = "",
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
        name={name}
        placeholder={placeholder}
        className={`w-full p-2 mb-4 border text-quaternary border-gray-300 ${className} text-lg rounded-lg outline-none focus:border-2 focus:border-beige2`}
        value={value}
        onChange={onChange}
        onClick={onClick}
        disabled={disabled}
      />
      {error && <p className="text-red-500">{error}</p>}
    </>
  );
};
export default Input;
