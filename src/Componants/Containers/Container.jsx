import React from 'react'

const Container = ({children}) => {
  return (
    <div className='container mx-auto md:flex-col '>{children}   
    </div>
  )
}

export default Container
