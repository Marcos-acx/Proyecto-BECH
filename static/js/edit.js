const formEditData = document.querySelector('form')

formEditData?.addEventListener('submit', async e => {
    e.preventDefault()

    const response = await fetch('/api/users', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams(new FormData(formEditData))
    })

    if (response.status === 200) {
        const { payload: user } = await response.json()
        alert(JSON.stringify(user))
        window.location.href = '/profile'
    } else {
        const error = await response.json()
        alert(error.message)
    }
})