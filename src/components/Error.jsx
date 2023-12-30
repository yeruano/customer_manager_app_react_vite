function Error({ children }) {
  return (
    <div className='text-center py-4 bg-red-600 text-white font-bold uppercase mb-1'>
      {children}
    </div>
  )
}

export default Error
