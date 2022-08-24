
export const makeClubUrl = 'http://127.0.0.1:8000/api/club/' // 모달 클럽 생성

export const getNewList = 'http://127.0.0.1:8000/api/home/' // 홈페이지 최신클럽 4개

export const clubList = 'http://127.0.0.1:8000/api/club/' // 전체 클럽 리스트

export const applyClub = 'http://127.0.0.1:8000/api/club/joinclub/' // 클럽 가입 

export const clubDetail = 'http://127.0.0.1:8000/api/club/' // 클럽 상세정보 + id값 필요  , 클럽 수정포함

export const searchurl = 'http://127.0.0.1:8000/api/search/' // 서치 query url

export const applyUrl = (id) =>  `http://127.0.0.1:8000/api/club/${id}/manager/appli_list/`