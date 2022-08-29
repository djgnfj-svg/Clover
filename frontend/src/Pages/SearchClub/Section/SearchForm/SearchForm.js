import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { searchurl } from '../../../../Components/Apiurl';
import './SearchForm.css'

function SearchForm({test}) {

    const navigate = useNavigate("")

    const [searchParams, setSeratchParams] = useSearchParams();
    const [searchList , setSearchList] = useState();

    const query = searchParams.get('query')
    const days = searchParams.getAll('days');
    const time_zone = searchParams.get('time_zone');
    const range_age = searchParams.get('range_age');
    const gender = searchParams.get('gender');

    const [userSearch, setUserSearch] = useState("");
    const [categoryDayid, setCategoryDayId] = useState([]);
    const [categoryTimeId, setCategoryTimeId] = useState([]);
    const [categoryAgeId, setCategoryAgeId] = useState([]);
    const [categoryGenderId, setCategoryGenderId] = useState([]);

    const [one, setOne] = useState(false);

    const onChangeInput = (e) => {
        setUserSearch(e.target.value);
      }
   
    const handleClickSearch = () => {
        axios.get(searchurl ,{
          params :
           {
            query,
            days,
            time_zone,
            range_age,
            gender
          }},
          {
          headers : {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`
          }
        })
        .then(res => {
          setSearchList(res.data)
        }).catch(error => {
          console.log(error)
        })
    }

    useEffect(() => {
      test(searchList)
      console.log(searchList)
     
    },[searchParams])

    useEffect(() => {
        setSeratchParams({
            query : userSearch,
            days: categoryDayid,
            time_zone: categoryTimeId,
            range_age: categoryAgeId,
            gender: categoryGenderId
        })
    }, [one || userSearch])
    useEffect(() => {
        handleClickSearch() 
    },[searchParams])

    const CategoryDays = {
        CategoryTitle: '날짜',
        CategoryId: 0,
        categoryMenu: [
            {
                menuName: "월요일",
                subName : "월요일"

            },
            {
                menuName: "화요일",
                subName : "화요일"
            },
            {
                menuName: "수요일",
                subName : "수요일"
            },
            {
                menuName: "목요일",
                subName : "목요일"
            },
            {
                menuName: "금요일",
                subName : "금요일"
            },
            {
                menuName: "토요일",
                subName : "토요일"
            },
            {
                menuName: "일요일",
                subName : "일요일"
            },
            {
                menuName: "All"
            },
        ]
    }
    const CategoryTime = {
        CategoryTitle: '활동 시간',
        CategoryId: 1,
        categoryMenu: [
            {
                menuName: "00 ~ 06시",
                subName : "1"
            },
            {
                menuName: "06 ~ 12시",
                subName : "2"
            },
            {
                menuName: "12 ~ 18시",
                subName : "3"
            },
            {
                menuName: "16 ~ 24시",
                subName : "4"
            },
        ]
    }
    const CategoryAge = {
        CategoryTitle: '평균 나이',
        CategoryId: 2,
        categoryMenu: [
            {
                menuName: "10세 이상",
                subName : "Over10"
            },
            {
                menuName: "20세 이상",
                subName : "Over20"
            },
            {
                menuName: "30세 이상",
                subName : "Over30"
            },
            {
                menuName: "40세 이상",
                subName : "Over40"
            },
            {
                menuName: "50세 이상",
                subName : "Over50"
            }
        ]
    }
    const CategoryGender = {
        CategoryTitle: '성별',
        CategoryId: 3,
        categoryMenu: [
            {
                menuName: "남성",
                subName : "M"
            },
            {
                menuName: "여성",
                subName : "W"
            },
            {
                menuName: "성별 무관",
                subName : "A"
            }
        ]
    }

    const Category = [
        CategoryDays,
        CategoryTime,
        CategoryAge,
        CategoryGender,
    ]
    const handleClickCategory = (item, Menuitem , Number) => {
        const Categoryid = item.CategoryId
        const List = Menuitem.menuName
        const Num = Number;
        if (!!one) {
            setOne(false)
        } else {
            setOne(true)
        }

        if (Categoryid === 0) {
            setCategoryDayId(categoryDayid.concat(Num))
        } else if (Categoryid === 1) {
            setCategoryTimeId(Num)
        } else if (Categoryid === 2) {
            setCategoryAgeId(Num)
        } else if (Categoryid === 3) {
            setCategoryGenderId(Num)
        }
        handleRemoveCategory(Num);
    }

    const handleRemoveCategory = (Num) => {
        let arr = categoryDayid.filter(categoryDayid => categoryDayid.indexOf(Num))

        if (categoryDayid.includes(Num)) {
            setCategoryDayId(arr)
        } else if (Num === categoryTimeId) {
            setCategoryTimeId("")
        } else if (Num === categoryAgeId) {
            setCategoryAgeId("")
        } else if (Num === categoryGenderId) {
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
                  categoryDayid.includes(Menuitem.subName) ? 'select_category' : ""
                  ||
                  Menuitem.subName === categoryTimeId ? 'select_category' : ""
                  ||
                  Menuitem.subName === categoryAgeId ? 'select_category' : ""
                  ||
                  Menuitem.subName === categoryGenderId ? 'select_category' : ""

                }
                 onClick={() =>handleClickCategory(item , Menuitem , Menuitem.subName )}>{Menuitem.menuName}</div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SearchForm
