

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    console.log(location)

    const url = 'http://api.weatherstack.com/current?access_key=616d51e6f314f49c541e6def9d25b11a&query=' + location
    fetch(url).then((response) => {
        response.json().then((data) => {
            if(data.error){
                console.log('Failed! Please try with a different address')
                return
            }
            console.log(data)
            messageOne.textContent = data.current.temperature
            const place = data.location
            const city = place.name
            const region = place.region
            const country = place.country
            messageTwo.textContent = city + ', ' + region + ', ' + country
        })
    })

})