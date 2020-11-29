var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('db.sqlite3');

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({extended: false});
db.serialize(function() {
  db.run("DROP TABLE links");
  db.run("CREATE TABLE links (full_link TEXT, short_link TEXT, transitions INTEGER)");//создание таблицы

  app.post("/shorten", urlencodedParser, function (request, response) { // отправка пост-запроса
    var short_url = 'http://localhost:3000/' + require('nanoid').nanoid(10);

    var stmt = db.prepare(`INSERT INTO links VALUES ("${request.body.urlToShorten}", "${short_url}", 0)`);
    stmt.run();
    stmt.finalize();


    response.send({status: "Created", shortenedUrl: short_url});
});

app.get("/send", function(request, response){
  response.send("<form method=\"post\" action=\"shorten\"><input name=\"urlToShorten\"></input></form>"
  ); //приём пост запроса
});


app.get("/*/views", function(request, response){
  db.each(`SELECT transitions AS transitions FROM links WHERE short_link = "http://localhost:3000${request.url.substring(0, 11)}"`, function(err, row) {
    response.send({viewCount: row.transitions});
  });

});



app.get("/*", function(request, response){
  db.each(`SELECT full_link AS full_link FROM links WHERE short_link = "http://localhost:3000${request.url}"`, function(err, row) {


    db.each(`SELECT transitions AS transitions FROM links WHERE short_link = "http://localhost:3000${request.url}"`, function(err, row) {
      var stmt = db.prepare(`UPDATE links SET transitions = ${row.transitions + 1}`);
      stmt.run();
      stmt.finalize();
    });


  response.redirect(row.full_link);
}); });

  app.listen(3000);
});