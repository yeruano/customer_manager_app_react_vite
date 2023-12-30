import { useNavigate, Form, useActionData, redirect } from 'react-router-dom'
import CustomerForm from '../components/CustomerForm'
import Error from '../components/Error'
import { createCustomer } from '../data/customers'

export async function action({ request }) {
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

  await createCustomer(data)

  return redirect('/')
}

function NewCustomer() {
  const errors = useActionData()
  const navigate = useNavigate()

  return (
    <>
      <h1 className='font-black text-4xl text-blue-900'>New Customer</h1>
      <p className='mt-3'>Complete all fields to register a new client</p>

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
          <CustomerForm />

          <input
            type='submit'
            className='mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg'
            value='Register customer'
          />
        </Form>
      </div>
    </>
  )
}

export default NewCustomer
