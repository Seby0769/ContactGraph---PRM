const login = document.querySelector('#login');

login.addEventListener ('submit' , async function(event){
    event.preventDefault();

    const userField = document.querySelector('#user');
    const passwordField = document.querySelector('#password');
    
    const userInput = userField.value;
    const passwordInput = passwordField.value;

    console.log(userInput);
    console.log(passwordInput);

    try {
        const request = await fetch ('/users.json');
        const users = await request.json();

        const validUser = users.find((userObject) => {
            return userObject.username === userInput && userObject.password === passwordInput;
        });

        if (validUser){
            window.location.href = "filespg.html"
        }
        else 
            return alert("Invalid user or password!")
    } catch (error) {
        console.error("no gud");
    }
 
});

