import { useCallback, useEffect, useState } from 'react';

// assets
import homeIcon from '../public/assets/home-icon.png';
import starIcon from '../public/assets/star-icon.png';

// styles
import './App.scss';

// components
import HeaderSidebar from '../src/components/HeaderSidebar';
import MovieCard from '../src/components/MovieCard/MovieCard';
import axios from 'axios';

export default function App() {
  const [movieLists, setMovieLists] = useState([]);

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
    const scrollThreshold = scrollTop + offsetHeight + 10;

    if (scrollThreshold > scrollHeight) {
      const data = await axios
        .get('https://private-2fff44-bncfetest.apiary-mock.com/movies', {
          apiKey: '3fea2cf0',
        })
        .then((result) => result)
        .catch((err) => err);

      if (data.data) {
        setMovieLists(data.data);
      }
    }
  };

  const handleGetMovies = useCallback(async () => {
    const data = await axios
      .get('https://private-2fff44-bncfetest.apiary-mock.com/movies', {
        apiKey: '3fea2cf0',
      })
      .then((result) => result)
      .catch((err) => err);

    if (data.data) {
      setMovieLists(data.data);
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
