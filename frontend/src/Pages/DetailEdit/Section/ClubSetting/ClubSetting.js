import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import './ClubSetting.css'

function ClubSetting() {
    const navigate = useNavigate("")

    const [searchParams, setSeratchParams] = useSearchParams();

    const days = searchParams.get('categoryDayid');
    const time_zone = searchParams.get('categoryTimeId');
    const range_age = searchParams.get('categoryAgeId');
    const gender = searchParams.get('categoryGenderId');

    const [query, setQuery] = useState("");
    const [categoryDayid, setCategoryDayId] = useState([]);
    const [categoryTimeId, setCategoryTimeId] = useState([]);
    const [categoryAgeId, setCategoryAgeId] = useState([]);
    const [categoryGenderId, setCategoryGenderId] = useState([]);

    const [one, setOne] = useState(false);

    const onChangeInput = (e) => {
        setQuery(e.target.value);
      }
   
    const handleClickSearch = () => {
        alert("클릭입니다.")
    }

    useEffect(() => {
        setSeratchParams({
            days: categoryDayid,
            time_zone: categoryTimeId,
            range_age: categoryAgeId,
            categoryGender: categoryGenderId
        })
    }, [one])


    const CategoryDays = {
        CategoryTitle: '날짜',
        CategoryId: 0,
        categoryMenu: [
            {
                menuName: "월요일"
            },
            {
                menuName: "화요일"
            },
            {
                menuName: "수요일"
            },
            {
                menuName: "목요일"
            },
            {
                menuName: "금요일"
            },
            {
                menuName: "토요일"
            },
            {
                menuName: "일요일"
            },
            {
                menuName: "All"
            },
        ]
    }
    const CategoryTime = {
        CategoryTitle: '시간',
        CategoryId: 1,
        categoryMenu: [
            {
                menuName: "오직 "
            },
            {
                menuName: "한가지"
            },
            {
                menuName: "너를 위한"
            },
            {
                menuName: "나를 위한"
            },
            {
                menuName: "우릴 위한"
            }
        ]
    }
    const CategoryAge = {
        CategoryTitle: '평균 나이',
        CategoryId: 2,
        categoryMenu: [
            {
                menuName: "10세 이상 "
            },
            {
                menuName: "20세 이상"
            },
            {
                menuName: "30세 이상"
            },
            {
                menuName: "40세 이상"
            },
            {
                menuName: "50세 이상"
            }
        ]
    }
    const CategoryGender = {
        CategoryTitle: '성별',
        CategoryId: 3,
        categoryMenu: [
            {
                menuName: "남성"
            },
            {
                menuName: "여성"
            },
            {
                menuName: "성별 무관"
            }
        ]
    }

    const Category = [
        CategoryDays,
        CategoryTime,
        CategoryAge,
        CategoryGender,
    ]
    const handleClickCategory = (item, Menuitem) => {
        const Categoryid = item.CategoryId
        const List = Menuitem.menuName
        if (!!one) {
            setOne(false)
        } else {
            setOne(true)
        }

        if (Categoryid === 0) {
            setCategoryDayId(categoryDayid.concat(List))
        } else if (Categoryid === 1) {
            setCategoryTimeId(List)
        } else if (Categoryid === 2) {
            setCategoryAgeId(List)
        } else if (Categoryid === 3) {
            setCategoryGenderId(List)
        }
        handleRemoveCategory(List);
    }

    const handleRemoveCategory = (List) => {
        let arr = categoryDayid.filter(categoryDayid => categoryDayid.indexOf(List))

        if (categoryDayid.includes(List)) {
            setCategoryDayId(arr)
        } else if (List === categoryTimeId) {
            setCategoryTimeId("")
        } else if (List === categoryAgeId) {
            setCategoryAgeId("")
        } else if (List === categoryGenderId) {
            setCategoryGenderId("")
        }
    }

    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <div className='Setting_Profile'>
                <div className='Profile_imgbox'>
                    <input type='file' name='fileLabel' />
                    <label htmlFor='fileLabel' />
                </div>
                <hr />
                <div className='Setting_Userinfo'>
                    <div style={{ fontSize: "30px" }}>유저이름</div>
                    <div style={{ fontSize: "26px", color: "gray" }}>모임 주제를 입력해쥬세요</div>
                    <div style={{ fontSize: "23px", marginTop: "30px" }}>유저의 소개를 20글자 내로 간단하게 설명해주세요</div>
                </div>
            </div>
            <div className='Cate_form'>
                {Category.map((item, index) => (
                    <div className='Search_category'>
                        <div className='Search_categoryname'>{item.CategoryTitle}</div>
                        <div className='Search_catrgorylist'>
                            {item.categoryMenu.map((Menuitem) => (
                                <div className=
                                    {
                                        categoryDayid.includes(Menuitem.menuName) ? 'select_category' : ""
                                            ||
                                            Menuitem.menuName === categoryTimeId ? 'select_category' : ""
                                                ||
                                                Menuitem.menuName === categoryAgeId ? 'select_category' : ""
                                                    ||
                                                    Menuitem.menuName === categoryGenderId ? 'select_category' : ""

                                    }
                                    onClick={(e) => handleClickCategory(item, Menuitem)}>{Menuitem.menuName}</div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ClubSetting
