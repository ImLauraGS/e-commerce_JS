
// Exercise 6
function validate() {
	var error = 0;
	// Get the input fields
	var fName = document.getElementById("fName");
	var fEmail = document.getElementById("fEmail");
	var fAddress = document.getElementById("fAddress");
	var fPassword = document.getElementById("fPassword");
	var fPhone = document.getElementById("fPhone");


	// Get the error elements
	var errorName = document.getElementById("errorName");
	var errorEmail = document.getElementById("errorEmail");
	var errorAddress = document.getElementById("errorAddress");
	var errorPassword = document.getElementById("errorPassword");
	var errorPhone = document.getElementById("errorPhone");

	fName.classList.remove("is-invalid");
    fLastN.classList.remove("is-invalid");
    fEmail.classList.remove("is-invalid");
    fAddress.classList.remove("is-invalid");
    fPassword.classList.remove("is-invalid");
    fPhone.classList.remove("is-invalid");
    errorName.textContent = "";
    errorLastN.textContent = "";
    errorEmail.textContent = "";
    errorAddress.textContent = "";
    errorPassword.textContent = "";
    errorPhone.textContent = "";

	
	// Validate fields entered by the user: name, phone, password, and email
	if (fName.value.length < 3 || !/^[a-zA-Z]+$/.test(fName.value)) {
        error++;
        fName.classList.add("is-invalid");
        errorName.textContent = "Name must contain at least 3 letters and only alphabetical characters.";
    }

	if (fLastN.value.length < 3 || !/^[a-zA-Z]+$/.test(fLastN.value)) {
        fLastN.classList.add("is-invalid");
        errorLastN.textContent = "Last name must contain at least 3 letters and only alphabetical characters.";
    }

	if (!fEmail.value || !/\S+@\S+\.\S+/.test(fEmail.value)) {
        fEmail.classList.add("is-invalid");
        errorEmail.textContent = "Please enter a valid email address.";
    }

    if (fAddress.value.length < 3) {
        fAddress.classList.add("is-invalid");
        errorAddress.textContent = "Address must contain at least 3 characters.";
    }

    if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(fPassword.value)) {
        fPassword.classList.add("is-invalid");
        errorPassword.textContent = "Password must contain at least 8 characters with at least one letter and one number.";
    }

    if (!/^\d+$/.test(fPhone.value)) {
        fPhone.classList.add("is-invalid");
        errorPhone.textContent = "Phone number must contain only numbers.";
    }
	// if(error>0){
	// 	alert("Please fill in the required fields");
	// }else{
	// 	alert("OK");
	// }
}

document.getElementById("fName").addEventListener("change", validate);
document.getElementById("fLastN").addEventListener("change", validate);
document.getElementById("fEmail").addEventListener("change", validate);
document.getElementById("fAddress").addEventListener("change", validate);
document.getElementById("fPassword").addEventListener("change", validate);
document.getElementById("fPhone").addEventListener("change", validate);
