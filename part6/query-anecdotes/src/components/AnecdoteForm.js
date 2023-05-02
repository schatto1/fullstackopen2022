import { useMutation, useQueryClient } from "react-query"
import { createAnecdote } from "../services/requests"
import { useNotificationDispatch } from "../NotificationContext"

const AnecdoteForm = () => {

  const dispatch = useNotificationDispatch()
  
  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes')
      queryClient.setQueryData('anecdotes', anecdotes.concat(newAnecdote))
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })

    const message = 'You created a new anecdote: "' + content + '"'

    dispatch({
      type: 'ON',
      notification: message
    })
    setTimeout(() => {
      dispatch({type: 'OFF'})
    }, 5000)
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
