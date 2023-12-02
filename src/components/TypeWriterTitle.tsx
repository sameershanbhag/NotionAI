"use client";
import React from "react";
import Typewriter from "typewriter-effect";

type Props = {};

const TypeWriterTitle = (props: Props) => {
  return (
    <Typewriter
      options={{
        loop: true,
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
