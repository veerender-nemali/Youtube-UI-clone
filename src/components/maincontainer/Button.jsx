const Button = (props) => {
  return (
    <button className="px-3 py-1 m-2 bg-gray-100 rounded-lg">
      {props.buttonName}
    </button>
  );
};

export default Button;
