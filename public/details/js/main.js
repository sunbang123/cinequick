// main.js
import { createLoginLayout } from './loginLayout.js';
import { createAccountLayout } from './accountLayout.js';
import { createTicketingLayout } from './ticketingLayout.js';

window.addEventListener('load', () => {
    const currentPath = window.location.pathname;

    // 원하는 경로들을 배열로 지정합니다.
    const specificPaths = ['/details/ticketing', '/details/login', '/details/account'];

    if (specificPaths.includes(currentPath)) {
        if(currentPath == specificPaths[0])
            fetch('/movie/api')
                .then(response => response.json())
                .then(data => {
                    // 가져온 JSON 데이터를 사용하여 작업 수행
                    console.log(data);
                    // data.dailyBoxOfficeMovies, data.nowPlayingMovies, data.upcomingMovies 등을 사용
                            
                    // createSubLayout 함수 호출
                    createTicketingLayout(data);
                })
                .catch(error => {
                console.error('Error fetching movie data:', error);
                });
    
        else if(currentPath == specificPaths[1])
            createLoginLayout();
        else if(currentPath == specificPaths[2])
            createAccountLayout();
    }
});