const { readFileSync } = require("fs");

const { APP_CONFIG_PATH } = process.env;

let appConfig = {};
if (APP_CONFIG_PATH) {
  appConfig = readFileSync(APP_CONFIG_PATH);
  appConfig = JSON.parse(appConfig);
}
const {
  weboptimizer_optimization_queue_name,
  weboptimizer_rabbitmq_connection_url,
} = appConfig;

/**
 * Expose environment / app configuration variables
 */
const envVar = {
  /** Running environment, {"production", "development"} default: "development" */
  NODE_ENV: process.env.NODE_ENV || "development",

  /** Optimization message queue name, default: "optimization_queue" */
  OPTIMIZATION_QUEUE_NAME:
    process.env.OPTIMIZATION_QUEUE_NAME ||
    typeof weboptimizer_optimization_queue_name === "string"
      ? weboptimizer_optimization_queue_name
      : "optimization_queue",

  /** RabbitMQ server connection URL, default: "amqp://localhost:5672" */
  RABBITMQ_CONNECTION_URL:
    process.env.RABBITMQ_CONNECTION_URL ||
    typeof weboptimizer_rabbitmq_connection_url === "string"
      ? weboptimizer_rabbitmq_connection_url
      : "amqp://localhost:5672",
};

module.exports = { envVar };
