const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const message1 = document.getElementById('message-1');
const message2 = document.getElementById('message-2');
const message3 = document.getElementById('message-3');
const message4 = document.getElementById('message-4');
const message5 = document.getElementById('message-5');
const addLoader = document.getElementById('load');

weatherForm.addEventListener('submit',(event)=>{
    message1.textContent = '';
    message2.textContent = '';
    message3.textContent = '';
    message4.textContent = '';
    message5.src = '';
    event.preventDefault();
    addLoader.classList.add('loader');
    const location = search.value;
    fetch('http://localhost:3000/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            message1.textContent = data.error;
            addLoader.classList.remove('loader');
        }else{
            addLoader.classList.remove('loader');
            message1.textContent = 'Location: '+data.Location;
            message2.textContent = 'Temperature: '+data.Temperature;
            message3.textContent = 'Forecast: '+data.Forecast;
            message4.textContent = 'Today\'s Expected Weather: '+data.ExpectedWeather;
            message5.src = data.Image;

        }
    })
})
});