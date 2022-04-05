import { useCallback, useEffect, useState } from 'react';

// assets
import ratingIcon from './assets/rating-icon.png';
import likeIcon from './assets/like-icon.png';
import viewsIcon from './assets/views-icon.png';
import unlikeIcon from './assets/unlike-icon.png';
import trashIcon from './assets/trash-icon.png';

// styles
import './MovieCard.scss';

const MovieCard = (props) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState([]);
  const { movie, showDeleteIcon, onDeleteMovie } = props || {};

  const handleGetLikes = useCallback(() => {
    const likes = localStorage.getItem('likes') || [];
    const parsedLikes = likes.length ? JSON.parse(likes) : [];

    parsedLikes.forEach((val) => {
      if (val.id === movie.id) {
        setLiked(true);
      }
    });

    setLikes(parsedLikes);
    return parsedLikes;
  }, [movie]);

  const handleDeleteMovie = () => {
    let newLikes = handleGetLikes();
    newLikes = newLikes.filter((val) => val.id !== movie.id);
    localStorage.setItem('likes', JSON.stringify(newLikes));
    onDeleteMovie(newLikes);
    setLiked(false);
  };

  const handleClickMovie = () => {
    localStorage.setItem('movieData', JSON.stringify(movie));
    // Router.push({
    //   pathname: `/${movie.id}`,
    // });
  };

  const handleLikeMovie = () => {
    let newLikes = handleGetLikes();

    if (!liked) {
      newLikes.push(movie);
      localStorage.setItem('likes', JSON.stringify(newLikes));
      setLiked(true);
    } else {
      handleDeleteMovie();
    }
  };

  useEffect(() => {
    handleGetLikes();
  }, [handleGetLikes]);

  return (
    <div className={'movie-card'}>
      <div
        className={'movie-card-container'}
        style={{ backgroundImage: `url(${movie.imageUrl})` }}
      >
        <div className={'movie-card-header'}>
          <h4>{`${movie.title} (${movie.year})`}</h4>
          <div className={'movie-card-rating'}>
            <img alt="" src={ratingIcon} width={16} height={16} />
            <p>{`x${movie.rating}`}</p>
          </div>
        </div>
        <div className={'movie-card-content'}>
          {!showDeleteIcon ? (
            <>
              <div className={'views-icon'} onClick={handleClickMovie}>
                <img alt="" src={viewsIcon} width={34} height={34} />
              </div>
              <div
                className={liked ? 'like-icon' : 'unlike-icon'}
                onClick={handleLikeMovie}
              >
                <img
                  alt=""
                  src={liked ? likeIcon : unlikeIcon}
                  width={34}
                  height={34}
                />
              </div>
            </>
          ) : (
            <div className={'delete-icon'} onClick={handleDeleteMovie}>
              <img alt="" src={trashIcon} width={34} height={34} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
