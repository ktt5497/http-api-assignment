const http = require('http');
const url = require('url');
const query = require('querystring');

const resHandler = require('./responses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  '/': resHandler.getIndex,
  '/style.css': resHandler.getCSS,
  '/success': resHandler.getSuccess,
  '/badRequest': resHandler.getBadRequest,
  '/unauthorized': resHandler.getUnauthorized,
  '/forbidden': resHandler.getForbidden,
  '/internal': resHandler.getInternal,
  '/notImplemented': resHandler.getNotImplemented,
  '/notFound': resHandler.getNotFound,
  notFound: resHandler.getNotFound,
};
// Loading in the html and css data
const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);

  // grabbing the query parameters (?key=value&key2=value&etc=etc)
  // this also parses them into resuable object by field name
  const params = query.parse(parsedUrl.query);

  // Grabbing accept headers
  const acceptedTypes = request.headers.accept.split(',');

  if (urlStruct[parsedUrl.pathname]) {
    urlStruct[parsedUrl.pathname](request, response, acceptedTypes, params);
  } else {
    urlStruct.notFound(request, response, acceptedTypes);
  }
};

// server is created
http.createServer(onRequest).listen(port, () => {
  console.log(`Listening on 127.0.0.1:${port}`);
});
