document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#form')


    form.addEventListener('submit', (e) => {
        e.preventDefault()
        let fd = {
            price: form.elements['price'].value,
            sms: form.elements['sms'].value,
            appels: form.elements['appels'].value,
            data: form.elements['data'].value,
            validite: form.elements['validite'].value,
        }
        const conf =  {
            method: "POST",
            headers: {
            "Content-Type": "application/json" //pour un corps de type chaine
            },
            body: JSON.stringify(fd), //ou string, FormData, Blob, BufferSource, ou URLSearchParams
            referrer: "", //ou "" (pas de réferanr) ou une url de l'origine
            referrerPolicy: "no-referrer-when-downgrade", //ou no-referrer, origin, same-origin...
            mode: "cors", //ou same-origin, no-cors
            credentials: "same-origin", //ou omit, include
            cache: "default", //ou no-store, reload, no-cache, force-cache, ou only-if-cached
            redirect: "follow", //ou manual ou error
            integrity: "", //ou un hash comme "sha256-abcdef1234567890"
            keepalive: false, //ou true pour que la requête survive à la page
            signal: undefined 
        }

        fetch(form.getAttribute('action'),conf).then(
            async (res) => {
                const data = await res.json()
                console.log(data)
            },
            (er) => {
                console.log(er)
            }
        ).catch((er) => {
            console.log(er)
        })
    })
})