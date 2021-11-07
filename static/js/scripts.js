/*!
* Start Bootstrap - Stylish Portfolio v6.0.4 (https://startbootstrap.com/theme/stylish-portfolio)
* Copyright 2013-2021 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-stylish-portfolio/blob/master/LICENSE)
*/
window.addEventListener('DOMContentLoaded', event => {

    const sidebarWrapper = document.getElementById('sidebar-wrapper');
    let scrollToTopVisible = false;
    // Closes the sidebar menu
    const menuToggle = document.body.querySelector('.menu-toggle');
    menuToggle.addEventListener('click', event => {
        event.preventDefault();
        sidebarWrapper.classList.toggle('active');
        _toggleMenuIcon();
        menuToggle.classList.toggle('active');
    })

    // Closes responsive menu when a scroll trigger link is clicked
    var scrollTriggerList = [].slice.call(document.querySelectorAll('#sidebar-wrapper .js-scroll-trigger'));
    scrollTriggerList.map(scrollTrigger => {
        scrollTrigger.addEventListener('click', () => {
            sidebarWrapper.classList.remove('active');
            menuToggle.classList.remove('active');
            _toggleMenuIcon();
        })
    });

    function _toggleMenuIcon() {
        const menuToggleBars = document.body.querySelector('.menu-toggle > .fa-bars');
        const menuToggleTimes = document.body.querySelector('.menu-toggle > .fa-times');
        if (menuToggleBars) {
            menuToggleBars.classList.remove('fa-bars');
            menuToggleBars.classList.add('fa-times');
        }
        if (menuToggleTimes) {
            menuToggleTimes.classList.remove('fa-times');
            menuToggleTimes.classList.add('fa-bars');
        }
    }

    // Scroll to top button appear
    document.addEventListener('scroll', () => {
        const scrollToTop = document.body.querySelector('.scroll-to-top');
        if (document.documentElement.scrollTop > 100) {
            if (!scrollToTopVisible) {
                fadeIn(scrollToTop);
                scrollToTopVisible = true;
            }
        } else {
            if (scrollToTopVisible) {
                fadeOut(scrollToTop);
                scrollToTopVisible = false;
            }
        }
    })
})

function fadeOut(el) {
    el.style.opacity = 1;
    (function fade() {
        if ((el.style.opacity -= .1) < 0) {
            el.style.display = "none";
        } else {
            requestAnimationFrame(fade);
        }
    })();
};

function fadeIn(el, display) {
    el.style.opacity = 0;
    el.style.display = display || "block";
    (function fade() {
        var val = parseFloat(el.style.opacity);
        if (!((val += .1) > 1)) {
            el.style.opacity = val;
            requestAnimationFrame(fade);
        }
    })();
};

//배너 사진 렌덤 표출 함수
let randomNumber = Math.floor(Math.random() * 4) + 1;
document.querySelector('.masthead').classList.add('bg0' + randomNumber);

//TMDB API DATA 불러와서 영화 포스터 카드 표출
$(document).ready(function () {
    showAPI();
});



function showAPI() {
    $.ajax({
        type: "GET",
        url: "/API?",
        data: {},
        success: function (response) {
            let api_read = response['api_loading']

            //api_read.length만큼 반복하여 이름,포스터,내용,평점,투표수 등을 가져옴
            for (let i = 0; i < api_read.length; i++) {
                let title = api_read[i]['title']
                let img_url = api_read[i]['poster_path']
                //console.log(title, img_url)
                let temp_html = `<div id="popup_open_btn">
                                    <a class="portfolio-item" href="#modal-form" rel="modal:open">
                                        <div class="caption">
                                            <div class="caption-content" >
                                                <div class="h2">${title}</div>
                                            </div>
                                        </div>
                                        <img class="img-fluid" src="https://image.tmdb.org/t/p/original${img_url}" alt="..." />
                                    </a>
                                </div>`
                $('#row_gx_0').append(temp_html)
            }
        }
    })
}
