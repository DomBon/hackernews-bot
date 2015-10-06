var request = require('request');

var CONFIG = {
	"webhook_url": "https://hooks.slack.com/services/someString",
	"channel": "#general",
	"bot_username": "HackerNewsBot",
	"bot_icon_emoji": ":newspaper:",
};

selectAndPost();

function selectAndPost() {
    // Choose a random URL pool, with bias towards top stories. 
    var api_url = ["https://hacker-news.firebaseio.com/v0/topstories.json", "https://hacker-news.firebaseio.com/v0/newstories.json", "https://hacker-news.firebaseio.com/v0/showstories.json", "https://hacker-news.firebaseio.com/v0/topstories.json"];
    var api_url = api_url[Math.floor(Math.random() * api_url.length)];

    // Yo dawg, I heard you like callbacks. 
    request({
        url: api_url
    }, function optionalCallback(err, httpResponse, body) {

        if (err) {
            console.error("Hacker News Scraper failed to fetch " + api_url + "!");
        } else {

            body = JSON.parse(body);
            var linkID = body[Math.floor(Math.random() * body.length)];
            var url = "https://hacker-news.firebaseio.com/v0/item/" + linkID + ".json";

            request(url, function optionalCallback(err, httpResponse, body) {
                if (err) {
                    console.error("Hacker News Scraper failed to fetch " + url + "!");
                } else {
                    body = JSON.parse(body);
                    postLink(body.title, body.url, body.score, body.by);
                }
            });
        }
    });
}

function postLink(title, link, score, author) {

    var data = {
        "channel": CONFIG.channel,
        "username": CONFIG.bot_username,
        "icon_emoji": CONFIG.bot_icon_emoji,
        "attachments": [{
            "title": title,
            "title_link": link,
            "fallback": "Newsbot: Your automated news aggregator.",
            "color": "#FF6600",
            "fields": [{
                "title": "Author",
                "value": author,
                "short": true
            }, {
                "title": "Score",
                "value": score,
                "short": true
            }]
        }]
    };

    var options = {
        url: CONFIG.webhook_url,
        body: JSON.stringify(data),
        json: true,
        method: "post"
    };

    request(options, function optionalCallback(err, httpResponse, body) {
        if (err) {
            console.error("Hacker News Scraper failed to post to Slack!");
        }
    });
}
