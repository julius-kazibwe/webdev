list = []
displayMessages()
editProfile()
hobbyHandler()

function imageHandler() {
    image = document.getElementById("profile")
    reader = new FileReader()
    reader.onload = () => {
        if(reader.readyState === 2) {
            image.src = reader.result;
        }
    }
    reader.readAsDataURL(event.target.files[0])
}

function checkPassword() {
    username = document.getElementById("username")
    password = document.getElementById("password")
    usersList = JSON.parse(sessionStorage.getItem("users"))
    usersList.forEach((x,i) => {
        if(x.name === username.value) {
            if (x.password === password.value) {
                sessionStorage.setItem("currentUserDetails",JSON.stringify(x))
                window.location = "./chat.html"
            }
            else{
                console.log("Wrong password!")
            }
        }
        else {
            console.log("User doesn't exist")
        }
    })
         
}

function submitHandler() {
    image = document.getElementById("profile")
    username = document.getElementById("username")
    password = document.getElementById("password")
    personalStatement = document.getElementById("personalStatement")
    education = document.getElementById("education")
    hobbies = list
    user = {
        img: image.src,
        name: username.value,
        password: password.value,
        personalStatement: personalStatement.value,
        education: education.value,
        hobbies: hobbies
    }
    
    if (JSON.parse(sessionStorage.getItem("users")) !== null) {
        users = JSON.parse(sessionStorage.getItem("users"))
        users.push(user)
        sessionStorage.setItem("users",JSON.stringify(users))
    }else{
        users = []
        users.push(user)
        sessionStorage.setItem("users",JSON.stringify(users))
    }
    sessionStorage.setItem("currentUser",username.value)
    sessionStorage.setItem("currentUserDetails",JSON.stringify(user))
    console.log(JSON.parse(sessionStorage.getItem("users")))
    window.location = "./chat.html"
}
function hobbyHandler() {
    hobby = document.getElementById("hobby")
    if(sessionStorage.getItem("currentUserDetails")!== null) {
        details = JSON.parse(sessionStorage.getItem("currentUserDetails"))
        list = details.hobbies
        list.push(hobby.value)
        details.hobbies = list
        sessionStorage.setItem("currentUserDetails", JSON.stringify(details))
        hobby.value = ""
        hobbyList = document.getElementById("hobbyList")
        hobbyList.innerHTML = ""
        list.forEach((x,i) => {
        li = document.createElement("li")
        li.value = i
        node = document.createTextNode(x)
        li.appendChild(node)
        hobbyList.appendChild(li)
        })
    } else {
        list.push(hobby.value)
        hobby.value = ""
        hobbyList = document.getElementById("hobbyList")
        hobbyList.innerHTML = ""
        list.forEach((x,i) => {
            li = document.createElement("li")
            node = document.createTextNode(x)
            li.appendChild(node)
            hobbyList.appendChild(li)
            })
    }
}
function displayMessages() {
    box = document.getElementById("box")
    box.innerHTML = "";
        list = JSON.parse(sessionStorage.getItem("MessageList"))
        list.forEach((x,i) => {
            li = document.createElement("li")
            node = document.createTextNode(x.msg)
            if(x.user == sessionStorage.getItem("currentUser")) {
                li.appendChild(node)
                box.appendChild(li)
            }
            else {
                li.setAttribute("style", "text-align:right")
                li.appendChild(node)
                box.appendChild(li)
            }
        })
}

function addMessage() {
    message = document.getElementById("textBox")
    list = []
    if(sessionStorage.getItem("MessageList") === null) {
        list.push({user:sessionStorage.getItem("currentUser"), msg:message.value})
        sessionStorage.setItem("MessageList", JSON.stringify(list))
    }
    else {
        list = JSON.parse(sessionStorage.getItem("MessageList"))
        list.push({user:sessionStorage.getItem("currentUser"), msg:message.value})
        sessionStorage.setItem("MessageList", JSON.stringify(list))
    }
    message.value = ""
    displayMessages()
}

function logout() {
    sessionStorage.removeItem("currentUserDetails")
    window.location = "../index.html"
}

function editHandler() {
    image = document.getElementById("profile")
    username = document.getElementById("username")
    password = document.getElementById("password")
    personalStatement = document.getElementById("personalStatement")
    education = document.getElementById("education")
    details = JSON.parse(sessionStorage.getItem("currentUserDetails"))
    hobbies = details.hobbies
    user = {
        img: image.src,
        name: username.value,
        password: password.value,
        personalStatement: personalStatement.value,
        education: education.value,
        hobbies: hobbies
    }
    sessionStorage.setItem("currentUserDetails", JSON.stringify(user))
    users = JSON.parse(sessionStorage.getItem("users"))
    users.forEach((x,i) => {
        if(x.name === user.name) {
            x.name = user.name
            x.img = user.img
            x.password = user.password
            x.personalStatement = user.personalStatement
            x.education = user.education
            x.hobbies = user.hobbies
        }
    })
    sessionStorage.setItem("users",JSON.stringify(users))
    window.location = "./display.html"
}

