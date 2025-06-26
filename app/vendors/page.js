'use client'
import Navbar from '../../components/Navbar'
import VendorsPage from '../../components/VendorsPage'


export default function Page() {

  return (
    <>
      <Navbar/>
      <div className="container mx-auto mt-8 px-4 py-16 text-white"> 
        <VendorsPage/>

      </div>
    </>
  )
}
