// Write your script here;
let currentUser = JSON.parse(localStorage.getItem("current_user"));

function checkUserHasLoggedIn() {
    if (!currentUser) {
        window.location.href = "/login";
        return;
    }
    else {
        let userArray = JSON.parse(localStorage.getItem("users"));

        let data = userArray.filter((user) => user.email === currentUser.email);
        console.log('data:', data)
        document.getElementById("firstName").value = data[0].first_name;
        document.getElementById("lastName").value = data[0].last_name;

    }
}
checkUserHasLoggedIn();

document.getElementById("edit_profile_form").addEventListener("submit", (e) => {
    e.preventDefault();

    let firstName = document.getElementById("firstName");
    let lastName = document.getElementById("lastName");

    console.log("Save Info Btn clicked", { first_name: firstName.value, last_name: lastName.value });

    if (firstName.value === "" && lastName.value === "") {
        document.getElementById("msg1").innerHTML = "At least one field should be provided to edit!";
        document.getElementById("msg1").style.color = "red";
        return;
    }

    let userArray = JSON.parse(localStorage.getItem("users"));

    userArray.forEach((user) => {
        if (user.email === currentUser.email) {
            let msg = "";
            let errorMsg = "";
            let flag = true;
            if (firstName.value !== "") {
                if (firstName.value === user.first_name) {
                    errorMsg += "First Name ";
                    flag = false;
                }
                else {
                    user.first_name = firstName.value;
                    msg += "First Name ";
                }
            }
            if (lastName.value !== "") {
                if (lastName.value === user.last_name) {
                    errorMsg += "Last Name ";
                    flag = false;
                }
                else {
                    user.last_name = lastName.value;
                    msg += "and Last Name ";
                }
            }
            if (flag) {
                user.editedAt = new Date();
                msg += "changed successfully!";
                document.getElementById("msg1").innerHTML = msg;
                document.getElementById("msg1").style.color = "green";
            }
            else {
                errorMsg += "should be different from old one to edit!";
                document.getElementById("msg1").innerHTML = errorMsg;
                document.getElementById("msg1").style.color = "red";
            }
        }
    });

    localStorage.setItem("users", JSON.stringify(userArray));

});

document.getElementById("edit_password_form").addEventListener("submit", (e) => {
    e.preventDefault();

    let old_password = document.getElementById("old_password");
    let new_password = document.getElementById("new_password");
    let confirm_new_password = document.getElementById("confirm_new_password");

    console.log("Change Password Btn clicked", { old_password: old_password.value, new_password: new_password.value, confirm_new_password: confirm_new_password.value });

    if (old_password.value === "" || new_password.value === "" || confirm_new_password.value === "") {
        document.getElementById("msg2").innerHTML = "Fill all the fields with valid passwords!";
        document.getElementById("msg2").style.color = "red";
        return;
    }
    if (new_password.value !== confirm_new_password.value) {
        document.getElementById("msg2").innerHTML = "New Password and Confirm New Password should be same!";
        document.getElementById("msg2").style.color = "red";
        return;
    }

    if (new_password.value === old_password.value) {
        document.getElementById("msg2").innerHTML = "New Password should be different from Old Password!";
        document.getElementById("msg2").style.color = "red";
        return;
    }

    let userArray = JSON.parse(localStorage.getItem("users"));
    console.log('userArray:', userArray)

    userArray.forEach((user) => {
        if (user.email === currentUser.email) {
            if (user.password === old_password.value) {
                user.password = new_password.value;
                user.editedAt = new Date();

                document.getElementById("msg2").innerHTML = "Passwords Changed successfully!";
                document.getElementById("msg2").style.color = "green";
            }
            else {
                document.getElementById("msg2").innerHTML = "Provide Valid Old Password!";
                document.getElementById("msg2").style.color = "red";
            }
        }

    });

    localStorage.setItem("users", JSON.stringify(userArray));

});

document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.removeItem("current_user");
    window.location.href = "../../index.html"
})

