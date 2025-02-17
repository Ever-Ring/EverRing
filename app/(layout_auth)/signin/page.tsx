import AuthPageLayout from "@features/auth/components/AuthPageLayout";
import SigninForm from "@features/auth/components/SigninForm";

export default function Signin() {
  return (
    <AuthPageLayout
      title="로그인"
      description="에버링이 처음이신가요?"
      linkText="회원가입"
    >
      <SigninForm />
    </AuthPageLayout>
  );
}
