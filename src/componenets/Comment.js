import React from "react";
const commentsData = [
  {
    name: "tiger",
    text: "Lorem ipsum dolor sit amet consectetur",
    replies: [
      {
        name: "tiger",
        text: "Lorem ipsum dolor sit amet consectetur",
        replies: [
          {
            name: "tiger",
            text: "Lorem ipsum dolor sit amet consectetur",
            replies: [],
          },
        ],
      },
    ],
  },
  {
    name: "tiger",
    text: "Lorem ipsum dolor sit amet consectetur",
    replies: [
      {
        name: "tiger",
        text: "Lorem ipsum dolor sit amet consectetur",
        replies: [
          {
            name: "tiger",
            text: "Lorem ipsum dolor sit amet consectetur",
            replies: [
              {
                name: "tiger",
                text: "Lorem ipsum dolor sit amet consectetur",
                replies: [],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "tiger",
    text: "Lorem ipsum dolor sit amet consectetur",
    replies: [],
  },
  {
    name: "tiger",
    text: "Lorem ipsum dolor sit amet consectetur",
    replies: [],
  },
  {
    name: "tiger",
    text: "Lorem ipsum dolor sit amet consectetur",
    replies: [],
  },
];
const Singlecomment = ({ data }) => {
  const { name, text, replies } = data;
  return (
    <div className=" flex shadow-sm p-2 rounded-lg my-2 bg-gray-100">
      <img
        className=" w-12 h-12"
        src="https://cdn-icons-png.flaticon.com/512/666/666201.png"
        alt=""
      />
      <div className="px-3">
        <p className=" font-bold"> {name}</p>
        <p>{text}</p>
      </div>
    </div>
  );
};

const CommentsList = ({ comments }) => {
  // ! Disclaimer: Don't use indexes as keys
  return comments.map((comment, index) => (
    <div key={index}>
      <Singlecomment data={comment} />
      <div className=" pl-5 border border-l-black ml-5">
        <CommentsList comments={comment.replies} />
      </div>
    </div>
  ));
};

const Comment = () => {
  return (
    <div className=" m-5 p-2">
      <h1 className=" font-bold text-2xl">comments:</h1>
      <CommentsList comments={commentsData} />
    </div>
  );
};

export default Comment;
