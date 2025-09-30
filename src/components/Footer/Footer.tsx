import * as S from "./FooterStyle";
import * as W from "@/pages/Welcome/WelcomeStyle";

export interface FooterProps {
  $isWelcome: boolean;
  $isSignUp: boolean;
}

export default function Footer({
  $isWelcome,
  $isSignUp,
}: FooterProps): React.JSX.Element {
  return (
    <S.MainContainer $isSignUp={$isSignUp} $isWelcome={$isWelcome}>
      <div>
        질문이 있으신가요? 문의 전화: 00-308-321-0161 (수신자 부담)(무료 전화)
      </div>
      <S.LinkBox $isWelcome={$isWelcome}>
        <li>
          <S.Link href='https://help.netflix.com/support/412'>
            자주 묻는 질문
          </S.Link>
        </li>
        <li>
          <S.Link href='https://help.netflix.com/'>고객센터</S.Link>
        </li>
        {$isWelcome && (
          <>
            <li>
              <S.Link href='#'>계정</S.Link>
            </li>
            <li>
              <S.Link href='https://media.netflix.com/'>미디어 센터</S.Link>
            </li>
            <li>
              <S.Link href='http://ir.netflix.com/'>투자 정보(IR)</S.Link>
            </li>
            <li>
              <S.Link href='https://jobs.netflix.com/jobs'>입사 정보</S.Link>
            </li>
            <li>
              <S.Link href='#'>넷플릭스 지원 디바이스</S.Link>
            </li>
          </>
        )}
        <li>
          <S.Link href='https://help.netflix.com/legal/termsofuse'>
            이용약관
          </S.Link>
        </li>
        <li>
          <S.Link href='https://help.netflix.com/legal/privacy'>
            개인정보 처리방침
          </S.Link>
        </li>
        <li>
          <S.Link href='#'>쿠키 설정</S.Link>
        </li>
        <li>
          <S.Link href='https://help.netflix.com/legal/corpinfo'>
            기업 정보
          </S.Link>
        </li>
        {$isWelcome && (
          <>
            <li>
              <S.Link href='https://help.netflix.com/contactus'>
                문의하기
              </S.Link>
            </li>
            <li>
              <S.Link href='https://fast.com/'>속도 테스트</S.Link>
            </li>
            <li>
              <S.Link href='https://help.netflix.com/legal/notices'>
                법적 고지
              </S.Link>
            </li>
            <li>
              <S.Link href='https://www.netflix.com/kr/browse/genre/839338'>
                오직 넷플릭스에서
              </S.Link>
            </li>
          </>
        )}
      </S.LinkBox>
      <div>
        <W.LangSelect>
          <W.LangOption>한국어</W.LangOption>
          <W.LangOption>English</W.LangOption>
        </W.LangSelect>
      </div>
      {$isWelcome && <div>넷플릭스 대한민국</div>}
      <div>
        <S.Text>
          넷플릭스서비시스코리아 유한회사 통신판매업신고번호:
          제2018-서울종로-0426호 전화번호: 00-308-321-0161 (수신자 부담)
        </S.Text>
        <S.Text>대표: 레지널드 숀 톰슨</S.Text>
        <S.Text>이메일 주소: korea@netflix.com</S.Text>
        <S.Text>
          주소: 대한민국 서울특별시 종로구 우정국로 26, 센트로폴리스 A동 20층
          우편번호 03161
        </S.Text>
        <S.Text>사업자등록번호: 165-87-00119</S.Text>
        <S.Text>클라우드 호스팅: Amazon Web Services Inc.</S.Text>
        <S.TextBtn href='http://www.ftc.go.kr/bizCommPop.do?wrkr_no=1658700119'>
          공정거래위원회 웹사이트
        </S.TextBtn>
      </div>
    </S.MainContainer>
  );
}
