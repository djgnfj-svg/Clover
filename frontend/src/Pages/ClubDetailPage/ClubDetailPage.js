import React, { useEffect, useState } from 'react'
import DetailInfo from './Section/DetailInfo/DetailInfo'
import DetailProfile from './Section/DetailProfile/DetailProfile'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { clubAuth, clubDetail } from '../../Components/Apiurl'

function ClubDetailPage() {

  const { id } = useParams();
  const [profile, setProfile] = useState();
  const [auth , setAuth] = useState();

  useEffect(() => {
    getClubData()
    getAuth()
  }, [])

  const getClubData = () => {
    axios.get(`${clubDetail}${id}/`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      })
      .then(res => {
        setProfile(res.data)
        console.log(res.data)
      })
  }

  const getAuth = () => {
    axios.get(clubAuth(id) , {
      headers : {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
      }
    })
    .then(res => {
      setAuth(res.data)
      console.log(res.data)
    }).catch(error => {
      console.log(error)
    })
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
