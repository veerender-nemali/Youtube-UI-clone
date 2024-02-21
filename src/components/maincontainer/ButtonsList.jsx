import Button from "./Button";

const ButtonsList = () => {
  const buttonsList = [
    "All",
    "Music",
    "Computer Science",
    "Comedy",
    "OnePiece",
    "Food",
    "Podcasts",
    "Physcis",
    "Art",
    "Watched",
    "New to you",
    "Art",
  ];
  return (
    <div className=" flex">
      {buttonsList.map((name, index) => (
        <Button key={index} buttonName={name} />
        // <button key={index} className="px-3 py-1 m-2 bg-gray-100 rounded-lg">
        //   {name}
        // </button>
      ))}
    </div>
  );
};

export default ButtonsList;
