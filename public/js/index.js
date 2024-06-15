function fetchMoviesDetail() {
    const targetDateInput = document.querySelector('#targetDate'); // 날짜 입력 필드
    const targetDate = new Date(targetDateInput.value);
    const targetDt = targetDateInput.value 
        ? `${targetDate.getFullYear()}${('0' + (targetDate.getMonth() + 1)).slice(-2)}${('0' + targetDate.getDate()).slice(-2)}` // 날짜 문자열 반환
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
        console.log(json);
    })
    .catch(error => console.error('Error fetching movies:', error));
}

const IMAGE_BASE_URL = 'http://image.tmdb.org/t/p/original';

function fetchNowPlayingMovies() {
    fetch('/movies/now_playing')
    .then(response => response.json())
    .then((json) => {
        const ul = document.querySelector('#nowPlayingList');
        ul.innerHTML = '';
        if (json.result && Array.isArray(json.result)) {
            for (let i = 0; i < json.result.length; i++) {
                ul.innerHTML += `<li>${json.result[i].title} - ${json.result[i].release_date} 첫 상영</li><img src='${IMAGE_BASE_URL}${json.result[i].poster_path}' width="250px"/> `;
            }
        } else {
            ul.innerHTML = `<li>No movies found</li>`;
        }
        console.log(json);
    })
    .catch(error => console.error('Error fetching movies:', error));
}


function fetchUpcomingMovies() {
    fetch('/movies/upcoming')
    .then(response => response.json())
    .then((json) => {
        const ul = document.querySelector('#upcomingList');
        ul.innerHTML = '';
        if (json.result && Array.isArray(json.result)) {
            for (let i = 0; i < json.result.length; i++) {
                ul.innerHTML += `<li>${json.result[i].title} - ${json.result[i].release_date} 첫 상영</li><img src='${IMAGE_BASE_URL}${json.result[i].poster_path}' width="250px"/> `;
            }
        } else {
            ul.innerHTML = `<li>No movies found</li>`;
        }
        console.log(json);
    })
    .catch(error => console.error('Error fetching movies:', error));
}

const btn1 = document.querySelector('#btnGenMoviesDetail');
const btn2 = document.querySelector('#btnGenCurrentMoviesDetail');
const btn3 = document.querySelector('#btnGenUpcomingMoviesDetail');

btn1.addEventListener('click', fetchMoviesDetail);
btn2.addEventListener('click', fetchNowPlayingMovies);
btn3.addEventListener('click', fetchUpcomingMovies);
