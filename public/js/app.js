
console.log('client-side js file is loading')




const weather_form = document.querySelector('form')
const search_elem  = document.querySelector('input')
const msg1         = document.querySelector('#msg1')
const msg2         = document.querySelector('#msg2')
msg2.style.display = 'none'
msg1.style.display = 'none'

weather_form.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search_elem.value
    searchAPI(location)
})

const searchAPI = (location) => {
    fetch('http://localhost:3000/weather?address='+location).then( (response) => {
    response.json().then( (data) => {
        if (data.error) {
            msg2.style.display = 'none'
            msg1.style.display = 'block'
            console.log('error: ', data.error);
            msg1.textContent = data.error
            msg2.textContent = ''
        } else {
            console.log(data.place_name);
            console.log(data.weather);
            msg2.style.display = 'block'
            msg1.style.display = 'none'

            msg2.innerHTML = data.place_name+'<br >'+data.weather
        }
        

    })
})
}