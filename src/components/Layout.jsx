import { Outlet, NavLink } from 'react-router-dom'

function Layout() {
  return (
    <div className='md:flex md:min-h-screen'>
      <aside className='md:w-1/4 bg-blue-900 px-5 py-10'>
        <h2 className='text-4xl font-black text-center text-white'>CRM - Customers</h2>

        <nav className='mt-10'>
          <NavLink
            className={({ isActive }) => isActive ? 'text-blue-300 text-2xl block mt-2' : 'text-white text-2xl block mt-2'}
            to='/'
          >
            Customers
          </NavLink>
          <NavLink
            className={({ isActive }) => isActive ? 'text-blue-300 text-2xl block mt-2' : 'text-white text-2xl block mt-2'}
            to='/customers/new'
          >
            New Customer
          </NavLink>
        </nav>
      </aside>

      <div className='md:w-3/4 p-10 md:h-screen overflow-scroll'>
        <Outlet />
      </div>
    </div>
  )
}

export default Layout
