function getData() {
  fetch('data.json')
    .then((response) => {
      if (!response.ok) {
        throw new Error('La réponse du réseau n\'était pas correcte');
      }
      return response.json();
    })
    .then((data) => {
      console.log(data); 
      updateMagazineInfo(data.magazine);
      updateMainArticle(data.magazine.articlePrincipal);
      updateArticles(data.magazine.articles);
      updateThemes(data.magazine.themes);
      updateAuthors(data.magazine.auteurs);
    })
    .catch((error) => console.error('Erreur lors de la lecture des données :', error));
}


function updateMagazineInfo(magazine) {
  document.getElementById('magazine-name').textContent = magazine.nomJournal;
  document.getElementById('magazine-tagline').textContent = magazine.phraseAccroche;
  document.getElementById('subscribe-btn').textContent = magazine.texteAppelAction;
}

function updateMainArticle(article) {
  document.getElementById('main-article-title').textContent = article.titre;
  document.getElementById('main-article-description').textContent = article.description;
  document.getElementById('main-article-date').textContent = article.date;
  document.getElementById('main-article-image').src = article.image;
}

function updateArticles(articles) {
  let articlesList = document.getElementById('articles-list');
  articlesList.innerHTML = '';

  articles.forEach((article) => {
    let articleDiv = document.createElement('div');
    articleDiv.classList.add('article');
    articleDiv.innerHTML = `
      <div class="article-content">
        <img class="article-image" src="${article.image}" alt="${article.titre}">
        <div class="article-text">
          <h4>${article.titre}</h4>
          <p>${article.date}</p>
          <p>${article.description}</p>
          <p><strong>Thème :</strong> ${article.theme}</p>
          <button class="read-article-btn">Lire l'Article</button>
        </div>
      </div>
    `;
    articlesList.appendChild(articleDiv);
  });
}
function updateThemes(themes) {
  let themesSection = document.getElementById('themes');
  themesSection.innerHTML = ''; 

  themes.forEach((theme) => {
    let themeDiv = document.createElement('div');
    themeDiv.classList.add('theme-item');
    themeDiv.innerHTML = `
      <h4>${theme.nom}</h4>
      <p>${theme.description}</p>
    `;
    themesSection.appendChild(themeDiv);
  });
}
function updateAuthors(authors) {
  let authorsList = document.getElementById('authors-list');
  authorsList.innerHTML = ''; 

  authors.forEach((author) => {
    let authorDiv = document.createElement('div');
    authorDiv.classList.add('author');
    authorDiv.innerHTML = `
      <img src="${author.image}" alt="${author.prenom}" class="author-image">
      <h4>${author.prenom}</h4>
      <p><em>${author.typeExperience}</em></p>
      <p>${author.presentation}</p>
    `;
    authorsList.appendChild(authorDiv);
  });
}
document.addEventListener('DOMContentLoaded', () => {
  let scrollToTopButton = document.getElementById('scroll-to-top');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollToTopButton.style.display = 'flex';
    } else {
      scrollToTopButton.style.display = 'none';
    }
  });
  scrollToTopButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });
});


getData();
