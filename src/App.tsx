"use client"
import { useState, useEffect } from "react"
import './App.css'
import Chart from './Chart'
import Info from './Info'
import NoImage from './Image/NoImage.png'
import axios from 'axios'
import useInterval from './UseInterval'
import { zeroFill } from "./Common"

const createDate = (ago: number) => {
  const today = new Date();
  const year = today.getFullYear();
  const month = zeroFill(today.getMonth(), 1)
  const date = zeroFill(today.getDate(), ago * -1)

  return (`${year}-${month}-${date}`)
}

const Home = () => {
  const [selectedDate, setSelectedDate] = useState<string>(createDate(0))
  const [x_datas, setXdatas] = useState<string[]>([])
  const [y_datas, setYdatas] = useState<number[]>([])
  const [bodyTemp, setBodyTemp] = useState<number | string>(0)
  const [count, setCount] = useState<number>(0)
  const [base64, setBase64] = useState<string>(NoImage)

  useEffect(() => {
    axios
      .get(`https://ezaki-lab.cloud/~temp_sensor/getTempData?date=${selectedDate}`)
      .then(res => {
        const resData: [number, string, string][] = res.data
        console.log(resData)
        if(resData.length > 0){
          const latestData = resData.slice(-1)[0]
          if(latestData[2].split(' ')[0] === selectedDate) {
            setBodyTemp(latestData[0])
          } else{
            setBodyTemp('------')
          }
          setXdatas(resData.map(item => item[2]))
          setYdatas(resData.map(item => item[0]))
          if(latestData[2].split(' ')[0] === selectedDate && latestData[1] !== ''){
            setBase64(`data:image/png;base64,${latestData[1]}`)
          }
          else{
            setBase64(NoImage)
          }
        } else{
          setBodyTemp('------')
          setXdatas([])
          setYdatas([])
          setBase64(NoImage)
        }
      })
      .catch((e) =>
        console.log(e.message)
      )
  }, [count, selectedDate])

  useInterval(() => {
    setCount(count + 1)
  }, 30000)

  return (
    <div className="main">
      <div className="top">
        <img
          src={base64}
          alt="体温"
          className="panda"
        />
        <Info
          bodyTemp={bodyTemp}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      </div>
      <Chart x_datas={x_datas} y_datas={y_datas}/>
    </div>
  )
}

export default Home
