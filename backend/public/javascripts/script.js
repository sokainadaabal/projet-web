/* Animation */
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
/* Function of a SPA */
function pushToTemplateArticle(data) {
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
      '</div></div>';
    $('.blog-content').append(element);
  }
}
function pushToTemplateCategorie(data) {
  $('.article').html('');
    for (var i = 1; i <= data.length ; i++) {
      let element = '<div class="blog-item" style="margin:5px;">' +
                       '<div class="blog-text" style="margin:0px;">' +
                          '<a >' + data[i].name +' | '+data[i].posts.length+'</al>' +
                        '</div>'
                    '</div>';
    $('.article').append(element);
    }
}
function pushToTemplateLogin(data)
{         
  localStorage.setItem('token',data.token);
  localStorage.setItem('role',data.loginUser.role);
  localStorage.setItem('firstName',data.loginUser.firstname);
  localStorage.setItem('lastName',data.loginUser.lastname);
  localStorage.setItem('id',data.loginUser.id);
  localStorage.setItem('email',data.loginUser.email);
  $.router.go('home');
}
function otherThings(data) {
  console.log("otherThings with your data")
  console.log(data)
}
/* Router All Categorie*/
function getCategorie() {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: "http://localhost:3000/category/all",
      type: 'GET',
      success: function (data) {
        resolve(data)
      },
      error: function (error) {
        reject(error)
      },
    })
  })
}
/* Router Article */
function getArticles(take = 10, skip = 1) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: "http://localhost:3000/post",
      type: 'GET',
      data: {
        skip: skip,
        take: take
    },
      success: function (data) {
        resolve(data)
      },
      error: function (error) {
        reject(error)
      },
    })
  })
}





 function login() {
  return new Promise((resolve, reject) => {
    $("#loginBtn").on("click", function(event) {
      event.preventDefault();
      let email =document.getElementById("email").value;
      let password = document.getElementById("password").value;
      const body ={email: email, password: password}
      $.ajax({
          url: "http://localhost:3000/users/signin",
          method: "POST",
          data: body,
          success: function (data) {
            resolve(data)
          },
          error: function (error) {
              reject(error)
          },
      })
  })})}
function logout()
{
     localStorage.removeItem('token');
     localStorage.removeItem('role');
     localStorage.removeItem('firstName');
     localStorage.removeItem('lastName');
     localStorage.removeItem('id');
     localStorage.removeItem('email');
     return new Promise((resolve, reject) => {
      $.ajax({
        url: "http://localhost:3000/logout",
        type: 'GET',
        success: function (data) {
          resolve(data)
        },
        error: function (error) {
          reject(error)
        },
      })
    })
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

/* Get an article  by id */
function getArticlesId(params) {
  $.router.go('article', { article: parseInt(params) });
}
function goToPrevious(params) {
  $.router.go('article', { article: parseInt(params) - 1 });
}
function goToNext(params) {
  $.router.go('article', { article: parseInt(params) + 1 });
}