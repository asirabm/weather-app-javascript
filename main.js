import './style.css'
import weather from './weather'
import { ICON_MAP } from './icon'
import axios from 'axios'

navigator.geolocation.getCurrentPosition(positionSuccess, positionError)
let place;
async function positionSuccess({ coords }) {
  
    console.log(1)
    const p1 = await axios.get(`https://us1.locationiq.com/v1/reverse?key=pk.4621be3b47174e426ae22b52696a5bd7&lat=${coords.latitude}&lon=${coords.longitude}&format=json`)
    console.log(2)
    place=p1.data.display_name.split(',')[0].toUpperCase()
    console.log(3)
    
  weather(coords.latitude,coords.longitude,Intl.DateTimeFormat().resolvedOptions().timeZone).then(({current,daily,hourly})=>{
    console.log(4)
    renderCurrentWeather(current)
    renderDailyWeather(daily)
    renderHourlyWeather(hourly)
    document.body.classList.remove("blured")
  })
}
function positionError() {
  alert(
    "There was an error getting your location. Please allow us to use your location and refresh the page."
  )
}


//https://us1.locationiq.com/v1/reverse?key=pk.4621be3b47174e426ae22b52696a5bd7&lat=7.7135874&lon=80.150528&format=json

function setValue(selector,value,{parent=document}={}){
 parent.querySelector(`[data-${selector}]`).textContent=value
}
function getInconURL(iconCode){
 return `icons/${ICON_MAP.get(iconCode)}.svg`
}

const currentICon=document.querySelector('[data-current-icon]')
function renderCurrentWeather(current){
 currentICon.src=getInconURL(45)
 console.log(place)
 setValue('place',place)
 setValue('current-temp',current.currentTemp)
 setValue('current-high',current.highTemp)
 setValue('current-low',current.lowTemp)
 setValue('current-fl-high',current.highFeelsLike)
 setValue('current-fl-low',current.lowFeelsLike)
 setValue('current-wind',current.windSpeed)
 setValue('current-precip',current.precip)
}

function getIconUrl(iconCode) {
  return `icons/${ICON_MAP.get(iconCode)}.svg`
}

const dailySection=document.querySelector('[data-day-section]')
const dayCardTemplate=document.getElementById('day-card-template')
const DAY_FORMATTER=new Intl.DateTimeFormat(undefined,{weekday:'long'})

function renderDailyWeather(daily){
dailySection.innerHTML=''
daily.forEach(day=>{
 // console.log(dayCardTemplate)
  const element=dayCardTemplate.content.cloneNode(true)
  setValue('temp',day.maxTemp,{parent:element})
  setValue("date", DAY_FORMATTER.format(day.timestamp), { parent: element })
  element.querySelector("[data-icon]").src = getIconUrl(day.iconCode)
  dailySection.append(element)

})
}
const hourlySection=document.querySelector('[data-hour-section]')
const hourCardTemplate=document.getElementById('hour-now-template')
const HOUR_FORMATTER = new Intl.DateTimeFormat(undefined, { hour: "numeric" })

function renderHourlyWeather(hourly){
  hourlySection.innerHTML=''
  hourly.forEach(hour=>{
    //console.log(hourCardTemplate)
    const element=hourCardTemplate.content.cloneNode(true)
    setValue("temp", hour.temp, { parent: element })
    setValue("fl-temp", hour.feelsLike, { parent: element })
    setValue("wind", hour.windSpeed, { parent: element })
    setValue("precip", hour.precip, { parent: element })
    setValue("day", DAY_FORMATTER.format(hour.timestamp), { parent: element })
    setValue("time", HOUR_FORMATTER.format(hour.timestamp), { parent: element })
    element.querySelector("[data-icon]").src = getIconUrl(hour.iconCode)
    hourlySection.append(element)
  })
  
}