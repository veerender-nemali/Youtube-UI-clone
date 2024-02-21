const Comment = ({ comment }) => {
  return (
    <div className="flex gap-2 sm:gap-4 flex-row py-3 max-w-[53rem]">
      <img
        src={comment.snippet.authorProfileImageUrl}
        alt="userProfileImage"
        className="rounded-full w-6 sm:w-10 h-full"
      />
      <div className="">
        <p className=" font-semibold">{comment.snippet.authorDisplayName}</p>
        <p className="pt-2 font-semiboldbold">{comment.snippet.textOriginal}</p>
      </div>
      {/* <div className="py-1">
        <button className="mr-5">
          <img
            className="h-4 "
            src="https://api.iconify.design/ph:thumbs-up.svg"
            alt="like button"
          />
        </button>
        <button>
          <img
            className="h-4"
            src="https://api.iconify.design/ph:thumbs-down.svg"
            alt="dislike button"
          />
        </button>
      </div> */}
    </div>
  );
};

export default Comment;
