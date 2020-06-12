import React,{useState, useEffect} from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Card, Avatar } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import ReactAudioPlayer from 'react-audio-player';

function Artist ({match}) {

    const { Meta } = Card;
    const [keyword, setKeyword] = useState("");
    const [artist, setArtist] = useState([]);
    const [songs, setSongs] = useState([]);
    const [error, setError] = useState(null);
    console.log(match);

    useEffect(() => {
          fetch(`https://deezerdevs-deezer.p.rapidapi.com/artist/${match.params.id}`, {
          "method": "GET",
          "headers": {
              "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
              "x-rapidapi-key": "4f40bf40b2msh6d957020229b6c6p1fe925jsn4ef16ee46284"
          }
      }).then(res => res.json())
          .then(
            (result) => {
                setArtist(result);
                setKeyword(result.name);
            }
        )
      }
      , []);

      useEffect(() => {
        if(keyword !== ""){
            fetch(`https://deezerdevs-deezer.p.rapidapi.com/search?q=${keyword}`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
                "x-rapidapi-key": "4f40bf40b2msh6d957020229b6c6p1fe925jsn4ef16ee46284"
            }
        }).then(res => res.json())
            .then(
                (result) => {
                    setSongs(result.data);
                    //console.log(keyword);
                }
          )
      }
    }
    , [keyword]);

        if (error) {
            return <div>Error: {error.message}</div>;
        }else{
          return(
            <div>
            <Card
                style={{ width: 500, marginLeft: "400px" }}
                bordered={false}
            >
                <Meta
                avatar={<Avatar size={160} src={artist.picture} />}
                title={<span style={{fontSize: "26px"}}>{artist.name}</span>}
                description={<h3 style={{fontSize: "18px"}}>{artist.nb_fan} <span style={{color:"grey"}}>fans</span></h3>}
                />
            </Card>

            <img src={artist.picture}/>
            <h1>{artist.name}</h1>
            <h3>No of albums are {artist.nb_album}</h3>
            <h5>Tracks</h5>
            <ul>
                {songs.map(song => (
                    <li key={song.id} style={{paddingBottom : "35px"}}>
                        <span>{song.title}</span><br/>
                        <br/><ReactAudioPlayer src={song.preview} controls/>
                    </li>
                ))}
            </ul>        
          </div>
          )
        }

}

export default Artist