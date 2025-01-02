// Update loaders query after creating elements
let loaders = document.querySelectorAll(".pageloading");

if (loaders) {
	window.addEventListener("load", () => {
		loaders.forEach((loader) => {
			setTimeout(() => {
				loader.classList.add("shrink");
				setTimeout(() => (loader.style.display = "none"), 1000);
			}, 2000);
		});
	});
}

document.addEventListener("DOMContentLoaded", () => {
	if (document.querySelector("#element")) {
		var typed = new Typed("#element", {
			strings: ["Welcome to ", "Our Modern Blog"],
			typeSpeed: 150,
			showCursor: false,
			loop: true,
			loopCount: Infinity,
			fadeOutDelay: 500,
		});
	}
	let body = document.querySelector("body");
	let icon = document.querySelector("#theme-toggle .icon i");
	let themeToggle = document.querySelector("#theme-toggle");

	// Initialize theme based on localStorage
	const savedTheme = localStorage.getItem("theme") || "light";
	document.documentElement.setAttribute("theme", savedTheme);
	body.classList.toggle("dark-mode", savedTheme === "dark");
	icon.classList.toggle("fa-moon", savedTheme === "dark");
	icon.classList.toggle("fa-sun", savedTheme !== "dark");

	// Single event listener for toggling theme
	themeToggle.addEventListener("click", () => {
		const currentTheme = document.documentElement.getAttribute("theme");
		const newTheme = currentTheme === "light" ? "dark" : "light";

		// Update theme attribute and save to localStorage
		document.documentElement.setAttribute("theme", newTheme);
		localStorage.setItem("theme", newTheme);

		// Update classes for dark mode and icon
		body.classList.toggle("dark-mode", newTheme === "dark");
		icon.classList.toggle("fa-sun");
		icon.classList.toggle("fa-moon");
	});

	const cards = document.querySelectorAll(".horizontal-accordion .card");
	cards.forEach((card) => {
		card.addEventListener("click", (e) => {
			cards.forEach((c) => c.classList.remove("is-active"));
			card.classList.add("is-active");

			const bgImg = document.querySelector("#bg img");
			bgImg.style.opacity = "0";

			setTimeout(() => {
				bgImg.src = `./assets/posts/${card.getAttribute("img")}`;
				bgImg.style.opacity = "1";
			}, 300);
		});
	});

	const counters = document.querySelectorAll(".js-count-up");
	const speed = 400;

	const animate = (counter) => {
		const targetValue = +counter.getAttribute("akhi");
		let currentValue = 0;

		const increment = targetValue / speed;

		const timer = setInterval(() => {
			currentValue += increment;

			if (currentValue >= targetValue) {
				counter.innerText = targetValue;
				clearInterval(timer);
			} else {
				counter.innerText = Math.ceil(currentValue);
			}
		}, 1);
	};
	if (document.querySelector(".stats")) {
		new Waypoint({
			element: document.querySelector(".stats"),
			handler: function () {
				counters.forEach((counter) => animate(counter));
				//this.destroy() //for once
			},
			offset: "80%",
		});
	}
});
