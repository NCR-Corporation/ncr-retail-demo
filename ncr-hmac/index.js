const hmacSHA512 = require('crypto-js/hmac-sha512');
const Base64 = require('crypto-js/enc-base64');

/**
 * Function to generate HMAC Key.
 * @param {string} url
 * @param {Date} date
 * @param {string} method
 * @param {string} contentType
 * @param {string} organization
 * @param {string} secretKey
 */
module.exports = function ({ url, date, method, contentType, organization, secretKey }) {
  /**
   * @param {object} variables
   */
  convertVariables = function (variables) {
    const regexPattern = /({{(.*?)}})/g;
    let convertedContent = variables;
    let matchedVar = new RegExp(regexPattern).exec(convertedContent);
    while (matchedVar !== null) {
      const variableReplacement = matchedVar[1];
      const variableName = matchedVar[2];
      const variableValue = process.env[variableName] || process.env[variableName];
      convertedContent = convertedContent.replace(variableReplacement, variableValue);
      matchedVar = new RegExp(regexPattern).exec(convertedContent);
    }
    return convertedContent;
  };

  /**
   * @param {object} request
   */
  signableContent = function (request) {
    const requestPath = convertVariables(request.url.trim()).replace(/^https?:\/\/[^/]+\//, '/');
    const params = [
      request.method,
      requestPath,
      request.contentType,
      // request.headers['content-md5'],
      convertVariables(request.organization)
    ];
    return params.filter((p) => p && p.length > 0).join('\n');
  };

  /**
   * @param {Date} date
   * @param {string} secretKey
   */
  uniqueKey = function (date, secretKey) {
    const nonce = date.toISOString().slice(0, 19) + '.000Z';
    return secretKey + nonce;
  };

  const key = uniqueKey(date, secretKey);
  const signedContent = signableContent({
    url,
    date,
    method,
    contentType,
    organization,
    secretKey
  });
  const hmac = hmacSHA512(signedContent, key);
  return Base64.stringify(hmac);
};
