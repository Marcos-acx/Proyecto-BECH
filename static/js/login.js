const formLogin = document.querySelector('form')

formLogin?.addEventListener('submit', async e => {
    e.preventDefault()

    const response = await fetch('/api/sessions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams(new FormData(formLogin))
    })

    if (response.status === 201) {
        window.location.href = '/'
    } else {
        const error = await response.json()
        alert(error.message)
    }
})