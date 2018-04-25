import React, {Component } from 'react'; 
import {Button, MediaObject, Thumbnail, Colors}from 'react-foundation';
import {List, Segment, Header, Grid } from 'semantic-ui-react'; 

class Playlist extends React.Component { 
  render(){
    let playlist = this.props.playlist
    return (
<Segment inverted>
  

            <Grid.Column>
              <div style={{...defaultStyle,}}>
                <Thumbnail src={playlist.imageUrl} style={{width: '160px'}}/>
                 <Header inverted as="h3">{playlist.name}</Header>
                  <List divided inverted>
                    {playlist.tracks.map(song =>
                     <List.Item>
                      <List.Content>
                        <List.Header>{song.name} + {song.duration}</List.Header>
                      </List.Content>
                    </List.Item>
                  )}
                </List>
              </div>
            </Grid.Column>
</Segment>
    )
  }
}

let defaultStyle = {
  color: '#a5d6a7',
};

export default Playlist