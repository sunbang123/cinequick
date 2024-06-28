const express = require('express');
const qs = require('qs');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');

// EJS 설정
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // 뷰 디렉토리 설정

// 정적 파일 제공
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.disable("x-powered-by");

app.use((req, res, next) => {
  console.log(`Request URL: ${req.url}`);
  next();
});

// kobis 일일 박스오피스 api 불러오기
const apiKey = process.env.API_KEY;
const baseUrl = 'https://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json';

// TMDb API 설정
const tmdbApiKey = process.env.TMDB_API_KEY;
const tmdbBaseUrl = 'https://api.themoviedb.org/3';

// 영화 데이터 가져오기 함수
async function fetchMovieData(url) {
  try {
    const fetch = (await import('node-fetch')).default;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching movie data:', error);
    throw error;
  }
}

const today = new Date();
const imageBaseUrl = 'http://image.tmdb.org/t/p/original';

// 어제 날짜를 계산하는 함수
function getYesterdayDate() {
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  return `${yesterday.getFullYear()}${('0' + (yesterday.getMonth() + 1)).slice(-2)}${('0' + yesterday.getDate()).slice(-2)}`;
}

// 일일 박스오피스 데이터를 가져오는 함수
async function fetchDailyBoxOfficeData(targetDt) {
  const dailyBoxOfficeQuery = qs.stringify({
    key: apiKey,
    targetDt: targetDt
  });

  const dailyBoxOfficeUrl = `${baseUrl}?${dailyBoxOfficeQuery}`;
  const dailyBoxOfficeData = await fetchMovieData(dailyBoxOfficeUrl);
  return dailyBoxOfficeData.boxOfficeResult?.dailyBoxOfficeList || [];
}

// 현재 상영 중인 영화 데이터를 가져오는 함수
async function fetchNowPlayingData() {
  const nowPlayingQuery = qs.stringify({
    api_key: tmdbApiKey,
    language: 'ko-KR',
    region: 'KR'
  });

  const nowPlayingUrl = `${tmdbBaseUrl}/movie/now_playing?${nowPlayingQuery}`;
  const nowPlayingData = await fetchMovieData(nowPlayingUrl);
  return nowPlayingData.results || [];
}

// 개봉 예정 영화 데이터를 가져오는 함수
async function fetchUpcomingData() {
  const upcomingQuery = qs.stringify({
    api_key: tmdbApiKey,
    language: 'ko-KR',
    region: 'KR'
  });

  const upcomingUrl = `${tmdbBaseUrl}/movie/upcoming?${upcomingQuery}`;
  const upcomingData = await fetchMovieData(upcomingUrl);
  return upcomingData.results || [];
}

// 영화 데이터 렌더링 라우트
app.get('/', async (req, res) => {
  try {
    const targetDt = getYesterdayDate();
    const dailyBoxOfficeMovies = await fetchDailyBoxOfficeData(targetDt);
    const nowPlayingMovies = await fetchNowPlayingData();
    const upcomingMovies = await fetchUpcomingData();

    res.render('index', {
      today: today,
      dailyBoxOfficeMovies: dailyBoxOfficeMovies,
      nowPlayingMovies: nowPlayingMovies,
      upcomingMovies: upcomingMovies,
      imageBaseUrl: imageBaseUrl
    });
    
  } catch (error) {
    console.error('Error rendering movie data:', error);
    res.status(500).json({ error: 'Failed to render movie data' });
  }
});

// details 라우트
app.get(['/details/ticketing', '/details/login', '/details/account'], async(req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'details', 'main.html'));
});

app.get('/movie/api', async (req, res) => {
  
  try {
    const nowPlayingMovies = await fetchNowPlayingData();
    const upcomingMovies = await fetchUpcomingData();

    res.json({
      nowPlayingMovies: nowPlayingMovies,
      upcomingMovies: upcomingMovies,
      imageBaseUrl: imageBaseUrl
    });        
  } catch (error) {
    console.error('Error rendering movie data:', error);
    res.status(500).json({ error: 'Failed to render movie data' });
  }

});


// 모든 라우트를 처리하는 핸들러
app.get('*', async (req, res) => {
  try {
    const targetDt = getYesterdayDate();
    const dailyBoxOfficeMovies = await fetchDailyBoxOfficeData(targetDt);
    const nowPlayingMovies = await fetchNowPlayingData();
    const upcomingMovies = await fetchUpcomingData();

    res.render('index', {
      today: today,
      dailyBoxOfficeMovies: dailyBoxOfficeMovies,
      nowPlayingMovies: nowPlayingMovies,
      upcomingMovies: upcomingMovies,
      imageBaseUrl: imageBaseUrl
    });
    
  } catch (error) {
    console.error('Error rendering movie data:', error);
    res.status(500).json({ error: 'Failed to render movie data' });
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});