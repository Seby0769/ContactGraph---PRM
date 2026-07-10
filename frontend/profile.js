let profiles = [
    {id: 1, lastname: "Aris", firstname: "Giani"},
    {id: 2, lastname: "Dumitru", firstname: "Ion"},
    {id: 3, lastname: "Tepes", firstname: "Vlad"},
];

const urlParameters = new URLSearchParams(window.location.search);

const profileId = urlParameters.get('id');

const currentProfile = profiles.find(function(profile) {
    return profile.id == profileId;
});

const surName = document.querySelector('#surName');
const firstName = document.querySelector('#firstName');

if (currentProfile){
    surName.textContent = currentProfile.lastname;
    firstName.textContent = currentProfile.firstname;
}
else {
    surName.textContent = "404";
    firstName.textContent = "404";
}
