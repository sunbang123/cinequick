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

// EJS 템플릿을 렌더링하는 라우트 추가
app.get('/', (req, res) => {
  res.render('index', { movies: [] });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
