// ticketingLayout.js
export function createTicketingLayout(data) {
    const subLayoutContainer = document.getElementById('ticketingLayout');
    const subLayoutHTML = generateSubLayoutHTML(data);
    subLayoutContainer.innerHTML = subLayoutHTML;
}

function formatDate(date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function generateSubLayoutHTML(data) {
    // 현재날짜
    const currentDate = new Date();
    // 현재날짜에서 2주후
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 14);

    const minDateFormatted = formatDate(currentDate);
    const maxDateFormatted = formatDate(maxDate);

    return `
        <div class="container">
            <div class="row">
                <div class="col-4">
                    <div class="d-flex flex-column align-items-stretch flex-shrink-0 bg-body-tertiary" style="height: 500px; overflow-y: scroll;">
                        <a href="/" class="d-flex align-items-center flex-shrink-0 p-3 link-body-emphasis text-decoration-none border-bottom">
                            <span class="fs-5 fw-semibold">상영중인 영화 목록</span>
                        </a>
                        <div class="list-group list-group-flush border-bottom scrollarea">
                            <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                                ${generateListItems(data)}
                            </ul>
                        </div>
                    </div>
                </div>  
                <div class="col-4">
                <input type="date" class="form-control mb-3" min="${minDateFormatted}" max="${maxDateFormatted}"/>
                <div class="form-group my-3">
                    <label for="exampleFormControlSelect2">상영 시간</label>
                    <select multiple class="form-control" id="exampleFormControlSelect2">
                    <option>09:40</option>
                    <option>11:50</option>
                    <option>14:00</option>
                    <option>16:10</option>
                    <option>18:20</option>
                    <option>20:30</option>
                    <option>22:40</option>
                    <option>24:45</option>
                    </select>
                </div>
                <button class="btn btn-primary">예매하기</button>
                </div>
                <div class="col-4">
                    <div class="tab-content" id="pills-tabContent">
                        ${generateListItems_content(data)}
                    </div>
                </div>
            </div>
        </div>
    `;
}

function generateListItems(data) {
    const listItems = [
        ...data.nowPlayingMovies.map(movie => ({
        heading: movie.title,
        date: movie.releaseDate,
        id: movie.id,
        content: `Now Playing`
        })),
        ...data.upcomingMovies.map(movie => ({
        heading: movie.title,
        date: movie.releaseDate,
        id: movie.id,
        content: `Coming Soon`
        }))
    ];

    return listItems.map(item => `
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="${item.id}-tab" data-bs-toggle="pill" data-bs-target="#${item.id}" type="button" role="tab" aria-controls="${item.id}" aria-selected="false">
                    <a href="#" class="list-group-item list-group-item-action py-3 lh-sm">
                        <div class="d-flex w-100 align-items-center justify-content-between">
                            <strong class="mb-1">${item.heading}</strong>
                            <small class="text-body-secondary">${item.date}</small>
                        </div>
                        <div class="col-10 mb-1 small"></div>
                    </a>
                </button>
            </li>
    `).join('');
}

function generateListItems_content(data) {
    
    const listItems = [
        ...data.nowPlayingMovies.map(movie => ({
        heading: movie.title,
        id: movie.id,
        date: movie.releaseDate,
        poster_path: movie.poster_path,
        content: `Now Playing`
        })),
        ...data.upcomingMovies.map(movie => ({
        heading: movie.title,
        id: movie.id,
        date: movie.releaseDate,
        poster_path: movie.poster_path,
        content: `Coming Soon`
        }))
    ];
    
    return listItems.map(item => `
        <div class="tab-pane fade" id="${item.id}" role="tabpanel" aria-labelledby="${item.id}-tab" tabindex="0">
            <img class="img-fluid" src="http://image.tmdb.org/t/p/original${item.poster_path}" />
        </div>
    `).join('');
}