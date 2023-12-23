const formLogout = document.querySelector('form')

formLogout?.addEventListener('submit', async e => {
    e.preventDefault()

    const response = await fetch('/api/sessions/current', {
        method: 'DELETE'
    })

    if (response.status === 204) {
        window.location.href = '/login'
    } else {
        const error = await response.json()
        alert(error.message)
    }
})