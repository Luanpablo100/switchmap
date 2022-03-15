import Router from 'next/router'

export default async function createElement(element, data) {
    const response = fetch(`/api/switchmap/${element}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then(Router.push('/'))

    return response
}