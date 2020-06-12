import React,{useState, useEffect} from 'react';
import { List, Avatar, Space } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined, UserOutlined } from '@ant-design/icons';
import { BrowserRouter as Router, Link, useParams} from 'react-router-dom';
import ReactAudioPlayer from 'react-audio-player';

function Songlist (match) {
    let keyword = match.match.params.q;
    const [songs, setSongs] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);

    //console.log("test "+match.params.q);
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
                    setIsLoaded(true);
                    setSongs(result.data);
                    //console.log(keyword);
                }
          )
      }
    }
    , [keyword]);

      

      if (error) {
        return <div>Error: {error.message}</div>;
      }else {
        return (
            <div>
                <List
                    itemLayout="vertical"
                    size="large"
                    dataSource={songs}
                    renderItem={item => (
                    <List.Item
                        key={item.id} 
                    >
                        <List.Item.Meta
                        avatar={<Avatar style={{marginLeft: "270px"}} size={140} icon={<UserOutlined />} src={item.artist.picture}/>}
                        title={<Link style={{marginRight: "420px", fontSize: "24px"}} to={`/artist/${item.artist.id}`}>{item.artist.name}</Link>}
                        description={<span style={{marginRight: "420px", fontSize: "16px"}}>{item.title}</span>}
                        />
                        <ReactAudioPlayer src={item.preview} controls/><br/>
                    </List.Item>
                    )}
                />       
            </div>
        );
      }
}

export default Songlist