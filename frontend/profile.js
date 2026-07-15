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
        `<div id="${log.id}" class="log-row flex border-b border-green-600 hover:bg-zinc-800/50 transition-colors">
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

//add logs: 
const addLog = document.querySelector('#addLog');
const addModalLog = document.querySelector('#addModalLog');

addLog.addEventListener('click', function(){
    addModalLog.classList.remove('hidden');
});

const cancelAddLog = document.querySelector('#cancelAddLog');

cancelAddLog.addEventListener('click', function(){
    addModalLog.classList.add('hidden');
});

const saveNewLog = document.querySelector('#saveNewLog');
const newLogInput = document.querySelector('#newLog');

saveNewLog.addEventListener('click', function(){
    const newLogContent = newLogInput.value; 

    function addNewLog(newLogContent, profileID){
        const newLog = {profileId: profileID, id: Date.now(), date: new Date().toLocaleString(), content: newLogContent}
        logs.push(newLog);
        localStorage.setItem('logsDB', JSON.stringify(logs));
        currentProfileLogs.push(newLog);
    };

    addNewLog(newLogContent, profileId);
    addModalLog.classList.add('hidden');

    newLogInput.value = '';

    renderLogs(currentProfileLogs);
});

//selecting logs:
let currentSelectedLog = null;
logsContainer.addEventListener('click', function(event){
    const clickedRow = event.target.closest('.log-row');
    
    //clicking off the logs removes the class from all
    if(!clickedRow) {
        const allRows = logsContainer.querySelectorAll('.log-row');
        allRows.forEach(function(row){
            row.classList.remove('bg-zinc-900');
        });
        currentSelectedLog = null;
        return;
    }

    const allRows = logsContainer.querySelectorAll('.log-row');
    allRows.forEach(function(row){
        row.classList.remove('bg-zinc-900');
    });

    //clicking the one already selected resets all
    if(currentSelectedLog === clickedRow.getAttribute('id')) {
        currentSelectedLog = null;
        return;
    }

    clickedRow.classList.add('bg-zinc-900');
    currentSelectedLog = clickedRow.getAttribute('id'); 
    // console.log(currentSelectedLog);
});

//delete log:
const deleteLog = document.querySelector('#deleteLog');

deleteLog.addEventListener('click', function(){
    const confirmDeleteLog = confirm("Are you sure you want to delete this file?");
    if(confirmDeleteLog){
        const logToDelete = currentSelectedLog; 
        console.log(logToDelete);
        const updatedLogs = logs.filter(function(log){
            return log.id != logToDelete;
        });
        logs = updatedLogs;

        localStorage.setItem('logsDB', JSON.stringify(updatedLogs));
        
        const updatedCurrentProfileLogs = logs.filter(function(log){
            return log.profileId == profileId;
        });

        renderLogs(updatedCurrentProfileLogs);
    };
});

//edit log:
const editLog = document.querySelector('#editLog');
const editLogPopUp = document.querySelector('#editLogPopUp');
const editLogInput = document.querySelector('#editLogArea');
const cancelEditLog = document.querySelector('#cancelEditLog');
const saveEditLog = document.querySelector('#saveEditLog'); 

editLog.addEventListener('click', function(){
    const selectedLog = logs.find(function(log){
        if(log.id == currentSelectedLog){
            return log;
        };
    });

    let selectedLogContent = selectedLog.content;
    editLogPopUp.classList.remove('hidden');
    editLogInput.value = selectedLogContent;
});

cancelEditLog.addEventListener('click', function(){
    editLogPopUp.classList.add('hidden');
});


saveEditLog.addEventListener('click', function(){
    editLogPopUp.classList.add('hidden');
    const selectedLog = logs.find(function(log){
        if(log.id == currentSelectedLog){
            return log;
        };
    });
    
    selectedLog.content = editLogInput.value;

    localStorage.setItem('logsDB', JSON.stringify(logs));
        
    const updatedCurrentProfileLogs = logs.filter(function(log){
        return log.profileId == profileId;
    });

    renderLogs(updatedCurrentProfileLogs);    
});
