import React, { Component } from 'react';
import './App.css';
import queryString from 'query-string';

import {Button, MediaObject, Thumbnail, Colors}from 'react-foundation';
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





class App extends Component { 
    state = {
      serverData: {},
      filterString: '',
      user: {},
      playlist:{}
    }

  componentDidMount() {
    const BASE_URL = 'https://api.spotify.com/v1/me/'
    
      let parsed = queryString.parse(window.location.search);
      let accessToken = parsed.access_token; 
      if (!accessToken)
        return
      axios.get(BASE_URL,{headers:{'Authorization': 'Bearer ' + accessToken}
      }).then( ({data}) => this.setState({ user: data   }) )
}

  getPlaylists = () => {
     const PLAYLIST_URL = 'https://api.spotify.com/v1/me/playlists'
     let parsed = queryString.parse(window.location.search);
     let accessToken = parsed.access_token; 
     if (!accessToken)
      return;
      axios.get(PLAYLIST_URL,{headers:{'Authorization': 'Bearer ' + accessToken}
      }).then( ({data}) => this.setState({ playlists: data   }) )
  }

  //   const PLAYLIST_URL = 'https://api.spotify.com/v1/me/playlists'
  //   let parsed = queryString.parse(window.location.search);
  //   let accessToken = parsed.access_token; 
  //     axios.get(PLAYLIST_URL,{headers:{'Authorization': 'Bearer ' + accessToken}
  //   }).then(data => this.setState( state => {

  //     })
  //     )
  // }
  render(){ 
    // let playlistToRender = 
    // this.state.user && this.state.playlists 
    //   ? this.state.playlists.filter(playlist => 
    //     playlist.name.toLowerCase().includes(
    //       this.state.filterString.toLowerCase()))
    // : [] 
    return (
      <div className="App">
       {this.state.user ?
        <div>
          <h1 style={{...defaultStyle, 'fontSize': '54px'}}>
           <Thumbnail src={bart} width="100px"/> {this.state.user.id}'s Playlists
          </h1>
          <Button color={Colors.SUCCESS} inverted onClick={this.getPlaylists}>
            click here to load playlists
          </Button>
          {/* <PlaylistCounter/> */}
          {/* <HoursCounter playlists={this.state.playlists}/> */}
          {/* <Filter onTextChange={text => {
            this.setState({filterString: text})
          }}/> */}
          {/* {playlistToRender.map(playlist =>
            <Playlist playlist={playlist} />
          )}; */}
        </div> : <Button  onClick={()=> window.location='http://localhost:8888/login'} style={{padding:'20px', 'fontSize': '50px', 'marginTop':'25px'}}>
                    Sign In With Spotify
                  </Button>        
        }
       </div>
     );
   }
}


export default App;
