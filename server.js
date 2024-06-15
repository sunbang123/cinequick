const express = require('express');
const qs = require('qs');
require('dotenv').config();
const app = express();
const port = 3000;

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

  // 반환되는 데이터의 구조를 확인하고 필요한 경우 수정합니다.
  const result = data.boxOfficeResult?.dailyBoxOfficeList || [];
  res.json({ result });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
