import React, { useEffect,useState,useContext } from 'react'
import UberX from '../assets/uberX.png'
import UberXL from '../assets/uberXL.png'
import UberSelect from '../assets/uberSelect.png'
import UberBlack from '../assets/uberBlack.png'
import UberBlackSuv from '../assets/uberBlackSuv.png'
import ethLogo from '../assets/eth-logo.png'
import Image from 'next/image'
import { UberContext } from '../context/uberContext'
const style = {
  wrapper: `h-full flex flex-col scrollbar-hide`,
  title: `text-gray-500 text-center text-xs py-2 border-b`,
  carList: `flex flex-col flex-1 overflow-scroll scrollbar-hide`,
  car: `flex p-3 m-2 items-center border-2 border-white cursor-pointer`,
  selectedCar: `border-2 border-black flex p-3 m-2 items-center`,
  carImage: `h-14`,
  carDetails: `ml-2 flex-1`,
  service: `font-medium`,
  time: `text-xs text-blue-500`,
  priceContainer: `flex items-center`,
  price: `mr-[-0.8rem]`,
}

export default function RideSelector() {
  const [carList,setCarList] = useState([])
  const {setSelectedRide,selectedPrice,setPrice,basePrice} = useContext(UberContext)
  useEffect(() => {
        ;(async () => {
          try {
            const response = await fetch('/api/db/getRideTypes')
            const data = await response.json()
            setCarList(data.data)
              setSelectedRide(data.data[0])
          } catch (error) {
            console.error(error)
          }
        })()
      }, [])
  return (
    <div className={style.wrapper}>
      <div className={style.title}>Choose a ride, or swipe up for more</div>
      <div className={style.carList}>
        {carList.map((car, index) => (
          <div
            key={index}
            className={style.car}
            onClick={() => {
              setSelectedRide(car)
              setPrice(((basePrice / 10 ** 5) * car.priceMultiplier).toFixed(5))
            }}
          >
            <Image
              src={car.iconUrl}
              className={style.carImage}
              height={50}
              width={50}
            />
            <div className={style.carDetails}>
              <div className={style.service}>{car.service}</div>
              <div className={style.time}>5 min away</div>
            </div>
            <div className={style.priceContainer}>
              <div className={style.price}>
                {((basePrice / 10 ** 5) * car.priceMultiplier).toFixed(5)}
              </div>
              <Image src={ethLogo} height={25} width={40} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}