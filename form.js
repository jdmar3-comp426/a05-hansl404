const form = document.getElementById('form')

form.addEventListener('submit', submitForm)

function submitForm(e) {
    e.preventDefault()
    let user = form.elements['user']
    let pass = form.elements['pass']
    let email = form.elements['email']
    console.log(user, pass, email)
}