import React, { Component } from 'react';
import './App.css';
import queryString from 'query-string';

import {Button, MediaObject, Thumbnail, Colors}from 'react-foundation';
import bart from './bart.png'
import axios from 'axios'; 

let defaultStyle = {
  color: '#a5d6a7',
};

let fakeServerData = { 
  user: {
    name: 'Bob', 
      playlists: [
        {
        name:'My Jams',
        songs:[
          {name:'Baby', duration:1420},
          {name:'I want it that way', duration:1312},
          {name:'Lime and the coconut', duration:1720}
        ]
        }
    ]
  }
    
}
class PlaylistCounter extends Component {
  render(){
    return(
      <div style={{...defaultStyle, width: "40%", display: 'inline-block'}}>
        <h2>{this.props.playlists.length} playlists</h2>      
      </div>
    )
  }
}

// class HoursCounter extends Component {
//   render(){
//     let allSongs = this.props.playlists.reduce((tracks, eachPlaylist) => {
//       return tracks.concat(eachPlaylist.tracks)
//     }, [])
//     let totalDuration = allSongs.reduce((sum, eachSong) => {
//       return sum + eachSong.duration
//     }, 0)
//     return(
//       <div style={{...defaultStyle, width: "40%", display: 'inline=block'}}>
//         <h2>{Math.round(totalDuration/60)} hours</h2>
//       </div>
//       ); 
//       }
// }
  class Filter extends Component { 
    render() {
      return (
        <div style={defaultStyle}>
          <img/>
          <input type="text" onKeyUp={event => 
            this.props.onTextChange(event.target.value)}/>
        </div>
      )
    }
  }

class Playlist extends Component { 
  render(){
    let playlist = this.props.playlist
    return (
      <div style={{...defaultStyle, display: 'inline-block', width:"25%"}}>
        <Thumbnail src={playlist.imageUrl} style={{width: '160px'}}/>
        <h3>{playlist.name}</h3>
        <ul>
          {playlist.tracks.map(song =>
            <li>{song.name}</li>
            )}
        </ul>
      </div>
    )
  }
}

class App extends Component { 
  constructor() {
    super(); 
    this.state = {
      ServerData: {},
      filterString: '' 
    }
  }
  componentDidMount(){
    let parsed = queryString.parse(window.location.search);
    let accessToken = parsed.access_token;

    fetch('https://api.spotify.com/v1/me', {
      headers: {'Authorization': 'Bearer ' + accessToken}
      }).then((response) => response.json())
      .then(data => this.setState({
        user: {
          name: data.id
          }
        }))

    fetch('https://api.spotify.com/v1/me/playlists', {
      headers: {'Authorization': 'Bearer ' + accessToken}
      }).then((response) => response.json())
      .then(playlistData => {
       let playlists = playlistData.items
       let trackDataPromise = playlists.map(playlist => {
        let responsePromise = fetch(playlist.tracks.href, {
            headers: {'Authorization': 'Bearer ' + accessToken}
           })
           let trackDataPromise = responsePromise 
            .then(response => response.json())
          return trackDataPromise;
        })
       return Promise.all(trackDataPromise).then(trackDatas => {
          trackDatas.forEach((trackData, i) => {
            playlists[i].trackDatas = trackData.items
            .map(item => item.track)
            .map(trackData => ({
              name: trackData.name, 
              duration: trackData.duration_ms / 1000
            }))
          })
          return playlists
        })
      })
      .then(playlists => this.setState({
        playlists: playlists.map(item => {
          console.log(item.trackDatas)
        return{
          name: item.name,
          imageUrl: item.images[0].url, 
          tracks: item.trackDatas.map(trackData => ({
            name: trackData.name
          }))
            }
            })
        }))
    

  }
  render() { 
    let playlistToRender = 
    this.state.user && this.state.playlists 
    ? this.state.playlists.filter(playlist => 
        playlist.name.toLowerCase().includes(
          this.state.filterString.toLowerCase()))
    : [] 
    return (
      <div className="App">
       {this.state.user ?
        <div>
          <h1 style={{...defaultStyle, 'fontSize': '54px'}}>
            {this.state.user.name}'s Playlists
          </h1>
          <PlaylistCounter playlists={playlistToRender}/>
          {/* <HoursCounter playlists={playlistToRender}/> */}
           <Filter onTextChange={text => {
            this.setState({filterString: text})
          }}/>
          {playlistToRender.map(playlist =>
            <Playlist playlist={playlist} />
          )};
        </div> : <Button onClick={()=> 
                    window.location='http://localhost:8888/login'}
                    style={{padding:'20px', 'fontSize': '50px', 'marginTop':'25px'}}
                    >
                    Sign In With Spotify
                  </Button>        
        }
       </div>
     );
   }
}

export default App;