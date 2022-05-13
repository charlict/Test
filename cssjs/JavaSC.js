
//pasar slides automaticamente

var slideIndex = 0;
showSlides();
var slides,dots;
var Language="English";

function showSlides() {
    var i;
    slides = document.getElementsByClassName("mySlides");
    dots = document.getElementsByClassName("dot");
    for (i = 0; i < slides.length; i++) {
       slides[i].style.display = "none";  
    }
    slideIndex++;
    if (slideIndex> slides.length) {slideIndex = 1}    
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";  
    dots[slideIndex-1].className += " active";
    setTimeout(showSlides, 4000); // Change image every 8 seconds
}

function switchLn(n) {
    Language= n;
}


//pasar slids con arrows


function plusSlides(position) {
    slideIndex +=position;
    if (slideIndex> slides.length) {slideIndex = 1}
    else if(slideIndex<1){slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
       slides[i].style.display = "none";  
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";  
    dots[slideIndex-1].className += " active";
}


//moverse al slide con los dots


function currentSlide(index) {
    if (index> slides.length) {index = 1}
    else if(index<1){index = slides.length}
    for (i = 0; i < slides.length; i++) {
       slides[i].style.display = "none";  
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[index-1].style.display = "block";  
    dots[index-1].className += " active";
}







// Validacion FORM





const usernameEl = document.querySelector('#username');
const lastnameEl = document.querySelector('#lastname');
const emailEl = document.querySelector('#email');
const messageEl = document.querySelector('#message');
const form = document.querySelector('#messageto');


// funciones de validacion de cada field


const checkUsername = () => {

    let valid = false;

    const min = 3,
        max = 25;

    const username = usernameEl.value.trim();

    if (!isRequired(username)) {
        showError(usernameEl, 'First Name cannot be blank.');
    } else if (!isBetween(username.length, min, max)) {
        showError(usernameEl, `First Name must be between ${min} and ${max} characters.`)
    } else {
        showSuccess(usernameEl);
        valid = true;
    }
    return valid;
};


const checkLastname = () => {

    let valid = false;

    const min = 3,
        max = 25;

        const lastname = lastnameEl.value.trim();

    if (!isRequired(lastname)) {
        showError(lastnameEl, 'LastName cannot be blank.');
    } else if (!isBetween(lastname.length, min, max)) {
        showError(lastnameEl, `The Last Name must be between ${min} and ${max} characters.`);
    } else {
        showSuccess(lastnameEl);
        valid = true;
    }

    return valid;
};



const checkEmail = () => {
    let valid = false;
    const email = emailEl.value.trim();
    if (!isRequired(email)) {
        showError(emailEl, 'Email cannot be blank.');
    } else if (!isEmailValid(email)) {
        showError(emailEl, 'Email is not valid.')
    } else {
        showSuccess(emailEl);
        valid = true;
    }
    return valid;
};


const checkMessage = () => {
    let valid = false;
    const minMes = 10,
        maxMes = 250;
    const message = messageEl.value.trim();


    if (!isRequired(message)) {
        showError(messageEl, 'Please enter the message');
    } else if (!isBetween(message.length, minMes, maxMes)) {
        showError(messageEl, `The message must be between ${minMes} and ${maxMes} characters.`);
    } else {
        showSuccess(messageEl);
        valid = true;
    }

    return valid;
};

const isEmailValid = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    // const re= @"^([0-9a-zA-Z]([\+\-_\.][0-9a-zA-Z]+)*)+"@(([0-9a-zA-Z][-\w]*[0-9a-zA-Z]*\.)+[a-zA-Z0-9]{2,17})$";

    return re.test(email);
};


const isRequired = value => value === '' ? false : true;

const isBetween = (length, min, max) => length < min || length > max ? false : true;


// formatear los fields


const showError = (input, message) => {
    // get the form-field element
    const formField = input.parentElement;
    // add the error class
    formField.classList.remove('success');
    formField.classList.add('error');

    // show the error message
    const error = formField.querySelector('small');
    error.textContent = message;
};

const showSuccess = (input) => {
    // get the form-field element
    const formField = input.parentElement;

    // remove the error class
    formField.classList.remove('error');
    formField.classList.add('success');

    // hide the error message
    const error = formField.querySelector('small');
    error.textContent = '';
}

// debouncer


const debounce = (fn, delay = 500) => {
    let timeoutId;
    return (...args) => {
        // cancel the previous timer
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        // setup a new timer
        timeoutId = setTimeout(() => {
            fn.apply(null, args)
        }, delay);
    };
};

// listeners de los campos y del submit


form.addEventListener('input',function (e) {
    switch (e.target.id) {
        case 'username':
            checkUsername();
            break;
        case 'email':
            checkEmail();
            break;
        case 'lastname':
            checkLastname();
            break;
        case 'message':
            checkMessage();
            break;

    }
});


form.addEventListener('submit', function (e) {
    // prevent the form from submitting
    e.preventDefault();

    // validate forms
    let isUsernameValid = checkUsername(),
        isLastnameValid = checkLastname(),
        isEmailValid = checkEmail(),
        isMessageValid = checkMessage();

    let isFormValid = isUsernameValid &&
        isEmailValid &&
        isLastnameValid &&
        isMessageValid;

    // submit to the server if the form is valid
    if (isFormValid) {
        form.submit();
        hideformulario();
    }
});


function hideformulario(){

    // this.formulario()=hidden;
    document.getElementById("messageto").style.display = "none";
    document.getElementById("mensajesent").style.display = "inline-block";


}
