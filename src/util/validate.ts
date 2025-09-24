// 이메일 유효성 검사 함수
export const validateEmail = (
  email: string,
  setEmailError: (msg: string) => void
) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    setEmailError("유효한 이메일 주소를 입력해 주세요.");
    return false;
  }
  setEmailError("");
  return true;
};

// 비밀번호 유효성 검사 함수
export const validatePassword = (
  password: string,
  setPasswordError: (msg: string) => void
) => {
  if (password.length < 4 || password.length > 60) {
    setPasswordError("비밀번호는 4~60자 사이여야 합니다.");
    return false;
  }
  setPasswordError("");
  return true;
};

// 전체 유효성 검사
export const validateAll = (
  email: string,
  password: string,
  setEmailError: (msg: string) => void,
  setPasswordError: (msg: string) => void
) => {
  const isEmailValid = validateEmail(email, setEmailError);
  const isPasswordValid = validatePassword(password, setPasswordError);
  return isEmailValid && isPasswordValid;
};
