# 프로젝트명 : Clover

##### url : ...Not yet
##### last_update : 2022-08-30
##### 프로젝트 기간 : 2022-08-01 ~ 진행중

---

## 🙉개발인원 2명

##### Back-end : 송영재
#####  Front-end : 박형석

---

# ⭐️사용기술
## 공통
- Git & GitHub : 버전 컨트롤
- Notion : 공유 문서
- Discord : 페어 프로그래밍

## Backend(송영재)

- Django, Python, DRF
- Mysql : DB구축
- RESTful API
- AWS-EC2, RDS (진행중)

## Frontend(박형석)
- HTML, CSS
- React.js
- Axios
---
## 👜문서

- [ERD](https://www.erdcloud.com/d/DNgJfr4MgsQM9eRR5)(송영재)
- [API문서](미완)(송영재)
- [시스템흐름도](https://lapis-apparatus-de5.notion.site/976166f095ee4b83a52ed96b5afee510)(박형석)
- [화면 정의서](미완)(박형석)

---

## 💎기능
### 유저
- JWT + Refresh token 로그인
- 회원가입
- 마이페이지
- 프로필 업데이트

    ![프로필수정](https://user-images.githubusercontent.com/87049249/187436419-06bea31c-4af4-4b0b-ab20-a29549e4bda4.gif)

### 클럽
- Club Search
(움짤예정)
    ![서치](https://user-images.githubusercontent.com/87049249/187605676-30409659-8e9b-4e5e-9b2a-1774e5283328.gif)

- Club 신청/가입/탈퇴 관리
- Club 관리자(Manager, Master) 기능

    * Master
        - 공지사항 CRUD (추후 업데이트)

            ![클럽 기본값 변경](https://user-images.githubusercontent.com/87049249/187470749-7630cd38-1618-4310-8e3f-1f207bf31811.gif)

        - 클럽 프로필 수정 (이미지 , 주제 , 소개)
        - 클럽 소개 수정
        - 신청관리 (가입신청한 유저 가입 및 거절)
        - 유저관리 (유저 제명 , 매니저 승급 & 마스터 인계 , 유저 정보 )

            ![유저권한변경](https://user-images.githubusercontent.com/87049249/187470144-1be5a331-19ea-4d42-9246-2f4adea04593.gif)
        - 클럽 해체하기 
    * Manager
        - 공지사항  ( 추후 업데이트 )
        - 신청관리
        
---


## 🦼진행중
- 소셜 로그인
- (back) 코드 리팩토링
- 공지사항 및 알림
- 배포 (진행중)
---
## 추가예정
#### 공동
- default.img 추가하기
- 대문 페이지 이미지선택
- 유저 클럽 생성 제한 갯수 정하기

#### Front
- 반응형 (2순위)
- 디자인 (2순위)
- 클럽해체하기(이메일인증 필요할듯) (5순위)
- 가입신청 알림(3순위)

#### Back 
- Retun status, 에러, 성공 message, 입력값 (1순위)
- 유저입력추적(admin) (2순위)
- OAuth (2순위)
- 가입신청 알림(3순위) (이게과연 필요한가, 포폴사이트에서 누가 그렇게까지 보는가 구현하고 사진으로 보여주어야하는가?
.)
- 회원가입 오류 메시지 수정(3순위)

순위기준
1. 급하고 중요
2. 안급한데 중요
3. 급한데 안중요
4. 안급하고 안중요
5. 정책상 애메해서 넣을수 없는거 (포폴사이트에서 진짜이메일 인증을 해야하는가?)
