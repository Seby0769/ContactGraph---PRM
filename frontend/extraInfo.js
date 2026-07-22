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

const defaultExtraInfo = [
    {
        profileId: 1,
        key_traits: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        vocal_baseline: "Praesent commodo cursus magna, vel scelerisque nisl consectetur.",
        physical_baseline: "Aenean lacinia bibendum nulla sed consectetur.",
        idiosyncrasies: "Vestibulum id ligula porta felis euismod semper.",
        triggers: "Donec ullamcorper nulla non metus auctor fringilla.",
        the_tell: "Cras mattis consectetur purus sit amet fermentum.",
        evasion_tactic: "Nullam id dolor id nibh ultricies vehicula ut id elit.",
        core_driver: "Morbi leo risus, porta ac consectetur ac, vestibulum at eros.",
        persuasion_vector: "Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."
    },
    {
        profileId: 2,
        key_traits: "Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh.",
        vocal_baseline: "Ut fermentum massa justo sit amet risus.",
        physical_baseline: "Duis mollis, est non commodo luctus, nisi erat porttitor ligula.",
        idiosyncrasies: "Maecenas sed diam eget risus varius blandit sit amet non magna.",
        triggers: "Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.",
        the_tell: "Nullam quis risus eget urna mollis ornare vel eu leo.",
        evasion_tactic: "Curabitur blandit tempus porttitor.",
        core_driver: "Sed posuere consectetur est at lobortis.",
        persuasion_vector: "Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor."
    },
    {
        profileId: 3,
        key_traits: "Cras mattis consectetur purus sit amet fermentum.",
        vocal_baseline: "Nullam quis risus eget urna mollis ornare vel.",
        physical_baseline: "Donec id elit non mi porta gravida at eget metus.",
        idiosyncrasies: "Cras justo odio, dapibus ac facilisis in, egestas eget quam.",
        triggers: "Praesent commodo cursus magna, vel scelerisque nisl consectetur et.",
        the_tell: "Morbi leo risus, porta ac consectetur ac, vestibulum.",
        evasion_tactic: "Vestibulum id ligula porta felis euismod semper.",
        core_driver: "Aenean lacinia bibendum nulla sed consectetur.",
        persuasion_vector: "Maecenas faucibus mollis interdum. Nulla vitae elit libero, a pharetra augue."
    }
];

if (!localStorage.getItem('extraInfoDB')) {
    localStorage.setItem('extraInfoDB', JSON.stringify(defaultExtraInfo));
}
let extraInfo = JSON.parse(localStorage.getItem('extraInfoDB'));

let currentExtraInfo = extraInfo.find(function (info) {
    return info.profileId == profileId;
});

const key_traits = document.querySelector('#keyTraits');
const vocal_baseline = document.querySelector('#vocalBaseline');
const physical_baseline = document.querySelector('#physicalBaseline');
const idiosyncrasies = document.querySelector('#idiosyncrasies');
const triggers = document.querySelector('#triggers');
const the_tell = document.querySelector('#theTell');
const evasion_tactic = document.querySelector('#evasionTactic');
const core_driver = document.querySelector('#coreDriver');
const persuasion_vector = document.querySelector('#persuasionVector');

if (currentExtraInfo) {
    key_traits.value = currentExtraInfo.key_traits;
    vocal_baseline.value = currentExtraInfo.vocal_baseline;
    physical_baseline.value = currentExtraInfo.physical_baseline;
    idiosyncrasies.value = currentExtraInfo.idiosyncrasies;
    triggers.value = currentExtraInfo.triggers;
    the_tell.value = currentExtraInfo.the_tell;
    evasion_tactic.value = currentExtraInfo.evasion_tactic;
    core_driver.value = currentExtraInfo.core_driver;
    persuasion_vector.value = currentExtraInfo.persuasion_vector;
} 
else {
    currentExtraInfo = {
        profileId: profileId,
        key_traits: "", vocal_baseline: "", physical_baseline: "",
        idiosyncrasies: "", triggers: "", the_tell: "",
        evasion_tactic: "", core_driver: "", persuasion_vector: ""
    };
    extraInfo.push(currentExtraInfo);
}

//auto save
const allTextareas = document.querySelectorAll('textarea');

allTextareas.forEach(function(textarea) {
    textarea.addEventListener('blur', function() {
        
        currentExtraInfo.key_traits = key_traits.value;
        currentExtraInfo.vocal_baseline = vocal_baseline.value;
        currentExtraInfo.physical_baseline = physical_baseline.value;
        currentExtraInfo.idiosyncrasies = idiosyncrasies.value;
        currentExtraInfo.triggers = triggers.value;
        currentExtraInfo.the_tell = the_tell.value;
        currentExtraInfo.evasion_tactic = evasion_tactic.value;
        currentExtraInfo.core_driver = core_driver.value;
        currentExtraInfo.persuasion_vector = persuasion_vector.value;

        localStorage.setItem('extraInfoDB', JSON.stringify(extraInfo));
    });
});

