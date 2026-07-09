const search = document.querySelector ('#search-form');
const filter = document.querySelector ('#filter');
const profileCardsContainer = document.querySelector ('#profile-cards');
const profileCards = document.querySelectorAll ('#profile-cards a');

const cardsArray = Array.from(profileCards);

// live search:
search.addEventListener('input', function(event){
    const currentText = event.target.value.toLowerCase();

    profileCards.forEach(function(card){
        
        const cardText = card.textContent.toLowerCase();

        if (cardText.includes(currentText)){
            card.style.display = '';
        }
        else {
            card.style.display = 'none';
        }
    });
});

//dropdown filter:
filter.addEventListener('change' , function(event){
    const option = event.target.value;

    cardsArray.sort(function(CardA, CardB){
        const textA = CardA.textContent.toLowerCase().trim();
        const textB = CardB.textContent.toLowerCase().trim();

        if(option === "alphabetically"){
            return textA.localeCompare(textB);
        }
        else if(option === "reverse-alphabetically"){
            return textB.localeCompare(textA);
        }
    });

    cardsArray.forEach(function(card) {
        profileCardsContainer.appendChild(card);
    });
});
































