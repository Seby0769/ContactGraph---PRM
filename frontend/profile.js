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

//logs:
const defaultLogs = [
    {profileId: 1, id: 1, date: new Date().toLocaleString(), content:"Cam supi azi"},
    {profileId: 1, id: 2, date: new Date().toLocaleString(), content:"Cam fericit azi"},
    {profileId: 2, id: 3, date: new Date().toLocaleString(), content:"Cam nesi azi"},
]; 

if (!localStorage.getItem('logsDB')) {
    localStorage.setItem('logsDB', JSON.stringify(defaultLogs));
}
let logs = JSON.parse(localStorage.getItem('logsDB'));

const currentProfileLogs = logs.filter(function(log){
    return log.profileId == profileId;
});

const logsContainer = document.querySelector('#logsContainer');

function renderLogs(dataArray){
    logsContainer.innerHTML = '';

    dataArray.forEach(function(log){
        const htmlString = 
        `<div class="flex border-b border-green-600 hover:bg-zinc-800/50 transition-colors">
                <div class="w-32 shrink-0 px-4 py-3 text-green-500 border-r border-green-600 font-mono text-sm flex items-start justify-center pt-4">
                    ${log.date}
                </div>
                <div class="px-4 py-3 w-full text-white">
                    ${log.content}
                </div>
        </div>`

        logsContainer.insertAdjacentHTML('beforeend', htmlString);
    });
};

renderLogs(currentProfileLogs);
