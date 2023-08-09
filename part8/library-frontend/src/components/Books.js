import { useState } from "react"

const Books = (props) => {
  const [filter, setFilter] = useState('all')

  if (!props.show) {
    return null
  }

  let genres = ['all']
  const books = props.books

  books.forEach(book => {
    book.genres.map(genre => genres.includes(genre) ? null : genres = genres.concat(...book.genres))
  })

  const filteredBooks = filter === 'all' ? books : books.filter(book => book.genres.includes(filter))

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {genres.map(genre => (
          <button
            key={genre}
            onClick={() => setFilter(genre)}
          >{genre}</button>
        ))}
      </div>
    </div>
  )
}

export default Books