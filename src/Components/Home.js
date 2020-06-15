import React,{useState, useEffect} from 'react';
import { List, Card } from 'antd';
import { BrowserRouter as Router, Link} from 'react-router-dom';
import ReactAudioPlayer from 'react-audio-player';
import '../songlist.css';

function Home () {
    let keyword = "tonight";
    const [songs, setSongs] = useState([]);

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
                }
          )
      }
    }
    , [keyword]);

      
    return (
        <div className="songlist">

            <span style={{position:"relative", top:"10px", fontSize:"28px", color:"#a8aaba", fontFamily:"Andale Mono, monospace"}}>TOP HIT SONGS</span>
            <List
                grid={{ gutter: 4, xs: 1,
                    sm: 2,
                    md: 4,
                    lg: 4,
                    xl: 4,
                    xxl: 3, }}
                    pagination={{
                        onChange: page => {
                          console.log(page);
                        },
                        pageSize: 8,
                      }}
                dataSource={songs}
                renderItem={item => (
                <List.Item>
                    <Card bodyStyle={{textAlign:"left"}} style={{marginLeft:"60px", marginTop:"20px",width: 160, backgroundColor: 'rgba(255, 255, 255, 0.0)', border: 0 }} cover={<img src={item.artist.picture_medium} style={{height: "160px"}}/>}>
                        <Link className="link-songlist" to={`/artist/${item.artist.id}`}>{item.artist.name}</Link>
                        <br/>
                        <span style={{ fontSize:"1em", color:"#b6b8b6", }}>{item.title}</span>
                        <ReactAudioPlayer style={{width: "140px", height:"30px", position:"relative", top:"5px"}} src={item.preview} controls/>
                    </Card>
                </List.Item>
                )}
            />
                  
        </div>
    );
      }


export default Home;