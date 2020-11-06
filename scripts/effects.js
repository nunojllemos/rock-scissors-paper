// elements
const inputs = document.querySelectorAll("input[type=text]:first-of-type");
const cancelButtons = document.querySelectorAll(".cancel");

/* EVENTS */
// add events on inputs
inputs.forEach((input, i) => {
	// on focus event
	input.addEventListener("focus", (e) => {
		// hide cancel button
		if (e.target.value === "") {
			cancelButton[i].style.display = "none";
		}

		// label goes top
		e.target.parentElement.children[0].classList.add("label-top");
		e.target.parentElement.children[0].classList.remove("label");

		// get yellow border
		e.target.parentElement.children[2].style.left = "0";
	});

	// on focus out event
	input.addEventListener("focusout", (e) => {
		// set label back as placeholder
		if (e.target.value === "") {
			e.target.parentElement.children[0].classList.remove("label-top");
			e.target.parentElement.children[0].classList.add("label");
			cancelButtons[i].style.display = "none";
		}

		// set border to white if input is empty
		if (e.target.value !== "") {
			e.target.style.borderBottom = "1.5px solid #eac100";
		} else if (!e.target.className.includes("input-border")) {
			e.target.style.borderBottom = "1.5px solid #fff";
		}
		e.target.parentElement.children[2].style.left = "-100%";
	});
});

const resetLogin = () => {
	inputs.forEach((input) => {
		// set labels down
		input.parentElement.children[0].classList.add("label");
		input.parentElement.children[0].classList.remove("label-top");
		// set border white
		input.parentElement.children[2].style.left = "-100%";
		input.parentElement.children[1].style.borderBottom = "1.5px solid white";
		// hide cancel button
		input.parentElement.children[3].style.display = "none";
	});
};