function resetHobbyList() {
    user = JSON.parse(sessionStorage.getItem("currentUserDetails"))
    user.hobbies = []
    users = JSON.parse(sessionStorage.getItem("users"))
    users.forEach((x,i) => {
        if(x.name === user.name) {
            x.name = user.name
            x.img = user.img
            x.password = user.password
            x.personalStatement = user.personalStatement
            x.education = user.education
            x.hobbies = []
        }
    })
    sessionStorage.setItem("users", JSON.stringify(users))
    sessionStorage.setItem("currentUserDetails", JSON.stringify(user))
    location.reload()
    console.log("List Reset")
}
const theme = document.querySelector('#theme');
const themeModal= document.querySelector('.customerize-theme');
const fontSizes = document.querySelectorAll('.choose-size span');
var root = document.querySelector(':root')
const colorPalette= document.querySelectorAll('.choose-color span');
const Bg1 = document.querySelector('.bg-1');
const Bg2 = document.querySelector('.bg-2');
const Bg3 = document.querySelector('.bg-3');

const changeActiveItem =() => {
    menuItems.forEach(item => {
        item.classList.remove('active');
    })
}
menuItems.forEach(item => {
    item.addEventListener('click',() => {
        changeActiveItem();
        item.classList.add('active');
        if(item.id !='notifications'){
            document.querySelector('.notifications-popup').
            style.display ='none';
        }else {
            document.querySelector('.notifications-popup').
            style.display ='block';
            document.querySelector('#notifications .notification-count').style.display='none';

        }
    })
})
const openThemeModal = () => {
    themeModal.style.display = 'grid';
}
const closeThemeModal = (e) => {
    if (e.target.classList.contains('customerize-theme')){
        themeModal.style.display = 'none';
    }
}
themeModal.addEventListener('click',closeThemeModal);
theme.addEventListener('click',openThemeModal);

const removeSizeSelector = () => {
    fontSizes.forEach(size => {
     size.classList.remove('active');   
    })
}
  
fontSizes.forEach(size => {
    size.addEventListener('click', () => {
    removeSizeSelector();
    let fontSize;
    size.classList.toggle('active');
    size.addEventListener('click', () => {
    if(size.classList.contains('font-size-1')){
        fontSize = '10px';
        root.style.setProperty('--sticky-top-left','5.4rem');
        root.style.setProperty('--sticky-top-right','5.4rem');
    }else  if(size.classList.contains('font-size-2')){
        fontSize = '15px';
        root.style.setProperty('--sticky-top-left','5.4rem');
        root.style.setProperty('--sticky-top-right','-6rem');
    }else  if(size.classList.contains('font-size-3')){
        fontSize = '20px';
        root.style.setProperty('--sticky-top-left','-2rem');
        root.style.setProperty('--sticky-top-right','-17rem');
    }else  if(size.classList.contains('font-size-4')){
        fontSize = '25px';
        root.style.setProperty('--sticky-top-left','-5rem');
        root.style.setProperty('--sticky-top-right','-25rem');
    }else  if(size.classList.contains('font-size-5')){
        fontSize = '30px';
        root.style.setProperty('--sticky-top-left','-10rem');
        root.style.setProperty('--sticky-top-right','-33rem');
    }
    document.querySelector('html').style.fontSize = fontSize;
})
})
})
//color
colorPalette.forEach(color => {
    color.addEventListener('click', () => {
    let primary;
    if(color.classList.contains('color-1')){
        primaryHue = 252;
    } else if(color.classList.contains('color-2')){
        primaryHue = 60;
    } else if(color.classList.contains('color-3')){
        primaryHue = 300;
    } else if(color.classList.contains('color-4')){
        primaryHue = 150;
    } 
    else if(color.classList.contains('color-5')){
        primaryHue = 20;
    } 
    color.classList.add('active');
    root.style.setProperty('--primary-color-hue',primaryHue);
})
})

let lightColorLightness;
let whiteColorLightness;
let darkColorLightness;

const changeBg = () => {
    root.style.setProperty('--light-color-lightness',lightColorLightness);
    root.style.setProperty('--white-color-lightness',whiteColorLightness);
    root.style.setProperty('--dark-color-lightness',darkColorLightness);
}
Bg1.addEventListener('click' , () => {
    Bg1.classList.add('active');
    Bg2.classList.remove('active');
    Bg3.classList.remove('active');
    window.location.reload();
})
 
Bg2.addEventListener('click' , () => {
    darkColorLightness='95%';
    whiteColorLightness='20%';
    lightColorLightness='15%';

    Bg2.classList.add('active');
    changeBg();
});
Bg3.addEventListener('click' , () => {
    darkColorLightness='95%';
    whiteColorLightness='10%';
    lightColorLightness='0%';

    Bg2.classList.add('active');
    Bg1.classList.remove('active');
    BG3.classList.remove('active');
    changeBg();
});
function imageHandler() {
    image = document.getElementById("profile")
    reader = new FileReader()
    reader.onload = () => {
        if(reader.readyState === 2) {
            image.src = reader.result;
        }
    }
    reader.readAsDataURL(event.target.files[0])
}