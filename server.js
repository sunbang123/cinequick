const express = require('express');
const qs = require('qs');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const apiKey = process.env.API_KEY;
const baseUrl = 'https://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json';

app.get('/movies', (req, res) => {
  const query = qs.stringify({
    key: apiKey,
    targetDt: req.query.targetDt || '20240601' // 기본값으로 2024년 6월 1일 설정
  });

  const url = `${baseUrl}?${query}`;

  // Postman을 통해 URL을 테스트할 수 있도록 URL을 응답으로 보냅니다.
  res.json({ url });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
