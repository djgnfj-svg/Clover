import logo from './logo.svg';
import './App.css';
import {Routes , Route} from 'react-router-dom'
import Home from './Pages/Home/Home';
import MyNavbar from './Components/MyNavbar/MyNavbar';
import SearchClubPage from './Pages/SearchClubPage/SearchClubPage';
import Clover from './Pages/CloverPage/Clover';
import Login from './Pages/Login/Login';

function App() {
  return (
     <div className="App">
				<MyNavbar />
				<Routes>
					<Route path="/" element={<Home />}/>
					<Route path="/club" element={<SearchClubPage />} />
					<Route path="/clover" element={<Clover />} />
					<Route path="/login" element ={<Login />} />
				</Routes>
		</div>
  );
}

export default App;
