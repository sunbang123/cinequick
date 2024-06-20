const express = require('express');
const qs = require('qs');
require('dotenv').config();
const app = express();
const port = 3000;

// EJS 설정
app.set('view engine', 'ejs');
app.set('views', './views');

// 정적 파일 제공
app.use(express.static("public"));
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

// 영화 데이터 렌더링 라우트
app.get('/', async (req, res) => {
  try {
    const targetDt = req.query.targetDt || '20230314';
    const dailyBoxOfficeQuery = qs.stringify({
      key: apiKey,
      targetDt: targetDt
    });

    const dailyBoxOfficeUrl = `${baseUrl}?${dailyBoxOfficeQuery}`;
    const dailyBoxOfficeData = await fetchMovieData(dailyBoxOfficeUrl);
    const dailyBoxOfficeMovies = dailyBoxOfficeData.boxOfficeResult?.dailyBoxOfficeList || [];

    const nowPlayingQuery = qs.stringify({
      api_key: tmdbApiKey,
      language: 'ko-KR',
      region: 'KR'
    });

    const nowPlayingUrl = `${tmdbBaseUrl}/movie/now_playing?${nowPlayingQuery}`;
    const nowPlayingData = await fetchMovieData(nowPlayingUrl);
    const nowPlayingMovies = nowPlayingData.results || [];

    const upcomingQuery = qs.stringify({
      api_key: tmdbApiKey,
      language: 'ko-KR',
      region: 'KR'
    });

    const upcomingUrl = `${tmdbBaseUrl}/movie/upcoming?${upcomingQuery}`;
    const upcomingData = await fetchMovieData(upcomingUrl);
    const upcomingMovies = upcomingData.results || [];

    res.render('index', {
      dailyBoxOfficeMovies: dailyBoxOfficeMovies,
      nowPlayingMovies: nowPlayingMovies,
      upcomingMovies: upcomingMovies,
      imageBaseUrl: 'http://image.tmdb.org/t/p/original'
    });
    
  } catch (error) {
    console.error('Error rendering movie data:', error);
    res.status(500).json({ error: 'Failed to render movie data' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});