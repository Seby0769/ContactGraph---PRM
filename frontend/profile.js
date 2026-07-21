let defaultProfiles = [
    { id: 1, lastname: "Aris", firstname: "Giani" },
    { id: 2, lastname: "Dumitriu", firstname: "Ionut" },
    { id: 3, lastname: "Tepes", firstname: "Vlad" },
];

if (!localStorage.getItem('profilesDB')) {
    localStorage.setItem('profilesDB', JSON.stringify(defaultProfiles));
}
let profiles = JSON.parse(localStorage.getItem('profilesDB'));

// take information dynamically:
const urlParameters = new URLSearchParams(window.location.search);

const profileId = urlParameters.get('id');

const currentProfile = profiles.find(function (profile) {
    return profile.id == profileId;
});

const lastName = document.querySelector('#surName');
const firstName = document.querySelector('#firstName');
const dateOfBirth = document.querySelector('#dateOfBirth');
const gender = document.querySelector('#gender');
const occupation = document.querySelector('#occupation');
const city = document.querySelector('#city');
const age = document.querySelector('#age');

const dateofbirth = new Date(currentProfile.dateofbirth); //for calculating age
const today = new Date();
let displayedAge = today.getFullYear() - dateofbirth.getFullYear();

const monthDifference = today.getMonth() - dateofbirth.getMonth();
if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < dateofbirth.getDate())) {
    displayedAge--;
};


if (currentProfile) {
    lastName.textContent = currentProfile.lastname;
    firstName.textContent = currentProfile.firstname;
    dateOfBirth.textContent = currentProfile.dateofbirth;
    gender.textContent = currentProfile.gender;
    occupation.textContent = currentProfile.occupation;
    city.textContent = currentProfile.city;
    age.textContent = "| Age: " + displayedAge;
}
else {
    lastName.textContent = "404";
    firstName.textContent = "404";
    dateOfBirth.textContent = "404";
    gender.textContent = "404";
    occupation.textContent = "404";
    city.textContent = "404";
    age.textContent = "404";
}

//delete file button:
const deleteFileButton = document.querySelector('#deleteFileButton');

deleteFileButton.addEventListener('click', function () {
    const confirmDelete = confirm("Are you sure you want to delete this file?");
    if (confirmDelete) {
        const idToDelete = profileId;
        const updatedProfiles = profiles.filter(function (profile) {
            return profile.id != idToDelete;
        });

        localStorage.setItem('profilesDB', JSON.stringify(updatedProfiles));
        window.location.href = 'filespg.html';
    }
});

//edit file button:
const editFileButton = document.querySelector('#editFileButton');
const editPopUp = document.querySelector('#editModal');
const newLastName = document.querySelector('#editLastName');
const newFirstName = document.querySelector('#editFirstName');
const newDateOfBirth = document.querySelector('#editDateOfBirth');
const newGender = document.querySelector('#editGender');
const newOccupation = document.querySelector('#editOccupation');
const newCity = document.querySelector('#editCity');

editFileButton.addEventListener('click', function () {
    editPopUp.classList.remove('hidden');

    newLastName.value = currentProfile.lastname;
    newFirstName.value = currentProfile.firstname;
    newDateOfBirth.value = currentProfile.dateofbirth;
    newGender.value = currentProfile.gender;
    newOccupation.value = currentProfile.occupation;
    newCity.value = currentProfile.city;

});

const cancelEdit = document.querySelector('#cancelEdit');

cancelEdit.addEventListener('click', function () {
    editPopUp.classList.add('hidden');
});

const saveEdit = document.querySelector('#saveEdit');

