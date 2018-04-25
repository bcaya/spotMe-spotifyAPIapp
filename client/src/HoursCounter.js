import React, {Component } from 'react'; 
import {Button, MediaObject, Thumbnail, Colors}from 'react-foundation';


class HoursCounter extends Component {
  render(){
    let allSongs = this.props.playlists.reduce((tracks, eachPlaylist) => {
      return tracks.concat(eachPlaylist.tracks)
    }, [])
    let totalDuration = allSongs.reduce((sum, eachSong) => {
      return sum + eachSong.duration
    }, 0)
    return(
      <div style={{...defaultStyle, width: "40%", display: 'inline=block'}}>
        <h2>{Math.round(totalDuration/60)} hours</h2>
      </div>
      ); 
      }
}
let defaultStyle = {
  color: '#a5d6a7',
};
export default HoursCounter; 