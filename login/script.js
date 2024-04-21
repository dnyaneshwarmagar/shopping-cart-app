document.getElementById("myForm").addEventListener("submit", (e) => {
    e.preventDefault();

    let email = document.getElementById("email");
    let password = document.getElementById("password");

    console.log("Singup button clicked", { email: email.value, password: password.value });

    if (email.value === "" || password.value === "") {
        document.getElementById("msg").innerHTML = "Fields should not be emplty!";
        return;
    }

    let usersArray = JSON.parse(localStorage.getItem("users")) || [];

    let user = usersArray.find((user) => user.email === email.value);
  
    if (!!user) {
        let user = usersArray.find((user) => user.email === email.value && user.password === password.value);       

        if (!user) {
            document.getElementById("msg").innerHTML = "Please Enter valid Password!";
            return;
        }
        else {
            document.getElementById("msg").innerHTML = "Login Successful!";
            document.getElementById("msg").style.color = "green";

            let userObj = { email: email.value, password: password.value, token: generateRandomToken() }
            localStorage.setItem("current_user", JSON.stringify(userObj));

            window.location.href = "/index.html"
        }
    }
    else {
        document.getElementById("msg").innerHTML = "Please Enter valid user Email";
        return;
    }
});


function generateRandomToken() {
    const array = new Uint8Array(16);
    window.crypto.getRandomValues(array);
    let token = '';
    for (let i = 0; i < array.length; i++) {
        token += (array[i] < 16 ? '0' : '') + array[i].toString(16);
    }
    return token;
}

