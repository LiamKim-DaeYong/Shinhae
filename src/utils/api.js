import HttpError from 'standard-http-error';

const EventEmitter = require('event-emitter');

const TIMEOUT = 6000;

export const errors = new EventEmitter();

function url(path) {
  // const apiRoot = 'http://211.224.128.103:9009/m';
  const apiRoot = 'http://192.168.0.123:8080/m';
  
  return path.indexOf('/') === 0
    ? apiRoot + path
    : apiRoot + '/' + path;
}

export async function post(path, body, token) {
  return bodyOf(request('post', path, body, token, false));
}

export async function request(method, path, body, token, suppressRedBox) {
  try {
    const response = await sendRequest(method, path, body, token);

    return handleResponse(path, response);
  }
  catch (error) {
    if (!suppressRedBox) {
      logError(error, url(path), method);
    }
    throw error;
  }
}

async function sendRequest(method, path, body, token) {
  try {
    const endpoint = url(path);
    const headers = getRequestHeaders(body, token);
    const options = body
      ? {method, headers, body: JSON.stringify(body)}
      : {method, headers}
  
    return timeout(fetch(endpoint, options), TIMEOUT);
  } catch (e) {
    throw new Error(e);
  }
}

async function handleResponse(path, response) {
  try {
    const status = response.status;
    
    // `fetch` promises resolve even if HTTP status indicates failure. Reroute
    // promise flow control to interpret error responses as failures
    if (status >= 400) {
      const message = await getErrorMessageSafely(response);
      const error = new HttpError(status, message);

      // emit events on error channel, one for status-specific errors and other for all errors
      errors.emit(status.toString(), {path, message: error.message});
      errors.emit('*', {path, message: error.message}, status);

      throw error;
    }

    // parse response text
    const responseBody = await response.text();

    return {
      status: response.status,
      headers: response.headers,
      body: responseBody ? JSON.parse(responseBody) : null
    };
  } catch (e) {
    throw e;
  }
}
 
function getRequestHeaders(body, token) {
  const headers = body
    ? {'Accept': 'application/json', 'Content-Type': 'application/json'}
    : {'Accept': 'application/json'};

  if (token) {
    return {...headers, Authorization: token};
  }

  return headers;
}

async function getErrorMessageSafely(response) {
  try {
    const body = await response.text();

    if (!body) {
      return '';
    }

    // Optimal case is JSON with a defined message property
    const payload = JSON.parse(body);
    if (payload && payload.message) {
      return payload.message;
    }

    // Should that fail, return the whole response body as text
    return body;

  } catch (e) {
    // Unreadable body, return whatever the server returned
    return response._bodyInit;
  }
}

function timeout(promise, ms) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('timeout')), ms);
    promise
      .then(response => {        
        clearTimeout(timer);
        resolve(response);
      })
      .catch(reject);
  });
}

async function bodyOf(requestPromise) {
  try {
    const response = await requestPromise;

    return response.body;
  } catch (e) {
    throw e;
  }
}

function logError(error, endpoint, method) {
  if (error.status) {
    const summary = `(${error.status} ${error.statusText}): ${error._bodyInit}`;
    console.error(`API request ${method.toUpperCase()} ${endpoint} responded with ${summary}`);
  }
  else {
    console.error(`API request ${method.toUpperCase()} ${endpoint} failed with message "${error.message}"`);
  }
}