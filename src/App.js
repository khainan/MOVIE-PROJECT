import logo from './logo.svg';
import { useEffect, useState } from 'react';

// assets
import homeIcon from '../public/assets/home-icon.png';
import starIcon from '../public/assets/star-icon.png';

// styles
import styles from '../styles/Home.module.scss';


// components
import HeaderSidebar from '../src/components/HeaderSidebar';
import MovieCard from '../src/components/MovieCard/MovieCard';


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
      const data = await fetch(
        'https://private-2fff44-bncfetest.apiary-mock.com/movies',
        {
          method: 'GET',
        }
      )
        .then((response) => {
          if (response.status === 200) {
            console.log('Success fetch the data');
            return response.json();
          }
          console.log('Failed fetch the data');
        })
        .then((result) => result)
        .catch((err) => err);

      if (data.data) {
        setMovieLists(movieLists.concat(data.data.slice(0, 10)));
      }
    }
  };

  return (
    <div className={styles.container}>
      <HeaderSidebar
        menus={menus}
      >
        <div className={styles.wrapper} onScroll={handleInfiniteScroll}>
          <div className={styles.introduction}>
            <h1>Movie App</h1>
            <p>{"test"}</p>
          </div>
          <div className={styles.content}>
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