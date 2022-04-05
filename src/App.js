import { useCallback, useEffect, useState } from 'react';

// assets
import homeIcon from './home-icon.png';
import starIcon from './star-icon.png';

// styles
import './App.scss';

// components
import HeaderSidebar from '../src/components/HeaderSidebar';
import MovieCard from '../src/components/MovieCard/MovieCard';
import axios from 'axios';

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
    console.log(parseInt(scrollThreshold), scrollHeight)
    
    if (scrollThreshold > scrollHeight) {
      let newMovie = [...movieLists];
      const url = `https://www.omdbapi.com/?apikey=3fea2cf0&s=star&type=movie&page=${
        page + 1
      }`;
      const data = await axios
        .get(url)
        .then((result) => result.data.Search)
        .catch((err) => err);

      if (data) {
        newMovie = newMovie.concat(data)
        setMovieLists(newMovie);
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

  return (
    <div className="container">
      <HeaderSidebar menus={menus}>
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
      </HeaderSidebar>
    </div>
  );
}
