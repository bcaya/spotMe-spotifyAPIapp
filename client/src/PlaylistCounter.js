import React, {Component } from 'react'; 
import {Button, MediaObject, Thumbnail, Colors}from 'react-foundation';

class PlaylistCounter extends Component {
  render(){
    return(
      <div style={{...defaultStyle, width: "40%", display: 'inline-block'}}>
        <h2>{this.props.playlists.length} playlists</h2>      
      </div>
    )
  }
}

let defaultStyle = {
  color: '#a5d6a7',
};

export default PlaylistCounter; 