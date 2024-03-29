import { useDispatch, useSelector } from 'react-redux'
import { incrementVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    const betterFilter = new RegExp(filter, "gi")
    return anecdotes.filter(anecdote => anecdote.content.match(betterFilter))
  })

  const vote = (id) => {
    const content = anecdotes.find(anecdote => anecdote.id === id).content
    const message = 'You voted for "' + content +'"'
    dispatch(incrementVote(id))
    dispatch(setNotification(message, 5))
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