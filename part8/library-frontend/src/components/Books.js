import { useState, useEffect } from "react"
import { ALL_BOOKS } from "../queries"
import { useQuery } from "@apollo/client"

const Books = (props) => {
  const [genre, setFilter] = useState('')

  const books = useQuery(ALL_BOOKS, {
    variables: { genre },
    onError: (error) => {
      props.setError(error.graphQLErrors[0].message)
    }
  })

  const changeGenre = ( filter ) => {
    if (filter === 'all') {
      setFilter('')
    } else {
      setFilter(filter)
    }
    books.refetch({ genre: filter })
  }

  if (!props.show) {
    return null
  }

  if ( books.loading ) {
    return <div>loading...</div>
  }

  const allBooks = books.data.allBooks

  // const filteredBooks = filter === 'all' ? books : books.filter(book => book.genres.includes(filter))

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {props.genres.map(genre => (
          <button
            key={genre}
            onClick={() => changeGenre(genre)}
          >{genre}</button>
        ))}
      </div>
    </div>
  )
}

export default Books