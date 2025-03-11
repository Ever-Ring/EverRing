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

export function formatDateTime(dateTimeString: string) {
  const dateObj = new Date(dateTimeString);

  const date = new Intl.DateTimeFormat("ko-KR", {
    month: "long",
    day: "numeric",
    timeZone: "Asia/Seoul",
  }).format(dateObj);

  const time = dateObj.toLocaleTimeString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Seoul",
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
