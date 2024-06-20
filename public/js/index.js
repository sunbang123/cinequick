document.addEventListener('DOMContentLoaded', function() {
    const today = new Date();
    // 어제 날짜를 계산합니다.
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const targetDt = yesterday 
        ? `${yesterday.getFullYear()}${('0' + (yesterday.getMonth() + 1)).slice(-2)}${('0' + yesterday.getDate()).slice(-2)}` // 날짜 문자열 반환
        : '20230314'; // 기본값으로 20230314 설정

    fetch(`/movies?targetDt=${targetDt}`)
    .then(response => response.json())
    .then((json) => {
        const ul = document.querySelector("#movieList");
        ul.innerHTML = '';  // 기존 내용을 지웁니다
        if (json.result && Array.isArray(json.result)) {
            for (let i = 0; i < json.result.length; i++) {
                ul.innerHTML += `<li>${json.result[i].movieNm} - ${json.result[i].openDt} - ${json.result[i].audiAcc} 관객</li>`;
            }
        } else {
            ul.innerHTML = `<li>No movies found</li>`;
        }
    })
    .catch(error => console.error('Error fetching movies:', error));
});

const IMAGE_BASE_URL = 'http://image.tmdb.org/t/p/original';

document.addEventListener('DOMContentLoaded', function() {
    fetch('/movies/now_playing')
    .then(response => response.json())
    .then((json) => {
        const ul = document.querySelector('#nowPlayingList');
        ul.innerHTML = '';
        if (json.result && Array.isArray(json.result)) {
            for (let i = 0; i < 7; i++) {
                ul.innerHTML += `<li>${json.result[i].title} - ${json.result[i].release_date} 첫 상영</li><img src='${IMAGE_BASE_URL}${json.result[i].poster_path}' width="250px"/> </li>`;
            }
        } else {
            ul.innerHTML = `<li>No movies found</li>`;
        }
        r = Math.floor(Math.random() * 5);
        ul.innerHTML += `<img src='${IMAGE_BASE_URL}${json.result[r].backdrop_path}' width="250px"/>`;

        console.log(json);
    })

    .catch(error => console.error('Error fetching movies:', error));
});

document.addEventListener('DOMContentLoaded', function() {
    fetch('/movies/upcoming')
    .then(response => response.json())
    .then((json) => {
        const ul = document.querySelector('#upcomingList');
        ul.innerHTML = '';
        if (json.result && Array.isArray(json.result)) {
            for (let i = 0; i < 7; i++) {
                ul.innerHTML += `<li>${json.result[i].title} - ${json.result[i].release_date} 첫 상영</li><img src='${IMAGE_BASE_URL}${json.result[i].poster_path}' width="250px"/> `;
            }
        } else {
            ul.innerHTML = `<li>No movies found</li>`;
        }
        console.log(json);
    })
    .catch(error => console.error('Error fetching movies:', error));
});