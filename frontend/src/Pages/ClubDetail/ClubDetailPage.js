import React, { useEffect, useState } from 'react'
import DetailInfo from './Section/DetailInfo/DetailInfo'
import DetailProfile from './Section/DetailProfile/DetailProfile'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { clubAuth, clubDetail } from '../../Components/Apiurl'
import IsLogin from '../../Components/IsLogin'

function ClubDetailPage() {

  const { id } = useParams();
  const [profile, setProfile] = useState();
  const [auth, setAuth] = useState();

  useEffect(() => {
    getClubData()
    getAuth()
  }, [])

  const getClubData = () => {
    if(!!IsLogin()){
      axios.get(clubDetail(id),
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`
          }
        })
        .then(res => {
          setProfile(res.data)
          console.log(res.data)
        })
    }else{
      axios.get(clubDetail(id))
      .then(res => {
        setProfile(res.data)
        console.log(res.data)
      })
    }
  }

  const getAuth = () => {
    if(!!IsLogin()){
      axios.get(clubAuth(id), {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      })
        .then(res => {
          setAuth(res.data)
          console.log(res.data)
        }).catch(error => {
          console.log(error)
        })
    }else{
      axios.get(clubAuth(id))
        .then(res => {
          setAuth(res.data)
          console.log(res.data)
        }).catch(error => {
          console.log(error)
        })
    }
  }

  return (
    <>
      {profile && auth && (
        <div>
          <DetailProfile profile={profile} auth={auth} />
          <DetailInfo info={profile} auth={auth} />
        </div>
      )}
    </>
  )
}

export default ClubDetailPage
