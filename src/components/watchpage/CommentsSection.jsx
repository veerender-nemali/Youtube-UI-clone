import Comment from "./Comment";

// const commentsData = [
//   {
//     id: "0",
//     name: "Veerender",
//     commentText: "Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
//     replies: [
//       {
//         id: "0.1",
//         name: "Veerender",
//         commentText:
//           "Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
//         replies: [],
//       },
//       {
//         id: "0.2",
//         name: "Veerender",
//         commentText:
//           "Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
//         replies: [
//           {
//             id: "0.2.1",
//             name: "Veerender",
//             commentText:
//               "Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
//             replies: [],
//           },
//         ],
//       },
//     ],
//   },
//   {
//     id: "1",
//     name: "Veerender",
//     commentText: "Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
//     replies: [
//       {
//         id: "1.1",
//         name: "Veerender",
//         commentText:
//           "Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
//         replies: [],
//       },
//     ],
//   },
//   {
//     id: "2",
//     name: "Veerender",
//     commentText: "Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
//     replies: [],
//   },
//   {
//     id: "3",
//     name: "Veerender",
//     commentText: "Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
//     replies: [
//       {
//         id: "3.1",
//         name: "Veerender",
//         commentText:
//           "Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
//         replies: [
//           {
//             id: "3.1.1",
//             name: "Veerender",
//             commentText:
//               "Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
//             replies: [],
//           },
//         ],
//       },
//       {
//         id: "3.2",
//         name: "Veerender",
//         commentText:
//           "Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
//         replies: [],
//       },
//     ],
//   },
//   {
//     id: "4",
//     name: "Veerender",
//     commentText: "Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
//     replies: [],
//   },
//   {
//     id: "5",
//     name: "Veerender",
//     commentText: "Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
//     replies: [
//       {
//         id: "5.1",
//         name: "Veerender",
//         commentText:
//           "Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
//         replies: [
//           {
//             id: "5.2",
//             name: "Veerender",
//             commentText:
//               "Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
//             replies: [],
//           },
//         ],
//       },
//     ],
//   },
// ];

const CommentsList = ({ comments }) => {
  // console.log(comments);
  return comments?.map((comment, index) => (
    <div key={index}>
      <Comment comment={comment.snippet.topLevelComment} />
      {comment.replies
        ? comment.replies.comments.map((comment, index) => (
            <div
              className="pl-2 ml-14 border border-y-0 border-l-black border-r-0 "
              key={index}
            >
              <Comment comment={comment} />
              {/* <CommentsList/> */}
            </div>
          ))
        : ""}
    </div>
  ));
};

const CommentsSection = ({ videoStats, commentsData }) => {
  return (
    <div className="mt-5">
      <h1 className="font-bold text-lg">Comments</h1>
      {/* <div className="py-7 flex gap-10">
        <h1>{videoStats?.commentCount} comments</h1>
        <button>SortBy</button>
      </div> */}
      {/* <div className="flext justify-end">
        <input
          type="text"
          placeholder="comment here"
          className="w-full h-10 bg-slate-300"
        />
        <button className="bg-stone-950 border-none text-white rounded-full px-5 py-1 mt-3">
          comment
        </button>
      </div> */}
      <CommentsList comments={commentsData} />
    </div>
  );
};

export default CommentsSection;
