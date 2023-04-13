import { useDispatch, useSelector } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { addNotification, removeNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    const betterFilter = new RegExp(filter, "gi")
    return anecdotes.filter(anecdote => anecdote.content.match(betterFilter))
  })

  const vote = (id) => {
    const currentContent = anecdotes.find(anecdote => anecdote.id === id).content
    const message = 'You voted for "' + currentContent +'"'
    dispatch(addVote(id))
    dispatch(addNotification(message))
    setTimeout(() => {
      dispatch(removeNotification())
    }, 5000)
  }

  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes} votes
            &nbsp;
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList