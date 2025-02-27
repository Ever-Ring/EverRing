"use client";

import React, { useState } from "react";
import Button from "@components/common/Button";
import CreateMeetingModal from "@components/common/CreateModal";

export default function ParentComponent() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <Button text="모임 생성하기" onClick={() => setIsModalOpen(true)} />
      {isModalOpen && (
        <CreateMeetingModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
