import { useQuery } from "@apollo/client"
import { ALL_BOOKS } from '../queries'

const Recommendations = (props) => {

  const genre = props.user.favoriteGenre
  const username = props.user.username

  const filteredBooks = useQuery(ALL_BOOKS, {
    variables: { genre },
  });

  if (!props.show) {
    return null
  }

  if ( filteredBooks.loading ) {
    return <div>loading...</div>
  }

  const books = filteredBooks.data.allBooks

  return (
    <div>
      <h2>recommendations for {username}</h2>

      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommendations