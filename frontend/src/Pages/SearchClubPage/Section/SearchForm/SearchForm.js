import React, { useEffect, useRef, useState } from 'react'
import './SearchForm.css'

function SearchForm() {

  const [userSearch , setUserSearch] = useState("");
  const [test , setTest] = useState("")
  const [categoryNameId , setCategoryNameId] = useState([]);
  const [categoryTimeId , setCategoryTimeId] = useState();
  const [categoryAgeId , setCategoryAgeId] = useState();
  const [clicked , setClicked] = useState(false)
  const ref = useRef(null)

  const onChangeInput = (e) => {
    setUserSearch(e.target.value);
  }
  const handleClickSearch = () => {
    alert("클릭입니다.")
  }

  const CategoryName = {
      CategoryTitle : '카테고리 명',
      CategoryId : 0,
      categoryMenu : [
        {
          menuName : "유연한"
        },
        {
          menuName : "유연하지 않은"
        }
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
    CategoryTitle : '이명한',
    CategoryId : 2,
    categoryMenu : [
      {
        menuName : "유명한"
      },
      {
        menuName : "유명하지 않은"
      }
    ]
  }

  const Category = [
    CategoryName,
    CategoryTime,
    CategoryAge,
  ]

  const handleClickCategory = (item , Menuitem) => {
    const Categoryid = item.CategoryId
    const List = Menuitem.menuName

    if(Categoryid === 0){
      setCategoryNameId(
        categoryNameId.concat(List)
      )
    }else if(Categoryid === 1){
      setCategoryTimeId(List)
    }else if(Categoryid === 2){
      setCategoryAgeId(List)
    }
    handleRemoveCategory(List);
  }

  const handleRemoveCategory = (List) =>{
    let arr = categoryNameId.filter(categoryNameId => categoryNameId.indexOf(List))

    if(categoryNameId.includes(List)){
      setCategoryNameId(arr)
    }else if(List === categoryTimeId){
      setCategoryTimeId("")
    }else if(List === categoryAgeId){
      setCategoryAgeId("")
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
                  categoryNameId.includes(Menuitem.menuName) ? 'select_category' : ""
                  ||
                  Menuitem.menuName === categoryTimeId ? 'select_category' : ""
                  ||
                  Menuitem.menuName === categoryAgeId ? 'select_category' : ""
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