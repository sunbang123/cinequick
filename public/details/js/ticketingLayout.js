// ticketingLayout.js
function createTicketingLayout(data) {
    const subLayoutContainer = document.getElementById('ticketingLayout');
    const subLayoutHTML = generateSubLayoutHTML(data);
    subLayoutContainer.innerHTML = subLayoutHTML;
}

function generateSubLayoutHTML(data) {
    return `
        <div class="container">
            <div class="row">
                <div class="col-4">
                    <div class="d-flex flex-column align-items-stretch flex-shrink-0 bg-body-tertiary" style="height: 500px; overflow-y: scroll;">
                        <a href="/" class="d-flex align-items-center flex-shrink-0 p-3 link-body-emphasis text-decoration-none border-bottom">
                            <svg class="bi pe-none me-2" width="30" height="24"><use xlink:href="#bootstrap"></use></svg>
                            <span class="fs-5 fw-semibold">List group</span>
                        </a>
                        <div class="list-group list-group-flush border-bottom scrollarea">
                            ${generateListItems(data)}
                        </div>
                    </div>
                </div>  
                <div class="col-4">
                <input type="date" class="form-control mb-3" min="2024-06-22" max="2024-06-23"/>
                <button class="btn btn-primary">예매하기</button>
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
        content: `Now Playing`
        })),
        ...data.upcomingMovies.map(movie => ({
        heading: movie.title,
        date: movie.releaseDate,
        content: `Coming Soon`
        }))
    ];

    return listItems.map(item => `
        <a href="#" class="list-group-item list-group-item-action py-3 lh-sm">
        <div class="d-flex w-100 align-items-center justify-content-between">
            <strong class="mb-1">${item.heading}</strong>
            <small class="text-body-secondary">${item.date}</small>
        </div>
        <div class="col-10 mb-1 small">${item.content}</div>
        </a>
    `).join('');
}
export { createTicketingLayout };