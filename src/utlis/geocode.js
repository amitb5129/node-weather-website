const request = require('postman-request');
const geocode = (address,callback)=>{
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiYW1pdGJhZ2hlbDUxMjkiLCJhIjoiY2tydTAxbnd1MTc4ZzJvcWNzcWlrMXFrZSJ9.KvYlEx1GghcR70La5qsLCw&limit=1`;
    console.log(url);
    request({url,json:true},(error,response)=>{
        if(error){
            callback("Unable to connect to the Location Service",undefined);
        }else if(response.body.error || response.body.message || response.body.features.length===0){
            callback("Something went wrong. Not able to get the Co-ordinates",undefined);
        }else {
            callback(undefined,response);
        }
    });

}
module.exports = geocode;