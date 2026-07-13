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

const lastName = document.querySelector('#surName');
const firstName = document.querySelector('#firstName');

if (currentProfile){
    lastName.textContent = currentProfile.lastname;  
    firstName.textContent = currentProfile.firstname;
}
else {
    lastName.textContent = "404";
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
const editPopUp = document.querySelector('#editModal');

editFileButton.addEventListener('click', function(){
    editPopUp.classList.remove('hidden');

    newLastName.value = currentProfile.lastname;
    newFirstName.value = currentProfile.firstname;
});

const cancelEdit = document.querySelector('#cancelEdit');

cancelEdit.addEventListener('click', function(){
    editPopUp.classList.add('hidden');
});

const saveEdit = document.querySelector('#saveEdit');
const newLastName = document.querySelector('#editLastName');
const newFirstName = document.querySelector('#editFirstName');

saveEdit.addEventListener('click', function(){
    currentProfile.lastname = newLastName.value;
    currentProfile.firstname = newFirstName.value;

    localStorage.setItem('profilesDB', JSON.stringify(profiles));
    editPopUp.classList.add('hidden');

    lastName.textContent = currentProfile.lastname;
    firstName.textContent = currentProfile.firstname;
});