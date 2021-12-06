document.addEventListener('DOMContentLoaded', () => {
	// hamburger
	// Get all "navbar-burger" elements
	const $navbarBurgers = Array.prototype.slice.call(
		document.querySelectorAll('.navbar-burger'),
		0
	)

	// Check if there are any navbar burgers
	if ($navbarBurgers.length > 0) {
		// Add a click event on each of them
		$navbarBurgers.forEach((el) => {
			let children = el.children
			// Get the target from the "data-target" attribute
			const target = el.dataset.target
			const $target = document.getElementById(target)
			el.addEventListener('click', function (event) {
				console.log(event.currentTarget)
				// Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
				el.classList.toggle('is-active')
				$target.classList.toggle('is-active')
			})
		})
	}

	// Inject faqs

	let faqSection = document.getElementById('faq-section')
	let faqTemplate = document.getElementById('faq-template')

	var converter = new showdown.Converter()

	JSON.parse(faqsData).forEach((faqData) => {
		let clone = faqTemplate.content.cloneNode(true)

		clone.querySelector('.question h3').textContent = faqData.q
		clone.querySelector('.answer p').innerHTML = converter.makeHtml(
			faqData.a
		)

		faqSection.appendChild(clone)
	})

	const faqs = document.querySelectorAll('.faq')
	faqs.forEach((faq) => {
		faq.addEventListener('click', () => {
			faq.classList.toggle('active')
		})
	})

	// link buttons
	const navlogo = document.querySelector('.navbar-item img')
	navlogo.addEventListener('click', () => {
		window.location.href = 'https://jax-core.github.io'
	})

	// donation button
	const donation = document.getElementById('donation')
	donation.addEventListener('click', () => {
		window.open(
			'https://ko-fi.com/jaxoriginals',
			'Jax - KoFi',
			'height=500, width=400'
		)
	})

	// download button
	document
		.querySelectorAll('.coredownload')
		.forEach((el) => el.addEventListener('click', downloadLatestCore))
})

//#region scroll animation

let navScrollElements = document.querySelectorAll(
	'.navbar.has-background-transparent'
)

const scrollProc = () => {
	if (document.body.getBoundingClientRect().top < 0) {
		navScrollElements.forEach((el) => {
			el.classList.add('scrolled')
		})
	} else {
		navScrollElements.forEach((el) => {
			el.classList.remove('scrolled')
		})
	}
}

let throttleTimer = false

const throttle = (callback, time) => {
	if (throttleTimer) return

	throttleTimer = true

	setTimeout(() => {
		callback()
		throttleTimer = false
	}, time)
}

window.addEventListener('scroll', () => {
	throttle(scrollProc, 50)
})

// var acc = document.getElementsByClassName('accordion')

// for (let i = 0; i < acc.length; i++) {
// 	acc[i].addEventListener('click', function () {
// 		/* Toggle between adding and removing the "active" class,
//     to highlight the button that controls the panel */
// 		this.classList.toggle('active')

// 		/* Toggle between hiding and showing the active panel */
// 		var panel = this.nextElementSibling
// 		if (panel.style.display === 'block') {
// 			panel.style.display = 'none'
// 		} else {
// 			panel.style.display = 'block'
// 		}
// 	})
// }

//#endregion
