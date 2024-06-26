import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr'

import Movie from '../components/Movie'
import * as rawActions from '../actions'
import { getUser, getUserAvatar, hasActiveSubscriptionsByType } from '../../account/selectors'
import {
  getComments,
  getMovie,
  getMovieGenres,
  getRatings,
  getSimilarMoviesSelector,
  getUserRating,
} from '../selectors'
import { calculateMovieRating } from '../helpers'
import { SubscriptionType } from '../../../Enums'

const MovieContainer = () => {
  const dispatch = useDispatch()
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  let { id } = useParams()
  const movie = useSelector(getMovie)
  const comments = useSelector(getComments)
  const ratings = useSelector(getRatings)
  const genres = useSelector(getMovieGenres)
  const userRating = useSelector(getUserRating)
  const user = useSelector(getUser)
  const avatar = useSelector(getUserAvatar)
  const hasActiveSubscription = useSelector((state) =>
    hasActiveSubscriptionsByType(state, SubscriptionType.Premium)
  )
  const similarMovies = useSelector(getSimilarMoviesSelector)
  // TODO signalr temporarily disabled
  // const updateMovieNeed = useSelector(getNeedToUpdateMovie)

  useEffect(() => {
    dispatch(rawActions.selectedMovieRequest(id))
    dispatch(rawActions.movieCommentsRequest(id))
    dispatch(rawActions.movieRatingsRequest(id))
    user.id &&
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
      dispatch(rawActions.getSimilarMovies.resetState())
    }
  }, [dispatch, id, user.id, user.userName])

  const youtubeOpts = {
    height: '576',
    width: '1024',
    playerVars: {
      autoplay: 0,
      controls: 2,
    },
  }

  useEffect(() => {
    setSettedRating(userRating)
  }, [userRating])

  const [settedRating, setSettedRating] = useState(0)
  const [ratingHover, setRatingHover] = useState(-1)
  const [deletedComment, setDeletedComment] = useState(null)
  const [signalrConnection, setSignalrConnection] = useState()
  const signalrConnectionRef = useRef(signalrConnection)

  useEffect(() => {
    signalrConnectionRef.current = signalrConnection
  })

  // useEffect(() => {
  //   if (updateMovieNeed === true) {
  //     changeCommentSignalR(user.userName, id)
  //     changeRatingSignalR(user.userName, id)
  //     dispatch(rawActions.noNeedToUpdateMovie())
  //   }
  // }, [updateMovieNeed])

  const [movieRating, setMovieRating] = useState(0)
  useEffect(() => {
    setMovieRating(calculateMovieRating(ratings))
  }, [ratings])

  const onRatingChange = useCallback((event, value) => {
    setSettedRating(value)
  }, [])

  const handleRatingSet = useCallback(() => {
    settedRating === null
      ? dispatch(
          rawActions.deleteUserRatingRequest({
            userId: user.id,
            movieId: movie.id,
          })
        )
      : dispatch(
          rawActions.setUserRatingRequest({
            value: settedRating,
            userId: user.id,
            movieId: movie.id,
          })
        )
  }, [dispatch, movie.id, settedRating, user.id])

  const handleCommentSet = useCallback(
    (values) => {
      const { WrittenCommentText } = values
      const data = {
        text: WrittenCommentText,
        userId: user.id,
        movieId: movie.id,
      }

      dispatch(rawActions.userCommentRequest(data))
    },
    [dispatch, movie.id, user.id]
  )

  const handleDeleteCommentCancel = useCallback(() => {
    setOpenDeleteDialog(false)
  }, [])

  const handleDeleteCommentSubmit = useCallback(() => {
    dispatch(rawActions.deleteCommentRequest({ id: deletedComment }))
    setDeletedComment(null)
    handleDeleteCommentCancel()
  }, [deletedComment, dispatch, handleDeleteCommentCancel])

  const handleDeleteCommentClick = useCallback((id) => {
    setDeletedComment(id)
    setOpenDeleteDialog(true)
  }, [])

  const dialogProps = {
    onSubmit: handleDeleteCommentSubmit,
    onClose: handleDeleteCommentCancel,
    open: openDeleteDialog,
    title: 'Delete comment',
    message: 'Are you sure want to delete your comment?',
  }

  const joinMoviePage = async (userName, movieId) => {
    try {
      const connection = new HubConnectionBuilder()
        .withUrl(`${process.env.REACT_APP_API_HOST_NAME}moviePage`)
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
      movieRating={movieRating}
      comments={comments}
      ratings={ratings}
      genres={genres}
      currentUserAvatar={avatar}
      youtubeOpts={youtubeOpts}
      settedRating={settedRating}
      onRatingChange={onRatingChange}
      handleRatingSet={handleRatingSet}
      handleCommentSet={handleCommentSet}
      currentUser={user}
      handleDeleteCommentClick={handleDeleteCommentClick}
      ratingHover={ratingHover}
      setRatingHover={setRatingHover}
      dialogProps={dialogProps}
      hasActiveSubscription={hasActiveSubscription}
      similarMovies={similarMovies}
    />
  )
}

export default MovieContainer
