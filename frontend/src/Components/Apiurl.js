
//클럽 
export const makeClubUrl = 'http://127.0.0.1:8000/api/club/' // 모달 클럽 생성
export const getNewList = 'http://127.0.0.1:8000/api/home/' // 홈페이지 최신클럽 4개
export const clubList = 'http://127.0.0.1:8000/api/club/' // 전체 클럽 리스트
export const applyClub = 'http://127.0.0.1:8000/api/club/joinclub/' // 클럽 가입 
export const ExitCluburl = `http://127.0.0.1:8000/api/club/outclub/` // 클럽 탈퇴
export const clubDetail = 'http://127.0.0.1:8000/api/club/' // 클럽 상세정보 + id값 필요  , 클럽 수정포함
export const searchurl = 'http://127.0.0.1:8000/api/search/' //클럽카테고리  서치 query url
export const clubAuth = (id) =>  `http://127.0.0.1:8000/api/club/${id}/get_right/`
    //클럽에딧
export const applyUrl = (id) =>  `http://127.0.0.1:8000/api/club/${id}/manager/appli_list/` //신청자 리스트 , post 시 가입받아주기
export const applyOutUrl = (id)=> `http://127.0.0.1:8000/api/club/${id}/manager/appli_list/` // +?userid=3  가입 거절 + 쿼리로 userid 보내주기
export const userListurl = (id) => `http://127.0.0.1:8000/api/club/${id}/manager/` // 클럽 유저리스트
export const clubthumbnail = (id) => `http://127.0.0.1:8000/api/club/${id}/thumbnail/`

//유저 
export const userInfoUrl = 'http://127.0.0.1:8000/api/accounts/user/'






