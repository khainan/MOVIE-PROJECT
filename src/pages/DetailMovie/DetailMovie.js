import type { NextPage } from 'next';
import Router from 'next/router';
import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Image from 'next/image';

// assets
import homeIcon from '../public/assets/home-icon.png';
import starIcon from '../public/assets/star-icon.png';
import arrowLeftIcon from '../public/assets/arrow-left-icon.png';

// components
import HeaderSidebar from '../src/components/HeaderSidebar';

// styles
import styles from '../styles/Home.module.scss';

// utils
import { translate } from '../src/utils/translate';

type Movie = {
  id: string;
  title: string;
  year: number;
  imageUrl: string;
  desc: string;
  duration: string;
  genre: string;
  imageLargeUrl: string;
  rating: number;
  releaseDate: string;
  starring: any;
};

const DetailMoviePage: NextPage<Movie> = () => {
  const [movieData, setMovieData] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState('en');
  const [showFullscreen, setShowFullscreen] = useState(false);

  const ref = useRef<HTMLDivElement>(null);
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

  const handleOutsideClick = (e: any) => {
    if (ref.current && !ref.current.contains(e.target) && showFullscreen) {
      setShowFullscreen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  });

  const handleGetMovieData = async () => {
    const { movieId } = Router.query;
    await fetch(
      `https://private-2fff44-bncfetest.apiary-mock.com/movies/${movieId}`,
      {
        method: 'GET',
      }
    )
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
        console.log('Failed fetch the data');
      })
      .then((result) => {
        if (result) {
          setMovieData(result.data);
          setLoading(false);
        }
      })
      .catch(() => Router.back());
  };

  const handleChangeLanguage = (lang: string) => {
    setLanguage(lang);
    localStorage.setItem('lang', lang);
  };

  const handleFullscreen = () => {
    setShowFullscreen((prevState) => !prevState);
  };

  useEffect(() => {
    localStorage.setItem('lang', language);
    handleGetMovieData();
  }, [language]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Movie Details</title>
        <meta name="description" content="Details Page by Movie App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeaderSidebar
        menus={menus}
        language={language}
        onChangeLanguage={(lang: string) => handleChangeLanguage(lang)}
      >
        <div className={styles.wrapper}>
          <div className={styles.back} onClick={() => Router.back()}>
            <Image src={arrowLeftIcon} width={18} height={18} alt="" />
            <p>
              Back to <strong>Home</strong>
            </p>
          </div>
          <div className={styles.introduction}>
            <h1>MOVIE DETAILS</h1>
            <p>{translate('detailsIntroduction', language)}</p>
            <p></p>
          </div>
          <div className={styles.content}>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <div className={styles.details}>
                <div className={styles.thumbnail}>
                  <Image
                    src={movieData ? movieData.imageLargeUrl : ''}
                    alt=""
                    width={600}
                    height={600}
                    onClick={handleFullscreen}
                  />
                </div>
                <div
                  className={styles.title}
                >{`${movieData?.title} (${movieData?.year})`}</div>
                <div className={styles['card-content']}>
                  <ul>
                    <li>
                      Rating: <strong>{`${movieData?.rating}`}</strong>
                    </li>
                    <li>
                      Genre: <strong>{`${movieData?.genre}`}</strong>
                    </li>
                    <li>
                      Release: <strong>{`${movieData?.releaseDate}`}</strong>
                    </li>
                    <li>
                      Runtime: <strong>{`${movieData?.duration}`}</strong>
                    </li>
                  </ul>
                  <p>
                    Starring:{' '}
                    <strong>{`${(movieData ? movieData.starring : []).map(
                      (star: string) => ` ${star}`
                    )}`}</strong>
                    .
                  </p>
                  <p>{movieData?.desc}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </HeaderSidebar>
      {showFullscreen && (
        <div className={styles.fullscreen}>
          <div className={styles['fullscreen-content']} ref={ref}>
            <Image
              src={movieData ? movieData.imageLargeUrl : ''}
              alt=""
              width={1000}
              height={1000}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailMoviePage;
