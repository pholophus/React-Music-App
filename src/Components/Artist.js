import React,{useState, useEffect} from 'react';
import { Avatar, Row, Col, Divider, List } from 'antd';
import ReactAudioPlayer from 'react-audio-player';

function Artist ({match}) {

    const [keyword, setKeyword] = useState("");
    const [artist, setArtist] = useState([]);
    const [songs, setSongs] = useState([]);
    //console.log(songs[0]);

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

        
          return(
            <div>
                <div style={{backgroundImage: "linear-gradient( #4f5250, #1b1c1c)" }}>
                    <Row justify="center" align="middle" >
                        <Col span={4}>
                            <Avatar src={artist.picture} size={180} style={{top:"15px"}}/>
                        </Col>
                        <Col style={{marginRight: "100px", top:"20px"}} span={4}>
                            <h1 style={{fontSize:"30px",  color:"white", top:"15px"}}>{artist.name}</h1>
                            <h3 style={{fontSize:"20px", color:"white"}}>{artist.nb_album} <span style={{color:"#b6b8b6"}}>albums</span></h3>
                            <h3 style={{fontSize:"20px", color:"white"}}>{artist.nb_fan} <span style={{color:"#b6b8b6"}}>fans </span></h3>
                        </Col>
                    </Row>
                    <Divider orientation="center" style={{ color: '#333', fontWeight: 'bold', fontSize: "24px" }}>
                    Tracks
                </Divider>
                </div>

                <div style={{backgroundColor: "#1b1c1c", height:"75vh"}}>
                <List
                    grid={{
                        gutter: [16, 48],
                        xs: 1,
                        sm: 2,
                        md: 2,
                        lg: 3,
                        xl: 3,
                        xxl: 3,
                    }}
                    pagination={{
                        onChange: page => {
                          console.log(page);
                        },
                        pageSize: 6,
                      }}
                    dataSource={songs}
                    renderItem={item => (
                        <List.Item>
                            <h2 style={{color:"#b6b8b6"}}>{item.title}</h2>
                            <ReactAudioPlayer  style={{width: "150px", height:"35px", position:"relative", top:"5px"}} src={item.preview} controls/>
                        </List.Item>
                    )}
                />
                </div> 
                  
          </div>
          )
        }

export default Artist