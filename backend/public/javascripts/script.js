const { cookie } = require("express/lib/response");

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
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  if (email.toString().trim() === '' || password.toString().trim() === '') {
      Swal.fire({
          position: 'center',
          icon: 'warning',
          title: 'Please fill in all the fields !',
          showConfirmButton: false,
          timer: 2000
      })
  } else {
      const body = {
          email: email,
          password: password
      }
      fetch('/users/signin', {
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          method: 'POST',
          body: JSON.stringify(body)
      }).then(function (response) {
          return response.json();
      }).then(function (data) {
          if (data.code === 1) {
              Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: 'Logged in successfully !',
                  showConfirmButton: false,
                  timer: 2000
              }).then((result) => {
                  let role = data.role;
                  let token = data.token;
                  let id = data.user.id;
                  cookie.set('token', token);
                  cookie.set('role', role);
                  cookie.set('id', id);
                  if (role === 'admin') {
                    $('.navbar-nav').html('');
                    let element = '<a>'+id+'</a>';
                     $('.navbar-nav').append(element);
                  } 
                  else{
                    $.router.go('about');
                  }
              });
          } else {
              Swal.fire({
                  position: 'center',
                  icon: 'error',
                  title: data.message,
                  showConfirmButton: false,
                  timer: 2000
              })
          }
      });
  }
}
/**Inscription de utilisateur */


function signUp() {
  let firstname = document.getElementById("firstname").value;
  let lastname = document.getElementById("lastname").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  const body = {
          firstname: firstname,
          lastname:lastname,
          email: email,
          password: password,
      }
      fetch('/users/signUpA', {
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'x-access-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjcsImVtYWlsIjoieS5jaGFiYWJAZ21haWwuY29tIiwiaWF0IjoxNjUzNjY1MDU4LCJleHAiOjE2NTM2NzIyNTh9.3WrywfmgBd71wg8T32NYI_lVLffOoYlSXOWQkUGDlc0'
          },
          method: 'POST',
          body: JSON.stringify(body)
      }).then(function (response) {
          return response.json();
      }).then(function (data) {
         console.log(data)
      });
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