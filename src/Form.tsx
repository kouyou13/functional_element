"use client"
import {useState, useEffect} from "react";
import axios from 'axios'

type FormProps = {
  selectedDate: string
}

const Form = ({selectedDate}: FormProps) => {
  const [coughSnot, changeCoughSnot] = useState<boolean>(false)
  const [malaise, changeMalaise] = useState<boolean>(false)
  const [vomiting, changeVomiting] = useState<boolean>(false)
  const [stuffy, changeStuffy] = useState<boolean>(false)
  const [remarksText, changeRemarksText] = useState<string>('')

  const handleSaveButton = () => {
    axios
      .get(`https://ezaki-lab.cloud/~temp_sensor/insertFormData?cough_snot=${coughSnot}&malaise=${malaise}&vomiting=${vomiting}&stuffy=${stuffy}&remarks_text=${remarksText}&date=${selectedDate}`)
      .then(res => {
        const response = res.data
        if(response === 'success'){
          alert(`${selectedDate}の健康状態を保存しました`)
        } else {
          console.log('error')
        }
      })
      .catch((e) =>
        console.log(e.message)
      )
  }

  useEffect(() => {
    axios
      .get(`https://ezaki-lab.cloud/~temp_sensor/getFormData?date=${selectedDate}`)
      .then(res => {
        const resData = res.data
        console.log()
        const lastDataIndex = resData.length - 1
        if(lastDataIndex > -1) {
          changeCoughSnot(resData[lastDataIndex][0])
          changeMalaise(resData[lastDataIndex][1])
          changeVomiting(resData[lastDataIndex][2])
          changeStuffy(resData[lastDataIndex][3])
          changeRemarksText(resData[lastDataIndex][4])
        } else {
          changeCoughSnot(false)
          changeMalaise(false)
          changeVomiting(false)
          changeStuffy(false)
          changeRemarksText('')
        }
      })
  }, [selectedDate])

  return (
    <div className="form_elem">
      <p>咳・鼻水の症状があるか</p>
      <label>
        <input type="radio" name="cough_snot" value="true" checked={coughSnot} onChange={() => changeCoughSnot(true)} />
        はい
      </label>
      <label>
        <input type="radio" name="cough_snot" value="false" checked={!coughSnot} onChange={() => changeCoughSnot(false)} />
        いいえ
      </label>
      <p>倦怠感があるか</p>
      <label>
        <input type="radio" name="malaise" value="true" checked={malaise} onChange={() => changeMalaise(true)} />
        はい
      </label>
      <label>
        <input type="radio" name="malaise" value="false" checked={!malaise} onChange={() => changeMalaise(false)} />
        いいえ
      </label>
      <p>嘔吐・吐き気があるか</p>
      <label>
        <input type="radio" name="vomiting" value="true" checked={vomiting} onChange={() => changeVomiting(true)} />
        はい
      </label>
      <label>
        <input type="radio" name="vomiting" value="false" checked={!vomiting} onChange={() => changeVomiting(false)} />
        いいえ
      </label>
      <p>息苦しさがあるか</p>
      <label>
        <input type="radio" name="stuffy" value="true" checked={stuffy} onChange={() => changeStuffy(true)} />
        はい
      </label>
      <label>
        <input type="radio" name="stuffy" value="false" checked={!stuffy} onChange={() => changeStuffy(false)} />
        いいえ
      </label>
      <p>備考</p>
      <textarea value={remarksText} onChange={(e) => {changeRemarksText(e.target.value)}} />

      <button className="button" onClick={handleSaveButton}>保存</button>
    </div>
  )
}

export default Form