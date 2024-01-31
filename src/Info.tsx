"use client"
import React from "react";
import Form from "./Form"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
import { zeroFill } from "./Common";

type InfoProps = {
  selectedDate: string
  setSelectedDate: React.Dispatch<React.SetStateAction<string>>
  bodyTemp: number | string
}

const Info = ({selectedDate, setSelectedDate, bodyTemp}: InfoProps) => {
  return (
    <div className="InfoEle">
      <div>
        <DatePicker
            dateFormat="yyyy/MM/dd"
            selected={new Date(selectedDate)}
            onChange={date => setSelectedDate(
              `${date!.getFullYear()}-${zeroFill(date!.getMonth(), 1)}-${zeroFill(date!.getDate(), 0)}`
            )}
          />
        {typeof bodyTemp === "number"
          ? <p className="bodytemp">体温<span>{Math.round(bodyTemp*10)/10}℃</span></p>
          : <p className="bodytemp">体温<span>{bodyTemp}</span></p>
        }

      </div>
      <Form selectedDate={selectedDate}/>
    </div>
  )
}

export default Info