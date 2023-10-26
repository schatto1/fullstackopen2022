import { useState } from 'react'
import Select from 'react-select'
import { useMutation } from '@apollo/client'
import { EDIT_AUTHOR_BORN, ALL_AUTHORS } from '../queries'

const AuthorsForm = ({ authors }) => {
  const [author, setAuthor] = useState(null)
  const [born, setBorn] = useState('')

  const [editAuthorBorn] = useMutation(EDIT_AUTHOR_BORN, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      console.log('graphql error', error.graphQLErrors[0].message)
    }
  })

  const submit = async (event) => {
    event.preventDefault()

    const name = author.value

    editAuthorBorn({ variables: { name, born }})

    console.log('setting author...')

  }

  const options = authors.map((author) => (
    {
      value: author.name,
      label: author.name
    }
  ))

  return (
    <div>
      <h3>set birthyear</h3>
      <form onSubmit={submit}>
        <div>
          name
          <Select
            options={options}
            onChange={setAuthor}
          />
        </div>
        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(parseInt(target.value))}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default AuthorsForm