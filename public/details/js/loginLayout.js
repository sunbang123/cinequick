// loginLayout.js
function createLoginLayout() {
  const subLayoutContainer = document.getElementById('loginLayout');
  const subLayoutHTML = generateLoginLayoutHTML();
  subLayoutContainer.innerHTML = subLayoutHTML;
}

function generateLoginLayoutHTML(){
  return `
    <div class="form-signin w-100 m-auto">
      <form>
        <h1 class="h3 mb-3 fw-normal">로그인</h1>

        <div class="form-floating">
          <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com">
          <label for="floatingInput">Email address</label>
        </div>
        <div class="form-floating">
          <input type="password" class="form-control" id="floatingPassword" placeholder="Password">
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
  `
}

export { createLoginLayout };