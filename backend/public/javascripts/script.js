// signin &&  signup
const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});
function login() {

}

function getArticlesList() {
  fetch('/post', {
    headers: {
      'Accept': 'application/json',
    },
    method: 'GET'
  }).then(function (response) {
    return response.json();
  }).then(function (data) {
    $('.blog-content').html('');
    for (var i = 1; i <= data.length + 1; i++) {
      let element = '<div class="blog-item">' +
        '<div class="blog-img">' +
        '<img src="' + data[i].photos + '?' + data[i].id + '"/>' +
        '<span><i class = "far fa-heart"></i></span>' +
        '</div>' +
        '<div class="blog-text">' +
        '<span>' + data[i].createdAt + '</span>' +
        '<h2>' + data[i].title + '</h2>' +
        '<p>' + data[i].content.substring(data[i].content.length, 50) + '   . . . .  </p>' +
        '<a  onclick="getArticlesId(' + data[i].id + ')">Read More</a>' +
        '</div>'

      '</div>';
      $('.blog-content').append(element);
    }
  });
}

function getCategorie()
{
  fetch('/category/all', {
    headers: {
      'Accept': 'application/json',
    },
    method: 'GET'
  }).then(function (response) {
    return response.json();
  }).then(function (data) {
    $('.article').html('');
    for (var i = 1; i <= data.length; i++) {
      let element = '<div class="blog-item" style="margin:5px;">' +
                       '<div class="blog-text" style="margin:0px;">' +
                          '<a >' + data[i].name +' | '+data[i].posts.length+'</al>' +
                        '</div>'
                    '</div>';
             $('.article').append(element);
    }
  });
}
function getArticlesId(params) {
  $.router.go('article', { article: parseInt(params) });
}
function goToPrevious(params) {
  $.router.go('article', { article: parseInt(params) - 1 });
}
function goToNext(params) {
  $.router.go('article', { article: parseInt(params) + 1 });
}