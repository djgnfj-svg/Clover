import logo from './logo.svg';
import './App.css';
import {  BrowserRouter as Router , Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css';
import Home from './Pages/Home/Home';
import MyNavbar from './Components/MyNavbar/MyNavbar';
import SearchClubPage from './Pages/SearchClub/SearchClubPage';
import Clover from './Pages/Clover/Clover';
import Login from './Pages/Login/Login';
import SignUp from './Pages/SignUp/SignUp';
import ClubDetailPage from './Pages/ClubDetail/ClubDetailPage';
import DetailEdit from './Pages/DetailEdit/DetailEdit';
import UserProfile from './Pages/UserProfile/UserProfile';
import IsLogin from './Components/IsLogin';
import NoneUser from './Pages/NoneUser/NoneUser';
import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {

	return (
		<div className="App">
			<MyNavbar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path='/signup' element={<SignUp />} />
				<Route path="/club" element={<SearchClubPage />} />
				<Route path="/clubs/:id" element={<ClubDetailPage />} />
				{!!IsLogin() && (
					<>
						<Route path='/useredit' element={<UserProfile />} />
						<Route path="/clubs/:id/edit" element={<DetailEdit />} />
						<Route path="/clover" element={<Clover />} />
					</>
				)}
				<Route path="*" element={<NoneUser />} />
			</Routes>
		</div>
	)
}

export default App;
