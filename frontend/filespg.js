const search = document.querySelector('#search-form');

search.addEventListener('input', function(event){
    const currentText = event.target.value;

    console.log("user is searching for " + currentText);
});

const profileCards = document.querySelectorAll('#profile-cards a');

profileCards.forEach(function(card){
    console.log(card.textContent);
});


