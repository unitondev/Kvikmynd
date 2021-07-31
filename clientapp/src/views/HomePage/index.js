import {withStyles} from "@material-ui/core/styles";
import styles from "./styles";
import {NavBarContainer} from "../../containers/NavBarContainer";
import React from "react";
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia, CircularProgress,
    InputAdornment,
    TextField,
    Typography
} from "@material-ui/core";
import {Link} from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import PropTypes from "prop-types";

const Index = (
    {
        classes,
        movies,
        searchRequest,
        handleSearchBarChange
    }) => (
    <>
        <NavBarContainer />
        <div className={classes.movieListBlock}>
            <TextField
                id="outlined-basic"
                variant="outlined"
                className={classes.searchBar}
                size='small'
                placeholder='Search'
                InputProps={{
                    startAdornment: (
                        <InputAdornment position='start'>
                            <SearchIcon/>
                        </InputAdornment>
                    )
                }}
                value={searchRequest}
                onChange={handleSearchBarChange}
            />
            {movies.length > 0
                ?
                (movies
                    .filter(movie => {
                        if(searchRequest === '')
                            return movie;
                        else if(movie.title.toLowerCase().includes(searchRequest.toLowerCase()))
                            return movie;
                    })
                    .map(movie => {
                        return (
                            <Card className={classes.movieCardBlock} key={movie.id}>
                                <CardContent className={classes.movieCardContent}>
                                    <div className={classes.movieCardHeader}>
                                        <Typography className={classes.movieCardTitle}>
                                            {movie.title}
                                        </Typography>
                                    </div>
                                    <div className={classes.movieCardMovieContent}>
                                        {movie.cover
                                            ?
                                            (
                                                <>
                                                    <CardMedia
                                                        className={classes.movieCardCover}
                                                        image={movie.cover}
                                                    />
                                                </>
                                            )
                                            : (<CircularProgress />)
                                        }
                                        <Typography className={classes.movieCardDescription}>
                                            {movie.description}
                                        </Typography>
                                    </div>
                                </CardContent>
                                <CardActions>
                                    <Link
                                        to={`/movie${movie.id}`}
                                        className={classes.movieLink}
                                    >
                                        <Button size="small" color="primary">
                                            More details
                                        </Button>
                                    </Link>
                                </CardActions>
                            </Card>
                        )}))
                : (
                    <CircularProgress className={classes.spinner}/>
                )
            }
        </div>
    </>
)

Index.propTypes = {
    classes: PropTypes.object.isRequired,
    movies: PropTypes.array.isRequired,
    searchRequest: PropTypes.string.isRequired,
    handleSearchBarChange: PropTypes.func.isRequired
};

export default withStyles(styles)(Index);