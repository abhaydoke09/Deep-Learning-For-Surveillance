let result = null; // eslint-disable-line
if(window){
  if(window.fetch){
    result = window.fetch;
  } else {
    result = require('isomorphic-fetch');
  }
} else if(fetch) {
  result = fetch;
} else {
  result = require('isomorphic-fetch');
}
export default result;
