/* VARIABLES */
// login elements
const loginButton = document.getElementById("login");
const cpuInput = document.querySelector("#cpu-input");
const usernameInput = document.querySelector("#username-input");
const loginArea = document.querySelector(".login");
const inputsText = document.querySelectorAll("input[type=text]:first-of-type");
const cancelButton = document.querySelectorAll(".cancel");

// rules
const rulesButton = document.querySelector(".btn-rules");
const rulesBg = document.querySelector(".rules-bg");
const rules = document.querySelector(".rules");
const close = document.querySelector(".close");

// game elements
const header = document.querySelector("header");
const selectArea = document.querySelector(".select");
const playArea = document.querySelector(".play");
const scoreValue = document.querySelector("#score");
const donut = document.querySelectorAll(".donut");
const playerArea = document.querySelector(".p1-play");
const cpuArea = document.querySelector(".cpu-play");
const cpu = document.querySelector("#cpu");
const username = document.querySelector("#username");
const winner = document.querySelector("#winner");
const playAgain = document.querySelector(".play-again");
const reset = document.querySelector("#reset");

// effect elements
const pageTransition = document.querySelector(".page-transition");

// game state
let game = {
	score: 0,
	stage: "login",
	winner: "",
	player: {
		name: "Player 1",
		option: "",
	},
	cpu: {
		name: "cpu",
		option: "",
	},
};

/* EVENTS */
//reset
reset.addEventListener("click", () => {
	resetGame();
});

// rules
rulesButton.addEventListener("click", (e) => {
	e.preventDefault();
	// show rules background
	rulesBg.style.display = "flex";

	// show rules
	rules.style.display = "block";

	// close rules
	close.addEventListener("click", (e) => {
		e.preventDefault();

		// hide rules
		rulesBg.style.display = "none";
		rules.style.display = "none";
	});
});

// login event
loginButton.addEventListener("click", (e) => {
	e.preventDefault();

	// set game stage
	game.stage = "select";

	// validation inputs
	if (usernameInput.value !== "") {
		game.player.name = usernameInput.value;
		username.innerText = usernameInput.value;
	}
	if (cpuInput.value !== "") {
		game.cpu.name = cpuInput.value;
		cpu.innerText = cpuInput.value;
	}

	// slid effect
	slide();

	// hide login area
	loginArea.style.display = "none";

	// show game area
	setTimeout(() => {
		header.style.display = "flex";
		reset.style.display = "block";
		selectArea.style.display = "block";
	}, 500);
});

// add clear icon to inputs
inputsText.forEach((input, i) => {
	input.addEventListener("keyup", (e) => {
		if (e.target.value !== "") {
			cancelButton[i].style.display = "block";
		} else {
			cancelButton[i].style.display = "none";
		}
	});
});

// clear input on button click
cancelButton.forEach((button) => {
	button.addEventListener("click", (e) => clearInput(e));
});

// select event
donut.forEach((donut) => {
	donut.addEventListener("click", (e) => {
		e.preventDefault();
		// only works on select stage
		if (game.stage === "select") {
			// selecting the option clicked
			if (e.target.nodeName === "IMG") {
				getPlayerOption(e.target.parentElement.parentElement);
			} else {
				if (e.target.className.includes("semi-circle")) {
					getPlayerOption(e.target.parentElement);
				} else {
					getPlayerOption(e.target);
				}
			}

			// slide page transition
			slide();

			// hide select area
			selectArea.style.display = "none";

			setTimeout(() => {
				// show play area
				playArea.style.display = "grid";

				// play game
				play();
			}, 500);
		}
	});
});

// play again event
playAgain.addEventListener("click", (e) => {
	e.preventDefault();

	// set page transition
	slide();

	// hide play area
	playArea.style.display = "none";

	setTimeout(() => {
		// show select area
		selectArea.style.display = "block";
	}, 500);

	// set game stage
	game.stage = "select";
});

/* FUNCTIONS */
// reset
const resetGame = () => {
	// set stage to login
	game.stage = "login";

	// slide page transition
	slide();

	setTimeout(() => {
		// reset UI
		resetUI();

		// FUNCTIONALITY changes
		game = {
			score: 0,
			stage: "login",
			winner: "",
			player: {
				name: "Player 1",
				option: "",
			},
			cpu: {
				name: "cpu",
				option: "",
			},
		};
	}, 500);
};

// reset UI login
const resetUI = () => {
	// UI changes
	// show login area
	loginArea.style.display = "block";
	// hide other areas
	header.style.display = "none";
	selectArea.style.display = "none";
	playArea.style.display = "none";
	reset.style.display = "none";
	// reset inputs
	usernameInput.value = "";
	cpuInput.value = "";
	// reformat inputs style
	resetLogin();
};

// play game
const play = () => {
	// set game stage
	game.stage = "play";

	// set cpu option
	getCpuOption();

	// set winner
	setWinner();

	// set score
	setScore(game.winner);

	// set UI
	setUI();
};

