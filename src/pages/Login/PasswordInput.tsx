import * as S from "./LoginStyle";

interface PasswordInputProps {
  password: string;
  setPassword: (password: string) => void;
  validatePassword: (
    password: string,
    setPasswordError: (msg: string) => void
  ) => boolean;
  setPasswordError: (msg: string) => void;
  isPending: boolean;
  $isBorderRed: boolean;
  $isLogin: boolean;
}

export default function PasswordInput({
  password,
  setPassword,
  validatePassword,
  setPasswordError,
  isPending,
  $isBorderRed,
  $isLogin,
}: PasswordInputProps): React.JSX.Element {
  return (
    <S.Input
      type='password'
      placeholder='비밀번호를 추가하세요'
      value={password}
      onChange={(e) => {
        setPassword(e.target.value);
        validatePassword(e.target.value, setPasswordError);
      }}
      disabled={isPending}
      $isBorderRed={$isBorderRed}
      $isLogin={$isLogin}
    />
  );
}
