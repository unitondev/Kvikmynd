import SelectedMovieView from "../views/SelectedMovie"
import {useDispatch, useSelector} from "react-redux";
import {
    getComments,
    getJwt, getMovie, getMovieGenres, getMovieLoading,
    getRatings,
    getUser,
    getUserAvatar,
    getUserRating,
} from "../redux/selectors";
import {useParams} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import {
    cleanMovieStore, deleteCommentRequest,
    movieCommentsRequest,
    movieRatingsRequest,
    selectedMovieRequest,
    setUserRatingRequest,
    userCommentRequest,
    userRatingRequest
} from "../redux/actions";
import {HubConnectionBuilder, LogLevel} from "@microsoft/signalr";

export const SelectedMovieContainer = () => {
    const dispatch = useDispatch();
    let {id} = useParams();
    const movie = useSelector(getMovie);
    const comments = useSelector(getComments)
    const ratings = useSelector(getRatings)
    const genres = useSelector(getMovieGenres);
    const userRating = useSelector(getUserRating);
    const user = useSelector(getUser);
    const jwtToken = useSelector(getJwt);
    const avatar = useSelector(getUserAvatar);
    const movieLoading = useSelector(getMovieLoading);

    useEffect(() => {
        dispatch(selectedMovieRequest(id));
        dispatch(movieCommentsRequest(id));
        dispatch(movieRatingsRequest(id));
        dispatch(userRatingRequest({
            userId: user.id,
            movieId: id,
            jwtToken
        }));
        joinMoviePage(user.userName, id);
        return () => {
            closeSignalRConnection();
            dispatch(cleanMovieStore());
        }
    },[]);

    const youtubeOpts = {
        height: '576',
        width: '1024',
        playerVars: {
            autoplay: 0,
            controls: 2,
        }
    }
    const [settedRating, setSettedRating] = useState(0);
    const [signalrConnection, setSignalrConnection] = useState();
    const signalrConnectionRef = useRef(signalrConnection);

    useEffect(() => {
        signalrConnectionRef.current = signalrConnection;
    })

    useEffect(() => {
        if(movieLoading === false)
            changeCommentSignalR(user.userName, id)
    }, [movieLoading]);

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
        changeRatingSignalR(user.userName, id);
    }
    const [writtenComment, setWrittenComment] = useState('');
    const onCommentChange = (event) => {
        setWrittenComment(event.target.value);
    }
    const handleCommentSet = () => {
        dispatch(userCommentRequest({
            text: writtenComment,
            userId: user.id,
            movieId: movie.id,
            jwtToken
        }));
        setWrittenComment('');
    }

    const handleDeleteCommentClick = (id) => {
        dispatch(deleteCommentRequest({
            id,
            jwtToken
        }));
    }

    const joinMoviePage = async(userName, movieId) => {
        try {
            const connection = new HubConnectionBuilder()
                .withUrl("https://localhost:5001/moviePage")
                .configureLogging(LogLevel.Information)
                .build();

            connection.on("CommentsHasChanged", () => {
                dispatch(movieCommentsRequest(movieId));
            });

            connection.on("RatingHasChanged", () => {
                dispatch(selectedMovieRequest(movieId));
                dispatch(movieRatingsRequest(movieId));
            })

            connection.onclose(() => {
                signalrConnectionRef.current = null;
            });

            await connection.start();
            setSignalrConnection(connection);
            await connection.invoke("JoinMoviePage", {userName, movieId});
        } catch (e) {
            console.log(e);
        }
    }

    const changeCommentSignalR = async (userName, movieId) => {
        try {
            await signalrConnection?.invoke("UserHasChangedComment", {userName, movieId});
        } catch (e) {
            console.log(e);
        }
    }

    const changeRatingSignalR = async (userName, movieId) => {
        try {
            await signalrConnection?.invoke("UserHasChangedRating", {userName, movieId});
        } catch (e) {
            console.log(e);
        }
    }

    const closeSignalRConnection = async () => {
        try {
            await signalrConnectionRef.current.stop();
        } catch (e) {
            console.log(e);
        }
    }

    return <SelectedMovieView
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
}