#hackernews-bot

A bot that grabs a random story from [The Hacker News](https://news.ycombinator.com) and posts it to [Slack](https://slack.com) (or another service of your choice).

You can schedule this script to run at a regular interval, or have it triggred by an interesting event.

Configuration is straightforward, simply edit CONFIG to taste. After that, you can get your HN fix however you like!

CONFIG:
	webhook_url: The URL for your Slack webhook. 
	channel: The channel in which the bot should post, for example, #general.
	bot_username: The bot's username.
	bot_icon_emoji: An emoji, which serves as the bot's profile icon. 

For more information about configuring incoming webhooks in Slack, see [the documentation](https://api.slack.com/incoming-webhooks). 
You may also be interested in the [attachment formatting rules](https://api.slack.com/docs/attachments) for the Slack API. 

Enjoy!
