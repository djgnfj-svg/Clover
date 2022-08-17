import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import './SearchForm.css'

function SearchForm() {

  const navigate = useNavigate("")

  const [searchParams, setSeratchParams] = useSearchParams();

  const categoryDate = searchParams.get('categoryDateId');
  const categoryTime = searchParams.get('categoryTimeId');
  const categoryAge = searchParams.get('categoryTimeId');
  const categoryGender = searchParams.get('categoryTimeId');

  const [userSearch , setUserSearch] = useState("");

  const [categoryDateId , setCategoryDateId] = useState([]);
  const [categoryTimeId , setCategoryTimeId] = useState();
  const [categoryAgeId , setCategoryAgeId] = useState();
  const [categoryGenderId , setCategoryGenderId] = useState();

  const [one , setOne] = useState([]);
  const [two , setTwo] = useState();
  const [three , setThree] = useState();
  const [forth , setForth] = useState();

  const onChangeInput = (e) => {
    setUserSearch(e.target.value);
  }
  const handleClickSearch = () => {
    alert("클릭입니다.")
  }

  useEffect(() => {
      setSeratchParams({
      categoryDate : categoryDateId,
      categoryTime : categoryTimeId ,
      categoryAge :categoryAgeId ,
      categoryGender : categoryGenderId})
  },[one])

  const CategoryDate = {
      CategoryTitle : '날짜',
      CategoryId : 0,
      categoryMenu : [
        {
          menuName : "월요일"
        },
        {
          menuName : "화요일"
        },
        {
          menuName : "수요일"
        },
        {
          menuName : "목요일"
        },
        {
          menuName : "금요일"
        },
        {
          menuName : "토요일"
        },
        {
          menuName : "일요일"
        },
        {
          menuName : "All"
        },
      ]
    }
  const CategoryTime = {
    CategoryTitle : '시간',
    CategoryId : 1,
    categoryMenu : [
      {
        menuName : "오직 "
      },
      {
        menuName : "한가지"
      },
      {
        menuName : "너를 위한"
      },
      {
        menuName : "나를 위한"
      },
      {
        menuName : "우릴 위한"
      }
    ]
  }
  const CategoryAge = {
    CategoryTitle : '평균 나이',
    CategoryId : 2,
    categoryMenu : [
      {
        menuName : "10세 이상 "
      },
      {
        menuName : "20세 이상"
      },
      {
        menuName : "30세 이상"
      },
      {
        menuName : "40세 이상"
      },
      {
        menuName : "50세 이상"
      }
    ]
  }
  const CategoryGender = {
    CategoryTitle : '성별',
    CategoryId : 3,
    categoryMenu : [
      {
        menuName : "남성"
      },
      {
        menuName : "여성"
      },
      {
        menuName : "성별 무관"
      }
    ]
  }

  const Category = [
    CategoryDate,
    CategoryTime,
    CategoryAge,
    CategoryGender,
  ]

  const handleClickCategory = (item , Menuitem) => {
    const Categoryid = item.CategoryId
    const List = Menuitem.menuName
    setOne(Categoryid)

    if(Categoryid === 0){
      setCategoryDateId(categoryDateId.concat(List))
    }else if(Categoryid === 1){
      setCategoryTimeId(List)
    }else if(Categoryid === 2){
      setCategoryAgeId(List)
    }else if(Categoryid === 3){
      setCategoryGenderId(List)
    }
    handleRemoveCategory(List);
  }

  

  const handleRemoveCategory = (List) =>{
    let arr = categoryDateId.filter(categoryDateId => categoryDateId.indexOf(List))

    if(categoryDateId.includes(List)){
      setCategoryDateId(arr)
    }else if(List === categoryTimeId){
      setCategoryTimeId("")
    }else if(List === categoryAgeId){
      setCategoryAgeId("")
    }else if(List === categoryGenderId){
      setCategoryGenderId("")
    }
  }

  return (
    <div className='Search_bar'>
      <headers className="Search_title">Search</headers>
      <div className='Search_inputForm'>
        <input value={userSearch} onChange={onChangeInput} placeholder='요즘 흥미있는 것에대해 검색해보세요 !' />
        <span className="material-symbols-outlined" onClick={(e) => handleClickSearch(e)}>search</span> {/* 구글 아이콘  */}
      </div>
      <div className='Category_form'>
        {Category.map((item , index) => (
          <div className='Search_category'>
            <div className='Search_categoryname'>{item.CategoryTitle}</div>
            <div className='Search_catrgorylist'>
              {item.categoryMenu.map((Menuitem) => (
                <div className=
                {
                  categoryDateId.includes(Menuitem.menuName) ? 'select_category' : ""
                  ||
                  Menuitem.menuName === categoryTimeId ? 'select_category' : ""
                  ||
                  Menuitem.menuName === categoryAgeId ? 'select_category' : ""
                  ||
                  Menuitem.menuName === categoryGenderId ? 'select_category' : ""

                }
                 onClick={(e) =>handleClickCategory(item , Menuitem )}>{Menuitem.menuName}</div>
              ))}
            </div>
          </div>
        ))}

      </div>
    </div>
  )
}

export default SearchForm

{/* <span class="material-symbols-outlined">
  cancel
  </span> */}