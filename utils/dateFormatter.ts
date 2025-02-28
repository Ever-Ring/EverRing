export function formatDate(dateString: string) {
  const date = new Date(dateString);
  if (!date || Number.isNaN(date.getTime())) {
    return "Invalid Date";
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}.${month}.${day}`;
}

export function formatDateTime(dateTimeString: string): string {
  const date = new Date(dateTimeString);

  const formattedDate = new Intl.DateTimeFormat("ko-KR", {
    month: "long",
    day: "numeric",
  }).format(date);

  const formattedTime = date.toLocaleTimeString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return `${formattedDate} ・ ${formattedTime}`;
}

// formatDateTime 임시 유틸 사용 수정 후 삭제예정
export function formatDateTime2(dateTimeString: string) {
  const dateObj = new Date(dateTimeString);

  const date = new Intl.DateTimeFormat("ko-KR", {
    month: "long",
    day: "numeric",
  }).format(dateObj);

  const time = dateObj.toLocaleTimeString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return { date, time };
}

export const isExpired = (dateString?: string): boolean => {
  if (!dateString) return false;

  const now = new Date();
  now.setSeconds(0, 0);

  const targetDate = new Date(dateString);
  targetDate.setSeconds(0, 0);

  return targetDate < now;
};

export const getRemainingHours = (dateString: string): number => {
  if (!dateString) return 0;
  const now = new Date();
  const targetTime = new Date(dateString);

  const diffInMs = targetTime.getTime() - now.getTime();
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));

  return diffInHours;
};
