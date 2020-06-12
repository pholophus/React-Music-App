import React,{useState,  useEffect} from 'react';
import { BrowserRouter as Router, useHistory,Link } from 'react-router-dom';
import { Button, Input } from 'antd';
import { SearchOutlined, UserOutlined } from '@ant-design/icons';
function Search(){ 
    
    const [search, setSearch] = useState("");

    const handleChange = (e) =>{
        setSearch(e.target.value);
    };

    const handleClick = () => {
        setSearch('');
    };

    return(
        <div>
            <Input 
                prefix={<UserOutlined />} 
                onChange={handleChange} 
                value={search} 
                placeholder="Search songs, artist, albums"
                style={{ width: 200 }}
            />
            <Button icon={<SearchOutlined />}>
                <Link onClick={handleClick} to={`/songlist/${search}`} style={{color: "black"}}>Search
                </Link>
            </Button>
            <br/> <br/>
        </div> 
    )

}

export default Search;