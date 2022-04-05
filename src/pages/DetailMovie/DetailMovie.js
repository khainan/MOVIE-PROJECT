import axios from 'axios';
import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// assets
import arrowLeftIcon from './assests/arrow-left-icon.png';

// styles
import './DetailMovie.scss';

export default function DetailMoviePage() {
  const [movieData, setMovieData] = useState({});
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);

  const navigate = useNavigate();
  const params = useParams();
  const { movieId } = params;

  const handleGetMovieData = useCallback(async () => {
    const url = `https://www.omdbapi.com/?apikey=3fea2cf0&i=${movieId}`;

    const data = await axios
      .get(url)
      .then((result) => result.data)
      .catch((err) => err);

    if (data) {
      const likes = localStorage.getItem('likes') || [];
      const parsedLikes = likes.length ? JSON.parse(likes) : [];

      parsedLikes.forEach((val) => {
        if (val.imdbID === data.imdbID) {
          setIsLiked(true);
        }
      });

      setMovieData(data);
      setLoading(false);
    }
  }, []);

  const handleDeleteMovie = () => {
    const likes = localStorage.getItem('likes') || [];
    const parsedLikes = likes.length ? JSON.parse(likes) : [];

    let newLikes = parsedLikes;
    newLikes = newLikes.filter((val) => val.imdbID !== movieId);
    localStorage.setItem('likes', JSON.stringify(newLikes));
    setIsLiked(false);
  };

  const handleLikeMovie = () => {
    const likes = localStorage.getItem('likes') || [];
    const parsedLikes = likes.length ? JSON.parse(likes) : [];

    let newLikes = parsedLikes;

    if (!isLiked) {
      newLikes.push(movieData);
      localStorage.setItem('likes', JSON.stringify(newLikes));
      setIsLiked(true);
    } else {
      handleDeleteMovie();
    }
  };

  useEffect(() => {
    handleGetMovieData();
  }, [handleGetMovieData]);

  return (
    <div className={'wrapper'}>
      <div className={'back'} onClick={() => navigate('/')}>
        <img src={arrowLeftIcon} width={18} height={18} alt="" />
        <p>
          Back to <strong>Home</strong>
        </p>
      </div>
      <div className={'introduction'}>
        <h1>MOVIE DETAILS</h1>
        <p></p>
      </div>
      <div className={'content'}>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className={'details'}>
            <div className={'thumbnail'}>
              <img src={movieData.Poster} alt="" className="movie-poster" />
            </div>
            <div>
              <div className="title">{`${movieData?.Title} (${movieData?.Year})`}</div>
              <div className="card-content">
                <ul>
                  <li>
                    Rating: <strong>{`${movieData?.Ratings[0].Value}`}</strong>
                  </li>
                  <li>
                    Director: <strong>{`${movieData?.Director}`}</strong>
                  </li>
                  <li>
                    Genre: <strong>{`${movieData?.Genre}`}</strong>
                  </li>
                  <li>
                    Release: <strong>{`${movieData?.Released}`}</strong>
                  </li>
                  <li>
                    Runtime: <strong>{`${movieData?.Runtime}`}</strong>
                  </li>
                </ul>
                <p>
                  Starring: <strong>{movieData.Actors}</strong>.
                </p>
                <p>{movieData?.Plot}</p>
              </div>
            </div>
          </div>
        )}
      </div>
      {!loading && (
        <div className="button-wrapper">
          <button
            className="btn add"
            disabled={isLiked}
            style={
              isLiked
                ? { opacity: '0.6', background: 'grey', cursor: 'default' }
                : {}
            }
            onClick={handleLikeMovie}
          >
            Add to My List
          </button>
          <button className="btn delete" onClick={handleDeleteMovie}>
            Remove from My List
          </button>
        </div>
      )}
    </div>
  );
}
