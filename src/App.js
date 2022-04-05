import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// assets
import homeIcon from './home-icon.png';
import starIcon from './star-icon.png';

// styles
import './App.scss';

// components
import HeaderSidebar from '../src/components/HeaderSidebar';
import MovieCard from '../src/components/MovieCard/MovieCard';
import MovieListPage from './pages/MyList';

export default function App() {
  const [movieLists, setMovieLists] = useState([]);
  const [page, setPage] = useState(1);

  const menus = [
    {
      icon: homeIcon,
      key: 'home',
      path: '/',
      title: 'Home',
    },
    {
      icon: starIcon,
      key: 'favorite',
      path: '/favorite',
      title: 'Favorite',
    },
  ];

  const handleInfiniteScroll = async (event) => {
    const { scrollHeight, scrollTop, offsetHeight } = event.currentTarget || {};
    const scrollThreshold = scrollTop + offsetHeight + 1;
    console.log(parseInt(scrollThreshold), scrollHeight);

    if (scrollThreshold > scrollHeight) {
      let newMovies = [...movieLists];
      const url = `https://www.omdbapi.com/?apikey=3fea2cf0&s=star&type=movie&page=${
        page + 1
      }`;
      const data = await axios
        .get(url)
        .then((result) => result.data.Search)
        .catch((err) => err);

      if (data) {
        newMovies = newMovies.concat(data);
        setMovieLists(newMovies);
        setPage((page) => page + 1);
      }
    }
  };

  const handleGetMovies = useCallback(async () => {
    const url = `https://www.omdbapi.com/?apikey=3fea2cf0&s=star&type=movie&page=${page}`;
    const data = await axios
      .get(url)
      .then((result) => result.data.Search)
      .catch((err) => err);
    console.log(data);
    if (data) {
      setMovieLists(data);
    }
  }, []);

  useEffect(() => {
    handleGetMovies();
  }, [handleGetMovies]);

  const Test = () => {
    return (
      <div className="wrapper" onScroll={handleInfiniteScroll}>
        <div className="introduction">
          <h1>Movie App</h1>
          <p>{'test'}</p>
        </div>
        <div className="content">
          {movieLists.length &&
            movieLists.map((movie, movieIndex) => (
              <MovieCard
                movie={movie}
                key={movieIndex}
                showDeleteIcon={false}
                onDeleteMovie={() => {}}
              />
            ))}
        </div>
      </div>
    );
  };

  return (
    <div className="container">
      <Router>
        <HeaderSidebar menus={menus}>
          <Routes>
            <Route path="/" element={<Test />} />

            <Route exact path="/login" element={<MovieListPage />} />
            {/* <Route path="*" element={<NotFound />} /> */}
          </Routes>
        </HeaderSidebar>
      </Router>
    </div>
  );
}
