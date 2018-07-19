    var socket = io.connect('http://127.0.0.1:5000');
    var aTitle = document.getElementById('articleTitle');
    var aContent = document.getElementById('articleContent');
    var aSource = document.getElementById('articleSource');

    socket.on('changeArticle', function(article){
      let art = article.article;
      aTitle.innerHTML = art.title;
      aContent.innerHTML = art.description;
      aSource.innerHTML = '- ' + art.source.name;
      console.log(art);
   });
