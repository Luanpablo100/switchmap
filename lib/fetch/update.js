import Router from 'next/router'

export default async function updateElement(element, data) {
    const response = fetch(`/api/switchmap/${element}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }).then(Router.push('/'))

    return response
}