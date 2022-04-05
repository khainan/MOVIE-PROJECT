import { useEffect, useState, useCallback } from 'react';

// assets
import starIcon from './assets/star-icon.png';

// components
import MovieCard from '../../components/MovieCard/MovieCard';

// styles
import './MyList.scss';

export default function MyList() {
  const [movieLists, setMovieLists] = useState([]);

  const handleGetLikes = useCallback(() => {
    const likes = localStorage.getItem('likes') || [];
    const parsedLikes = likes.length ? JSON.parse(likes) : [];

    setMovieLists(parsedLikes);
  }, []);

  const handleUpdateMovie = (movie) => {
    setMovieLists(movie);
  };

  useEffect(() => {
    handleGetLikes();
  }, [handleGetLikes]);

  return (
    <div className="container">
      <div className="wrapper">
        <div className="introduction">
          <h1>Movie App</h1>
          <p>{'test'}</p>
        </div>
        <div className="content">
          {movieLists.length ? (
            movieLists.map((movie, movieIndex) => (
              <MovieCard
                movie={movie}
                key={movieIndex}
                showDeleteIcon
                onDeleteMovie={(movie) => handleUpdateMovie(movie)}
              />
            ))
          ) : (
            <div className="empty-favorite">
              <img alt="" src={starIcon} width={40} height={40} />
              <h5>You haven't favorite anything</h5>
              <p>
                To start show your favorite, try to like some content in
                <strong>Home</strong>.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
