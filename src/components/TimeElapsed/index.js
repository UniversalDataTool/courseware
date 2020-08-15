import React, { useEffect, useState } from "react"

function msToTime(s) {
  // Pad to 2 or 3 digits, default is 2
  function pad(n, z) {
    z = z || 2
    return ("00" + n).slice(-z)
  }

  var ms = s % 1000
  s = (s - ms) / 1000
  var secs = s % 60
  s = (s - secs) / 60
  var mins = s % 60
  // var hrs = (s - mins) / 60;

  return pad(mins) + ":" + pad(secs) //+ "." + pad(ms, 3)
}

export const TimeElapsed = ({ startTime, timeAllowed, onTimeUp }) => {
  timeAllowed = timeAllowed * 1000
  const [timeElapsed, setTimeElapsed] = useState(null)
  useEffect(() => {
    if (!startTime) return
    const interval = setInterval(() => {
      const timeElapsed = Date.now() - startTime
      if (timeAllowed && timeElapsed >= timeAllowed) {
        setTimeElapsed(timeAllowed)
        clearInterval(interval)
      } else {
        setTimeElapsed(timeElapsed)
      }
    }, 1000)
    return () => {
      clearInterval(interval)
    }
  }, [startTime, timeAllowed, setTimeElapsed])

  useEffect(() => {
    if (timeElapsed >= timeAllowed) onTimeUp()
  }, [timeElapsed, onTimeUp, timeAllowed])

  if (timeElapsed === null) return null
  return `${msToTime(timeElapsed)}${
    timeAllowed ? ` / ${msToTime(timeAllowed)}` : ""
  }`
}

export default TimeElapsed
