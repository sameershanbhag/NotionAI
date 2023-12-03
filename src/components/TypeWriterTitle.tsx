"use client";
import React from "react";
import Typewriter from "typewriter-effect";
import GraphemeSplitter from "grapheme-splitter";

type Props = {};

const TypeWriterTitle = (props: Props) => {
  const stringSplitter = (currentString) => {
    const splitter = new GraphemeSplitter();
    return splitter.splitGraphemes(currentString);
  };

  return (
    <Typewriter
      options={{
        loop: true,
        stringSplitter,
      }}
      onInit={(typewriter) => {
        typewriter
          .typeString("🔥 Supercharge your Notion workspace!")
          .pauseFor(1000)
          .deleteAll()
          .typeString("🚀 Notion AI")
          .pauseFor(1000)
          .deleteAll()
          .typeString("🤖 Get the most out of your notes with AI.")
          .pauseFor(1000)
          .deleteAll()
          .typeString("⚡ Get started in minutes!")
          .pauseFor(1000)
          .deleteAll()
          .start();
      }}
    />
  );
};

export default TypeWriterTitle;
