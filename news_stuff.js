var parsedArticles;
var numberOfArticles;

function getArticles(sources) {

   var url = 'https://newsapi.org/v2/top-headlines?' +
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
    });
}


let sources = 'cnn,the-economist';
getArticles(sources);
setTimeout(function(){console.log(parsedArticles);}, 5000)
