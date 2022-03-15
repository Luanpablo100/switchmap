import Router from 'next/router'

export default async function deleteElement(element, data) {
    fetch(`/api/switchmap/${element}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }).then(Router.push('/'))
}