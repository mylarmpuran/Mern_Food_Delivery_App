import React from 'react'
import pic1 from "../assests/img/p1.jpeg";
import pic2 from "../assests/img/p2.jpeg";
import pic3 from "../assests/img/p3.jpeg";
import pic4 from "../assests/img/p4.jpeg";

import NavbarApp from '../Component/NavbarApp'
import Card from '../Component/Card'
import Footer from '../Component/Footer'
import Carousel from '../Component/Carousel'

const slides = [
  pic1,pic2,pic3,pic4
]


function Home() {
  return (
    <div>
      <NavbarApp></NavbarApp>
      <div className='max-w-lg '>

          <Carousel autoSlide= {false}>
            {slides.map((s) => (
              <img src={s} />
            ))}
          </Carousel>


      </div>

      {/* <div className='max-w-[1240px] py-[10px] items-center border flex justify-between border-black mx-auto grid grid-cols-3'> */}
      <div className='left-[0]'>
        <Card></Card>
      </div>
      <div className='pt-4'>
        <Footer ></Footer>
      </div>



    </div>


    // </div>
  )
}

export default Home

