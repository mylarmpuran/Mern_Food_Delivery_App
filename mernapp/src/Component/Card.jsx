import React from 'react'
import logo512 from "../assests/img/logo512.png";

function Card() {
    return (
        <div>
            <div className='max-w-48 h-80 mx-2 my-2 grid grid-rows-2 '>

                <div className='size-32  row-span-1 justify-items-center'>
                    <img src={logo512} alt='' />
                </div>
                <div className=' row-span-1 flex flex-col justify-center'>
                    <h5 className='text-xl text-center font-bold ' >Card title</h5>
                    <p>Some quick example text to build on the card title and make up the bulk of the cards</p>
                    <div className='container w-100 flex flex-row items-center'>
                        <select className='size-16 bg-[#2699fb] rounded'>
                            {Array.from({ length: 6 }, (v, i) => {
                                return (
                                    <option key={i + 1} value={i + 1}> {i + 1} </option>
                                )
                            })}
                        </select>
                        <select className='m-2 size-16 bg-[#2699fb] rounded'>
                            <option value="half">Half</option>
                            <option value="full">Full</option>
                        </select>
                        <div className='d-inline h-100 fs-5'>
                            Total Price
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Card