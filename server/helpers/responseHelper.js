
function createResponseSuccess(data) {
    return createResponse(200, "OK", data);
}

function createResponseError(status, message) {
    return {
        status: status || 500, data: {error: message || "okänt fel"}
    };
}

function createResponseMessage(status, message) {
      return {
        status: status || 200, data: message
    };
}

module.exports = {
    createResponseSuccess,
    createResponseError, 
    createResponseMessage};