saveEdit.addEventListener('click', function () {
    const birthDate = new Date(newDateOfBirth.value);//for calculating invalid date
    const currentDate = new Date;
    if(birthDate > currentDate){
        alert("Invalid date of birth!")
    }
    else{
    currentProfile.lastname = newLastName.value;
    currentProfile.firstname = newFirstName.value;
    currentProfile.dateofbirth = newDateOfBirth.value;
    currentProfile.gender = newGender.value;
    currentProfile.occupation = newOccupation.value;
    currentProfile.city = newCity.value;    

    dateofbirth = new Date(currentProfile.dateofbirth); //for calculating age
    today = new Date();
    displayedAge = today.getFullYear() - dateofbirth.getFullYear();
    monthDifference = today.getMonth() - dateofbirth.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < dateofbirth.getDate())) {
        displayedAge--;
    };

    localStorage.setItem('profilesDB', JSON.stringify(profiles));
    editPopUp.classList.add('hidden');

    lastName.textContent = currentProfile.lastname;
    firstName.textContent = currentProfile.firstname;
    dateOfBirth.textContent = currentProfile.dateofbirth;
    gender.textContent = currentProfile.gender;
    occupation.textContent = currentProfile.occupation;
    city.textContent = currentProfile.city;
    age.textContent = "| Age: " + displayedAge;
    };
});

//logs:
const defaultLogs = [
    { profileId: 1, id: 1, date: new Date().toLocaleString(), location: "University", subject: "About something", behavior: "Deviation from baseline", notes: "something something0" },
    { profileId: 1, id: 2, date: new Date().toLocaleString(), location: "Park", subject: "About something", behavior: "Deviation from baseline", notes: "something something1" },
    { profileId: 2, id: 3, date: new Date().toLocaleString(), location: "Mall", subject: "About something", behavior: "Deviation from baseline", notes: "something something2" },
];

if (!localStorage.getItem('logsDB')) {
    localStorage.setItem('logsDB', JSON.stringify(defaultLogs));
}
let logs = JSON.parse(localStorage.getItem('logsDB'));

const currentProfileLogs = logs.filter(function (log) {
    return log.profileId == profileId;
});

const logsContainer = document.querySelector('#logsContainer');

function renderLogs(dataArray) {
    logsContainer.innerHTML = '';

    dataArray.forEach(function (log) {
        const htmlString =
        `<div id="${log.id}" class="log-row flex border-b border-green-600 hover:bg-zinc-800/50 transition-colors cursor-pointer">
            <div class="w-32 shrink-0 px-4 py-3 text-green-500 border-r border-green-600 font-mono text-sm flex items-start justify-center pt-4">
                ${log.date}
            </div>
            <div class="px-4 py-3 w-full text-zinc-300 flex flex-col gap-2 text-sm">
                <div class="grid grid-cols-[80px_1fr] gap-2">
                    <span class="text-zinc-500 font-semibold">Location:</span>
                    <span class="text-zinc-100">${log.location}</span>
                </div>
                <div class="grid grid-cols-[80px_1fr] gap-2">
                    <span class="text-zinc-500 font-semibold">Subject:</span>
                    <span class="text-zinc-100">${log.subject}</span>
                </div>
                <div class="grid grid-cols-[80px_1fr] gap-2">
                    <span class="text-green-600/80 font-semibold">Behavior:</span>
                    <span class="text-zinc-100">${log.behavior}</span>
                </div>
                <div class="grid grid-cols-[80px_1fr] gap-2 pt-1 border-t border-zinc-700/50 mt-1">
                    <span class="text-zinc-500 font-semibold">Notes:</span>
                    <span class="text-zinc-300 italic">${log.notes}</span>
                </div>
            </div>
        </div>`;

        logsContainer.insertAdjacentHTML('beforeend', htmlString);
    });
};

renderLogs(currentProfileLogs);

//add logs: 
const addLog = document.querySelector('#addLog');
const addModalLog = document.querySelector('#addModalLog');

addLog.addEventListener('click', function () {
    addModalLog.classList.remove('hidden');
});

const cancelAddLog = document.querySelector('#cancelAddLog');

cancelAddLog.addEventListener('click', function () {
    addModalLog.classList.add('hidden');
});

