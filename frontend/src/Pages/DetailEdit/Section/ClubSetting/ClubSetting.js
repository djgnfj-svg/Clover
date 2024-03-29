import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { clubDetail, clubthumbnail, searchurl } from '../../../../Components/Apiurl';
import axios from 'axios'
import './ClubSetting.css'

function ClubSetting({ auth }) {
    const navigate = useNavigate("")
    const { id } = useParams("")
    const inputRef = useRef();

    const [searchParams, setSeratchParams] = useSearchParams();
    const [clubData, setClubData] = useState();

    const days = searchParams.getAll('days');
    const time_zone = searchParams.get('time_zone');
    const range_age = searchParams.get('range_age');
    const gender = searchParams.get('gender');

    const [userInput, setUserInput] = useState({
        topic: "",
        brief_introduction: "",
    })

    const [thumbnail, setThumbnail] = useState()
    const [thumbnailUrl, setThumbnailUrl] = useState();

    const [categoryDayid, setCategoryDayId] = useState(["hi"]);
    const [categoryTimeId, setCategoryTimeId] = useState([]);
    const [categoryAgeId, setCategoryAgeId] = useState([]);
    const [categoryGenderId, setCategoryGenderId] = useState([]);
    const [one, setOne] = useState(false);

    const { topic, brief_introduction } = userInput



    useEffect(() => {
        getClubData();
    }, [])

    const getClubData = () => {
        axios.get(clubDetail(id), {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`
            }
        })
            .then(res => {
                setClubData(res.data)
                setUserInput({
                    ...userInput,
                    title: res.data.title,
                    topic: res.data.topic,
                    brief_introduction: res.data.brief_introduction,
                })
                setCategoryDayId((categoryDayid.concat(res.data.days)))
                setCategoryTimeId(res.data.time_zone)
                setCategoryAgeId(res.data.range_age)
                setCategoryGenderId(res.data.gender)
                setThumbnail(res.data.thumbnail)
                setThumbnailUrl(res.data.thumbnail)
            })
    }

    const onChangeInput = (e) => {
        const { name, value } = e.target
        setUserInput({
            ...userInput,
            [name]: value
        })
    }

    const onUploadImage = useCallback((e) => {
        if (!e.target.files[0]) {
            alert("불러온 데이터 없음")
            return;
        }

        axios.put(clubthumbnail(id), {
            thumbnail: e.target.files[0]
        }, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${localStorage.getItem('access_token')}`
            }
        })
            .then(res => {
                getClubData()
            }).catch(error => {
                console.log(error)
            })

    }, []);

    const CategoryDays = {
        CategoryTitle: '날짜',
        CategoryId: 0,
        categoryMenu: [
            {
                menuName: "월요일",
                subName: "Mon"

            },
            {
                menuName: "화요일",
                subName: "The"
            },
            {
                menuName: "수요일",
                subName: "Wed"
            },
            {
                menuName: "목요일",
                subName: "Thu"
            },
            {
                menuName: "금요일",
                subName: "Fri"
            },
            {
                menuName: "토요일",
                subName: "Sat"
            },
            {
                menuName: "일요일",
                subName: "Sun"
            },
        ]
    }
    const CategoryTime = {
        CategoryTitle: '활동 시간',
        CategoryId: 1,
        categoryMenu: [
            {
                menuName: "00 ~ 06시",
                subName: "1"
            },
            {
                menuName: "06 ~ 12시",
                subName: "2"
            },
            {
                menuName: "12 ~ 18시",
                subName: "3"
            },
            {
                menuName: "16 ~ 24시",
                subName: "4"
            },
        ]
    }
    const CategoryAge = {
        CategoryTitle: '평균 나이',
        CategoryId: 2,
        categoryMenu: [
            {
                menuName: "10세 이상",
                subName: "Over10"
            },
            {
                menuName: "20세 이상",
                subName: "Over20"
            },
            {
                menuName: "30세 이상",
                subName: "Over30"
            },
            {
                menuName: "40세 이상",
                subName: "Over40"
            },
            {
                menuName: "50세 이상",
                subName: "Over50"
            }
        ]
    }
    const CategoryGender = {
        CategoryTitle: '성별',
        CategoryId: 3,
        categoryMenu: [
            {
                menuName: "남성",
                subName: "M"
            },
            {
                menuName: "여성",
                subName: "W"
            },
            {
                menuName: "성별 무관",
                subName: "A"
            }
        ]
    }

    const Category = [
        CategoryDays,
        CategoryTime,
        CategoryAge,
        CategoryGender,
    ]
    const handleClickCategory = (item, Menuitem, Number) => {
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
        let arr = categoryDayid.filter(categoryDayid => categoryDayid !== Num)

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
    const handleFinishBtn = () => {
        let arr = categoryDayid.filter(categoryDayid => categoryDayid !== "hi")
        console.log(arr)

        axios.put(clubDetail(id),
            {
                topic,
                brief_introduction,
                days: arr,
                time_zone: categoryTimeId,
                range_age: categoryAgeId,
                gender: categoryGenderId
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`
                }
            })
            .then(res => {
                alert("변경 성공")
            }).catch(error => {
                console.log(error)
            })
    }

    return (
        <>
            {clubData && (
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <div className='Setting_Profile'>
                        <div className='Profile_imgboxs'>
                            <img className='img_boxs' name='thumbnail' style={{ backgroundImage: `url(${thumbnailUrl})` }} />
                            {auth === 'master' && (
                                <>
                                    <input type="file" id="upload" accept="image/*" ref={inputRef} onChange={onUploadImage} />
                                    <label htmlFor='fileLabel' />
                                </>
                            )}

                        </div>
                        <hr />
                        <div className='Setting_Userinfo'>
                            <input readOnly style={{ padding: "0rem !important", backgroundColor: "rgb(249,249,249)", fontSize: "30px", border: "none", color: "rgb(91,91,91)", marginBottom: "10px" }} value={clubData.title} placeholder='이름'></input>
                            <div>클럽 주제</div>
                            <input style={{ fontSize: "20px", color: "gray", marginBottom: "10px" }} onChange={onChangeInput} value={topic} name="topic" placeholder='clubtopic'></input>
                            <div>클럽 소개</div>
                            <textarea style={{ fontSize: "20px", marginTop: "30px", height: "100px" }} onChange={onChangeInput} value={brief_introduction} name="brief_introduction" placeholder='brief_introduction'></textarea>
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
                                                categoryDayid.includes(Menuitem.subName) ? 'select_category' : ""
                                                    ||
                                                    Menuitem.subName === categoryTimeId ? 'select_category' : ""
                                                        ||
                                                        Menuitem.subName === categoryAgeId ? 'select_category' : ""
                                                            ||
                                                            Menuitem.subName === categoryGenderId ? 'select_category' : ""

                                            }
                                            onClick={(e) => handleClickCategory(item, Menuitem, Menuitem.subName)}>{Menuitem.menuName}</div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                    {auth === 'master' ? (
                        <div className='setting_infobtn'>
                            <button onClick={() => handleFinishBtn()}>완료</button>
                        </div>
                    ) : (
                        <h3 className='notMaster'>매니저는 변경할 수 없어요</h3>
                    )}
                </div>
            )}
        </>
    )
}

export default ClubSetting
