import { useState } from "react"
import { ALL_BOOKS } from "../queries"
import { useQuery } from "@apollo/client"

const Books = (props) => {
  const [genre, setFilter] = useState('')

  const everyBook = useQuery(ALL_BOOKS, {
    onError: (error) => {
      props.setError(error.graphQLErrors[0].message)
    }
  })

  const books = useQuery(ALL_BOOKS, {
    variables: { genre },
    onError: (error) => {
      props.setError(error.graphQLErrors[0].message)
    }
  })

  const changeGenre = ( filter ) => {
    if (filter === 'all') {
      setFilter('')
      books.refetch({ genre: '' })
    } else {
      setFilter(filter)
      books.refetch({ genre: filter })
    }
  }

  if (!props.show) {
    return null
  }

  if ( books.loading || everyBook.loading ) {
    return <div>loading...</div>
  }

  const allBooks = everyBook.data.allBooks
  const filteredBooks = books.data.allBooks

  let genres = ['all']

  allBooks.forEach(book => {
    book.genres.map(genre => genres.includes(genre) ? null : genres = genres.concat(...book.genres))
  })

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
            onClick={() => changeGenre(genre)}
          >{genre}</button>
        ))}
      </div>
    </div>
  )
}

export default Books