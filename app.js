const telegramBot = require("node-telegram-bot-api");
const Sentiment = require("sentiment");
const sentiment = new Sentiment();
const token = "YOUR_TOKEN";
const api = new telegramBot(token, {
  polling: true,
});

api.onText(/\/help/, function (msg, match) {
  const fromId = msg.from.id;
  api.sendMessage(
    fromId,
    "I can help you in getting the sentiments of ant text you send to me."
  );
});

api.onText(/\/start/, function (msg, match) {
  const fromId = msg.from.id;
  api.sendMessage(
    fromId,
    "They call me Pedro." +
      "I can help you in getting the sentiments of any text you send to me." +
      "To help you I just have few commands. \n/help\n/start\n/sentiments"
  );
});

const opts = {
  reply_markup: JSON.stringify({
    force_reply: true,
  }),
};

api.onText(/\/sentiments/, function (msg, match) {
  const fromId = msg.from.id;
  api.sendMessage(
      fromId,
      "Alright! So you need sentiments of a text from me.I can help you in that. Just send me the text.",
      opts
    )
    .then(function (sended) {
      const chatId = sended.chat.id;
      const messageId = sended.message_id;
      api.onReplyToMessage(chatId, messageId, function (message) {
        const result = sentiment.analyze(message.text);
        api.sendMessage(
          fromId,
          "So sentiments for you text are, Score:" +
            result.score +
            " Comparative:" +
            result.comparative
        );
      });
    });
});

console.log("Pedro has started. Start conversations in your Telegram.");
