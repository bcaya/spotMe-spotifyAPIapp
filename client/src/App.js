import React, { Component } from 'react';
import './App.css';
import queryString from 'query-string';
import {
  Card,
  Container,
  Divider,
  Dropdown,
  Grid,
  Button,
  Icon,
  Header,
  Segment,
  Image,
  Menu,
} from 'semantic-ui-react';
import bart from './bart.png'
import axios from 'axios'; 

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
        <Image src={playlist.imageUrl} style={{width: '160px'}}/>
        <h3>{playlist.name}</h3>
        <ul>
          {playlist.songs.map(song =>
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
      serverData: {},
      filterString: '',
      user: {},
    }
  }

  componentDidMount() {
    const BASE_URL = 'https://api.spotify.com/v1/me'
    const PLAYLIST_URL = 'https://api.spotify.com/v1/me/playlists'
      let parsed = queryString.parse(window.location.search);
      let accessToken = parsed.access_token; 
      if ( !accessToken)
        return;
      axios.get(BASE_URL,{headers:{'Authorization': 'Bearer ' + accessToken}
      }).then(response => console.log(response.data))
        .then(response => this.setState({ user: response.data
          
        })
        )

         axios.get(PLAYLIST_URL,{headers:{'Authorization': 'Bearer ' + accessToken}
      }).then(response => console.log(response))
        .then(data => this.setState( state => {
          user: {
            return {playlists: [...state.serverData]}

          }
        })
        )
        // axios.get(PLAYLIST_URL,{headers:{'Authorization': 'Bearer' + accessToken}
        // }).then(response => console.log(response))
        //   .then(data => this.setState(state => {
        //     playlists: data.items.map(item =>{
        //       console.log(data.items)
        //       return{
        //         name: item.name,
        //         imageUrl:item.images[0].url,
        //         songs:[]
        //       }
        //     })
        //   }))
  }


  //   fetch('https://api.spotify.com/v1/me/playlists', {
  //     headers: {'Authorization': 'Bearer ' + accessToken}
  //     }).then(response => response.json())
  //     .then(data => this.setState({
  //       playlists: data.items.map(item => {
  //         console.log(data.items)
  //       return{
  //         name: item.name,
  //         imageUrl: item.images[0].url, 
  //         songs: item.songs
  //           }
  //           })
  //       }))

  // }
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
           <Image src={bart} width="100px"/> {this.state.user.name}'s Playlists
          </h1>
          <PlaylistCounter playlists={playlistToRender}/>
          {/* <HoursCounter playlists={this.state.playlists}/> */}
          <Filter onTextChange={text => {
            this.setState({filterString: text})
          }}/>
          {playlistToRender.map(playlist =>
            <Playlist playlist={playlist} />
          )};
        </div> : <Button onClick={()=> window.location='http://localhost:8888/login'} style={{padding:'20px', 'fontSize': '50px', 'marginTop':'25px'}}>
                    Sign In With Spotify
                  </Button>        
        }
       </div>
     );
   }
}

export default App;