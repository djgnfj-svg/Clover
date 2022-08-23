import logo from './logo.svg';
import './App.css';
import {Routes , Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css';
import Home from './Pages/Home/Home';
import MyNavbar from './Components/MyNavbar/MyNavbar';
import SearchClubPage from './Pages/SearchClubPage/SearchClubPage';
import Clover from './Pages/CloverPage/Clover';
import Login from './Pages/Login/Login';
import SignUp from './Pages/SignUp/SignUp';
import ClubDetailPage from './Pages/ClubDetailPage/ClubDetailPage';
import DetailEdit from './Pages/DetailEdit/DetailEdit';
import UserProfile from './Pages/UserProfile/UserProfile';

function App() {
  return (
     <div className="App">
				<MyNavbar />
				<Routes>
					<Route path="/" element={<Home />}/>
					<Route path="/login" element ={<Login />} />
					<Route path='/signup' element={<SignUp/>} />
					<Route path='/useredit' element={<UserProfile/>} />
					<Route path="/club" element={<SearchClubPage />} />
					<Route path="/club/:id/edit" element={<DetailEdit />} />
					<Route path="/club/:id" element={<ClubDetailPage />} />
					<Route path="/clover" element={<Clover />} />
				</Routes>
		</div>
  )
}

export default App;
