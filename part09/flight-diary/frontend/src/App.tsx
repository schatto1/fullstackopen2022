import React from 'react';
import { useState, useEffect } from "react";
import { DiaryEntry, Visibility, Weather } from "./types";
import { getAllEntries, createEntry } from './services/diaryService';
import Notification from './components/Notification';
import axios from 'axios';

const App = () => {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [newDate, setNewDate] = useState('');
  const [newVisibility, setNewVisibility] = useState<Visibility | null>(null);
  const [newWeather, setNewWeather] = useState<Weather | null>(null);
  const [newComment, setNewComment] = useState('');
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    getAllEntries().then(data => {
      setEntries(data)
    })
  }, [])

  const entryCreation = async (event: React.SyntheticEvent) => {
    event.preventDefault()

    if (newVisibility != null && newWeather != null) {
      const newEntry = {
        date: newDate,
        visibility: newVisibility,
        weather: newWeather,
        comment: newComment
      }
      try {
        const response = await createEntry(newEntry);
        setEntries(entries.concat(response));
  
        setNewDate('')
        setNewVisibility(null)
        setNewWeather(null)
        setNewComment('')
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const errorObject = error.response
          if (errorObject != undefined) {
            setMessage(errorObject.data)
            setTimeout(() => {
              setMessage('')
            }, 5000)
          } else {
            console.error(error)
          }
        } else {
          console.error(error);
        }
      }
    }
    else {
      const message = "Please select an option for Visibility or Weather."
      setMessage(message)
      setTimeout(() => {
        setMessage('')
      }, 5000)
    }
  };

  // const chooseWeather = (weather: string) => {
  //   switch (weather) {
  //     case 'sunny':
  //       statements
  //     case value2:
  //       statements
  //     // …
  //     case valueN:
  //       statements
  //     default:
  //       statements
  //   }
  // }

  return (
    <div>
      <h1>Add new entry</h1>
      <Notification message={message} />
      <form onSubmit={entryCreation}>
        <div>
          date
          <input type="date" value={newDate} onChange={(event) => setNewDate(event.target.value)} />
        </div>
        <div>
          weather
          <div>
            <input type="radio" name="weather" onChange={() => setNewWeather(Weather.Sunny)} />Sunny
            <input type="radio" name="weather" onChange={() => setNewWeather(Weather.Rainy)} />Rainy
            <input type="radio" name="weather" onChange={() => setNewWeather(Weather.Cloudy)} />Cloudy
            <input type="radio" name="weather" onChange={() => setNewWeather(Weather.Stormy)} />Stormy
            <input type="radio" name="weather" onChange={() => setNewWeather(Weather.Windy)} />Windy
          </div>
        </div>
        <div>
          visibility
          <div>
            <input type="radio" name="visibility" onChange={() => setNewVisibility(Visibility.Great)} />Great
            <input type="radio" name="visibility" onChange={() => setNewVisibility(Visibility.Good)} />Good
            <input type="radio" name="visibility" onChange={() => setNewVisibility(Visibility.Ok)} />Ok
            <input type="radio" name="visibility" onChange={() => setNewVisibility(Visibility.Poor)} />Poor
          </div>
        </div>
        <div>
          comment
          <input value={newComment} onChange={(event) => setNewComment(event.target.value)} />
        </div>
        <button type='submit'>add</button>
      </form>
      <h1>Diary entries</h1>
      {entries.map(entry =>
        <div key={entry.id}>
          <h2>{entry.date}</h2>
          <p>weather: {entry.weather}</p>
          <p>visibility: {entry.visibility}</p>
          <p>comment: {entry.comment}</p>
        </div>
      )}  
    </div>
  )
}

export default App;