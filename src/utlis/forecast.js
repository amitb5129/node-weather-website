const request = require('postman-request');

const forecast = (latitude,longitude,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=1419b60a44260e972408c30abcb0802e&query='+latitude+','+longitude;
    request({url,json:true},(error,response)=>{
        if(error){
            callback("Unable to connect to the Weather Service",undefined);
        }else if(response.body.error){
            console.log(response.body);
            callback("Something went wrong. Not able to get the required Info",undefined);
        }else{
            callback(undefined,response.body);
        }
    });
}

module.exports = forecast;