//Scrape Script

//Require Request and Cheerio making our Scrapes
var request = require("request");
var cheerio = require("cheerio");

var scrape = function (cb) {

    request("https://old.reddit.com/r/nba/", function(err, res, body){
        var $ = cheerio.load(body);

        var articles = [];

        $("p.title").each(function(i, element) {
            var title = $(element).text();

            var link = $(element).children().attr("href");

            var dataToAdd = {
                headline: title,
                summary: link
            };
            articles.push(dataToAdd);
    })
    cb(articles);
});
};
module.exports = scrape;