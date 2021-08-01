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
    const loading = useSelector(getMovieLoading);
    const isFirstRun = useRef(true);

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
        if(!isFirstRun.current && loading === false)
            changeCommentSignalR(user.userName, id)
    }, [loading]);

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

    const joinMoviePage = async(userName, movieId) => {
        try {
            const connection = new HubConnectionBuilder()
                .withUrl("https://localhost:5001/comments")
                .configureLogging(LogLevel.Information)
                .build();

            connection.on("CommentsHasChanged", () => {
                dispatch(movieCommentsRequest(movieId));
            });

            connection.onclose(() => {
                setSignalrConnection();
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
            await signalrConnection.invoke("UserHasChangedComment", {userName, movieId});
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

    useEffect(() => {
        if(isFirstRun.current)
            isFirstRun.current = false;
    });

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
        handleRatingsUpdateClick={handleRatingsUpdateClick}
        currentUserUserName={user.userName}
        handleDeleteCommentClick={handleDeleteCommentClick}
    />
}