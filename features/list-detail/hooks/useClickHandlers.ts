import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

interface UserStore {
  id: number | null;
  name: string | null;
  image: string | null;
  email: string | null;
  companyName: string | null;
}

interface UseClickHandlersProps {
  userData: UserStore;
  isFull: boolean;
  joinStatus: string;
  cancelStatus: string;
  gatheringId: number;
  joinGathering: (id: number, options: { onSuccess: () => void }) => void;
  cancelGathering: (id: number, options: { onSuccess: () => void }) => void;
  deleteJoined: (id: number, options: { onSuccess: () => void }) => void;
  setIsJoined: React.Dispatch<React.SetStateAction<boolean>>;
  setModalConfig: React.Dispatch<
    React.SetStateAction<{
      isOpen: boolean;
      text: string;
      hasTwoButton: boolean;
      onConfirm: () => void;
      onClose: () => void;
    }>
  >;
}

export default function useClickHandlers({
  userData,
  isFull,
  joinStatus,
  cancelStatus,
  gatheringId,
  joinGathering,
  cancelGathering,
  deleteJoined,
  setIsJoined,
  setModalConfig,
}: UseClickHandlersProps) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const handleJoinClick = useCallback(() => {
    if (userData?.id) {
      if (!isFull && joinStatus !== "pending") {
        joinGathering(gatheringId, {
          onSuccess: () => {
            setIsJoined(true);
            setModalConfig({
              isOpen: true,
              text: "참여 완료되었습니다!",
              hasTwoButton: false,
              onConfirm: () =>
                setModalConfig((prev) => ({ ...prev, isOpen: false })),
              onClose: () =>
                setModalConfig((prev) => ({ ...prev, isOpen: false })),
            });
            queryClient.invalidateQueries({ queryKey: ["gatheringsJoined"] });
          },
        });
      }
    } else {
      setModalConfig({
        isOpen: true,
        text: "로그인이 필요해요.",
        hasTwoButton: false,
        onConfirm: () => router.push("/signin"),
        onClose: () => setModalConfig((prev) => ({ ...prev, isOpen: false })),
      });
    }
  }, [
    userData?.id,
    isFull,
    joinStatus,
    joinGathering,
    gatheringId,
    setIsJoined,
    setModalConfig,
    queryClient,
    router,
  ]);

  const handleDeleteJoinedClick = useCallback(() => {
    if (deleteJoined && cancelStatus !== "pending") {
      setModalConfig({
        isOpen: true,
        text: "정말 취소하겠습니까?",
        hasTwoButton: true,
        onConfirm: () => {
          setModalConfig((prev) => ({ ...prev, isOpen: false }));
          deleteJoined(gatheringId, {
            onSuccess: () => {
              setIsJoined(false);
              setModalConfig({
                isOpen: true,
                text: "참여 취소되었습니다!",
                hasTwoButton: false,
                onConfirm: () =>
                  setModalConfig((prev) => ({ ...prev, isOpen: false })),
                onClose: () =>
                  setModalConfig((prev) => ({ ...prev, isOpen: false })),
              });
            },
          });
        },
        onClose: () => setModalConfig((prev) => ({ ...prev, isOpen: false })),
      });
    }
  }, [deleteJoined, cancelStatus, gatheringId, setModalConfig, setIsJoined]);

  const handleCancelClick = useCallback(() => {
    if (cancelGathering && cancelStatus !== "pending") {
      setModalConfig({
        isOpen: true,
        text: "정말 취소하겠습니까?",
        hasTwoButton: true,
        onConfirm: () => {
          setModalConfig((prev) => ({ ...prev, isOpen: false }));
          cancelGathering(gatheringId, {
            onSuccess: () => {
              setModalConfig({
                isOpen: true,
                text: "모임 취소되었습니다!",
                hasTwoButton: false,
                onConfirm: () => router.push("/list"),
                onClose: () => router.push("/list"),
              });
            },
          });
        },
        onClose: () => setModalConfig((prev) => ({ ...prev, isOpen: false })),
      });
    }
  }, [cancelGathering, cancelStatus, gatheringId, setModalConfig, router]);

  const handleShareClick = useCallback(() => {
    navigator.clipboard.writeText(window.location.href);
    setModalConfig({
      isOpen: true,
      text: "링크가 복사되었습니다!",
      hasTwoButton: false,
      onConfirm: () => setModalConfig((prev) => ({ ...prev, isOpen: false })),
      onClose: () => setModalConfig((prev) => ({ ...prev, isOpen: false })),
    });
  }, [setModalConfig]);

  return {
    handleJoinClick,
    handleDeleteJoinedClick,
    handleCancelClick,
    handleShareClick,
  };
}
