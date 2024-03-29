import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import Pause from "@material-ui/icons/PauseCircleFilled"
import FavoriteIcon from '@material-ui/icons/Favorite';
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";

const styles = theme => ({

  card: {
    display: 'flex'
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    width: "100%"
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 150,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
  },
  price: {
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit
  }
});

class CardItem extends Component {

  state = {
    favoriteButtonColor: "primary"
  };

  switchSoundState = () => {
    const isFavorite = this.props.favorite;
    const playlist = isFavorite ? this.props.favorites : this.props.searching;
    this.props.addSongToPlayer(this.props.song, playlist);
  };

  static getDerivedStateFromProps(props, state){

    if(props.favorites.some(song => song.trackId === props.song.trackId))
      return {favoriteButtonColor: "error"};

    if(!props.favorites.length && state.favoriteButtonColor === "error")
      return {favoriteButtonColor: "primary"};

    return null
  }

  switchFavoriteState = () => {
    this.props.switchFavoritesState(this.props.song);
    this.setState(
      (this.state.favoriteButtonColor === "primary")
        ? {favoriteButtonColor: "error"}
        : {favoriteButtonColor: "primary"}
    )
  };

  render() {
    const { classes, song, playerInfo } = this.props;
    return (
      <Grid item xs={12}>
        <Card className={classes.card}>
          <div className={classes.details}>
            <CardContent className={classes.content}>
              <Typography component="h5" variant="h5" title={`name of track is ${song.trackName}`}>
                {song.trackName}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary" title={`artist name is ${song.artistName}`}>
                {song.artistName}
              </Typography>
            </CardContent>
            <div className={classes.controls}>
              <IconButton
                title={playerInfo.isPlaying && playerInfo.trackLink === song.previewUrl
                  ? "Pause"
                  : "Play"}
                onClick={this.switchSoundState}
                aria-label={  playerInfo.isPlaying && playerInfo.trackLink === song.previewUrl
                  ? "Pause"
                  : "Play"
                }
              >
                {playerInfo.isPlaying && playerInfo.trackLink === song.previewUrl
                  ? <Pause color="primary"/>
                  : <PlayArrowIcon color="primary"/>
                }
              </IconButton>
              <IconButton
                onClick={this.switchFavoriteState}
                aria-label="Add-to-favorite"
                title={this.props.favorites.some(song => song.trackId === this.props.song.trackId)
                  ? "Favorite"
                  : "Not favorite"
                }>
                <FavoriteIcon color={this.state.favoriteButtonColor} />
              </IconButton>

              {this.state.favoriteButtonColor === "error"
                ? <Link href={song.artistViewUrl} target="_blank">
                  <Typography className={classes.price} variant="subtitle1" color="textSecondary" title="Look on iTunes">
                    Look on iTunes
                  </Typography>
                </Link>
                : <Typography className={classes.price} variant="subtitle1" color="textSecondary">
                  {song.trackPrice}$
                </Typography>
              }
            </div>
          </div>
          <CardMedia
            title={song.collectionName}
            className={classes.cover}
            image={song.artworkUrl}
          />
        </Card>
        <br/>
      </Grid>
    );
  }
}

CardItem.propTypes = {
  classes: PropTypes.object,
  favorite: PropTypes.bool,
  favorites: PropTypes.array,
  searching: PropTypes.array,
  song: PropTypes.object,
  playerInfo: PropTypes.object,
  addSongToPlayer: PropTypes.func,
  switchFavoritesState: PropTypes.func
};

export default withStyles(styles)(CardItem);
