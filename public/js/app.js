console.log('Client Side js is Loaded')



const weatherForm = document.querySelector('form')
const userSearch = document.querySelector('input')
const errorMessage = document.querySelector('#error-message')
const successMessage = document.querySelector('#success-message')



weatherForm.addEventListener('submit', (e) => {
    errorMessage.textContent = "Loading..."
    successMessage.textContent = ""
    e.preventDefault()
    fetch('http://localhost:3000/weather?address=' + encodeURIComponent(userSearch.value)).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                return errorMessage.textContent = data.error
            }
            errorMessage.textContent = data.location
            return successMessage.textContent = data.forecast
        })
    })
}) 