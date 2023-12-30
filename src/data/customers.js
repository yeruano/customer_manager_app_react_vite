export async function getCustomers() {
  const response = await fetch(import.meta.env.VITE_API_URL)
  return await response.json()
}

export async function getCustomer(customerId) {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/${customerId}`)
  return await response.json()
}

export async function createCustomer(customer) {
  try {
    const response = await fetch(import.meta.env.VITE_API_URL, {
      method: 'POST',
      body: JSON.stringify(customer),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    await response.json()
  } catch (error) {
    console.log(error)
  }
}

export async function updateCustomer(customerId, customer) {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/${customerId}`, {
      method: 'PUT',
      body: JSON.stringify(customer),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    await response.json()
  } catch (error) {
    console.log(error)
  }
}

export async function deleteCustomer(customerId) {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/${customerId}`, {
      method: 'DELETE'
    })
    await response.json()
  } catch (error) {
    console.log(error)
  }
}
