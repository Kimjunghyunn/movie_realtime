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

//불러온 TMDB API DATA 표출
$(document).ready(function () {
    showAPI();
});



//TMDP API DATA 불러오기
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
                let posternum = i
                let temp_html = `<div class="col-lg-6" >
                                    <a class="portfolio-item" href="#modal-form-${posternum}" rel="modal:open" >
                                        <div class="caption">
                                            <div class="caption-content" >
                                            </div>
                                        </div>
                                        <img class="img-fluid" src="https://image.tmdb.org/t/p/original${img_url}" alt="..." />
                                    </a>
                                </div>`
                $('#row_gx_0').append(temp_html)
                

                let overview = api_read[i]['overview']
                let backdrop_path = api_read[i]['backdrop_path']
                let vote_average = api_read[i]['vote_average']
                
                //배우, 감독 부르는 url 생성하기
                //해당 영화 고유값 불러오기
                
                let movie_id_give = api_read[i]['id']
                let movie_id_give_url = 'https://api.themoviedb.org/3/movie/' + movie_id_give + '/credits?api_key=b3574ad4d1429f3dd3841d2b6658110d'
                
                $.ajax({
                    type: "GET",
                    url: movie_id_give_url,
                    data: {},
                    success: function (response) {
                        let api_credit_read = response['crew']
                        //감독 한 명만 카운트 세기
                        let director_count = 0

                        // 제작진 중에서 직책이 감독인 사람 찾기
                        for (let i = 0; i < api_credit_read.length; i++) {
                            let crews_job = api_credit_read[i]['job']
                            let crews_name = api_credit_read[i]['name']

                            if (crews_job == 'Director' && director_count == 0) {
                                let director = crews_name
                                let temp_html2 = `<div class="modal_background">
                                                        <div class="content_card">
                                                            <hr>
                                                            <img class="poster" src="https://image.tmdb.org/t/p/original${backdrop_path}" alt="movie poster">
                                                            <hr>
                                                            <h3 class="card-text">${title}</h3>
                                                            <br>
                                                            <p class="card-text">감독 : ${director}</p>
                                                            <p class="card-text">평점 : ${vote_average} / 10</p>
                                                            <hr>
                                                            <p class="card-text">< 줄거리 >
                                                            <p class="card-text">${overview}</p>
                                                            <hr>
                                                        </div>
                                                    </div>`
                                                    
                                $('#modal-form-'+posternum).append(temp_html2)
                                director_count++             
                            }
                        }
                    }
                })
            }
        }
    })
}

//modal option
$.modal.defaults = {
    showClose: false,        // Shows a (X) icon/link in the top-right corner
    escapeClose: true,      // Allows the user to close the modal by pressing `ESC`
    clickClose: true,       // Allows the user to close the modal by clicking the overlay
    fadeDuration: 500,     // Number of milliseconds the fade transition takes (null means no transition)
    fadeDelay: 0.7          // Point during the overlay's fade-in that the modal begins to fade in (.5 = 50%, 1.5 = 150%, etc.)
};

//??
$("#sticky").modal({
    escapeClose: false,
    clickClose: false,
    showClose: false
});