const saveNewLog = document.querySelector('#saveNewLog');
const newLogLocationInput = document.querySelector('#newLogLocation');
const newLogSubjectInput = document.querySelector('#newLogSubject');
const newLogBehaviorInput = document.querySelector('#newLogBehavior');
const newLogNotesInput = document.querySelector('#newLogNote');

saveNewLog.addEventListener('click', function () {
    const newLogLocationContent = newLogLocationInput.value;
    const newLogSubjectContent = newLogSubjectInput.value;
    const newLogBehaviorContent = newLogBehaviorInput.value;
    const newLogNotesContent = newLogNotesInput.value;

    function addNewLog(newLogLocationContent, newLogSubjectContent, newLogBehaviorContent, newLogNotesContent, profileID) {
        const newLog = {
            profileId: profileID, id: Date.now(), date: new Date().toLocaleString(), location: newLogLocationContent,
            subject: newLogSubjectContent, behavior: newLogBehaviorContent, notes: newLogNotesContent
        };

        logs.push(newLog);
        localStorage.setItem('logsDB', JSON.stringify(logs));
        currentProfileLogs.push(newLog);
    };

    addNewLog(newLogLocationContent, newLogSubjectContent, newLogBehaviorContent, newLogNotesContent, profileId);
    addModalLog.classList.add('hidden');

    newLogLocationInput.value = '';
    newLogSubjectInput.value = '';
    newLogBehaviorInput.value = '';
    newLogNotesInput.value = '';

    renderLogs(currentProfileLogs);
});

//selecting logs:
let currentSelectedLog = null;
logsContainer.addEventListener('click', function (event) {
    const clickedRow = event.target.closest('.log-row');

    //clicking off the logs removes the class from all
    if (!clickedRow) {
        const allRows = logsContainer.querySelectorAll('.log-row');
        allRows.forEach(function (row) {
            row.classList.remove('bg-zinc-900');
        });
        currentSelectedLog = null;
        return;
    }

    const allRows = logsContainer.querySelectorAll('.log-row');
    allRows.forEach(function (row) {
        row.classList.remove('bg-zinc-900');
    });

    //clicking the one already selected resets all
    if (currentSelectedLog === clickedRow.getAttribute('id')) {
        currentSelectedLog = null;
        return;
    }

    clickedRow.classList.add('bg-zinc-900');
    currentSelectedLog = clickedRow.getAttribute('id');
    // console.log(currentSelectedLog);
});

//delete log:
const deleteLog = document.querySelector('#deleteLog');

deleteLog.addEventListener('click', function () {
    const confirmDeleteLog = confirm("Are you sure you want to delete this file?");
    if (confirmDeleteLog) {
        const logToDelete = currentSelectedLog;
        console.log(logToDelete);
        const updatedLogs = logs.filter(function (log) {
            return log.id != logToDelete;
        });
        logs = updatedLogs;

        localStorage.setItem('logsDB', JSON.stringify(updatedLogs));

        const updatedCurrentProfileLogs = logs.filter(function (log) {
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

editLog.addEventListener('click', function () {
    const selectedLog = logs.find(function (log) {
        if (log.id == currentSelectedLog) {
            return log;
        };
    });

    let selectedLogContent = selectedLog.content;
    editLogPopUp.classList.remove('hidden');
    editLogInput.value = selectedLogContent;
});

cancelEditLog.addEventListener('click', function () {
    editLogPopUp.classList.add('hidden');
});


saveEditLog.addEventListener('click', function () {
    editLogPopUp.classList.add('hidden');
    const selectedLog = logs.find(function (log) {
        if (log.id == currentSelectedLog) {
            return log;
        };
    });

    selectedLog.content = editLogInput.value;

    localStorage.setItem('logsDB', JSON.stringify(logs));

    const updatedCurrentProfileLogs = logs.filter(function (log) {
        return log.profileId == profileId;
    });

    renderLogs(updatedCurrentProfileLogs);
});
