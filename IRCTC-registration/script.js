const form = document.getElementById("registerForm");
const username = document.getElementById("username");
const fullname = document.getElementById("fullname");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const email = document.getElementById("email");
const mobile = document.getElementById("mobile");
const captchaInput = document.getElementById("captchaInput");
const captchaText = document.getElementById("captchaText");
const captchaError = document.getElementById("captchaError");

function generateCaptcha() {
    let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz23456789";
    let captcha = "";
    for(let i = 0; i < 6; i++) {
        captcha += chars[Math.floor(Math.random()*chars.length)];        
    }
    captchaText.innerHTML = captcha;
}

generateCaptcha();

function setError(input, msg) {
        input.classList.add("error");
        input.classList.remove("success");
        input.nextElementSibling.innerHTML = msg;
        return false;
}

function setSuccess(input) {
        input.classList.remove("error");
        input.classList.add("success");
        input.nextElementSibling.innerHTML = "";
        return true;
}

function validateUsername() {
    let value = username.value.trim();
    if(value === "")
        return setError(username, "Username is required");
    if(!/^[A-Za-z][A-Za-z0-9_]{4,14}$/.test(value))
        return setError(username, "5-15 characters, start with letter");
    return setSuccess(username);
}

function validateFullname() {
    let value = fullname.value.trim();
    if (value === "")
        return setError(fullname, "Full Name is required");
    if (value.length < 3)
        return setError(fullname, "Minimum 3 characters");
    return setSuccess(fullname);
}

function validatePassword() {
    let value = password.value;
    if(value === "")
        return setError(password, "Password is required");
    if (!/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(value))
        return setError(password, "8+ chars, Upper, Lower, Number & Special Character");
    setSuccess(password);
    if (confirmPassword.value !== "")
        validateConfirmPassword();
    return true;
}

function validateConfirmPassword() {
    if (confirmPassword.value === "")
        return setError(confirmPassword, "Confirm Password is required");
    if (confirmPassword.value !== password.value)
        return setError(confirmPassword, "Passwords do not match");
    return setSuccess(confirmPassword);
}

function validateEmail() {
    let value = email.value.trim();
    if (value === "")
        return setError(email, "Email is required");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
        return setError(email, "Invalid Email");
    return setSuccess(email);
}

function validateMobile() {
    let value = mobile.value.trim();
    if (value === "")
        return setError(mobile, "Mobile Number is required");
    if (!/^[6-9]\d{9}$/.test(value))
        return setError(mobile, "Enter valid Indian mobile number");
    return setSuccess(mobile);
}

function validateCaptcha() {
    if (captchaInput.value.trim() === "") {
        captchaError.innerHTML = "Captcha is required";
        return false;
    }
    if (captchaInput.value.trim() !== captchaText.innerHTML) {
        captchaError.innerHTML = "Incorrect Captcha";
        return false;
    }
    captchaError.innerHTML = "";
    return true;
}

username.addEventListener("input", validateUsername);
fullname.addEventListener("input", validateFullname);
password.addEventListener("input", validatePassword);
confirmPassword.addEventListener("input", validateConfirmPassword);
email.addEventListener("input", validateEmail);
mobile.addEventListener("input", validateMobile);
captchaInput.addEventListener("input", validateCaptcha);

form.addEventListener("submit", function(e) {
    e.preventDefault();
    let valid = 
    validateUsername() &&
    validateFullname() &&
    validatePassword() &&
    validateConfirmPassword() &&
    validateEmail() &&
    validateMobile() &&
    validateCaptcha();

    if(valid) {
        alert("Registration Successful!");
        form.reset();
        document.querySelectorAll("input").forEach (input => {
            input.classList.remove("success");
            input.classList.remove("error");
            if(input.nextElementSibling)
                input.nextElementSibling.innerHTML = "";
        });
        captchaError.innerHTML = "";
        generateCaptcha();
    }
});