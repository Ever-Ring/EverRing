import AuthPageLayout from "@features/auth/components/AuthPageLayout";
import SignupForm from "@features/auth/components/SignupForm";

export default function Signup() {
  return (
    <AuthPageLayout
      title="회원가입"
      description="이미 회원이신가요?"
      linkText="로그인"
    >
      <SignupForm />
    </AuthPageLayout>
  );
}
