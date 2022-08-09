var app = {
  // Taille de la grille par défaut
  gridSize: 8,
  // Taille des pixels par défaut
  pixelSize: 25,
  // Ma div #invader
  drawingArea: document.getElementById('invader'),
  // Formulaire de configuration
  form: document.querySelector('.configuration'),
  // Listes des couleurs disponibles
  styles: [
    'plain',
    'empty',
    'light',
    'highlight',
  ],
  // Couleur par défaut
  chosenStyle: 'plain',

  // Cette fonction est appelée quand le DOM est chargé
  init() {
    app.drawBoard();
    app.fillForm();
    app.addPalette();
  },

  // Permet de gérer le style de nos lignes
  setLineStyle(line) {
    line.className = 'line';
    line.style.width = (app.gridSize * app.pixelSize) + 'px';
  },

  setPixelStyle(pixel) {
    pixel.className = 'pixel';
    pixel.style.width = pixel.style.height = app.pixelSize + 'px';
  },

  // Appelée quand on clique sur un pixel
  handlePixelClick(event) {
    var pixel = event.target; // La div .pixel qui a déclenché l'évènement
    // On enlève le style actuel quel qu'il soit !
    app.styles.forEach(function(currentStyle) {
      pixel.classList.remove('pixel--' + currentStyle);
    });
    // Et on ajoute celui sélectionné
    pixel.classList.add('pixel--' + app.chosenStyle);
  },

  // Permet de dessiner ma grille de pixels
  drawBoard() {
    for (var i = 0; i < app.gridSize; i++) {
      var line = document.createElement('div');
      app.setLineStyle(line);

      for (var j = 0; j < app.gridSize; j++) {
        var pixel = document.createElement('div');
        pixel.addEventListener('click', app.handlePixelClick);
        app.setPixelStyle(pixel);
        line.appendChild(pixel);
      }

      app.drawingArea.appendChild(line);
    }
  },

  // Permet de générer nos champs "number" pour le formulaire
  generateInput(placeholder) {
    var input = document.createElement('input');
    input.placeholder = placeholder;
    input.type = 'number';
    app.form.appendChild(input);
  },

  // Etape 3 : On gère la soumission du formulaire
  handleSubmit(event) {
    event.preventDefault(); // On annule le comportement par défaut

    // On sélectionne le premier enfant du formulaire
    var gridInput = event.target.childNodes[0];
    // On récupère la valeur du champ pour la taille de la grille
    var gridValue = Number(gridInput.value);

    // On sélectionne le deuxième enfant du formulaire
    var pixelInput = event.target.childNodes[1];
    // On récupère la valeur du champ pour la taille des pixels
    var pixelValue = Number(pixelInput.value);

    if (gridValue) {
      app.gridSize = gridValue;
      app.pixelSize = pixelValue;
      // On supprime la grille actuelle
      app.drawingArea.innerHTML = '';
      app.drawBoard();
    }
  },

  // Création du formulaire
  fillForm() {
    app.generateInput('Taille de la grille');
    app.generateInput('Taille des pixels');

    // Création du bouton de soumission
    var button = document.createElement('button');
    button.textContent = 'Valider';
    app.form.appendChild(button);

    // Etape 3 : Gestion de la soumission du formulaire
    app.form.addEventListener('submit', app.handleSubmit);
  },

  // Permet d'ajouter les couleurs à notre palette
  addStyle(style) {
    var color = document.createElement('a');
    color.className = 'palette-color palette-color--' + style;
    if (style === app.chosenStyle) { // Si la couleur est celle sélectionnée ...
      color.className += ' palette-color--active'; // ... On lui rajoute une classe
    }
    // dataset permet d'associer une information à un élément
    color.dataset.name = style;
    // On ajoute un event listener quand on clique sur une couleur
    color.addEventListener('click', app.handleColorClick);
    app.palette.appendChild(color);
  },

  // On gère le clic sur une couleur de la palette
  handleColorClick(event) {
    // On récupère l'ancienne couleur active pour ...
    var oldColorElement = document.querySelector('.palette-color--active');
    // ... lui supprimer la classe active
    oldColorElement.classList.remove('palette-color--active');
    // On récupère la couleur cliquée avec l'objet d'évènement ...
    var newColorElement = event.target;
    // ... pour lui ajouter la classe active
    newColorElement.classList.add('palette-color--active');
    // On récupère le data-name sur la couleur cliqué pour le stocker
    app.chosenStyle = newColorElement.dataset.name;
  },

  // On vient créer la palette de couleur
  addPalette() {
    app.palette = document.createElement('div'); // On créé une propriété qui sera disponible partout
    app.palette.className = 'palette';
    app.styles.forEach(app.addStyle); // On utilise le forEach() qu'on a vu ce matin
    document.body.appendChild(app.palette);
  },
};

document.addEventListener('DOMContentLoaded', app.init);
