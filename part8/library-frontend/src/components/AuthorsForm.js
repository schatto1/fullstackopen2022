import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_AUTHOR_BORN, ALL_AUTHORS } from '../queries'

const AuthorsForm = () => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [editAuthorBorn] = useMutation(EDIT_AUTHOR_BORN, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      console.log('graphql error', error.graphQLErrors[0].message)
    }
  })

  const submit = async (event) => {
    event.preventDefault()

    editAuthorBorn({ variables: { name, born }})

    console.log('setting author...')

  }

  return (
    <div>
      <h3>set birthyear</h3>
      <form onSubmit={submit}>
        <div>
          name
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
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