function validateForm() {
    // --- INITIALIZATION & RESET ---
    // Clear every error span and success message at the start of each attempt
    const errorSpans = document.querySelectorAll('.error-span');
    for (let i = 0; i < errorSpans.length; i++) {
        errorSpans[i].innerHTML = "";
    }
    document.getElementById("successMessage").innerHTML = "";

    // Set validation flag; remains true unless a check fails
    let isValid = true;

    // ---------------------------------------------------------
    // SECTION 1: PERSONAL INFORMATION 
    // ---------------------------------------------------------

    // Full Name: Check if not empty and has at least 2 characters
    const fullName = document.getElementById("fullName").value.trim();
    if (fullName === "" || fullName.length < 2) {
        document.getElementById("nameError").innerHTML = "Full name must be at least 2 characters.";
        isValid = false;
    }

    // Birthdate: Validate input exists and user is 13+ years old 
    const bdayInput = document.getElementById("birthdate").value;
    if (bdayInput === "") {
        document.getElementById("dateError").innerHTML = "Please select your birthdate.";
        isValid = false;
    } else {
        const birthDate = new Date(bdayInput);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        
        // Accurate age calculation based on current month/day
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        
        if (age < 13) {
            document.getElementById("dateError").innerHTML = "You must be 13 years old or older to join.";
            isValid = false;
        }
    }

    // Sex: Validate radio group using a for loop to check for selection ]
    const sexGroup = document.getElementsByName("sex");
    let sexChecked = false;
    for (let i = 0; i < sexGroup.length; i++) {
        if (sexGroup[i].checked) {
            sexChecked = true;
            break;
        }
    }
    if (!sexChecked) {
        document.getElementById("sexError").innerHTML = "Please select your sex.";
        isValid = false;
    }

    // Email: Basic validation for '@' symbol and a '.' following it 
    const email = document.getElementById("email").value.trim();
    if (email === "" || !email.includes("@") || !email.includes(".", email.indexOf("@"))) {
        document.getElementById("emailError").innerHTML = "Please enter a valid email address.";
        isValid = false;
    }

    // ---------------------------------------------------------
    // SECTION 2: ACCOUNT DETAILS 
    // ---------------------------------------------------------

    // Username: Length check (8-20) and regex for alphanumeric characters 
    const username = document.getElementById("username").value;
    const userRegex = /^[a-zA-Z0-9]+$/;
    if (username.length < 8 || username.length > 20) {
        document.getElementById("userError").innerHTML = "Username must be 8-20 characters.";
        isValid = false;
    } else if (!userRegex.test(username)) {
        document.getElementById("userError").innerHTML = "Username may only contain letters and numbers.";
        isValid = false;
    }

    // Password: Check length (10+) and complexity (Upper, Lower, Digit) 
    const password = document.getElementById("password").value;
    if (password.length < 10) {
        document.getElementById("passError").innerHTML = "Password must be at least 10 characters.";
        isValid = false;
    } else if (!/[A-Z]/.test(password)) {
        document.getElementById("passError").innerHTML = "Include at least one uppercase letter.";
        isValid = false;
    } else if (!/[a-z]/.test(password)) {
        document.getElementById("passError").innerHTML = "Include at least one lowercase letter.";
        isValid = false;
    } else if (!/[0-9]/.test(password)) {
        document.getElementById("passError").innerHTML = "Include at least one digit.";
        isValid = false;
    }

    // Confirm Password: Ensure this matches the original password field 
    const confirmPass = document.getElementById("confirm").value;
    if (confirmPass !== password) {
        document.getElementById("confirmError").innerHTML = "Passwords do not match.";
        isValid = false;
    }

    // ---------------------------------------------------------
    // SECTION 3: TOPIC QUESTIONS 
    // ---------------------------------------------------------

    // Dropdown (Select): Verify the default blank option is not selected 
    const topic = document.getElementById("topic").value;
    if (topic === "") {
        document.getElementById("topicError").innerHTML = "Please choose a program area.";
        isValid = false;
    }

    // Checkbox Group: Use a loop to confirm at least one box is checked

    const helpGroup = document.getElementsByName("help");
    let helpSelected = false;
    for (let j = 0; j < helpGroup.length; j++) {
        if (helpGroup[j].checked) {
            helpSelected = true;
            break;
        }
    }
    if (!helpSelected) {
        document.getElementById("helpError").innerHTML = "Select at least one way to support us.";
        isValid = false;
    }

    // Third Topic Question: Ensure the text field is not left empty
    const ref = document.getElementById("ref").value.trim();
    if (ref === "") {
        document.getElementById("refError").innerHTML = "Please share your thoughts with us.";
        isValid = false;
    }

    // --- FINAL SUBMISSION LOGIC ---
    // If all checks pass, show success message and redirect to homepage 
    if (isValid) {
        document.getElementById("successMessage").innerHTML = "Welcome to ARAL! Redirecting to home...";
        setTimeout(() => {
            window.location.href = "index.html";
        }, 2000);
    }

    // Return final validation status; false prevents form submission 
    return isValid;
}