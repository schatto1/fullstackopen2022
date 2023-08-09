const Recommendations = (props) => {
  if (!props.show) {
    return null
  }

  let genres = ['all']
  const books = props.books
  const filter = props.user.favoriteGenre
  const username = props.user.username

  books.forEach(book => {
    book.genres.map(genre => genres.includes(genre) ? null : genres = genres.concat(...book.genres))
  })

  const filteredBooks = filter === 'all' ? books : books.filter(book => book.genres.includes(filter))

  

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
          {filteredBooks.map((a) => (
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