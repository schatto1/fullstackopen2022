import React from 'react';
import { useState, useEffect } from "react";
import { DiaryEntry } from "./types";
import { getAllEntries } from './services/diaryService';

const App = () => {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    getAllEntries().then(data => {
      setEntries(data)
    })
  }, [])

  return (
    <div>
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