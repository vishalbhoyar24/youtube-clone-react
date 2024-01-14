import React from "react";
import Button from "./Button";
const list = [
  "all",
  "gaming",
  "songs",
  "live",
  "soccer",
  "cricket",
  "cooking",
  "valentine",
  "songs",
  "live",
];
const ButtonList = () => {
  return (
    <div className=" flex">
      {list.map((element, index) => (
        <Button key={index} name={element} />
      ))}
    </div>
  );
};
export default ButtonList;
