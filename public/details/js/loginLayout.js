// loginLayout.js
function createLoginLayout() {
  const subLayoutContainer = document.getElementById('loginLayout');
  const subLayoutHTML = generateLoginLayoutHTML();
  subLayoutContainer.innerHTML = subLayoutHTML;

  const loginForm = document.querySelector('.form-signin form');
  loginForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const email = document.getElementById('floatingInput').value;
      const password = document.getElementById('floatingPassword').value;

      // 저장된 이메일과 비밀번호 가져오기
      const storedEmail = localStorage.getItem('userEmail');
      const storedPassword = localStorage.getItem('userPassword');

      // 로그인 처리
      if (email === storedEmail && password === storedPassword) {
          // Local Storage에 로그인 상태 저장
          localStorage.setItem('loggedIn', 'true');

          // 로그인 성공
          window.location.href = 'http://localhost:3000/';
      } else {
          alert('이메일 또는 비밀번호가 잘못되었습니다.');
      }
  });
}

function generateLoginLayoutHTML(){
  return `
      <div class="form-signin w-100 m-auto">
          <form>
              <h1 class="h3 mb-3 fw-normal">로그인</h1>

              <div class="form-floating">
                  <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" required>
                  <label for="floatingInput">Email address</label>
              </div>
              <div class="form-floating">
                  <input type="password" class="form-control" id="floatingPassword" placeholder="Password" required>
                  <label for="floatingPassword">Password</label>
              </div>

              <div class="form-check text-start my-3">
                  <input class="form-check-input" type="checkbox" value="remember-me" id="flexCheckDefault">
                  <label class="form-check-label" for="flexCheckDefault">
                      계정 기억하기
                  </label>
              </div>
              <button class="btn btn-primary w-100 py-2" type="submit">로그인</button>
          </form>
      </div>
  `;
}

export { createLoginLayout };
