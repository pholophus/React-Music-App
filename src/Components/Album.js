import React,{useState, useEffect} from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import ReactAudioPlayer from 'react-audio-player';

function Album ({match}) {

    const [album, setAlbum] = useState([]);
    const [error, setError] = useState(null);
    console.log(match);

    useEffect(() => {
          fetch(`https://deezerdevs-deezer.p.rapidapi.com/album/${match.params.id}`, {
          "method": "GET",
          "headers": {
              "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
              "x-rapidapi-key": "4f40bf40b2msh6d957020229b6c6p1fe925jsn4ef16ee46284"
          }
      }).then(res => res.json())
          .then(
              (result) => {
                  setAlbum(result);
              }
        )
    
      }
      , []);

        if (error) {
            return <div>Error: {error.message}</div>;
        }else{
          return(
            <div>
            <h3>Title of album {album.title}</h3>
            <p>Label of album {album.label}</p>
          </div>
          )
        }

}

export default Album