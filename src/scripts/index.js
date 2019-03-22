import '../styles/style.scss';
import getUserInfos from './services';

const name = global.document.getElementsByClassName('name')[0];
const avatar = global.document.getElementsByClassName('avatar')[0];
const repos = global.document.getElementsByClassName('repos')[0];

const searchBtn = global.document.getElementsByClassName('search__btn')[0];
const errorNotFound = global.document.getElementsByClassName(
  'error__notfound'
)[0];

function searchUser() {
  const searchInpuValue = global.document.getElementsByClassName(
    'search-input'
  )[0].value;

  if (searchInpuValue) {
    alert('Please, enter the user name');
  } else {
    getUserInfos(searchInpuValue)
      .then((response) => {
        if (response.status === 403) {
          errorNotFound.classList.add('active');
        } else {
          return response.json();
        }
      })

      .then((data) => {
        name.innerHTML = data.name;
        avatar.src = data.avatar_url;
        avatar.classList.add('active');
      })
      .catch((error) => {
        console.log(error);
      });

    getUserInfos(`${searchInpuValue}/repos`)
      .then((response) => {
        if (response.status === 403) {
          errorNotFound.classList.add('active');
        } else {
          return response.json();
        }
      })
      .then((data) => {
        repos.innerHTML = data.map(
          (repo) =>
            `<li class="repos-item">
              <a href="${repo.html_url}">
                ${repo.name}
              </a>
             </li>`
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

searchBtn.addEventListener('click', searchUser);
