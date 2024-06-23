// AccountLayout.js
function createAccountLayout() {
    const subLayoutContainer = document.getElementById('accountLayout');
    const subLayoutHTML = generateAccountLayoutHTML();
    subLayoutContainer.innerHTML = subLayoutHTML;

    const accountForm = document.querySelector('.was-validated');
    accountForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const username = document.getElementById('uname').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('pwd').value;

        if (username && email && password) {
            // Local Storage에 저장
            localStorage.setItem('username', username);
            localStorage.setItem('userEmail', email);
            localStorage.setItem('userPassword', password);

            alert('회원가입이 완료되었습니다. 로그인해주세요.');
            window.location.href = '/details/login';
        } else {
            alert('모든 필드를 채워주세요.');
        }
    });
}

function generateAccountLayoutHTML(){
    return `
        <h1>회원가입</h1>
        <form class="was-validated">
        <div class="mb-3 mt-3">
            <label for="uname" class="form-label">Username:</label>
            <input type="text" class="form-control" id="uname" placeholder="Enter username" name="uname" required>
            <div class="valid-feedback">Valid.</div>
            <div class="invalid-feedback">Please fill out this field.</div>
        </div>
        <div class="mb-3">
            <label for="email" class="form-label">Email:</label>
            <input type="email" class="form-control" id="email" placeholder="Enter email" name="email" required>
            <div class="valid-feedback">Valid.</div>
            <div class="invalid-feedback">Please fill out this field.</div>
        </div>
        <div class="mb-3">
            <label for="pwd" class="form-label">Password:</label>
            <input type="password" class="form-control" id="pwd" placeholder="Enter password" name="pwd" required>
            <div class="valid-feedback">Valid.</div>
            <div class="invalid-feedback">Please fill out this field.</div>
        </div>
        <div class="form-check mb-3">
            <input class="form-check-input" type="checkbox" id="myCheck" name="remember" required>
            <label class="form-check-label" for="myCheck">I agree on blabla.</label>
            <div class="valid-feedback">Valid.</div>
            <div class="invalid-feedback">Check this checkbox to continue.</div>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    `;
}

export { createAccountLayout };
