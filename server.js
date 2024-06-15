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

app.get('/movies', async (req, res) => {
  const query = qs.stringify({
    key: apiKey,
    targetDt: req.query.targetDt || '20230314'
  });

  const url = `${baseUrl}?${query}`;

  const fetch = (await import('node-fetch')).default;
  const response = await fetch(url);
  const data = await response.json();

  const result = data.boxOfficeResult?.dailyBoxOfficeList || [];
  res.json({ result });
});

// TMDb API 설정
const tmdbApiKey = process.env.TMDB_API_KEY;
const tmdbBaseUrl = 'https://api.themoviedb.org/3';

// 현재 상영 중인 영화 불러오기
app.get('/movies/now_playing', async (req, res) => {
  const query = qs.stringify({
    api_key: tmdbApiKey,
    language: 'ko-KR',
    region: 'KR'
  });

  const url = `${tmdbBaseUrl}/movie/now_playing?${query}`;

  try {
    const fetch = (await import('node-fetch')).default;
    const response = await fetch(url);
    const data = await response.json();

    const result = data.results || [];
    res.json({ result });
  } catch (error) {
    console.error('현재 상영 중인 영화를 불러오는 중 오류 발생:', error);
    res.status(500).json({ error: '현재 상영 중인 영화를 불러오는 데 실패했습니다.' });
  }
});


// 상영 예정작 불러오기
app.get('/movies/upcoming', async (req, res) => {
  const query = qs.stringify({
    api_key: tmdbApiKey,
    language: 'ko-KR',
    region: 'KR'
  });

  const url = `${tmdbBaseUrl}/movie/upcoming?${query}`;

  try {
    const fetch = (await import('node-fetch')).default;
    const response = await fetch(url);
    const data = await response.json();

    const result = data.results || [];
    res.json({ result });
  } catch (error) {
    console.error('상영예정작 영화를 불러오는 중 오류 발생:', error);
    res.status(500).json({ error: '상영예정작 영화를 불러오는 데 실패했습니다.' });
  }
});


// EJS 템플릿을 렌더링하는 라우트 추가
app.get('/', (req, res) => {
  res.render('index', { movies: [] });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
