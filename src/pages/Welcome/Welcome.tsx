import { useNavigate, type NavigateFunction } from "react-router-dom";
import * as S from "./WelcomeStyle";
import * as L from "@/pages/Login/LoginStyle";
import Footer from "@/components/Footer/Footer";
import { useState } from "react";
import { validateEmail } from "@/util/validate";
import EmailInput from "../Login/EmailInput";
import TrendingMovieList from "@/components/TrendingMovieList/TrendingMovieList";

interface FAQData {
  id: number;
  question: string;
  answer: string;
  linkText?: string;
  linkUrl?: string;
}

// FAQ 리스트
const faqData: FAQData[] = [
  {
    id: 1,
    question: "넷플릭스에서 어떤 콘텐츠를 시청할 수 있나요?",
    answer:
      "넷플릭스는 장편 영화, 다큐멘터리, 시리즈, 애니메이션, 각종 상을 수상한 넷플릭스 오리지널 등 수많은 콘텐츠를 확보하고 있습니다. 마음에 드는 콘텐츠를 원하는 시간에 원하는 만큼 시청하실 수 있습니다.",
    linkText: "넷플릭스 콘텐츠를 한번 살펴보세요.",
    linkUrl: "https://www.netflix.com/kr/browse/genre/839338",
  },
  {
    id: 2,
    question: "넷플릭스란 무엇인가요?",
    answer:
      "넷플릭스는 각종 수상 경력에 빛나는 시리즈, 영화, 애니메이션, 다큐멘터리 등 다양한 콘텐츠를 인터넷 연결이 가능한 수천 종의 디바이스에서 시청할 수 있는 스트리밍 서비스입니다.\n\n저렴한 월 요금으로 원하는 시간에 원하는 만큼 즐길 수 있습니다. 무궁무진한 콘텐츠가 준비되어 있으며 매주 새로운 시리즈와 영화가 제공됩니다.",
  },
  {
    id: 3,
    question: "넷플릭스 요금은 얼마인가요?",
    answer:
      "스마트폰, 태블릿, 스마트 TV, 노트북, 스트리밍 디바이스 등 다양한 디바이스에서 월정액 요금 하나로 넷플릭스를 시청하세요. 멤버십 요금은 월 7,000원부터 17,000원까지 다양합니다. 추가 비용이나 약정이 없습니다.",
  },
  {
    id: 4,
    question: "어디에서 시청할 수 있나요?",
    answer:
      "언제 어디서나 시청할 수 있습니다. 넷플릭스 계정으로 로그인하면 PC에서 netflix.com을 통해 바로 시청할 수 있으며, 인터넷이 연결되어 있고 넷플릭스 앱을 지원하는 디바이스(스마트 TV, 스마트폰, 태블릿, 스트리밍 미디어 플레이어, 게임 콘솔 등)에서도 언제든지 시청할 수 있습니다.\n\niOS 또는 Android용 앱에서는 좋아하는 시리즈를 저장할 수도 있습니다. 저장 기능을 이용해 이동 중이나 인터넷에 연결할 수 없는 곳에서도 시청하세요. 넷플릭스는 어디서든 함께니까요.",
  },
  {
    id: 5,
    question: "멤버십을 해지하려면 어떻게 하나요?",
    answer:
      "넷플릭스는 부담 없이 간편합니다. 성가신 계약도, 약정도 없으니까요. 멤버십 해지도 온라인에서 클릭 두 번이면 완료할 수 있습니다. 해지 수수료도 없으니 원할 때 언제든 계정을 시작하거나 종료하세요.",
  },
  {
    id: 6,
    question: "아이들이 넷플릭스를 봐도 좋을까요?",
    answer:
      "멤버십에 넷플릭스 키즈 환경이 포함되어 있어 자녀가 자기만의 공간에서 가족용 시리즈와 영화를 즐기는 동안 부모가 이를 관리할 수 있습니다.\n\n키즈 프로필과 더불어 PIN 번호를 이용한 자녀 보호 기능도 있어, 자녀가 시청할 수 있는 콘텐츠의 관람등급을 제한하고 자녀의 시청을 원치 않는 특정 작품을 차단할 수도 있습니다.",
  },
];

