const formRegister = document.querySelector('form')

formRegister?.addEventListener('submit', async e => {
    e.preventDefault()

    const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams(new FormData(formRegister))
    })

    if (response.status === 201) {
        const { payload: user } = await response.json()
        alert(JSON.stringify(user))
        window.location.href = '/profile'
    } else {
        const error = await response.json()
        alert(error.message)
    }
})