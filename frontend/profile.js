let defaultProfiles = [
    {id: 1, lastname: "Aris", firstname: "Giani"},
    {id: 2, lastname: "Dumitriu", firstname: "Ionut"},
    {id: 3, lastname: "Tepes", firstname: "Vlad"},
];

if (!localStorage.getItem('profilesDB')) {
    localStorage.setItem('profilesDB', JSON.stringify(defaultProfiles));
}
let profiles = JSON.parse(localStorage.getItem('profilesDB'));

// take information dynamically:
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

//delete file button:
const deleteFileButton = document.querySelector('#deleteFileButton');

deleteFileButton.addEventListener('click', function(){
    const confirmDelete = confirm("Are you sure you want to delete this file?");
    if (confirmDelete){
        const idToDelete = profileId;
        const updatedProfiles = profiles.filter(function(profile){
            return profile.id != idToDelete;
    });

    localStorage.setItem('profilesDB', JSON.stringify(updatedProfiles));
    window.location.href = 'filespg.html';
    }
});

//edit file button:
const editFileButton = document.querySelector('#editFileButton');

editFileButton.addEventListener('click', function(){
    
});