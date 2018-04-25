import React, {Component } from 'react'; 
import {Button, MediaObject, Thumbnail, Colors}from 'react-foundation';


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

  let defaultStyle = {
  color: '#a5d6a7',
};

  export default Filter; 