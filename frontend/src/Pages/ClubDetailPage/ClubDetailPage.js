import React, { useEffect, useState } from 'react'
import DetailInfo from './Section/DetailInfo/DetailInfo'
import DetailProfile from './Section/DetailProfile/DetailProfile'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { clubDetail } from '../../Components/Apiurl'

function ClubDetailPage() {

  const { id } = useParams();
  const [profile, setProfile] = useState();

  useEffect(() => {
    getClubData()
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

  return (
    <>
      {profile && (
        <div>
          <DetailProfile profile={profile} />
          <DetailInfo info={profile} />
        </div>
      )}
    </>
  )
}

export default ClubDetailPage
