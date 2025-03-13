"use client";

import React, { useState } from "react";
import ParticipantImage from "@features/list-detail/components/ParticipantImage";
import { Participant } from "@customTypes/gathering";
import { DEFAULT_USER_IMAGE } from "@constants/user";
import Ellipse from "@assets/ellipse.svg";

interface ParticipantListProps {
  participants: Participant[];
}

export default function ParticipantList({
  participants,
}: ParticipantListProps) {
  const [isHovered, setIsHovered] = useState(false);

  const visibleUsers = participants.slice(0, 4);
  const hiddenUsers = participants.slice(4);
  const hiddenCount = Math.max(0, participants.length - 4);

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-start gap-[6px]">
        <span className="text-sm font-semibold text-gray-900">모집 정원</span>
        <span className="text-sm font-semibold text-gray-900">
          {participants.length}명
        </span>
      </div>
      <div className="flex items-center -space-x-[10px]">
        {visibleUsers.map((participant, index) => {
          const userNestedId = participant.User?.id;
          const imageUrl = participant.User?.image || DEFAULT_USER_IMAGE;

          return (
            <ParticipantImage key={userNestedId || index} imageUrl={imageUrl} />
          );
        })}

        {hiddenCount > 0 && (
          <div
            className="relative flex h-[29px] w-[29px] items-center justify-center"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {!isHovered ? (
              <>
                <Ellipse className="h-[29px] w-[29px]" />
                <span className="absolute bottom-1/2 left-1/2 translate-x-[-50%] translate-y-[50%] text-sm font-semibold text-gray-800">
                  +{hiddenCount}
                </span>
              </>
            ) : (
              <div
                className="absolute left-1/2 top-8 z-10 max-h-60 w-[180px] -translate-x-1/2 overflow-y-auto rounded-lg border border-gray-300 bg-white p-2 shadow-lg"
                style={{
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }}
              >
                <div className="grid grid-cols-2 gap-2">
                  {[...visibleUsers, ...hiddenUsers].map((user) => {
                    const imageUrl = user.User?.image || DEFAULT_USER_IMAGE;
                    return (
                      <div
                        key={user.User?.id}
                        className="flex items-center gap-2"
                      >
                        <ParticipantImage imageUrl={imageUrl} />
                        <span className="text-xs font-medium text-gray-700">
                          {user.User?.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
