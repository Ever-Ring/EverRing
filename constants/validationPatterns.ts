export const emailPattern = {
  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/gi,
  message: "올바른 이메일 주소를 입력해주세요.",
};
export const passwordPattern = {
  value: /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/,
  message: "특수문자 포함 8~12자로 입력해주세요.",
};
