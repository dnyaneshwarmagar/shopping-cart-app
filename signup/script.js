document.getElementById("myForm").addEventListener("submit", (e) => {
    e.preventDefault();

    let firstName = document.getElementById("firstName").value;
    let lastName = document.getElementById("lastName").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let confirm_password = document.getElementById("confirm_password").value;

    console.log("Login Button clicked", { firstName, lastName, email, password, confirm_password });

    if (firstName === "" || lastName === "" || email === "" || password === "" || confirm_password === "") {
        document.getElementById("msg").innerHTML = "Please fill all the fields";
        return;
    }
    else if (/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email) === false) {
        document.getElementById("msg").innerHTML = "Please enter valid email!";
        return;
    }
    else if (password !== confirm_password) {
        document.getElementById("msg").innerHTML = "Different passwords, Both passwords should be same!";
        return;
    }

    let usersArray = JSON.parse(localStorage.getItem("users")) || [];

    if (usersArray.find((user) => user.email === email)) {
        document.getElementById("msg").innerHTML = "User Alreday Exists, signup with new unique credentials!!";
        return
    }

    let user = { first_name: firstName, last_name: lastName, email: email, password: password, createdAt: new Date() };

    usersArray.push(user);

    localStorage.setItem("users", JSON.stringify(usersArray));

    window.location.href = "/login/index.html";
    alert("User singed up successfully,/n Kindly login again with credentials created!");
    
    document.getElementById("firstName").value = "";
    document.getElementById("lastName").value = "";
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
    document.getElementById("confirm_password").value = "";
})