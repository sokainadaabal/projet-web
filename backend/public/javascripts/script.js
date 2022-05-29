$.get('/', function () {
  const url = "http://localhost:3000/post";
  $articlesContainer = $(".container > .articles");
  function show(data) {
      const $card = $("#template > .blog-item ");
          data.forEach((e) => {
              const $col = $('<div class="blog-item"></div>');
              const $clone = $card.clone(true);
              const src = $("img", $clone).attr("src");
              $("img", $clone).attr('src', e.photos+ '?' + e.id)
              $(".card-title", $clone).text(e.title);
              $(".card-text", $clone).text(e.content.substring(e.content.length,50)+ '   . . . .');
              //$(".button", $clone).text(e.body);
              $col.append($clone).appendTo($articlesContainer);
            });
          }
  $.getJSON(url).then(show);
});

$.get('/about', function () {
  
});
    
