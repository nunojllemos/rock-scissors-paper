// elements
const inputs = document.querySelectorAll("input[type=text]:first-of-type");

//events
// add events on inputs
inputs.forEach((input, i) => {
	// on focus event
	input.addEventListener("focus", (e) => {
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
