import React from 'react';
import { useState, useEffect } from "react";
import { DiaryEntry } from "./types";
import { getAllEntries, createEntry } from './services/diaryService';

const App = () => {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [newDate, setNewDate] = useState('');
  const [newVisibility, setNewVisibility] = useState('');
  const [newWeather, setNewWeather] = useState('');
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    getAllEntries().then(data => {
      setEntries(data)
    })
  }, [])

  const entryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault()
    const newEntry = {
      date: newDate,
      visibility: newVisibility,
      weather: newWeather,
      comment: newComment
    }
    createEntry(newEntry).then(data => {
      setEntries(entries.concat(data))
    })

    setNewDate('')
    setNewVisibility('')
    setNewWeather('')
    setNewComment('')
  };

  return (
    <div>
      <h1>Add new entry</h1>
      <form onSubmit={entryCreation}>
        <div>
          date
          <input value={newDate} onChange={(event) => setNewDate(event.target.value)} />
        </div>
        <div>
          weather
          <input value={newWeather} onChange={(event) => setNewWeather(event.target.value)} />
        </div>
        <div>
          visibility
          <input value={newVisibility} onChange={(event) => setNewVisibility(event.target.value)} />
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