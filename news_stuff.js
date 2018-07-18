function getArticles(sources) {
   var parsedArticles;
   var numberOfArticles;
   var url = '//newsapi.org/v2/top-headlines?' +
    'sources=' + sources +
    '&apiKey=695d4ed67e1d43688db17a3d40b1220a';
    var req = new Request(url);

    fetch(req).then(function(response) {
      return response.json();
      }).then(function(a) {
        parsedArticles = a.articles;
        //filter out the ones without a full description
        parsedArticles.filter(function (art) {
          return art.description != null && art.urlToImage != null && art.publishedAt != null && art.title != null
        });
        numberOfArticles = parsedArticles.length;
    });

}



//
// for (i = 0; i < arr.length; i++) {
//   if (arr[i].description != null && arr[i].title != null && arr[i].urlToImage != null && arr[i].publishedAt != null) {
//     output += '<article><a href="' + arr[i].url + '"><div style="background-image:url(\'' + arr[i].urlToImage + '\')" class="article-img"></div><div class="article-content"><h1>' + arr[i].title + '</h1><span>from ' + arr[i].source.name + ' on ' +
//     arr[i].publishedAt.substring(0, 10) + '</span><p>' + arr[i].description + '</p></div></a></article>';
//   }
// }
// document.getElementById('articles').innerHTML = '';
// document.getElementById('articles').insertAdjacentHTML('beforeend', output);
