/* eslint-disable import/prefer-default-export */
export const truncateText = (
  text: string | undefined,
  maxLength: number = 60,
) => {
  if (!text) return "";
  return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
};
