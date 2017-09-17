export async function fetchJson(endPoint, config) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(endPoint, config);
      const json = await response.json();
      if (response.ok) {
        resolve(json);
      } else {
        let error = null;
        if (json && json.error_description || json.message) {
          error = new Error(json.error_description || json.message);
        } else {
          error = new Error('An error has occurred');
        }
        error.response = response;
        error.json = json;
        reject(error);
      }
    } catch (error) {
      reject(error);
    }
  });
}