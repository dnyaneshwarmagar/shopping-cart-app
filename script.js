function getUser() {
    let user = JSON.parse(localStorage.getItem("current_user"));
    if (!!user) {
        let users = JSON.parse(localStorage.getItem("users"));

        let arr = users.filter((item) => item.email === user.email);
        console.log('arr:', arr)

        if (arr.length > 0) {
            document.getElementById("container_one").style.display = "none";
            document.getElementById("container_two").style.display = "flex";
            
        }
        else {
            document.getElementById("container_one").style.display = "flex";
            document.getElementById("container_two").style.display = "none";
        }
    }
    else {
        document.getElementById("container_one").style.display = "flex";
        document.getElementById("container_two").style.display = "none";
    }
}
getUser();

document.getElementById("login_btn").addEventListener("click",()=>{
    window.location.href = "./login/index.html"
})

document.getElementById("singup_btn").addEventListener("click",()=>{
    window.location.href = "./signup/index.html"
})

document.getElementById("shop_btn").addEventListener("click",()=>{
    window.location.href = "./shop/index.html"
})