export default function Welcome(): React.JSX.Element {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [openDataId, setOpenDataId] = useState<number | null>(null);
  const navigate: NavigateFunction = useNavigate();

  // EmailInput을 사용하기 위해 임의로 변수 선언
  const isPending = false;

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateEmail(email, setEmailError)) {
      // URL로 넘어갈 때 state에 입력된 이메일 정보도 같이 넘김 -> 초기값으로 사용
      navigate("/signup", { state: { initialEmail: email } });
    }
  };

  const onToggle = (id: number) => {
    if (openDataId === id) {
      setOpenDataId(null);
    } else {
      setOpenDataId(id);
    }
  };

  return (
    <>
      <S.MainContainer>
        <S.HeaderContainer>
          <S.WelcomeHeader>
            <S.Logo onClick={() => navigate("/")} />
            <S.Console>
              <S.LangSelect>
                <S.LangOption>한국어</S.LangOption>
                <S.LangOption>English</S.LangOption>
              </S.LangSelect>
              <S.LoginButton onClick={() => navigate("/login")}>
                로그인
              </S.LoginButton>
            </S.Console>
          </S.WelcomeHeader>
          <S.CenterBox>
            <S.CenterTitle>영화, 시리즈 등을 무제한으로</S.CenterTitle>
            <S.CenterText>
              7,000원으로 시작하세요. 멤버십은 언제든지 해지 가능합니다.
            </S.CenterText>
            <S.CenterFormWrapper>
              <S.FormText>
                시청할 준비가 되셨나요? 멤버십을 등록하거나 재시작하려면 이메일
                주소를 입력하세요.
              </S.FormText>
              <S.Form onSubmit={onSubmit}>
                <S.InputWrapper>
                  <EmailInput
                    email={email}
                    setEmail={setEmail}
                    validateEmail={validateEmail}
                    setEmailError={setEmailError}
                    isPending={isPending}
                    $isBorderRed={!!emailError}
                    $isLogin={true}
                  />
                  {emailError && (
                    <L.ErrorMsg $isLogin={true}>{emailError}</L.ErrorMsg>
                  )}
                </S.InputWrapper>
                <S.Button type='submit'>
                  <div>시작하기</div>
                  <svg
                    viewBox='0 0 24 24'
                    width='24'
                    height='24'
                    data-icon='ChevronRightMedium'
                    data-icon-id=':r16:'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    role='img'
                  >
                    <path
                      fillRule='evenodd'
                      clipRule='evenodd'
                      d='M15.5859 12L8.29303 19.2928L9.70725 20.7071L17.7072 12.7071C17.8948 12.5195 18.0001 12.2652 18.0001 12C18.0001 11.7347 17.8948 11.4804 17.7072 11.2928L9.70724 3.29285L8.29303 4.70706L15.5859 12Z'
                      fill='currentColor'
                    ></path>
                  </svg>
                </S.Button>
              </S.Form>
            </S.CenterFormWrapper>
          </S.CenterBox>
          <S.Overlay />
          <S.Curve>
            <S.CurveInner />
          </S.Curve>
        </S.HeaderContainer>

        <S.Main>
          <S.PopCornWrapper>
            <svg width='96' height='96' fill='none'>
              <path
                d='M48 95.213c26.51 0 48-3.875 48-8.656 0-4.78-21.49-8.655-48-8.655S0 81.777 0 86.557c0 4.78 21.49 8.656 48 8.656Z'
                fill='url(#a)'
              ></path>
              <path
                d='M48 77.115c26.51 0 48-17.087 48-38.164C96 17.873 74.51.787 48 .787S0 17.874 0 38.95s21.49 38.164 48 38.164Z'
                fill='url(#b)'
              ></path>
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M75.376 75.624a2.36 2.36 0 1 0-2.817 1.408c-.062.157-.107.32-.134.486a3.15 3.15 0 0 0-1.161 4.298 3.146 3.146 0 0 0 4.297 1.161 3.148 3.148 0 0 0 4.927 2.228 2.36 2.36 0 1 0 3.662-2.809 3.148 3.148 0 0 0-4.448-4.447 2.355 2.355 0 0 0-2.67-.669 2.365 2.365 0 0 0-1.656-1.656Zm-50.983 1.49c0 .31-.044.619-.134.915a4.328 4.328 0 1 1-3.256 7.922 2.743 2.743 0 0 1-1.724.606c-.477.001-.946-.123-1.36-.358a1.966 1.966 0 0 1-3.74-.569 2.36 2.36 0 1 1-.013-4.445 3.148 3.148 0 0 1 4.07-3.145 3.148 3.148 0 1 1 6.157-.925Z'
                fill='url(#c)'
              ></path>
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M51.934 20.459c0 .388-.07.76-.198 1.102.234.114.452.256.65.422a3.146 3.146 0 0 1 3.102-1.498 3.147 3.147 0 0 1 5.888 1.646 3.154 3.154 0 0 1 1.953 1.498c.783.095 1.501.48 2.013 1.078a3.935 3.935 0 0 1 4.868 5.726c.559.375.983.918 1.212 1.552a3.148 3.148 0 0 1 5.26 3.445 3.147 3.147 0 1 1-3.08 4.701H24.392v-1.208a3.148 3.148 0 0 1-4.346-4.217 3.148 3.148 0 0 1 3.478-5.215 3.142 3.142 0 0 1 2.442-1.164 3.147 3.147 0 0 1 3.554-3.122 3.147 3.147 0 0 1 3.18-1.568 3.147 3.147 0 0 1 4.803-3.954 3.15 3.15 0 0 1 3.238 2.094c.41-.276.88-.45 1.371-.51a3.147 3.147 0 0 1 3.597-1.478 3.148 3.148 0 0 1 6.224.67Z'
                fill='url(#d)'
              ></path>
              <path
                opacity='0.6'
                d='M46.033 36.984a7.475 7.475 0 1 0 0-14.951 7.475 7.475 0 0 0 0 14.95Z'
                fill='url(#e)'
              ></path>
              <path
                opacity='0.6'
                d='M43.672 32.262a5.115 5.115 0 1 0 0-10.23 5.115 5.115 0 0 0 0 10.23Z'
                fill='url(#f)'
              ></path>
              <path
                opacity='0.6'
                d='M42.098 36.197a5.115 5.115 0 1 0 0-10.23 5.115 5.115 0 0 0 0 10.23Z'
                fill='url(#g)'
              ></path>
              <path
                opacity='0.6'
                d='M27.148 38.557a5.115 5.115 0 1 0 0-10.23 5.115 5.115 0 0 0 0 10.23Z'
                fill='url(#h)'
              ></path>
              <path
                opacity='0.6'
                d='M30.295 36.197a5.115 5.115 0 1 0 0-10.23 5.115 5.115 0 0 0 0 10.23Z'
                fill='url(#i)'
              ></path>
              <path
                opacity='0.6'
                d='M30.295 37.77a2.754 2.754 0 1 0 0-5.508 2.754 2.754 0 0 0 0 5.508Z'
                fill='url(#j)'
              ></path>
              <path
                opacity='0.2'
                d='M73.574 36.197a2.754 2.754 0 1 0 0-5.508 2.754 2.754 0 0 0 0 5.508Z'
                fill='url(#k)'
              ></path>
              <path
                opacity='0.2'
                d='M76.721 39.344a1.967 1.967 0 1 0 0-3.934 1.967 1.967 0 0 0 0 3.934Z'
                fill='url(#l)'
              ></path>
              <path
                opacity='0.3'
                d='M72.787 40.131a3.541 3.541 0 1 0 0-7.082 3.541 3.541 0 0 0 0 7.082Z'
                fill='url(#m)'
              ></path>
              <path
                opacity='0.2'
                d='M58.623 24.393a2.754 2.754 0 1 0 0-5.508 2.754 2.754 0 0 0 0 5.508Z'
                fill='url(#n)'
              ></path>
              <path
                opacity='0.2'
                d='M48.393 21.246a1.967 1.967 0 1 0 0-3.935 1.967 1.967 0 0 0 0 3.935Z'
                fill='url(#o)'
              ></path>
              <path
                opacity='0.2'
                d='M35.016 23.607a1.967 1.967 0 1 0 0-3.935 1.967 1.967 0 0 0 0 3.935Z'
                fill='url(#p)'
              ></path>
              <path
                opacity='0.2'
                d='M61.77 33.05a5.115 5.115 0 1 0 0-10.23 5.115 5.115 0 0 0 0 10.23Z'
                fill='url(#q)'
              ></path>
              <path
                opacity='0.6'
                d='M57.05 31.475a5.115 5.115 0 1 0 0-10.229 5.115 5.115 0 0 0 0 10.23Z'
                fill='url(#r)'
              ></path>
              <path
                opacity='0.2'
                d='M59.41 33.836a5.115 5.115 0 1 0 0-10.23 5.115 5.115 0 0 0 0 10.23Z'
                fill='url(#s)'
              ></path>
              <path
                d='M18.885 36.984h44.853l-3.935 51.934h-37.77l-3.148-51.934Z'
                fill='url(#t)'
              ></path>
              <path
                d='m71.607 85.77-11.804 3.148 3.935-51.934 14.95 3.934-7.081 44.852Z'
                fill='url(#u)'
              ></path>
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='m46.33 47.333.254-10.35h-9.388l.104 9.84a16.418 16.418 0 0 0-4.664 1.825l-.327-11.664h-9.407l2.927 51.934h7.943l-.317-11.22a16.431 16.431 0 0 0 4.187 1.453l.105 9.767h7.558l.25-10.101a16.449 16.449 0 0 0 3.675-1.58l-.37 11.681h8.321l2.741-51.934h-9.417l-.388 12.237a16.47 16.47 0 0 0-3.788-1.888Zm16.078 40.89 2.95-.786 5.845-48.488-4.501-1.186-4.294 50.46Zm4.63-1.234 2.317-.618 7.838-45.846-4.375-1.152-5.78 47.616ZM53.507 62.95c0 6.953-5.636 12.59-12.59 12.59s-12.59-5.636-12.59-12.59 5.636-12.59 12.59-12.59 12.59 5.636 12.59 12.59Zm-7.172 6.795L44.64 64.26l4.108-3.047a.39.39 0 0 0-.2-.702 93.591 93.591 0 0 0-5.184-.274l-2.076-5.712a.394.394 0 0 0-.74 0l-2.076 5.712c-1.76.044-3.49.137-5.185.274a.39.39 0 0 0-.198.702l4.107 3.046-1.696 5.485a.394.394 0 0 0 .598.442l4.82-3.281 4.82 3.281a.394.394 0 0 0 .599-.441h-.001Z'
                fill='url(#v)'
              ></path>
              <path
                opacity='0.4'
                d='M16.918 82.623a1.967 1.967 0 1 0 0-3.934 1.967 1.967 0 0 0 0 3.934Z'
                fill='url(#w)'
              ></path>
              <path
                opacity='0.4'
                d='M13.77 84.984a1.967 1.967 0 1 0 0-3.935 1.967 1.967 0 0 0 0 3.935Z'
                fill='url(#x)'
              ></path>
              <path
                opacity='0.4'
                d='M16.131 84.984a1.967 1.967 0 1 0 0-3.935 1.967 1.967 0 0 0 0 3.935Z'
                fill='url(#y)'
              ></path>
              <path
                opacity='0.4'
                d='M19.279 86.557a1.967 1.967 0 1 0 0-3.934 1.967 1.967 0 0 0 0 3.934Z'
                fill='url(#z)'
              ></path>
              <path
                opacity='0.4'
                d='M82.23 85.77a1.967 1.967 0 1 0 0-3.934 1.967 1.967 0 0 0 0 3.934Z'
                fill='url(#A)'
              ></path>
              <path
                opacity='0.4'
                d='M81.836 82.623a2.36 2.36 0 1 0 0-4.721 2.36 2.36 0 0 0 0 4.721Z'
                fill='url(#B)'
              ></path>
              <path
                opacity='0.4'
                d='M77.902 82.623a2.36 2.36 0 1 0 0-4.721 2.36 2.36 0 0 0 0 4.721Z'
                fill='url(#C)'
              ></path>
              <path
                opacity='0.4'
                d='M75.147 81.836a2.754 2.754 0 1 0 0-5.508 2.754 2.754 0 0 0 0 5.508Z'
                fill='url(#D)'
              ></path>
              <path
                opacity='0.4'
                d='M18.492 84.984a2.754 2.754 0 1 0 0-5.509 2.754 2.754 0 0 0 0 5.509Z'
                fill='url(#E)'
              ></path>
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M73.967 79.475a2.361 2.361 0 0 1 2.36 2.361 3.148 3.148 0 1 1-.88 6.17 2.36 2.36 0 0 1-4.613-.92 2.755 2.755 0 0 1 .773-5.222v-.028a2.36 2.36 0 0 1 2.36-2.36Z'
                fill='url(#F)'
              ></path>
              <defs>
                <radialGradient
                  id='a'
                  cx='0'
                  cy='0'
                  r='1'
                  gradientUnits='userSpaceOnUse'
                  gradientTransform='matrix(0 -8.70201 48.2567 0 48 86.604)'
                >
                  <stop offset='0.286' stopColor='#7D2889'></stop>
                  <stop
                    offset='0.724'
                    stopColor='#FF66D9'
                    stopOpacity='0.41'
                  ></stop>
                  <stop offset='1' stopColor='#fff' stopOpacity='0'></stop>
                </radialGradient>
                <radialGradient
                  id='b'
                  cx='0'
                  cy='0'
                  r='1'
                  gradientUnits='userSpaceOnUse'
                  gradientTransform='matrix(0 -38.3681 48.2567 0 48 39.155)'
                >
                  <stop stopColor='#FFCA45'></stop>
                  <stop
                    offset='0.453'
                    stopColor='#FF66D9'
                    stopOpacity='0.36'
                  ></stop>
                  <stop offset='1' stopColor='#fff' stopOpacity='0'></stop>
                </radialGradient>
                <radialGradient
                  id='c'
                  cx='0'
                  cy='0'
                  r='1'
                  gradientUnits='userSpaceOnUse'
                  gradientTransform='rotate(180 23.41 39.738) scale(37.7705)'
                >
                  <stop offset='0.432' stopColor='#FF8B54'></stop>
                  <stop offset='0.76' stopColor='#FFBB8D'></stop>
                  <stop offset='1' stopColor='#F9DDD1'></stop>
                </radialGradient>
                <radialGradient
                  id='d'
                  cx='0'
                  cy='0'
                  r='1'
                  gradientUnits='userSpaceOnUse'
                  gradientTransform='matrix(0 -10.623 28.257 0 47.607 27.934)'
                >
                  <stop offset='0.302' stopColor='#F9DDD1'></stop>
                  <stop offset='0.674' stopColor='#FFBB8D'></stop>
                  <stop offset='1' stopColor='#FF8B54'></stop>
                </radialGradient>
                <radialGradient
                  id='e'
                  cx='0'
                  cy='0'
                  r='1'
                  gradientUnits='userSpaceOnUse'
                  gradientTransform='rotate(90 8.042 37.99) scale(7.03568)'
                >
                  <stop offset='0.375' stopColor='#FFF4EB'></stop>
                  <stop offset='1' stopColor='#FFF3EB' stopOpacity='0'></stop>
                </radialGradient>
                <radialGradient
                  id='f'
                  cx='0'
                  cy='0'
                  r='1'
                  gradientUnits='userSpaceOnUse'
                  gradientTransform='rotate(90 8.112 35.56) scale(4.81389)'
                >
                  <stop offset='0.375' stopColor='#FFF4EB'></stop>
                  <stop offset='1' stopColor='#FFF3EB' stopOpacity='0'></stop>
                </radialGradient>
                <radialGradient
                  id='g'
                  cx='0'
                  cy='0'
                  r='1'
                  gradientUnits='userSpaceOnUse'
                  gradientTransform='rotate(90 5.358 36.74) scale(4.81389)'
                >
                  <stop offset='0.375' stopColor='#FFF4EB'></stop>
                  <stop offset='1' stopColor='#FFF3EB' stopOpacity='0'></stop>
                </radialGradient>
                <radialGradient
                  id='h'
                  cx='0'
                  cy='0'
                  r='1'
                  gradientUnits='userSpaceOnUse'
                  gradientTransform='rotate(90 -3.298 30.445) scale(4.81389)'
                >
                  <stop offset='0.375' stopColor='#FFF4EB'></stop>
                  <stop offset='1' stopColor='#FFF3EB' stopOpacity='0'></stop>
                </radialGradient>
                <radialGradient
                  id='i'
                  cx='0'
                  cy='0'
                  r='1'
                  gradientUnits='userSpaceOnUse'
                  gradientTransform='rotate(90 -.544 30.839) scale(4.81389)'
                >
                  <stop offset='0.375' stopColor='#FFF4EB'></stop>
                  <stop offset='1' stopColor='#FFF3EB' stopOpacity='0'></stop>
                </radialGradient>
                <radialGradient
                  id='j'
                  cx='0'
                  cy='0'
                  r='1'
                  gradientUnits='userSpaceOnUse'
                  gradientTransform='rotate(90 -2.442 32.737) scale(2.59209)'
                >
                  <stop offset='0.375' stopColor='#FFF4EB'></stop>
                  <stop offset='1' stopColor='#FFF3EB' stopOpacity='0'></stop>
                </radialGradient>
                <radialGradient
                  id='k'
                  cx='0'
                  cy='0'
                  r='1'
                  gradientUnits='userSpaceOnUse'
                  gradientTransform='rotate(90 19.985 53.59) scale(2.59209)'
                >
                  <stop offset='0.375' stopColor='#FFF4EB'></stop>
                  <stop offset='1' stopColor='#FFF3EB' stopOpacity='0'></stop>
                </radialGradient>
                <radialGradient
                  id='l'
                  cx='0'
                  cy='0'
                  r='1'
                  gradientUnits='userSpaceOnUse'
                  gradientTransform='rotate(90 19.614 57.107) scale(1.85149)'
                >
                  <stop offset='0.375' stopColor='#FFF4EB'></stop>
                  <stop offset='1' stopColor='#FFF3EB' stopOpacity='0'></stop>
                </radialGradient>
                <radialGradient
                  id='m'
                  cx='0'
                  cy='0'
                  r='1'
                  gradientUnits='userSpaceOnUse'
                  gradientTransform='rotate(90 17.994 54.792) scale(3.33269)'
                >
                  <stop offset='0.375' stopColor='#FFF4EB'></stop>
                  <stop offset='1' stopColor='#FFF3EB' stopOpacity='0'></stop>
                </radialGradient>
                <radialGradient
                  id='n'
                  cx='0'
                  cy='0'
                  r='1'
                  gradientUnits='userSpaceOnUse'
                  gradientTransform='rotate(90 18.41 40.212) scale(2.59209)'
                >
                  <stop offset='0.375' stopColor='#FFF4EB'></stop>
                  <stop offset='1' stopColor='#FFF3EB' stopOpacity='0'></stop>
                </radialGradient>
                <radialGradient
                  id='o'
                  cx='0'
                  cy='0'
                  r='1'
                  gradientUnits='userSpaceOnUse'
                  gradientTransform='rotate(90 14.5 33.894) scale(1.8515)'
                >
                  <stop offset='0.375' stopColor='#FFF4EB'></stop>
                  <stop offset='1' stopColor='#FFF3EB' stopOpacity='0'></stop>
                </radialGradient>
                <radialGradient
                  id='p'
                  cx='0'
                  cy='0'
                  r='1'
                  gradientUnits='userSpaceOnUse'
                  gradientTransform='rotate(90 6.63 28.386) scale(1.85149)'
                >
                  <stop offset='0.375' stopColor='#FFF4EB'></stop>
                  <stop offset='1' stopColor='#FFF3EB' stopOpacity='0'></stop>
                </radialGradient>
                <radialGradient
                  id='q'
                  cx='0'
                  cy='0'
                  r='1'
                  gradientUnits='userSpaceOnUse'
                  gradientTransform='rotate(90 16.768 45.003) scale(4.81389)'
                >
                  <stop offset='0.375' stopColor='#FFF4EB'></stop>
                  <stop offset='1' stopColor='#FFF3EB' stopOpacity='0'></stop>
                </radialGradient>
                <radialGradient
                  id='r'
                  cx='0'
                  cy='0'
                  r='1'
                  gradientUnits='userSpaceOnUse'
                  gradientTransform='rotate(90 15.194 41.855) scale(4.81389)'
                >
                  <stop offset='0.375' stopColor='#FFF4EB'></stop>
                  <stop offset='1' stopColor='#FFF3EB' stopOpacity='0'></stop>
                </radialGradient>
                <radialGradient
                  id='s'
                  cx='0'
                  cy='0'
                  r='1'
                  gradientUnits='userSpaceOnUse'
                  gradientTransform='rotate(90 15.194 44.216) scale(4.81389)'
                >
                  <stop offset='0.375' stopColor='#FFF4EB'></stop>
                  <stop offset='1' stopColor='#FFF3EB' stopOpacity='0'></stop>
                </radialGradient>
                <radialGradient
                  id='w'
                  cx='0'
                  cy='0'
                  r='1'
                  gradientUnits='userSpaceOnUse'
                  gradientTransform='rotate(90 -31.927 48.845) scale(1.8515)'
                >
                  <stop offset='0.375' stopColor='#F9DDD1'></stop>
                  <stop offset='1' stopColor='#FFF3EB' stopOpacity='0'></stop>
                </radialGradient>
                <radialGradient
                  id='x'
                  cx='0'
                  cy='0'
                  r='1'
                  gradientUnits='userSpaceOnUse'
                  gradientTransform='rotate(90 -34.681 48.452) scale(1.8515)'
                >
                  <stop offset='0.375' stopColor='#F9DDD1'></stop>
                  <stop offset='1' stopColor='#FFF3EB' stopOpacity='0'></stop>
                </radialGradient>
                <radialGradient
                  id='y'
                  cx='0'
                  cy='0'
                  r='1'
                  gradientUnits='userSpaceOnUse'
                  gradientTransform='rotate(90 -33.5 49.632) scale(1.8515)'
                >
                  <stop offset='0.375' stopColor='#F9DDD1'></stop>
                  <stop offset='1' stopColor='#FFF3EB' stopOpacity='0'></stop>
                </radialGradient>
                <radialGradient
                  id='z'
                  cx='0'
                  cy='0'
                  r='1'
                  gradientUnits='userSpaceOnUse'
                  gradientTransform='rotate(90 -32.714 51.993) scale(1.85149)'
                >
                  <stop offset='0.375' stopColor='#F9DDD1'></stop>
                  <stop offset='1' stopColor='#FFF3EB' stopOpacity='0'></stop>
                </radialGradient>
                <radialGradient
                  id='A'
                  cx='0'
                  cy='0'
                  r='1'
                  gradientUnits='userSpaceOnUse'
                  gradientTransform='rotate(90 -.845 83.075) scale(1.85149)'
                >
                  <stop offset='0.375' stopColor='#F9DDD1'></stop>
                  <stop offset='1' stopColor='#FFF3EB' stopOpacity='0'></stop>
                </radialGradient>
                <radialGradient
                  id='B'
                  cx='0'
                  cy='0'
                  r='1'
                  gradientUnits='userSpaceOnUse'
                  gradientTransform='rotate(90 .718 81.118) scale(2.2218)'
                >
                  <stop offset='0.375' stopColor='#F9DDD1'></stop>
                  <stop offset='1' stopColor='#FFF3EB' stopOpacity='0'></stop>
                </radialGradient>
                <radialGradient
                  id='C'
                  cx='0'
                  cy='0'
                  r='1'
                  gradientUnits='userSpaceOnUse'
                  gradientTransform='rotate(90 -1.25 79.151) scale(2.2218)'
                >
                  <stop offset='0.375' stopColor='#F9DDD1'></stop>
                  <stop offset='1' stopColor='#FFF3EB' stopOpacity='0'></stop>
                </radialGradient>
                <radialGradient
                  id='D'
                  cx='0'
                  cy='0'
                  r='1'
                  gradientUnits='userSpaceOnUse'
                  gradientTransform='rotate(90 -2.048 77.196) scale(2.5921)'
                >
                  <stop offset='0.375' stopColor='#F9DDD1'></stop>
                  <stop offset='1' stopColor='#FFF3EB' stopOpacity='0'></stop>
                </radialGradient>
                <radialGradient
                  id='E'
                  cx='0'
                  cy='0'
                  r='1'
                  gradientUnits='userSpaceOnUse'
                  gradientTransform='rotate(90 -31.95 50.442) scale(2.5921)'
                >
                  <stop offset='0.375' stopColor='#F9DDD1'></stop>
                  <stop offset='1' stopColor='#FFF3EB' stopOpacity='0'></stop>
                </radialGradient>
                <radialGradient
                  id='F'
                  cx='0'
                  cy='0'
                  r='1'
                  gradientUnits='userSpaceOnUse'
                  gradientTransform='rotate(111.038 9.116 68.506) scale(5.48002)'
                >
                  <stop stopColor='#FDF7F2'></stop>
                  <stop offset='1' stopColor='#FFD8BD'></stop>
                </radialGradient>
                <linearGradient
                  id='t'
                  x1='59.803'
                  y1='88.918'
                  x2='33.764'
                  y2='21.046'
                  gradientUnits='userSpaceOnUse'
                >
                  <stop stopColor='#E0B1CC'></stop>
                  <stop offset='0.431' stopColor='#FFF1F1'></stop>
                  <stop offset='1' stopColor='#FFC9A5'></stop>
                </linearGradient>
                <linearGradient
                  id='u'
                  x1='59.803'
                  y1='53.115'
                  x2='83.41'
                  y2='53.115'
                  gradientUnits='userSpaceOnUse'
                >
                  <stop stopColor='#D16AE9'></stop>
                  <stop offset='1' stopColor='#FF661D'></stop>
                </linearGradient>
                <linearGradient
                  id='v'
                  x1='18.111'
                  y1='36.984'
                  x2='75.136'
                  y2='85.621'
                  gradientUnits='userSpaceOnUse'
                >
                  <stop stopColor='#FF661D'></stop>
                  <stop offset='0.5' stopColor='#CE3A00'></stop>
                  <stop offset='1' stopColor='#A60A5E'></stop>
                </linearGradient>
              </defs>
            </svg>
            <S.PopCornBox>
              <S.PopCornTextBox>
                <S.PopCornTitle>
                  7000원이면 만날 수 있는 넷플릭스.
                </S.PopCornTitle>
                <S.PopCornText>
                  가장 경제적인 광고형 멤버십을 이용해 보세요.
                </S.PopCornText>
              </S.PopCornTextBox>
              <a href='https://www.netflix.com/kr/ads-plan'>
                <S.PopCornBtn>자세히 알아보기</S.PopCornBtn>
              </a>
            </S.PopCornBox>
          </S.PopCornWrapper>
          <S.ContentWrapper>
            <S.ContentTitle>지금 뜨는 콘텐츠</S.ContentTitle>
            <TrendingMovieList />
          </S.ContentWrapper>
          <S.ContentWrapper>
            <S.ContentTitle>가입해야 하는 또 다른 이유</S.ContentTitle>
            <S.ReasonContainer>
              <S.ReasonBox>
                <S.ReasonTitle>TV로 즐기세요</S.ReasonTitle>
                <S.ReasonText>
                  스마트 TV, PlayStation, Xbox, Chromecast, Apple TV, 블루레이
                  플레이어 등 다양한 디바이스에서 시청하세요.
                </S.ReasonText>
                <svg width='72' height='72' viewBox='0 0 72 72' fill='none'>
                  <g id='television-core-small'>
                    <path
                      id='Vector'
                      fillRule='evenodd'
                      clipRule='evenodd'
                      d='M37.2 53.3992C37.2 52.7365 36.6628 52.1992 36 52.1992H34.8C34.1373 52.1992 33.6 52.7365 33.6 53.3992V56.2636C33.6 56.9129 33.0834 57.4433 32.4347 57.4739C30.3013 57.5744 28.1719 57.7834 26.0546 58.1011L19.444 59.0926C18.2692 59.2688 17.4 60.2782 17.4 61.4662V62.0992C17.4 62.4304 17.6686 62.6992 18 62.6992H52.8C53.1314 62.6992 53.4 62.4304 53.4 62.0992V61.4662C53.4 60.2782 52.5309 59.2688 51.3561 59.0926L44.7454 58.1011C42.6282 57.7834 40.4987 57.5744 38.3653 57.4739C37.7167 57.4433 37.2 56.9129 37.2 56.2636V53.3992Z'
                      fill='url(#paint0_radial_5179_1308)'
                    ></path>
                    <path
                      id='Vector_2'
                      d='M18.6 60.7388C18.6 60.2306 18.9587 59.796 19.4602 59.711C22.0196 59.2775 29.7585 58.0508 35.4 58.0508C41.0415 58.0508 48.7804 59.2775 51.3398 59.711C51.8412 59.796 52.2 60.2306 52.2 60.7388C52.2 60.902 52.0575 61.0268 51.8967 61.0004C50.1219 60.707 40.9704 59.2409 35.4 59.2409C29.8295 59.2409 20.678 60.707 18.9033 61.0004C18.7425 61.0268 18.6 60.902 18.6 60.7388Z'
                      fill='url(#paint1_radial_5179_1308)'
                    ></path>
                    <path
                      id='Vector_3'
                      d='M63 12H8.99995C8.00584 12 7.19995 12.8059 7.19995 13.8V51.6C7.19995 52.5941 8.00584 53.4 8.99995 53.4H63C63.9941 53.4 64.8 52.5941 64.8 51.6V13.8C64.8 12.8059 63.9941 12 63 12Z'
                      fill='url(#paint2_linear_5179_1308)'
                    ></path>
                    <path
                      id='Vector_4'
                      d='M63 12H8.99995C8.00584 12 7.19995 12.8059 7.19995 13.8V51.6C7.19995 52.5941 8.00584 53.4 8.99995 53.4H63C63.9941 53.4 64.8 52.5941 64.8 51.6V13.8C64.8 12.8059 63.9941 12 63 12Z'
                      fill='url(#paint3_radial_5179_1308)'
                    ></path>
                    <path
                      id='Vector_5'
                      fillRule='evenodd'
                      clipRule='evenodd'
                      d='M8.99995 12.6H63C63.663 12.6 64.2 13.1372 64.2 13.8V50.4H7.79995V13.8C7.79995 13.1372 8.33719 12.6 8.99995 12.6ZM7.19995 50.4V13.8C7.19995 12.8059 8.00581 12 8.99995 12H63C63.9942 12 64.8 12.8059 64.8 13.8V50.4V51.6C64.8 52.5941 63.9942 53.4 63 53.4H8.99995C8.00581 53.4 7.19995 52.5941 7.19995 51.6V50.4Z'
                      fill='url(#paint4_radial_5179_1308)'
                    ></path>
                    <path
                      id='Vector_6'
                      d='M35.4 52.8C36.3941 52.8 37.2 52.3971 37.2 51.9C37.2 51.4029 36.3941 51 35.4 51C34.4059 51 33.6 51.4029 33.6 51.9C33.6 52.3971 34.4059 52.8 35.4 52.8Z'
                      fill='url(#paint5_radial_5179_1308)'
                    ></path>
                  </g>
                  <defs>
                    <radialGradient
                      id='paint0_radial_5179_1308'
                      cx='0'
                      cy='0'
                      r='1'
                      gradientUnits='userSpaceOnUse'
                      gradientTransform='translate(50.3269 49.3723) rotate(118.526) scale(55.1579 46.2871)'
                    >
                      <stop stopColor='#802600'></stop>
                      <stop offset='0.333333' stopColor='#6F181D'></stop>
                      <stop offset='0.666667' stopColor='#5B1333'></stop>
                      <stop offset='1' stopColor='#391945'></stop>
                    </radialGradient>
                    <radialGradient
                      id='paint1_radial_5179_1308'
                      cx='0'
                      cy='0'
                      r='1'
                      gradientUnits='userSpaceOnUse'
                      gradientTransform='translate(48.1077 53.6128) rotate(158.116) scale(32.7275 42.219)'
                    >
                      <stop stopColor='#99421D'></stop>
                      <stop offset='0.333333' stopColor='#99161D'></stop>
                      <stop offset='0.666667' stopColor='#7D1845'></stop>
                      <stop offset='1' stopColor='#59216E'></stop>
                    </radialGradient>
                    <linearGradient
                      id='paint2_linear_5179_1308'
                      x1='10.4727'
                      y1='14.9572'
                      x2='56.1755'
                      y2='51.4814'
                      gradientUnits='userSpaceOnUse'
                    >
                      <stop stopColor='#99161D'></stop>
                      <stop offset='0.245283' stopColor='#CA005B'></stop>
                      <stop offset='0.346698' stopColor='#FF479A'></stop>
                      <stop offset='0.46934' stopColor='#CC3CFF'></stop>
                      <stop offset='0.735849' stopColor='#BC1A22'></stop>
                      <stop offset='1' stopColor='#C94FF5'></stop>
                    </linearGradient>
                    <radialGradient
                      id='paint3_radial_5179_1308'
                      cx='0'
                      cy='0'
                      r='1'
                      gradientUnits='userSpaceOnUse'
                      gradientTransform='translate(38.6181 23.8286) rotate(90) scale(25.9571 25.8545)'
                    >
                      <stop stopColor='#1C0E20' stopOpacity='0'></stop>
                      <stop offset='1' stopColor='#1C0E20'></stop>
                    </radialGradient>
                    <radialGradient
                      id='paint4_radial_5179_1308'
                      cx='0'
                      cy='0'
                      r='1'
                      gradientUnits='userSpaceOnUse'
                      gradientTransform='translate(54 20.1938) rotate(144.293) scale(47.2897 44.8232)'
                    >
                      <stop stopColor='#EF7744'></stop>
                      <stop offset='0.333333' stopColor='#E50914'></stop>
                      <stop offset='0.666667' stopColor='#A70D53'></stop>
                      <stop offset='1' stopColor='#792A95'></stop>
                    </radialGradient>
                    <radialGradient
                      id='paint5_radial_5179_1308'
                      cx='0'
                      cy='0'
                      r='1'
                      gradientUnits='userSpaceOnUse'
                      gradientTransform='translate(36.525 51.3562) rotate(135) scale(4.58735)'
                    >
                      <stop stopColor='#FFDCCC'></stop>
                      <stop offset='0.333333' stopColor='#FFBDC0'></stop>
                      <stop offset='0.666667' stopColor='#F89DC6'></stop>
                      <stop offset='1' stopColor='#E4A1FA'></stop>
                    </radialGradient>
                  </defs>
                </svg>
              </S.ReasonBox>
              <S.ReasonBox>
                <S.ReasonTitle>
                  즐겨 보는 콘텐츠를 저장해 오프라인으로 시청하세요
                </S.ReasonTitle>
                <S.ReasonText>
                  간편하게 저장하고 빈틈없이 즐겨보세요.
                </S.ReasonText>
                <svg width='72' height='72' viewBox='0 0 72 72' fill='none'>
                  <g id='download-core-small'>
                    <path
                      id='Vector'
                      d='M36 70.2008C54.8882 70.2008 70.2001 54.8889 70.2001 36.0008C70.2001 17.1126 54.8882 1.80078 36 1.80078C17.1119 1.80078 1.80005 17.1126 1.80005 36.0008C1.80005 54.8889 17.1119 70.2008 36 70.2008Z'
                      fill='url(#paint0_radial_5179_7940)'
                    ></path>
                    <path
                      id='Vector_2'
                      opacity='0.4'
                      d='M64.7658 36.195C65.5206 51.5916 53.7908 63.5824 38.5668 62.977C23.3428 62.3722 10.3893 49.4 9.63446 34.0034C8.87954 18.6068 20.6091 6.61594 35.8331 7.22116C51.0571 7.82638 64.0104 20.7984 64.7658 36.195Z'
                      fill='url(#paint1_radial_5179_7940)'
                    ></path>
                    <path
                      id='Vector_3'
                      d='M62.3657 37.9958C63.1205 53.3924 51.3908 65.3832 36.1668 64.7778C20.9428 64.173 7.9893 51.2008 7.23444 35.8041C6.47952 20.4075 18.2091 8.41672 33.4331 9.02194C48.6571 9.62716 61.6103 22.5992 62.3657 37.9958Z'
                      fill='url(#paint2_radial_5179_7940)'
                    ></path>
                    <path
                      id='Vector_4'
                      opacity='0.5'
                      d='M64.7658 36.195C65.5206 51.5916 53.7908 63.5824 38.5668 62.977C23.3428 62.3722 10.3893 49.4 9.63446 34.0034C8.87954 18.6068 20.6091 6.61594 35.8331 7.22116C51.0571 7.82638 64.0104 20.7984 64.7658 36.195Z'
                      fill='url(#paint3_radial_5179_7940)'
                    ></path>
                    <path
                      id='Vector_5'
                      opacity='0.6'
                      d='M36.9 60.6C48.6636 60.6 58.2 51.0637 58.2 39.3C58.2 27.5363 48.6636 18 36.9 18C25.1363 18 15.6 27.5363 15.6 39.3C15.6 51.0637 25.1363 60.6 36.9 60.6Z'
                      fill='url(#paint4_radial_5179_7940)'
                    ></path>
                    <path
                      id='Vector_6'
                      fillRule='evenodd'
                      clipRule='evenodd'
                      d='M39.0849 42.2727L46.3387 35.76L48.8945 38.5142L38.9118 47.477L37.8466 48.4333L36.6071 47.477L24.9899 38.5142L27.0434 35.76L35.4849 42.2727L33.6 21.6016H37.2L39.0849 42.2727Z'
                      fill='url(#paint5_radial_5179_7940)'
                    ></path>
                    <path
                      id='Vector_7'
                      opacity='0.4'
                      fillRule='evenodd'
                      clipRule='evenodd'
                      d='M61.6566 34.9618C61.7832 35.3893 62.391 35.3233 62.3694 34.878C61.6962 21.1369 50.1509 9.55975 36.5817 9.01957C34.4606 8.93515 32.4155 9.12541 30.4772 9.55909C30.0745 9.64915 30.1575 10.2082 30.5697 10.2246C45.0094 10.7979 57.6246 21.2971 61.6566 34.9618Z'
                      fill='url(#paint6_radial_5179_7940)'
                    ></path>
                  </g>
                  <defs>
                    <radialGradient
                      id='paint0_radial_5179_7940'
                      cx='0'
                      cy='0'
                      r='1'
                      gradientUnits='userSpaceOnUse'
                      gradientTransform='translate(36.0001 36.1837) rotate(-90) scale(34.3829)'
                    >
                      <stop offset='0.782019' stopColor='#982DBE'></stop>
                      <stop
                        offset='0.906819'
                        stopColor='#B038DC'
                        stopOpacity='0.2'
                      ></stop>
                      <stop
                        offset='1'
                        stopColor='#E4A1FA'
                        stopOpacity='0'
                      ></stop>
                    </radialGradient>
                    <radialGradient
                      id='paint1_radial_5179_7940'
                      cx='0'
                      cy='0'
                      r='1'
                      gradientUnits='userSpaceOnUse'
                      gradientTransform='translate(52.9937 20.0992) rotate(135) scale(49.9836)'
                    >
                      <stop stopColor='#FFDCCC'></stop>
                      <stop offset='0.333333' stopColor='#FFBDC0'></stop>
                      <stop offset='0.666667' stopColor='#F89DC6'></stop>
                      <stop offset='1' stopColor='#E4A1FA'></stop>
                    </radialGradient>
                    <radialGradient
                      id='paint2_radial_5179_7940'
                      cx='0'
                      cy='0'
                      r='1'
                      gradientUnits='userSpaceOnUse'
                      gradientTransform='translate(52.7999 19.6937) rotate(135) scale(53.1037)'
                    >
                      <stop stopColor='#FFA984'></stop>
                      <stop offset='0.333333' stopColor='#FF787F'></stop>
                      <stop offset='0.666667' stopColor='#F45FA2'></stop>
                      <stop offset='1' stopColor='#C44AF1'></stop>
                    </radialGradient>
                    <radialGradient
                      id='paint3_radial_5179_7940'
                      cx='0'
                      cy='0'
                      r='1'
                      gradientUnits='userSpaceOnUse'
                      gradientTransform='translate(52.9937 20.0992) rotate(135) scale(49.9836)'
                    >
                      <stop stopColor='#FFDCCC'></stop>
                      <stop offset='0.333333' stopColor='#FFBDC0'></stop>
                      <stop offset='0.666667' stopColor='#F89DC6'></stop>
                      <stop offset='1' stopColor='#E4A1FA'></stop>
                    </radialGradient>
                    <radialGradient
                      id='paint4_radial_5179_7940'
                      cx='0'
                      cy='0'
                      r='1'
                      gradientUnits='userSpaceOnUse'
                      gradientTransform='translate(36.9 39.3) scale(21.3)'
                    >
                      <stop stopColor='white'></stop>
                      <stop offset='1' stopColor='white' stopOpacity='0'></stop>
                    </radialGradient>
                    <radialGradient
                      id='paint5_radial_5179_7940'
                      cx='0'
                      cy='0'
                      r='1'
                      gradientUnits='userSpaceOnUse'
                      gradientTransform='translate(31.2 32.1016) rotate(39.5226) scale(15.5567)'
                    >
                      <stop stopColor='#EF7744'></stop>
                      <stop offset='0.2406' stopColor='#E50914'></stop>
                      <stop offset='1' stopColor='#792A95'></stop>
                    </radialGradient>
                    <radialGradient
                      id='paint6_radial_5179_7940'
                      cx='0'
                      cy='0'
                      r='1'
                      gradientUnits='userSpaceOnUse'
                      gradientTransform='translate(50.7 21.3) rotate(-180) scale(30)'
                    >
                      <stop stopColor='white'></stop>
                      <stop offset='1' stopColor='white' stopOpacity='0'></stop>
                    </radialGradient>
                  </defs>
                </svg>
              </S.ReasonBox>
              <S.ReasonBox>
                <S.ReasonTitle>다양한 디바이스로 시청하세요</S.ReasonTitle>
                <S.ReasonText>
                  각종 영화와 시리즈를 스마트폰, 태블릿, 노트북, TV에서
                  무제한으로 스트리밍하세요.
                </S.ReasonText>
                <svg width='72' height='72' viewBox='0 0 72 72' fill='none'>
                  <g id='telescope-core-small'>
                    <path
                      id='Vector'
                      d='M24.0492 36.6016L33.6 46.3898L17.8029 56.8633C17.8029 56.8633 15.8891 57.6983 13.625 55.2638C11.361 52.8293 12.1235 51.238 12.1235 51.238L24.0492 36.6016Z'
                      fill='url(#paint0_radial_5179_1664)'
                    ></path>
                    <path
                      id='Vector_2'
                      d='M25.0344 34.1992L36 46.151L25.0616 53.8043C25.0616 53.8043 21.8289 55.0984 18.0987 51.0172C14.3686 46.9358 15.9198 44.5105 15.9198 44.5105L25.0344 34.1992Z'
                      fill='url(#paint1_radial_5179_1664)'
                    ></path>
                    <path
                      id='Vector_3'
                      d='M39 13.0195L59.1 33.6788L32.5325 50.4142C32.5325 50.4142 28.7459 50.2552 24.3978 45.4897C20.0498 40.7243 21.4096 35.8101 21.4096 35.8101L39 13.0195Z'
                      fill='url(#paint2_radial_5179_1664)'
                    ></path>
                    <path
                      id='Vector_4'
                      d='M57.6709 15.3516C63.1044 21.2807 63.9858 29.2883 59.6386 33.2371C55.2916 37.186 47.3628 35.5806 41.9292 29.6515C36.4954 23.7224 35.6145 15.7148 39.9615 11.766C44.3084 7.81716 52.2372 9.42252 57.6709 15.3516Z'
                      fill='url(#paint3_radial_5179_1664)'
                    ></path>
                    <path
                      id='Vector_5'
                      d='M58.3787 31.255C54.8121 34.5032 48.2143 33.0817 43.6421 28.0798C39.07 23.078 38.2547 16.39 41.8213 13.1419C45.3879 9.89364 51.9857 11.3152 56.5579 16.3171C61.1298 21.3189 61.9452 28.0069 58.3787 31.255Z'
                      fill='url(#paint4_radial_5179_1664)'
                    ></path>
                    <path
                      id='Vector_6'
                      opacity='0.85'
                      d='M59.6783 28.823C60.576 24.1785 59.6544 20.5934 56.1603 16.6199C52.6662 12.6464 47.3508 10.8657 43.7796 12.7598C39.371 15.098 48.3734 13.5961 53.4577 19.5815C57.8259 24.724 58.8516 33.1009 59.6783 28.823Z'
                      fill='url(#paint5_radial_5179_1664)'
                    ></path>
                    <path
                      id='Vector_7'
                      opacity='0.4'
                      d='M50.3979 25.2452C50.4549 26.7239 49.2932 27.7677 47.8032 27.5766C46.3131 27.3856 45.059 26.032 45.002 24.5532C44.945 23.0745 46.1067 22.0307 47.5968 22.2218C49.0868 22.4128 50.341 23.7664 50.3979 25.2452Z'
                      fill='url(#paint6_radial_5179_1664)'
                    ></path>
                    <path
                      id='Vector_8'
                      opacity='0.6'
                      d='M36.9217 21.0039L26.4258 34.3627C26.3297 36.4604 28.2903 39.5534 30.0334 40.8344L41.2345 29.9105C39.6 28.2005 36.9591 24.1025 36.9217 21.0039Z'
                      fill='url(#paint7_radial_5179_1664)'
                    ></path>
                    <path
                      id='Vector_9'
                      fillRule='evenodd'
                      clipRule='evenodd'
                      d='M20.0576 9.60156L21.479 11.7187L24 11.0654L22.3575 13.0272L23.7789 15.1444L21.3424 14.2397L19.7 16.2016L19.8365 13.6806L17.4 12.7759L19.9209 12.1225L20.0576 9.60156ZM58.776 52.8016L58.9623 56.4685L62.4 57.4188L59.0774 58.7347L59.2637 62.4016L57.0239 59.548L53.7014 60.8638L55.6397 57.7843L53.4 54.9307L56.8377 55.8811L58.776 52.8016ZM15.206 24.2101L15.8768 21.0016L13.4793 23.1964L10.6853 21.5563L11.9975 24.553L9.59998 26.7478L12.8085 26.405L14.1207 29.4016L14.7915 26.1931L18 25.8502L15.206 24.2101Z'
                      fill='url(#paint8_linear_5179_1664)'
                    ></path>
                  </g>
                  <defs>
                    <radialGradient
                      id='paint0_radial_5179_1664'
                      cx='0'
                      cy='0'
                      r='1'
                      gradientUnits='userSpaceOnUse'
                      gradientTransform='translate(36.6875 32.7016) rotate(135) scale(34.9134)'
                    >
                      <stop stopColor='#99421D'></stop>
                      <stop offset='0.333333' stopColor='#99161D'></stop>
                      <stop offset='0.666667' stopColor='#7D1845'></stop>
                      <stop offset='1' stopColor='#59216E'></stop>
                    </radialGradient>
                    <radialGradient
                      id='paint1_radial_5179_1664'
                      cx='0'
                      cy='0'
                      r='1'
                      gradientUnits='userSpaceOnUse'
                      gradientTransform='translate(42.5937 27.2992) rotate(135) scale(44.5477 44.5279)'
                    >
                      <stop stopColor='#EF7744'></stop>
                      <stop offset='0.333333' stopColor='#E50914'></stop>
                      <stop offset='0.666667' stopColor='#A70D53'></stop>
                      <stop offset='1' stopColor='#792A95'></stop>
                    </radialGradient>
                    <radialGradient
                      id='paint2_radial_5179_1664'
                      cx='0'
                      cy='0'
                      r='1'
                      gradientUnits='userSpaceOnUse'
                      gradientTransform='translate(42.3 29.106) rotate(135) scale(31.8127)'
                    >
                      <stop stopColor='#FB540D'></stop>
                      <stop offset='0.333333' stopColor='#E50914'></stop>
                      <stop offset='0.666667' stopColor='#A70D53'></stop>
                      <stop offset='1' stopColor='#792A95'></stop>
                    </radialGradient>
                    <radialGradient
                      id='paint3_radial_5179_1664'
                      cx='0'
                      cy='0'
                      r='1'
                      gradientUnits='userSpaceOnUse'
                      gradientTransform='translate(57.675 14.7078) rotate(134.326) scale(24.0433 24.0367)'
                    >
                      <stop stopColor='#FFDCCC'></stop>
                      <stop offset='0.333333' stopColor='#FFBDC0'></stop>
                      <stop offset='0.666667' stopColor='#F89DC6'></stop>
                      <stop offset='1' stopColor='#E4A1FA'></stop>
                    </radialGradient>
                    <radialGradient
                      id='paint4_radial_5179_1664'
                      cx='0'
                      cy='0'
                      r='1'
                      gradientUnits='userSpaceOnUse'
                      gradientTransform='translate(52.1305 21.273) rotate(141.875) scale(9.87138 12.8159)'
                    >
                      <stop offset='0.307292' stopColor='#F89DC6'></stop>
                      <stop offset='0.645392' stopColor='#E75094'></stop>
                      <stop offset='1' stopColor='#59216E'></stop>
                    </radialGradient>
                    <radialGradient
                      id='paint5_radial_5179_1664'
                      cx='0'
                      cy='0'
                      r='1'
                      gradientUnits='userSpaceOnUse'
                      gradientTransform='translate(55.8 15.6) rotate(135) scale(13.1522)'
                    >
                      <stop stopColor='white'></stop>
                      <stop offset='1' stopColor='white' stopOpacity='0'></stop>
                    </radialGradient>
                    <radialGradient
                      id='paint6_radial_5179_1664'
                      cx='0'
                      cy='0'
                      r='1'
                      gradientUnits='userSpaceOnUse'
                      gradientTransform='translate(49.2362 22.9648) rotate(131.079) scale(5.08644 6.006)'
                    >
                      <stop stopColor='white'></stop>
                      <stop offset='1' stopColor='white' stopOpacity='0'></stop>
                    </radialGradient>
                    <radialGradient
                      id='paint7_radial_5179_1664'
                      cx='0'
                      cy='0'
                      r='1'
                      gradientUnits='userSpaceOnUse'
                      gradientTransform='translate(36.8758 29.1353) rotate(137.622) scale(13.5764)'
                    >
                      <stop stopColor='#FFA984'></stop>
                      <stop
                        offset='1'
                        stopColor='#F7636B'
                        stopOpacity='0'
                      ></stop>
                    </radialGradient>
                    <linearGradient
                      id='paint8_linear_5179_1664'
                      x1='44.65'
                      y1='27.9016'
                      x2='24.25'
                      y2='48.3016'
                      gradientUnits='userSpaceOnUse'
                    >
                      <stop stopColor='#EF7744'></stop>
                      <stop offset='0.333333' stopColor='#E50914'></stop>
                      <stop offset='0.666667' stopColor='#A70D53'></stop>
                      <stop offset='1' stopColor='#792A95'></stop>
                    </linearGradient>
                  </defs>
                </svg>
              </S.ReasonBox>
              <S.ReasonBox>
                <S.ReasonTitle>
                  어린이 전용 프로필을 만들어 보세요
                </S.ReasonTitle>
                <S.ReasonText>
                  자기만의 공간에서 좋아하는 캐릭터와 즐기는 신나는 모험.
                  자녀에게 이 특별한 경험을 선물하세요. 넷플릭스 회원이라면
                  무료입니다.
                </S.ReasonText>
                <svg width='72' height='72' viewBox='0 0 72 72' fill='none'>
                  <g id='profiles-core-small'>
                    <path
                      id='Vector'
                      d='M10.8 15.6008C10.8 12.9499 12.949 10.8008 15.5999 10.8008H40.8C43.4509 10.8008 45.6 12.9498 45.6 15.6008V40.8007C45.6 43.4516 43.4509 45.6007 40.8 45.6007H15.6C12.949 45.6007 10.8 43.4517 10.8 40.8007V15.6008Z'
                      fill='url(#paint0_radial_5179_7919)'
                    ></path>
                    <path
                      id='Vector_2'
                      d='M9.59998 14.4016C9.59998 11.7506 11.749 9.60162 14.4 9.60156H39.6C42.251 9.60156 44.4 11.7506 44.4 14.4016V39.6015C44.4 42.2525 42.251 44.4015 39.6 44.4015H14.4C11.749 44.4016 9.59998 42.2525 9.59998 39.6015V14.4016Z'
                      fill='url(#paint1_radial_5179_7919)'
                    ></path>
                    <path
                      id='Vector_3'
                      d='M18.6 21.9008C18.6 23.0606 17.6598 24.0008 16.5 24.0008C15.3402 24.0008 14.4 23.0606 14.4 21.9008C14.4 20.741 15.3402 19.8008 16.5 19.8008C17.6598 19.8008 18.6 20.741 18.6 21.9008Z'
                      fill='url(#paint2_radial_5179_7919)'
                    ></path>
                    <path
                      id='Vector_4'
                      d='M39.6 21.9008C39.6 23.0606 38.6598 24.0008 37.5 24.0008C36.3402 24.0008 35.4 23.0606 35.4 21.9008C35.4 20.741 36.3402 19.8008 37.5 19.8008C38.6598 19.8008 39.6 20.741 39.6 21.9008Z'
                      fill='url(#paint3_radial_5179_7919)'
                    ></path>
                    <path
                      id='Vector_5'
                      d='M23.6713 29.4501C23.2437 29.1967 22.6917 29.3379 22.4383 29.7655C22.1848 30.1932 22.3261 30.7452 22.7537 30.9986C23.8254 31.6337 26.769 32.7744 30.6375 32.7744C34.506 32.7744 37.4497 31.6337 38.5213 30.9986C38.949 30.7452 39.0902 30.1932 38.8368 29.7655C38.5834 29.3379 38.0313 29.1967 37.6037 29.4501C36.8191 29.9151 34.194 30.9744 30.6375 30.9744C27.081 30.9744 24.456 29.9151 23.6713 29.4501Z'
                      fill='url(#paint4_radial_5179_7919)'
                    ></path>
                    <path
                      id='Vector_6'
                      opacity='0.35'
                      d='M19.2 44.4016H28.2L32.4 27.6016C30.2787 28.1801 28.4542 29.5387 27.2921 31.4053L19.2 44.4016Z'
                      fill='url(#paint5_radial_5179_7919)'
                    ></path>
                    <path
                      id='Vector_7'
                      d='M27.6 32.4016C27.6 29.7506 29.749 27.6016 32.4 27.6016L57.6 27.6016C60.2508 27.6016 62.4 29.7506 62.4 32.4016V57.6015C62.4 60.2524 60.2508 62.4016 57.6 62.4016H32.4C29.749 62.4016 27.6 60.2524 27.6 57.6016V32.4016Z'
                      fill='url(#paint6_radial_5179_7919)'
                    ></path>
                    <path
                      id='Vector_8'
                      d='M36.6 39.9008C36.6 41.0606 35.6598 42.0008 34.5 42.0008C33.3402 42.0008 32.4 41.0606 32.4 39.9008C32.4 38.741 33.3402 37.8008 34.5 37.8008C35.6598 37.8008 36.6 38.741 36.6 39.9008Z'
                      fill='url(#paint7_radial_5179_7919)'
                    ></path>
                    <path
                      id='Vector_9'
                      d='M57.6 39.9008C57.6 41.0606 56.6598 42.0008 55.5 42.0008C54.3402 42.0008 53.4 41.0606 53.4 39.9008C53.4 38.741 54.3402 37.8008 55.5 37.8008C56.6598 37.8008 57.6 38.741 57.6 39.9008Z'
                      fill='url(#paint8_radial_5179_7919)'
                    ></path>
                    <path
                      id='Vector_10'
                      d='M41.8213 47.6025C41.3937 47.349 40.8416 47.4903 40.5882 47.9179C40.3348 48.3455 40.476 48.8976 40.9037 49.1509C41.9753 49.786 44.919 50.9267 48.7875 50.9267C52.656 50.9267 55.5996 49.786 56.6713 49.1509C57.0989 48.8976 57.2402 48.3455 56.9867 47.9179C56.7333 47.4903 56.1813 47.349 55.7537 47.6025C54.969 48.0674 52.344 49.1267 48.7875 49.1267C45.231 49.1267 42.6059 48.0674 41.8213 47.6025Z'
                      fill='url(#paint9_radial_5179_7919)'
                    ></path>
                  </g>
                  <defs>
                    <radialGradient
                      id='paint0_radial_5179_7919'
                      cx='0'
                      cy='0'
                      r='1'
                      gradientUnits='userSpaceOnUse'
                      gradientTransform='translate(39.075 17.6882) rotate(135) scale(32.8097)'
                    >
                      <stop stopColor='#99421D'></stop>
                      <stop offset='0.333333' stopColor='#99161D'></stop>
                      <stop offset='0.666667' stopColor='#7D1845'></stop>
                      <stop offset='1' stopColor='#59216E'></stop>
                    </radialGradient>
                    <radialGradient
                      id='paint1_radial_5179_7919'
                      cx='0'
                      cy='0'
                      r='1'
                      gradientUnits='userSpaceOnUse'
                      gradientTransform='translate(62.4 8.70157) rotate(133.87) scale(75.3216)'
                    >
                      <stop stopColor='#FFDCCC'></stop>
                      <stop offset='0.333333' stopColor='#FFBDC0'></stop>
                      <stop offset='0.666667' stopColor='#F89DC6'></stop>
                      <stop offset='1' stopColor='#E4A1FA'></stop>
                    </radialGradient>
                    <radialGradient
                      id='paint2_radial_5179_7919'
                      cx='0'
                      cy='0'
                      r='1'
                      gradientUnits='userSpaceOnUse'
                      gradientTransform='translate(60.3 11.1008) rotate(133.939) scale(68.7426 55.9547)'
                    >
                      <stop stopColor='#99421D'></stop>
                      <stop offset='0.333333' stopColor='#99161D'></stop>
                      <stop offset='0.666667' stopColor='#7D1845'></stop>
                      <stop offset='1' stopColor='#59216E'></stop>
                    </radialGradient>
                    <radialGradient
                      id='paint3_radial_5179_7919'
                      cx='0'
                      cy='0'
                      r='1'
                      gradientUnits='userSpaceOnUse'
                      gradientTransform='translate(60.3 11.1008) rotate(133.939) scale(68.7426 55.9547)'
                    >
                      <stop stopColor='#99421D'></stop>
                      <stop offset='0.333333' stopColor='#99161D'></stop>
                      <stop offset='0.666667' stopColor='#7D1845'></stop>
                      <stop offset='1' stopColor='#59216E'></stop>
                    </radialGradient>
                    <radialGradient
                      id='paint4_radial_5179_7919'
                      cx='0'
                      cy='0'
                      r='1'
                      gradientUnits='userSpaceOnUse'
                      gradientTransform='translate(60.3 11.0994) rotate(133.939) scale(68.7426 55.9548)'
                    >
                      <stop stopColor='#99421D'></stop>
                      <stop offset='0.333333' stopColor='#99161D'></stop>
                      <stop offset='0.666667' stopColor='#7D1845'></stop>
                      <stop offset='1' stopColor='#59216E'></stop>
                    </radialGradient>
                    <radialGradient
                      id='paint5_radial_5179_7919'
                      cx='0'
                      cy='0'
                      r='1'
                      gradientUnits='userSpaceOnUse'
                      gradientTransform='translate(39.6 27.9016) rotate(135) scale(23.3345)'
                    >
                      <stop stopColor='#FFA984'></stop>
                      <stop offset='0.333333' stopColor='#FF787F'></stop>
                      <stop offset='0.666667' stopColor='#F45FA2'></stop>
                      <stop offset='1' stopColor='#C44AF1'></stop>
                    </radialGradient>
                    <radialGradient
                      id='paint6_radial_5179_7919'
                      cx='0'
                      cy='0'
                      r='1'
                      gradientUnits='userSpaceOnUse'
                      gradientTransform='translate(61.8 29.7016) rotate(135) scale(43.2749)'
                    >
                      <stop stopColor='#EF7744'></stop>
                      <stop offset='0.333333' stopColor='#E50914'></stop>
                      <stop offset='0.666667' stopColor='#A70D53'></stop>
                      <stop offset='1' stopColor='#792A95'></stop>
                    </radialGradient>
                    <radialGradient
                      id='paint7_radial_5179_7919'
                      cx='0'
                      cy='0'
                      r='1'
                      gradientUnits='userSpaceOnUse'
                      gradientTransform='translate(62.1 11.1008) rotate(137.146) scale(73.6614 60.3576)'
                    >
                      <stop stopColor='#FFDCCC'></stop>
                      <stop offset='0.333333' stopColor='#FDF6F6'></stop>
                      <stop offset='0.666667' stopColor='#FADCE9'></stop>
                      <stop offset='1' stopColor='#E4A1FA'></stop>
                    </radialGradient>
                    <radialGradient
                      id='paint8_radial_5179_7919'
                      cx='0'
                      cy='0'
                      r='1'
                      gradientUnits='userSpaceOnUse'
                      gradientTransform='translate(62.1 11.1008) rotate(137.146) scale(73.6614 60.3576)'
                    >
                      <stop stopColor='#FFDCCC'></stop>
                      <stop offset='0.333333' stopColor='#FDF6F6'></stop>
                      <stop offset='0.666667' stopColor='#FADCE9'></stop>
                      <stop offset='1' stopColor='#E4A1FA'></stop>
                    </radialGradient>
                    <radialGradient
                      id='paint9_radial_5179_7919'
                      cx='0'
                      cy='0'
                      r='1'
                      gradientUnits='userSpaceOnUse'
                      gradientTransform='translate(62.1 11.1017) rotate(137.146) scale(73.6614 60.3576)'
                    >
                      <stop stopColor='#FFDCCC'></stop>
                      <stop offset='0.333333' stopColor='#FDF6F6'></stop>
                      <stop offset='0.666667' stopColor='#FADCE9'></stop>
                      <stop offset='1' stopColor='#E4A1FA'></stop>
                    </radialGradient>
                  </defs>
                </svg>
              </S.ReasonBox>
            </S.ReasonContainer>
          </S.ContentWrapper>
          <S.ContentWrapper>
            <S.ContentTitle>자주 묻는 질문</S.ContentTitle>
            <S.FAQContainer>
              {faqData.map((item) => {
                const isOpen = openDataId === item.id;
                return (
                  <S.FAQWrapper key={item.id}>
                    <S.FAQBox
                      onClick={() => onToggle(item.id)}
                      $isOpen={isOpen}
                    >
                      {item.question}
                      <svg
                        viewBox='0 0 36 36'
                        width='36'
                        height='36'
                        data-icon='PlusLarge'
                        data-icon-id=':rd:'
                        aria-hidden='true'
                        className='default-ltr-iqcdef-cache-13aq2ch e164gv2o4'
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        role='img'
                      >
                        <path
                          fillRule='evenodd'
                          clipRule='evenodd'
                          d='M17 17V3H19V17H33V19H19V33H17V19H3V17H17Z'
                          fill='currentColor'
                        ></path>
                      </svg>
                    </S.FAQBox>
                    <S.FAQContent $isOpen={isOpen}>
                      {item.answer}
                      {/* 링크 걸린 텍스트가 있는 경우에만 따로 렌더링 */}
                      {item.linkText && item.linkUrl && (
                        <>
                          <a href={item.linkUrl}>{item.linkText}</a>
                        </>
                      )}
                    </S.FAQContent>
                  </S.FAQWrapper>
                );
              })}
            </S.FAQContainer>
          </S.ContentWrapper>
          <S.CenterFormWrapper>
            <S.FormText>
              시청할 준비가 되셨나요? 멤버십을 등록하거나 재시작하려면 이메일
              주소를 입력하세요.
            </S.FormText>
            <S.Form onSubmit={onSubmit}>
              <S.InputWrapper>
                <EmailInput
                  email={email}
                  setEmail={setEmail}
                  validateEmail={validateEmail}
                  setEmailError={setEmailError}
                  isPending={isPending}
                  $isBorderRed={!!emailError}
                  $isLogin={true}
                />
                {emailError && (
                  <L.ErrorMsg $isLogin={true}>{emailError}</L.ErrorMsg>
                )}
              </S.InputWrapper>
              <S.Button type='submit'>
                <div>시작하기</div>
                <svg
                  viewBox='0 0 24 24'
                  width='24'
                  height='24'
                  data-icon='ChevronRightMedium'
                  data-icon-id=':r16:'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  role='img'
                >
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M15.5859 12L8.29303 19.2928L9.70725 20.7071L17.7072 12.7071C17.8948 12.5195 18.0001 12.2652 18.0001 12C18.0001 11.7347 17.8948 11.4804 17.7072 11.2928L9.70724 3.29285L8.29303 4.70706L15.5859 12Z'
                    fill='currentColor'
                  ></path>
                </svg>
              </S.Button>
            </S.Form>
          </S.CenterFormWrapper>
        </S.Main>
      </S.MainContainer>
      <Footer $isSignUp={false} $isWelcome={true} $isMain={false} />
    </>
  );
}
