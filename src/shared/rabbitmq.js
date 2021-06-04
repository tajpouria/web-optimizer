const amqp = require("amqplib/callback_api");

const { envVar } = require("./env-var");

/**
 * Establish a rabbitMQ connection, create a connection channel and retrieves it
 * @param {String} [serverUrl=envVar.RABBITMQ_CONNECTION_URL] RabbitMQ server URL
 * @param {Number} [channelPrefetch=1] RabbitMQ prefetch value
 * @returns {Object} channel
 */
function createRabbitMqConnectionChannel(
  serverUrl = envVar.RABBITMQ_CONNECTION_URL,
  channelPrefetch = 1,
) {
  return new Promise((resolve, reject) => {
    amqp.connect(serverUrl, (error0, connection) => {
      if (error0) {
        reject(error0);
      }

      connection.createChannel((error1, channel) => {
        if (error1) {
          reject(error1);
          process.exit(1);
        }

        channel.prefetch(channelPrefetch);

        resolve(channel);
      });
    });
  });
}

module.exports = {
  createRabbitMqConnectionChannel,
};
