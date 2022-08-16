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

function App() {
  return (
     <div className="App">
				<MyNavbar />
				<Routes>
					<Route path="/" element={<Home />}/>
					<Route path="/club" element={<SearchClubPage />} />
					<Route path="/club/clubedit" element={<DetailEdit />} />
					<Route path="/club/clubdetail" element={<ClubDetailPage />} />
					<Route path="/clover" element={<Clover />} />
					<Route path="/login" element ={<Login />} />
					<Route path='/signup' element={<SignUp/>} />
				</Routes>
		</div>
  );
}

export default App;
