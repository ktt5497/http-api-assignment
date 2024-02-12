const fs = require('fs');

const index = fs.readFileSync(`${__dirname}/../client/client.html`);

const cssIndex = fs.readFileSync(`${__dirname}/../client/style.css`);

// sending response
const respond = (request, response, status, content, type) => {
  response.writeHead(status, { 'Content-Type': type });
  response.write(content);
  response.end();
};

// sucess
const getSuccess = (request, response, acceptedTypes) => {
  // JSON object to send
  const success = {
    message: 'This is a successful response',
  };

  // Checks to see if type is XML
  if (acceptedTypes[0] === 'text/xml') {
    // creating xml string
    const responseXML = `<response><message>${success.message}</message></response>`;

    return respond(request, response, 200, responseXML, 'text/xml');
  }

  // stringify json
  const successString = JSON.stringify(success);
  // returning json as default
  return respond(request, response, 200, successString, 'application/json');
};

// badRequest
const getBadRequest = (request, response, acceptedTypes, params) => {
  // json
  const badRequest = {
    message: 'This request has the required parameters',
  };

  // if it does not have valid=true
  if (!params.valid || params.valid !== 'true') {
    badRequest.message = 'Missing valid query parameter set to true';
    badRequest.id = 'badRequest';
  }

  // Checks if JSON
  if (acceptedTypes[0] === 'application/json') {
    badRequest.message = 'Missing valid query parameter set to true';
    badRequest.id = 'badRequest';
    const badString = JSON.stringify(badRequest);
    // returning with 400
    return respond(request, response, 400, badString, 'application/json');
  }

  // checks if XML
  if (acceptedTypes[0] === 'text/xml') {
    badRequest.message = 'Missing valid query parameter set to true';
    badRequest.id = 'badRequest';
    const responseXML = `<response><message>${badRequest.message}</message><id>${badRequest.id}</id></response>`;

    return respond(request, response, 400, responseXML, 'text/xml');
  }

  const jsonString = JSON.stringify(badRequest);
  return respond(request, response, 200, jsonString, 'application/json');
};

// unauthorized
const getUnauthorized = (request, response, acceptedTypes, params) => {
  // json
  const unAuthorized = {
    message: 'You have successfully viewed the content.',
  };

  // if it has no valid-true
  if (!params.loggedIn || params.loggedIn !== 'yes') {
    // setting error message
    unAuthorized.message = 'Missing loggedIn query parameter set to yes';
    // giving id
    unAuthorized.id = 'unauthorized';
  }

  if (acceptedTypes[0] === 'application/json') {
    // setting error message
    unAuthorized.message = 'Missing loggedIn query parameter set to yes';
    // giving id
    unAuthorized.id = 'unauthorized';

    const unAuthorizedString = JSON.stringify(unAuthorized);
    // returning with 400
    return respond(request, response, 401, unAuthorizedString, 'application/json');
  }

  // check if it xml
  if (acceptedTypes[0] === 'text/xml') {
    unAuthorized.message = 'Missing valid query parameter set to true';
    unAuthorized.id = 'unauthorized';
    const responseXML = `<response><message>${unAuthorized.message}</message><id>${unAuthorized.id}</id></response>`;

    return respond(request, response, 401, responseXML, 'text/xml');
  }

  // returns 200 response if there is valid=true
  const jsonString = JSON.stringify(unAuthorized);
  return respond(request, response, 200, jsonString, 'application/json');
};

// forbidden
const getForbidden = (request, response, acceptedTypes) => {
  // JSON object to send
  const forbidden = {
    message: 'You do not have access to this content',
    id: 'forbidden',
  };

  // Checks to see if type is XML
  if (acceptedTypes[0] === 'text/xml') {
    // creating xml string
    const responseXML = `<response><message>${forbidden.message}</message><id>${forbidden.id}</id></response>`;

    return respond(request, response, 403, responseXML, 'text/xml');
  }

  // stringify json
  const forbiddenString = JSON.stringify(forbidden);
  // returning json as default
  return respond(request, response, 403, forbiddenString, 'application/json');
};

// internal
const getInternal = (request, response, acceptedTypes) => {
  // JSON object to send
  const internal = {
    message: 'Internal Server Error. Something went wrong.',
    id: 'internalError',
  };

  // Checks to see if type is XML
  if (acceptedTypes[0] === 'text/xml') {
    // creating xml string
    const responseXML = `<response><message>${internal.message}</message><id>${internal.id}</id></response>`;

    return respond(request, response, 500, responseXML, 'text/xml');
  }

  // stringify json
  const internalString = JSON.stringify(internal);
  // returning json as default
  return respond(request, response, 500, internalString, 'application/json');
};

// notImplemented
const getNotImplemented = (request, response, acceptedTypes) => {
  // JSON object to send
  const notImplemented = {
    message: 'A get request for this page has not been implemented yet. Check again later for updated content.',
    id: 'notImplemented',
  };

  // Checks to see if type is XML
  if (acceptedTypes[0] === 'text/xml') {
    // creating xml string
    const responseXML = `<response><message>${notImplemented.message}</message><id>${notImplemented.id}</id></response>`;

    return respond(request, response, 501, responseXML, 'text/xml');
  }

  // stringify json
  const notImplementedString = JSON.stringify(notImplemented);
  // returning json as default
  return respond(request, response, 501, notImplementedString, 'application/json');
};

// not found
const getNotFound = (request, response, acceptedTypes) => {
  // JSON object to send
  const notFound = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  // Checks to see if type is XML
  if (acceptedTypes[0] === 'text/xml') {
    // creating xml string
    const responseXML = `<response><message>${notFound.message}</message><id>${notFound.id}</id></response>`;

    return respond(request, response, 404, responseXML, 'text/xml');
  }

  // stringify json
  const notFoundString = JSON.stringify(notFound);
  // returning json as default
  return respond(request, response, 404, notFoundString, 'application/json');
};

// Index
const getIndex = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(index);
  response.end();
};

const getCSS = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/css' });
  response.write(cssIndex);
  response.end();
};

module.exports = {
  getIndex,
  getCSS,
  getBadRequest,
  getForbidden,
  getInternal,
  getNotImplemented,
  getNotFound,
  getSuccess,
  getUnauthorized,
};
