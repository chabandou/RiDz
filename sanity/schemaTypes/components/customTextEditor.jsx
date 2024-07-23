import React, { useState } from "react";

const TextEditor = (props) => {


  const countWords = (text) => {
    return text?.trim().split(/\s+/).length;
  };
  function readingTime(wordCount) {
    const readingTime = Math.ceil(wordCount / 200);
    return readingTime;
  }

  const articleText = props.value?.map((item) => item.children?.map((child) => child.text)).join(" ");

  return (
    <div>
      {props.renderDefault(props)}
      <p>Word count: {countWords(articleText)}</p>
      <p>Reading time: {readingTime(countWords(articleText))} min</p>
    </div>
  );
};

export default TextEditor;
