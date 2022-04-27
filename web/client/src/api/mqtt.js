export const sendMessage = message => {
    return fetch('/mqtt/message', {
        method: 'POST',
        headers:{          
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        body: JSON.stringify({message: message})
    })
}