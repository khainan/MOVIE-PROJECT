import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// assets
import homeIcon from './home-icon.png';
import starIcon from './star-icon.png';

// styles
import './App.scss';

// components
import HeaderSidebar from '../src/components/HeaderSidebar';
import HomePage from './pages/Home';
import MovieListPage from './pages/MyList';
import DetailMoviePage from './pages/DetailMovie/DetailMovie';

export default function App() {
  const menus = [
    {
      icon: homeIcon,
      key: 'home',
      path: '/',
      title: 'Home',
    },
    {
      icon: starIcon,
      key: 'movie-list',
      path: '/movie-list',
      title: 'Movie List',
    },
  ];

  return (
    <div className="container">
      <Router>
        <HeaderSidebar menus={menus}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route exact path="/movie-list" element={<MovieListPage />} />
            <Route exact path="/movie-detail/:movieId" element={<DetailMoviePage />} />
            {/* <Route path="*" element={<NotFound />} /> */}
          </Routes>
        </HeaderSidebar>
      </Router>
    </div>
  );
}
