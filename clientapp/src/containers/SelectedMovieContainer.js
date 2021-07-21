import SelectedMovieView from "../views/SelectedMovie"
import {useDispatch, useSelector} from "react-redux";
import {
    getComments,
    getJwt, getMovie,
    getRatings,
    getUser,
    getUserAvatar,
    getUserRating,
} from "../redux/selectors";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {
    cleanMovieStore, deleteCommentRequest,
    movieCommentsRequest,
    movieRatingsRequest,
    selectedMovieRequest,
    setUserRatingRequest,
    userCommentRequest,
    userRatingRequest
} from "../redux/actions";

export const SelectedMovieContainer = () => {
    const dispatch = useDispatch();
    let {id} = useParams();
    const movie = useSelector(getMovie);
    const comments = useSelector(getComments)
    const ratings = useSelector(getRatings)
    const userRating = useSelector(getUserRating);
    const user = useSelector(getUser);
    const jwtToken = useSelector(getJwt);
    const avatar = useSelector(getUserAvatar);

    useEffect(() => {
        dispatch(selectedMovieRequest(id));
        dispatch(movieCommentsRequest(id));
        dispatch(movieRatingsRequest(id));
        dispatch(userRatingRequest({
            userId: user.id,
            movieId: id,
            jwtToken
        }));
        return function cleanup(){
            dispatch(cleanMovieStore());
        }
    },[]);

    const youtubeOpts = {
        height: '576',
        width: '1024',
        playerVars: {
            autoplay: 1,
            controls: 2,
        }
    }
    const [settedRating, setSettedRating] = useState(0);
    const onRatingChange = (event, value) => {
        setSettedRating(value);
    }
    const handleRatingSet = () => {
        dispatch(setUserRatingRequest({
            value: settedRating,
            userId: user.id,
            movieId: movie.id,
            jwtToken
        }));
    }
    const [comment, setComment] = useState('');
    const onCommentChange = (event) => {
        setComment(event.target.value);
    }
    const handleCommentSet = () => {
        dispatch(userCommentRequest({
            text: comment,
            userId: user.id,
            movieId: movie.id,
            jwtToken
        }));
        setComment('');
    }
    const handleCommentsUpdateClick = () => {
        dispatch(movieCommentsRequest(movie.id));
    };
    const handleRatingsUpdateClick = () => {
        dispatch(selectedMovieRequest(movie.id));
        dispatch(userRatingRequest({
            userId: user.id,
            movieId: movie.id,
            jwtToken
        }));
        dispatch(movieRatingsRequest(movie.id));
    };

    const handleDeleteCommentClick = (id) => {
        dispatch(deleteCommentRequest({
            id,
            jwtToken
        }));
    }

    return <SelectedMovieView
        movie={movie}
        comments={comments}
        ratings={ratings}
        avatar={avatar}
        youtubeOpts={youtubeOpts}
        userRating={userRating}
        settedRating={settedRating}
        onRatingChange={onRatingChange}
        handleRatingSet={handleRatingSet}
        comment={comment}
        onCommentChange={onCommentChange}
        handleCommentSet={handleCommentSet}
        handleCommentsUpdateClick={handleCommentsUpdateClick}
        handleRatingsUpdateClick={handleRatingsUpdateClick}
        currentUserUserName={user.userName}
        handleDeleteCommentClick={handleDeleteCommentClick}
    />
}