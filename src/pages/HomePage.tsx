import React from "react";
import "./HomePage.css";

const blocks = [
  {
    id: 1,
    title: "📘 프로젝트 개요",
    content: "BookNest는 사용자 친화적이고 심플한 온라인 도서 관리 서비스입니다. 도서 추가, 검색, 대여 관리까지 한번에."
  },
  {
    id: 2,
    title: "📚 추천 도서",
    content: "React, TypeScript, 최신 웹 기술 관련 도서들이 준비되어 있습니다. 모두 상세 페이지에서 확인 가능!"
  },
  {
    id: 3,
    title: "🛠️ 개발 현황",
    content: "현재 핵심 기능 개발 완료. 향후 사용자 맞춤 추천, 리뷰 시스템 추가 예정입니다."
  },
  {
    id: 4,
    title: "🔔 공지사항",
    content: "6월 5일 02:00~04:00 서버 점검 예정입니다. 이용에 참고 바랍니다."
  }
];

const HomePage: React.FC = () => (
  <div className="page">
    <div className="container">
      {blocks.map(({ id, title, content }) => (
        <div
          key={id}
          className="block"
          onClick={() => alert(`블럭 클릭: ${title}`)}
          tabIndex={0}
          role="button"
        >
          <h3 className="title">{title}</h3>
          <p className="content">{content}</p>
        </div>
      ))}
    </div>
  </div>
);

export default HomePage;
