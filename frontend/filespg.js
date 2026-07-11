let defaultProfiles = [
    { id: 1, lastname: "Aris", firstname: "Giani" },
    { id: 2, lastname: "Dumitriu", firstname: "Ionut" },
    { id: 3, lastname: "Tepes", firstname: "Vlad" },
];

if (!localStorage.getItem('profilesDB')) {
    localStorage.setItem('profilesDB', JSON.stringify(defaultProfiles));
}
let profiles = JSON.parse(localStorage.getItem('profilesDB'));

//profile cards:
const profileCardsContainer = document.querySelector('#profile-cards');

function renderCards(dataArray) {
    profileCardsContainer.innerHTML = '';

    dataArray.forEach(function (profile) {
        const htmlString =
            `<a href="profile.html?id=${profile.id}" class="flex flex-col items-center justify-center p-4 rounded-xl cursor-pointer outline-none bg-olive-950 hover:bg-zinc-900">
                    <svg class="w-32 h-32 text-zinc-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" focusable="false" aria-hidden="true">
                        <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/>
                    </svg>
                    <div class="mt-3 text-white font-mono font-bold text-sm text-center leading-tight">
                        <p>${profile.lastname}</p>
                        <p class="text-zinc-400">${profile.firstname}</p>
                    </div>
            </a>`;

        profileCardsContainer.insertAdjacentHTML('beforeend', htmlString);
    });
}

renderCards(profiles);



// live search:
const search = document.querySelector('#search-form');

search.addEventListener('input', function (event) {
    const currentText = event.target.value.toLowerCase();

    const filteredProfiles = profiles.filter(function (profile) {
        const fullName = profile.lastname.toLocaleLowerCase() + " " + profile.firstname.toLocaleLowerCase();
        return fullName.includes(currentText);
    });

    renderCards(filteredProfiles);
});

//dropdown filter:
const filter = document.querySelector('#filter');

filter.addEventListener('change', function (event) {
    const option = event.target.value;

    profiles.sort(function (profileA, profileB) {
        const textA = profileA.lastname.toLowerCase().trim();
        const textB = profileB.lastname.toLowerCase().trim();

        if (option === "alphabetically") {
            return textA.localeCompare(textB);
        }
        else if (option === "reverse-alphabetically") {
            return textB.localeCompare(textA);
        }
    });

    renderCards(profiles);
});

//add file button:
// const addFile = document.querySelector('#addFile');

// addFile.addEventListener('click', function(event){
//     const click = event.target.value;


// });

