import { useNavigate, Form, useLoaderData, useActionData, redirect } from 'react-router-dom'
import CustomerForm from '../components/CustomerForm'
import Error from '../components/Error'
import { getCustomer, updateCustomer } from '../data/customers'

export async function loader({ params }) {
  const customer = await getCustomer(params.customerId)
  if (Object.values(customer).length == 0) {
    throw new Response('', {
      status: 404,
      statusText: 'Customer not found'
    })
  }
  return customer
}

export async function action({ request, params }) {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)
  const email = formData.get('email')

  const errors = []
  if (Object.values(data).includes('')) {
    errors.push('All fields are required')
  }

  let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])")

  if (!regex.test(email)) {
    errors.push('Invalid email')
  }

  if (Object.keys(errors).length) {
    return errors
  }

  await updateCustomer(params.customerId, data)

  return redirect('/')
}

function EditCustomer() {
  const errors = useActionData()
  const customer = useLoaderData()
  const navigate = useNavigate()

  return (
    <>
      <h1 className='font-black text-4xl text-blue-900'>Edit Customer</h1>
      <p className='mt-3'>Below you can modify the data of a customer</p>

      <div className='flex justify-end'>
        <button
          className='bg-blue-800 text-white px-3 py-1 font-bold uppercase'
          onClick={() => navigate('/')}
        >
          Back
        </button>
      </div>

      <div className='bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-20'>
        {errors?.length && errors.map((error, i) => <Error key={i}>{error}</Error>)}

        <Form
          method='post'
          noValidate
        >
          <CustomerForm customer={customer} />

          <input
            type='submit'
            className='mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg'
            value='Edit customer'
          />
        </Form>
      </div>
    </>
  )
}

export default EditCustomer
