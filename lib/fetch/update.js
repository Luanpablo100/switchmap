import Router from 'next/router'

export default async function updateElement(element, data) {
    fetch(`/api/switchmap/${element}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }).then(Router.push('/switchmap'))
}