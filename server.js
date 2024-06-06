const express = require('express');
const qs = require('qs');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use((req, res, next) => {
  console.log(`Request URL: ${req.url}`);
  next();
});

const apiKey = process.env.API_KEY;
const baseUrl = 'https://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json';

app.get('/movies', (req, res) => {
  const query = qs.stringify({
    key: apiKey,
    targetDt: req.query.targetDt || '20220101' // 기본값으로 2022년 1월 1일 설정
  });

  const url = `${baseUrl}?${query}`;

  res.json({ url });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
