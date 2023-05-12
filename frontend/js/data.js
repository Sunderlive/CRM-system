export async function getDataById(id) {
    const res = await fetch(`http://localhost:3000/api/clients/${id}`, {
        method: 'GET'
    })

    return await res.json()
}

export async function getData() {
    const res = await fetch('http://localhost:3000/api/clients', {
        method: 'GET'
    })

    return await res.json()
}

export async function addNewClient(clientName, clientSurname, clientLastName, contactsArray) {
    const res = await fetch('http://localhost:3000/api/clients', {
        method: 'POST',
        body: JSON.stringify({ name: clientName.value, surname: clientSurname.value, lastName: clientLastName.value , contacts: contactsArray}),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return await res.json()
}

export async function changeClient(id, clientName, clientSurname, clientLastName, contactsArray) {
    const res = await fetch(`http://localhost:3000/api/clients/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ name: clientName.value, surname: clientSurname.value, lastName: clientLastName.value, contacts: contactsArray }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return await res.json()
}

export async function deleteClients(id) {
    const res = await fetch(`http://localhost:3000/api/clients/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return await res.json()
}