// set winner
const setWinner = () => {
	if (game.player.option === "paper") {
		switch (game.cpu.option) {
			case "paper":
				game.winner = "draw";
				break;
			case "scissors":
				game.winner = game.cpu.name;
				break;
			case "rock":
				game.winner = game.player.name;
				break;
		}
	} else if (game.player.option === "scissors") {
		switch (game.cpu.option) {
			case "paper":
				game.winner = game.player.name;
				break;
			case "scissors":
				game.winner = "draw";
				break;
			case "rock":
				game.winner = game.cpu.name;
				break;
		}
	} else {
		switch (game.cpu.option) {
			case "paper":
				game.winner = game.cpu.name;
				break;
			case "scissors":
				game.winner = game.player.name;
				break;
			case "rock":
				game.winner = "draw";
				break;
		}
	}
};

// set score
const setScore = (winner) => {
	if (game.score === 0) {
		if (winner === game.player.name) {
			game.score++;
		}
	} else {
		if (winner === game.cpu.name) {
			game.score--;
		} else if (winner === game.player.name) {
			game.score++;
		}
	}
};

// clear input
const clearInput = (e) => {
	e.target.parentElement.children[1].value = "";
	e.target.parentElement.children[1].focus();
};

// get option from user
const getPlayerOption = (el) => {
	if (el.className.includes("paper")) {
		game.player.option = "paper";
	} else if (el.className.includes("scissors")) {
		game.player.option = "scissors";
	} else if (el.className.includes("rock")) {
		game.player.option = "rock";
	}
};

// get option from cpu
const getCpuOption = () => {
	// get random number between 0 and 2
	let choice = Math.floor(Math.random() * 3);

	// setting option
	switch (choice) {
		case 0:
			game.cpu.option = "paper";
			break;
		case 1:
			game.cpu.option = "scissors";
			break;
		case 2:
			game.cpu.option = "rock";
			break;
	}
};

// set UI after players choice
const setUI = () => {
	// set username and cpu name
	cpu.innerText = game.cpu.name;
	username.innerText = game.player.name;

	// set winner text
	if (game.winner !== "draw") {
		winner.innerHTML = `<span style="color: #eac100;">${game.winner}</span> WIN`;
	} else {
		winner.innerText = "DRAW";
	}

	// set score
	scoreValue.innerText = game.score;

	// set UI for player option
	playerArea.children[0].innerHTML = `
    <div class="donut ${game.player.option}">
      <div class="semi-circle">
        <img src="./images/icon-${game.player.option}.svg" alt="${game.player.option} hand sign" />
      </div>
    </div>
  `;

	// set UI for cpu option
	cpuArea.children[0].innerHTML = `
    <div class="donut ${game.cpu.option}">
      <div class="semi-circle">
        <img src="./images/icon-${game.cpu.option}.svg" alt="${game.cpu.option} hand sign" />
      </div>
    </div>
	`;

	if (game.stage === "play") {
		// set winner donut bigger
		if (game.winner.toUpperCase() === username.innerText) {
			// set scale and drop shadow
			username.parentElement.parentElement.children[0].children[0].style.transform =
				"scale(1.1)";
			username.parentElement.parentElement.children[0].children[0].style.filter =
				"drop-shadow(0 0 50px rgba(255, 255, 255, 0.4)) drop-shadow(0 3px 2px rgba(0,0,0,.4))";

			// set scale and grayscale and stop animation
			cpu.parentElement.parentElement.children[0].children[0].style.transform =
				"scale(0.8)";
			cpu.parentElement.parentElement.children[0].children[0].style.filter =
				"grayscale(25%)";
			cpu.parentElement.parentElement.children[0].children[0].children[0].children[0].style.animation =
				"none";
		} else if (game.winner.toUpperCase() === cpu.innerText) {
			// set scale and drop shadow
			cpu.parentElement.parentElement.children[0].children[0].style.transform =
				"scale(1.1)";
			cpu.parentElement.parentElement.children[0].children[0].style.filter =
				"drop-shadow(0 0 50px rgba(255, 255, 255, 0.4)) drop-shadow(0 3px 2px rgba(0,0,0,.4))";
			// set scale and grayscale ans stop shake
			username.parentElement.parentElement.children[0].children[0].style.transform =
				"scale(0.8)";
			username.parentElement.parentElement.children[0].children[0].style.filter =
				"grayscale(25%)";
			username.parentElement.parentElement.children[0].children[0].children[0].children[0].style.animation =
				"none";
		} else {
			cpu.parentElement.parentElement.children[0].children[0].style.transform =
				"scale(1)";
			username.parentElement.parentElement.children[0].children[0].style.transform =
				"scale(1)";
		}
	}
};

// page transition effect
const slide = () => {
	// add animation
	pageTransition.classList.add("slide");

	// remove animation
	setTimeout(() => {
		pageTransition.classList.remove("slide");
	}, 750);
};
