"use client";

import React from "react";

interface ParticipantImageProps {
  imageUrl?: string;
}

export default function ParticipantImage({ imageUrl }: ParticipantImageProps) {
  return (
    <div
      className="relative h-[29px] w-[29px] rounded-full bg-gray-300"
      style={{
        backgroundImage: imageUrl ? `url("${imageUrl}")` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    />
  );
}
