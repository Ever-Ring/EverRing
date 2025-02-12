import AuthPageLayout from "@features/auth/AuthPageLayout";

export default function Signin() {
  return (
    <AuthPageLayout
      title="로그인"
      description="에버링이 처음이신가요?"
      linkText="회원가입"
      buttonText="로그인"
    >
      <label htmlFor="id">
        아이디
        <input id="id" />
      </label>
      <label htmlFor="pw">
        비밀번호
        <input id="pw" />
      </label>
    </AuthPageLayout>
  );
}
