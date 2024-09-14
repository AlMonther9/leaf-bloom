const Button = ({
  text = "Button",
  onClick = () => {},
  type = "button",
  className = "",
}) => {
  return (
    <button
      type={type}
      className={`w-full bg-green-600 text-white py-2 rounded-lg justify-center items-center hover:bg-green-700 ${className} flex`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
