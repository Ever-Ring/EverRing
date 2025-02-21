export function formatDate(dateString: string) {
  const date = new Date(dateString);

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
