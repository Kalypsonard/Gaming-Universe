function getData() {
  fetch('data.json')
    .then((response) => {
      if (!response.ok) {
        throw new Error('La réponse du réseau n\'était pas correcte');
      }
      return response.json();
    })
    .then((data) => {
      console.log(data); // Vérification des données dans la console
      updateNavbar(data.magazine);
      updateHeroBanner(data.magazine);
      updateMainArticle(data.magazine.articlePrincipal);
      updateArticles(data.magazine.articles);
      updateAuthors(data.magazine.auteurs);
      updateFooter(data.magazine);
    })
    .catch((error) => console.error('Erreur lors de la lecture des données :', error));
}

function updateNavbar(magazine) {
  let navbar = document.getElementById('navbar');
  navbar.innerHTML = `
    <div id="logo-container">
      <img src="images/manette.png" alt="Logo du site" id="logo">
      <span id="site-name">${magazine.nomJournal}</span>
    </div>
    <nav id="main-nav">
      <ul class="dropdown-menu">
        ${magazine.menuItems.slice(0, 4).map(item => `<li><a href="?theme=${item}">${item}</a></li>`).join('')}
      </ul>
    </nav>
    <div id="nav-actions">
      <button id="subscribe-btn">${magazine.texteAppelAction}</button>
      <div id="user-profile">
        <img src="images/img09.png" alt="Profil Utilisateur" id="profile-icon">
      </div>
    </div>
  `;
}


function updateHeroBanner(magazine) {
  let heroBanner = document.getElementById('hero-banner');
  heroBanner.innerHTML = `
    <div id="hero-content">
      <h1 id="hero-site-name">${magazine.nomJournal}</h1>
      <p id="hero-tagline">${magazine.phraseAccroche}</p>
      <div id="hero-themes">
        ${magazine.themes.slice(0, 4).map(theme => `
          <div class="hero-theme-item">
            <h3>${theme.nom}</h3>
            <p>${theme.description}</p>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}


function updateMainArticle(article) {
  let mainArticle = document.getElementById('main-article');
  mainArticle.innerHTML = `
    <div id="main-article-image-container">
      <img id="main-article-image" src="${article.image}" alt="${article.titre}">
    </div>
    <div id="main-article-text">
      <h2 id="main-article-title">${article.titre}</h2>
      <p id="main-article-description">${article.description}</p>
      <p id="main-article-date">${article.date}</p>
    </div>
  `;
}



function updateArticles(articles) {
  let articlesList = document.getElementById('articles');
  articlesList.innerHTML = `
    <h3>Articles Récents</h3>
    <div id="articles-list" class="articles-container">
      ${articles.map(article => `
        <div class="article">
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
        </div>
      `).join('')}
    </div>
  `;
}

function updateAuthors(authors) {
  let authorsList = document.getElementById('authors');
  authorsList.innerHTML = `
    <h3>Auteurs</h3>
    <div id="authors-list">
      ${authors.map(author => `
        <div class="author">
          <img src="${author.image}" alt="${author.prenom}" class="author-image">
          <h4>${author.prenom}</h4>
          <p><em>${author.typeExperience}</em></p>
          <p>${author.presentation}</p>
        </div>
      `).join('')}
    </div>
  `;
}

function updateFooter(magazine) {
  let footer = document.getElementById('site-footer');
  footer.innerHTML = `
    <div class="footer-container">
      <div class="footer-logo">
        <img src="images/manette.png" alt="Logo du site">
        <h4>${magazine.nomJournal}</h4>
      </div>
      <div class="footer-links">
        <nav>
          <ul>
            ${magazine.menuItems.map(item => `<li><a href="#${item}">${item}</a></li>`).join('')}
          </ul>
        </nav>
      </div>
      <div class="footer-socials">
        <p>Suivez-nous :</p>
        <a href="https://facebook.com" target="_blank"><img src="images/facebook.png" alt="Facebook"></a>
        <a href="https://twitter.com" target="_blank"><img src="images/twitter.png" alt="Twitter"></a>
        <a href="https://instagram.com" target="_blank"><img src="images/instagram.png" alt="Instagram"></a>
      </div>
      <div class="footer-copyright">
        <p>© 2024 Gaming Universe. Tous droits réservés.</p>
      </div>
    </div>
  `;
}


document.addEventListener('DOMContentLoaded', () => {
  getData();

  let scrollButton = document.getElementById('scroll-to-top');
  let footer = document.getElementById('site-footer');
  let authorsSection = document.getElementById('authors');


  function isElementInViewport(el) {
    let rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
  window.addEventListener('scroll', () => {
    if (isElementInViewport(footer)) {
      scrollButton.classList.remove('show');
    } 
    else if (isElementInViewport(authorsSection)) {
      scrollButton.classList.add('hide');
    }
    else if (window.scrollY > 300) {
      scrollButton.classList.add('show');
    } else {
      scrollButton.classList.remove('show');
    }
  });

  scrollButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});

