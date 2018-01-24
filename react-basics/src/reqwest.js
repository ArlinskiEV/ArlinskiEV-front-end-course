const url = 'https://api.apixu.com/v1/current.json';
const key = '295e41195b004b63870161436182201';
const town = 'Paris';
const data = {username: 'example'};

const requestUrl = `${url}?key=${key}&q=${town}`;

export default class RequestJSON {
    constructor(callback) {
        // this.data = 'null';
        fetch(requestUrl, {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(data), 
            headers: new Headers({
              'Content-Type': 'application/json'
            })
          }).then(res => res.json())
          .catch(error => window.console.error('Error:', error))
          .then(response => {
              window.console.log('Success:', response);
            //   this.loadComplete(response);
            callback(response);
            }
          )
    }
    // loadComplete(newData) {
    //     this.data = newData;
    // }
}