import '../styles/style.scss';
import getUserInfos from './services';

const searchBtn = global.document.getElementsByClassName('search__btn')[0];
const errorNotFound = global.document.getElementsByClassName(
  'error__notfound'
)[0];

function searchUser() {
  const searchInpuValue = global.document.getElementsByClassName(
    'search-input'
  )[0].value;

  if (searchInpuValue === '') {
    alert('oi');
  } else {
    const name = global.document.getElementsByClassName('name')[0];
    const repos = global.document.getElementsByClassName('repos')[0];

    getUserInfos(searchInpuValue)
      .then(response => {
        if (response.status === 403) {
          errorNotFound.classList.add('active');
        } else {
          response.json();
        }
      })
      .then(data => {
        name.innerHTML = data.name;
      })
      .catch(error => {
        console.log(error);
      });

    getUserInfos(`${searchInpuValue}/repos`)
      .then(response => {
        if (response.status === 403) {
          errorNotFound.classList.add('active');
        } else {
          response.json();
        }
      })
      .then(data => {
        repos.innerHTML = `Repositorios ${data.map(
          repo =>
            `<li class="repos-item"><a href="${repo.html_url}">${
              repo.name
            }</a></l>`
        )}`;
      })
      .catch(error => {
        console.log(error);
      });
  }
}

searchBtn.addEventListener('click', () => searchUser());
