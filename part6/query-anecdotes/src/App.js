import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getAnecdotes, updateAnecdote } from './services/requests'
import { useReducer } from 'react'
import { notificationReducer } from './notificationReducer'

const App = () => {

  const [notification, dispatch] = useReducer(notificationReducer, null)

  const queryClient = useQueryClient()

  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    },
  })

  const handleVote = (anecdote) => {
    const message = 'You voted for "' + anecdote.content + '"'
    updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes+1 })

    dispatch({
      type: 'ON',
      notification: message
    })
    setTimeout(() => {
      dispatch({type: 'OFF'})
    }, 5000)
  }
  
  const result = useQuery('anecdotes', getAnecdotes)

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }

  if ( result.isError ) {
    return <div>anecdote server not available due to problems in server</div>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification notification={notification}/>
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes} votes
            &nbsp;
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
