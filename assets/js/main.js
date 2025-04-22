/*
	Stellar by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

function togglePackage(id) {
	let content = document.getElementById(id);
	if (content.style.display === "block") {
		content.style.display = "none";
	} else {
		document.querySelectorAll('.package-content').forEach(el => el.style.display = 'none');
		content.style.display = "block";
	}
}

/* Path Navigation */
document.addEventListener("DOMContentLoaded", function () {
    var path = window.location.pathname.split("/").pop() || "index.html";
    var isEnglish = window.location.pathname.includes("/en-renew-project/");
    var breadcrumb = document.getElementById("breadcrumb");

    var titlesBG = {
        "index.html": "Начало",
        "packages.html": "Работни пакети",
        "project-about.html": "За Проект RENEW",
        "team.html": "Екип"
    };

    var titlesEN = {
        "en-index.html": "Introduction",
        "en-packages.html": "Work Packages",
        "en-project-about.html": "RENEW Project",
        "en-team.html": "Team"
    };

    var sectionsBG = {
        "#first": "За Нас",
        "#second": "Публикации",
        "#news": "Новини",
    };

    var sectionsEN = {
        "#first": "About Us",
        "#second": "Publications",
        "#news": "News",
    };

    var pageTitle = isEnglish ? titlesEN[path] : titlesBG[path] || path;

    var customHierarchy = {
        "packages.html": "index.html#first",
        "team.html": "index.html#first",
        "en-packages.html": "en-index.html#first",
        "en-team.html": "en-index.html#first",
    };

    var sectionPath = customHierarchy[path] || "";
    var sectionTitle = isEnglish ? sectionsEN[sectionPath.replace("en-index.html", "")] : sectionsBG[sectionPath.replace("index.html", "")];

    if (sectionPath) {
        breadcrumb.innerHTML = `
            <a href="${isEnglish ? "en-index.html#intro" : "index.html#intro"}">${isEnglish ? "Introduction" : "Начало"}</a> » 
            <a href="${sectionPath}">${sectionTitle}</a> » 
            <span>${pageTitle}</span>
        `;
    } else {
        breadcrumb.innerHTML = `<a href="${isEnglish ? "en-index.html#intro" : "index.html#intro"}">${isEnglish ? "Introduction" : "Начало"}</a> » <span>${pageTitle}</span>`;
    }
});

/*Сгъване и разгъване на текст*/
document.querySelectorAll('.toggle-abstract').forEach(button => {
	button.addEventListener('click', () => {
		const abstract = button.parentElement;
		const shortText = abstract.querySelector('.short-text');
		const fullText = abstract.querySelector('.full-text');
		const isExpanded = fullText.style.display === 'inline';

		const lang = document.documentElement.lang;

		if (isExpanded) {
			fullText.style.display = 'none';
			shortText.style.display = 'inline';
			button.textContent = lang === 'bg' ? 'Виж повече' : 'Show more';
		} else {
			fullText.style.display = 'inline';
			shortText.style.display = 'none';
			button.textContent = lang === 'bg' ? 'Скрий' : 'Show less';
		}
	});
});

/*Сгъване и разгъване на текст
	document.querySelectorAll('.toggle-abstract').forEach(button => {
		button.addEventListener('click', () => {
			const abstract = button.parentElement;
			const shortText = abstract.querySelector('.short-text');
			const fullText = abstract.querySelector('.full-text');

			const isExpanded = fullText.style.display === 'inline';

			if (isExpanded) {
				fullText.style.display = 'none';
				shortText.style.display = 'inline';
				button.textContent = 'Виж повече';
			} else {
				fullText.style.display = 'inline';
				shortText.style.display = 'none';
				button.textContent = 'Скрий';
			}
		});
	});*/

/* Path EN/BG Navigation */
document.addEventListener("DOMContentLoaded", function () {
    var langButton = document.getElementById("language-toggle");
    var isBulgarian = !window.location.pathname.includes("/en-renew-project/");

    langButton.textContent = isBulgarian ? "EN" : "BG";

    langButton.addEventListener("click", function () {
        var currentPath = window.location.pathname;
        var fileName = currentPath.split("/").pop() || "index.html";
        var newUrl;

        if (isBulgarian) {
            newUrl = "/en-renew-project/en-" + fileName;
        } else {
            newUrl = "/" + fileName.replace("en-", "");
        }

        window.location.href = newUrl;
    });
});


(function ($) {

	var $window = $(window),
		$body = $('body'),
		$main = $('#main');

	// Breakpoints.
	breakpoints({
		xlarge: ['1281px', '1680px'],
		large: ['981px', '1280px'],
		medium: ['737px', '980px'],
		small: ['481px', '736px'],
		xsmall: ['361px', '480px'],
		xxsmall: [null, '360px']
	});

	// Play initial animations on page load.
	$window.on('load', function () {
		window.setTimeout(function () {
			$body.removeClass('is-preload');
		}, 100);
	});

	// Nav.
	var $nav = $('#nav');

	if ($nav.length > 0) {

		// Shrink effect.
		$main
			.scrollex({
				mode: 'top',
				enter: function () {
					$nav.addClass('alt');
				},
				leave: function () {
					$nav.removeClass('alt');
				},
			});

		// Links.
		var $nav_a = $nav.find('a');

		$nav_a
			.scrolly({
				speed: 1000,
				offset: function () { return $nav.height(); }
			})
			.on('click', function () {

				var $this = $(this);

				// External link? Bail.
				if ($this.attr('href').charAt(0) != '#')
					return;

				// Deactivate all links.
				$nav_a
					.removeClass('active')
					.removeClass('active-locked');

				// Activate link *and* lock it (so Scrollex doesn't try to activate other links as we're scrolling to this one's section).
				$this
					.addClass('active')
					.addClass('active-locked');

			})
			.each(function () {

				var $this = $(this),
					id = $this.attr('href'),
					$section = $(id);

				// No section for this link? Bail.
				if ($section.length < 1)
					return;

				// Scrollex.
				$section.scrollex({
					mode: 'middle',
					initialize: function () {

						// Deactivate section.
						if (browser.canUse('transition'))
							$section.addClass('inactive');

					},
					enter: function () {

						// Activate section.
						$section.removeClass('inactive');

						// No locked links? Deactivate all links and activate this section's one.
						if ($nav_a.filter('.active-locked').length == 0) {

							$nav_a.removeClass('active');
							$this.addClass('active');

						}

						// Otherwise, if this section's link is the one that's locked, unlock it.
						else if ($this.hasClass('active-locked'))
							$this.removeClass('active-locked');

					}
				});

			});

	}

	// Scrolly.
	$('.scrolly').scrolly({
		speed: 1000
	});



})(jQuery);