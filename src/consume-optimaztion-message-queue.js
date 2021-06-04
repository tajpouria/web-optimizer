const Ajv = require("ajv");

const jsonSchemas = require("./json-schemas");
const { envVar } = require("./shared/env-var");

const { OPTIMIZATION_QUEUE_NAME } = envVar;

class ConsumeOptimizationMessageQueue {
  /**
   * Expose optimization message listeners
   * @param {Object} channel Connection channel
   * @param {Function} [Validator=Ajv] Validator class
   * @param {Function} [logger=logger] logger
   */
  constructor(channel, Validator = Ajv) {
    this.channel = channel;
    this._Validator = Validator;
  }

  /**
   * Validate received optimization message schema and invoke provided message callback
   * @param {Function} onMessageCallBack Invokes with existing schema validation errors and queue message
   * @param {String} [queueName=envVar.OPTIMIZATION_QUEUE_NAME] queueName Queue name
   * @param {Object} [jsonSchema=jsonSchemas.optimizationMessage] Used for message validation
   */
  consumeOptimizationMessage(
    onMessageCallBack,
    queueName = OPTIMIZATION_QUEUE_NAME,
    jsonSchema = jsonSchemas.optimizationMessage,
  ) {
    const { channel } = this;
    channel.assertQueue(queueName, {
      durable: true,
    });

    this.channel.consume(
      (msg) => {
        const validator = new this._Validator();
        validator.validate(jsonSchema, msg);

        onMessageCallBack(validator.errors || null, msg);
      },
      queueName,
      { noAck: false },
    );
  }
}

module.exports = {
  ConsumeOptimizationMessageQueue,
};
