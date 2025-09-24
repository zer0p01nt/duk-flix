import * as S from "./LoginStyle";

interface EmailInputProps {
  email: string;
  setEmail: (email: string) => void;
  validateEmail: (
    email: string,
    setEmailError: (msg: string) => void
  ) => boolean;
  setEmailError: (msg: string) => void;
  isPending: boolean;
  $isBorderRed: boolean;
  $isLogin: boolean;
}

export default function EmailInput({
  email,
  setEmail,
  validateEmail,
  setEmailError,
  isPending,
  $isBorderRed,
  $isLogin,
}: EmailInputProps): React.JSX.Element {
  return (
    <S.Input
      type='email'
      placeholder='이메일 주소'
      value={email}
      onChange={(e) => {
        setEmail(e.target.value);
        validateEmail(e.target.value, setEmailError);
      }}
      disabled={isPending}
      $isBorderRed={$isBorderRed}
      $isLogin={$isLogin}
    />
  );
}
