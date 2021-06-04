const { NODE_ENV } = process.env;

const envConst = {
  NODE_ENV: NODE_ENV || "development",
};

module.exports = { envConst };
