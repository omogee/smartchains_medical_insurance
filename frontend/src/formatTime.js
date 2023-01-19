const d = new Date()
const currentTime = d.getTime();
const alldays=["sunday","monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]
const allmonths =["january","february","march","april","may","june","july","august","september","october","november","december"]

export function formatlastSeen(time){
     const dd = new Date(parseInt(time))
const currseconds = (currentTime - parseInt(time))/1000
const currentYear = d.getFullYear();
const currentMonth =d.getMonth();
const currentDay = d.getDate()
const messageYear =  dd.getFullYear();
const messageMonth = dd.getMonth();
const messageDay = dd.getDate()

if(currentYear === messageYear && currentMonth === messageMonth && currentDay === messageDay){
     const currentDate = `${dd.getHours() > 12 ? dd.getHours() - 12 : dd.getHours()}:${dd.getMinutes()} ${dd.getHours() > 12 ? "pm" : "am"}`
     return `last seen ${currentDate}`
}else{
  if(currseconds < 60){
   return `last seen ${Math.floor(currseconds)} sec ago`
  }
  else if(currseconds > 60 && currseconds < 3600){
   return `last seen ${Math.floor(currseconds/60)} min ago`
  }
  else if(currseconds > 3600 && currseconds < 86400){
   return `last seen ${Math.floor(currseconds/3600)} hrs ago`
  }
  else if(currseconds > 86400 && currseconds < 604800){
      return `last seen ${Math.floor(currseconds/86400)} days ago`
  }
  else if(currseconds > 604800){
       return `last seen ${Math.floor(currseconds/604800)} weeks ago`
  }
  else {
       return null
  }
}
}

export function formater(time){
     const dd = new Date(parseInt(time))
const currseconds = (currentTime - parseInt(time))/1000
const currentYear = d.getFullYear();
const currentMonth =d.getMonth();
const currentDay = d.getDate()
const messageYear =  dd.getFullYear();
const messageMonth = dd.getMonth();
const messageDay = dd.getDay()
const messageDate = dd.getDate()
const messageTime = dd.getHours() > 12 ? `${dd.getHours()-12}:${dd.getMinutes()}pm` : `${dd.getHours()}:${dd.getMinutes()}am` 

if(currentYear === messageYear && currentMonth === messageMonth && currentDay === messageDay){
     const currentDate = `${dd.getHours() > 12 ? dd.getHours() - 12 : dd.getHours()}:${dd.getMinutes()} ${dd.getHours() > 12 ? "pm" : "am"}`
     return `${currentDate}`
}else{
  if(currseconds < 60){
   return `${Math.floor(currseconds)} sec ago`
  }
  else if(currseconds > 60 && currseconds < 3600){
   return `${Math.floor(currseconds/60)} min ago`
  }
  else if(currseconds > 3600 && currseconds < 86400){
   return `${Math.floor(currseconds/3600)} hrs ago`
  }
  else if(currseconds > 86400 && currseconds < 604800){
      return `${Math.floor(currseconds/86400)} days ago`
  }
  else if(currseconds > 604800){
       return `${messageTime}, ${messageDate}/${messageMonth}/${messageYear}`
  }
  else {
       return null
  }
}
}

export function getSentTime(time){
     const dd = new Date(parseInt(time))
const currseconds = (currentTime - parseInt(time))/1000
const currentYear = d.getFullYear();
const currentMonth =d.getMonth();
const currentDay = d.getDate()

const messageYear =  dd.getFullYear();
const messageMonth = dd.getMonth();
const messageDay = dd.getDate()

if(currentYear === messageYear && currentMonth === messageMonth && currentDay === messageDay){
     return `Today`
}else if(currentYear === messageYear && currentMonth === messageMonth && currentDay - messageDay ===1){
   return `yesterday`
}else{
     return `${dd.toLocaleString('default', { month: 'long' })},${messageDay} ${messageYear}`
    }
}