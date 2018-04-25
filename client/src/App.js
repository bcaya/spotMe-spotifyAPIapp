import React, { Component } from 'react';
import './App.css';
import queryString from 'query-string';
import Playlist from './Playlist'; 
import PlaylistCounter from './PlaylistCounter'
import Filter from './Filter'; 
import HoursCounter from './HoursCounter'; 
import {Button, MediaObject, Thumbnail, Colors}from 'react-foundation';
import {Segment, Container, Grid} from 'semantic-ui-react'; 
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

    axios.get('https://api.spotify.com/v1/me', {
      headers: {'Authorization': 'Bearer ' + accessToken}
      }).then(data => this.setState({
        user: {
          name: data.data.id
          }
        }))

    axios.get('https://api.spotify.com/v1/me/playlists', {
      headers: {'Authorization': 'Bearer ' + accessToken}
      }).then(playlistData => {
       let playlists = playlistData.data.items
       let trackDataPromise = playlists.map(playlist => {
        let responsePromise = axios.get(playlist.tracks.href, {
            headers: {'Authorization': 'Bearer ' + accessToken}
           })
           let trackDataPromise = responsePromise 
          return trackDataPromise;
        })
       return Promise.all(trackDataPromise).then(trackDatas => {
          trackDatas.forEach((trackData, i) => {
            playlists[i].trackDatas = trackData.data.items
            .map(item => item.track)
            .map(trackData => ({
              name: trackData.name, 
              duration: trackData.duration_ms / 1000,
              id: trackData.id
            }))
          })
          return playlists;
        })
      })
      .then(playlists => this.setState({
        playlists: playlists.map(item => {
          console.log(item.trackDatas)
        return{
          name: item.name,
          imageUrl: item.images[0].url, 
          tracks: item.trackDatas.slice(0,12)
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
        <Grid columns={8}>
         <Grid.Row>
                {playlistToRender.map(playlist =>
                  <Playlist playlist={playlist} />
                )};
         </Grid.Row>
        </Grid>
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