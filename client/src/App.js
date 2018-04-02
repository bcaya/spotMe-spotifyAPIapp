import React, { Component } from 'react';
import './App.css';
import queryString from 'query-string';

let defaultStyle = {
  color: '#FECE1E',
};

let fakeServerData = { 
  user: {
    name: 'Bob', 
      playlists: [
        {
        name:'My Jams',
        songs:[
          {name:'Baby',duration:1420},
          {name:'I want it that way',duration:1312},
          {name:'Lime and the coconut',duration:1720}
        ]
        },
      {
        name:'My Jams',
        songs:[
          {name:'Baby',duration:1420},
          {name:'I want it that way',duration:1312},
          {name:'Lime and the coconut',duration:1720}
        ]
        },
      {
        name:'My Jams',
        songs:[
          {name:'Baby',duration:1420},
          {name:'I want it that way',duration:1312},
          {name:'Lime and the coconut',duration:1720}
        ]
        },
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

class HoursCounter extends Component {
  render(){
    let allSongs = this.props.playlists.reduce((songs, eachPlaylist) => {
      return songs.concat(eachPlaylist.songs)
    }, [])
    let totalDuration = allSongs.reduce((sum, eachSong) => {
      return sum + eachSong.duration
    }, 0)
    return(
      <div style={{...defaultStyle, width: "40%", display: 'inline=block'}}>
        <h2>Number TExt</h2>
        <h2>{Math.round(totalDuration/60)} hours</h2>
        </div>
      ); 
      }
}
  class Filter extends Component { 
    render() {
      return (
        <div style={defaultStyle}>
          <img/>
          <input type="text"/>
        </div>
      )
    }
  }

class Playlist extends Component { 
  render(){
    return (
      <div style={{...defaultStyle, display: 'inline-block', width:"25%"}}>
        <img/>
        <h3>Playlist name..</h3>
        <ul><li>Song1</li><li>Song2</li><li>song2</li></ul>
      </div>
    )
  }
}

class App extends Component { 
  constructor() {
    super(); 
    this.state = { serverData: {} }
  }
  componentDidMount(){
    setTimeout(() => {
      this.setState({serverData: fakeServerData});
      }, 1000);
    }
  render() { 
    return (
      <div className="App">
       {this.state.serverData.user ?
        <div>
          <h1 style={{...defaultStyle, 'font-size': '54px'}}>
            {this.state.serverData.user.name}'s Playlists
          </h1>
          <PlaylistCounter playlists={this.state.serverData.user.playlists}/>
          <HoursCounter playlists={this.state.serverData.user.playlists}/>
          <Filter/>
          <Playlist/>
          <Playlist/>
          <Playlist/>
          <Playlist/>
        </div> : <h1 style={defaultStyle}>Loading...</h1>        
        }
       </div>
     );
   }
}

export default App;