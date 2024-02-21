const LiveVideoCard = ({ videoInfo }) => {
  const { snippet } = videoInfo;
  console.log(snippet);
  return (
    <div className="w-60 m-1 p-2 shadow-sm ">
      <img
        src={snippet.thumbnails.medium.url}
        className="rounded-lg"
        alt="video thumbnail"
      />
      <h3 className="font-bold text-sm py-1">{snippet.title}</h3>
      <h1>{snippet.channelTitle}</h1>
    </div>
  );
};

export default LiveVideoCard;
