

console.log('client side js file is loaded')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const errorPara = document.querySelector('#error')
const successPara = document.querySelector('#success')



weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    value = search.value

    firstPara.textContent = 'Loading..'
    secondPara.textContent = ''

    fetch(`http://localhost:3000/weather?address=${value}`).then((response) =>{
        response.json().then((data) => {
            if (data.error) {
                firstPara.textContent = data.error
            }
            else {
                
                firstPara.textContent= data.location
                secondPara.textContent=data.forecast

            }
        })
})
})