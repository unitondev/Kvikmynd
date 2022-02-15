import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr'

import Movie from '../components/Movie'
import * as rawActions from '../actions'
import { getUser, getUserAvatar } from '../../account/selectors'
import { getComments, getMovie, getMovieGenres, getNeedToUpdateMovie, getRatings, getUserRating } from '../selectors'

const MovieContainer = () => {
  const dispatch = useDispatch()
  let { id } = useParams()
  const movie = useSelector(getMovie)
  const comments = useSelector(getComments)
  const ratings = useSelector(getRatings)
  const genres = useSelector(getMovieGenres)
  const userRating = useSelector(getUserRating)
  const user = useSelector(getUser)
  const avatar = useSelector(getUserAvatar)
  const updateMovieNeed = useSelector(getNeedToUpdateMovie)

  useEffect(() => {
    dispatch(rawActions.selectedMovieRequest(id))
    dispatch(rawActions.movieCommentsRequest(id))
    dispatch(rawActions.movieRatingsRequest(id))
    dispatch(
      rawActions.userRatingRequest({
        userId: user.id,
        movieId: id,
      })
    )
    joinMoviePage(user.userName, id)
    return () => {
      closeSignalRConnection()
      dispatch(rawActions.cleanMovieStore())
    }
  }, [])

  const youtubeOpts = {
    height: '576',
    width: '1024',
    playerVars: {
      autoplay: 0,
      controls: 2,
    },
  }
  const [settedRating, setSettedRating] = useState(0)
  const [signalrConnection, setSignalrConnection] = useState()
  const signalrConnectionRef = useRef(signalrConnection)

  useEffect(() => {
    signalrConnectionRef.current = signalrConnection
  })

  useEffect(() => {
    if (updateMovieNeed === true) {
      changeCommentSignalR(user.userName, id)
      changeRatingSignalR(user.userName, id)
      dispatch(rawActions.noNeedToUpdateMovie())
    }
  }, [updateMovieNeed])

  const onRatingChange = (event, value) => {
    setSettedRating(value)
  }
  const handleRatingSet = () => {
    dispatch(
      rawActions.setUserRatingRequest({
        value: settedRating,
        userId: user.id,
        movieId: movie.id,
      })
    )
  }
  const [writtenComment, setWrittenComment] = useState('')
  const onCommentChange = (event) => {
    setWrittenComment(event.target.value)
  }
  const handleCommentSet = () => {
    dispatch(
      rawActions.userCommentRequest({
        text: writtenComment,
        userId: user.id,
        movieId: movie.id,
      })
    )
    setWrittenComment('')
  }

  const handleDeleteCommentClick = (id) => {
    dispatch(
      rawActions.deleteCommentRequest({
        id,
      })
    )
  }

  const joinMoviePage = async (userName, movieId) => {
    try {
      const connection = new HubConnectionBuilder()
        .withUrl('https://localhost:5001/moviePage')
        .configureLogging(LogLevel.Information)
        .build()

      connection.on('CommentsHasChanged', () => {
        dispatch(rawActions.movieCommentsRequest(movieId))
      })

      connection.on('RatingHasChanged', () => {
        dispatch(rawActions.selectedMovieRequest(movieId))
        dispatch(rawActions.movieRatingsRequest(movieId))
      })

      connection.onclose(() => {
        signalrConnectionRef.current = null
      })

      await connection.start()
      setSignalrConnection(connection)
      await connection.invoke('JoinMoviePage', { userName, movieId })
    } catch (e) {
      console.log(e)
    }
  }

  const changeCommentSignalR = async (userName, movieId) => {
    try {
      await signalrConnection?.invoke('UserHasChangedComment', { userName, movieId })
    } catch (e) {
      console.log(e)
    }
  }

  const changeRatingSignalR = async (userName, movieId) => {
    try {
      await signalrConnection?.invoke('UserHasChangedRating', { userName, movieId })
    } catch (e) {
      console.log(e)
    }
  }

  const closeSignalRConnection = async () => {
    try {
      await signalrConnectionRef.current.stop()
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <Movie
      movie={movie}
      comments={comments}
      ratings={ratings}
      genres={genres}
      avatar={avatar}
      youtubeOpts={youtubeOpts}
      userRating={userRating}
      settedRating={settedRating}
      onRatingChange={onRatingChange}
      handleRatingSet={handleRatingSet}
      writtenComment={writtenComment}
      onCommentChange={onCommentChange}
      handleCommentSet={handleCommentSet}
      currentUserUserName={user.userName}
      handleDeleteCommentClick={handleDeleteCommentClick}
    />
  )
}

export default MovieContainer
