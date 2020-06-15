import React, {useState} from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Songlist from './Components/Songlist';
import Home from './Components/Home';
import Artist from './Components/Artist';
import { Button, Input, Menu, Layout,  Divider  } from 'antd';
import { PlayCircleTwoTone, CustomerServiceTwoTone, SmileTwoTone, DownloadOutlined  } from '@ant-design/icons';
import './App.css';

function App() {
  const { Item } = Menu;
    const { Header, Content, Sider } = Layout;
    const [search, setSearch] = useState("");

    const handleChange = (e) =>{
        setSearch(e.target.value);
    };

    const handleClick = () => {
        setSearch('');
    };

  return (
    <Router>
      <div className="App"> 
      <Layout>
            <Header className="header" >
                <Menu mode="horizontal" theme="dark" >
                    <Item className="customclass">
                      <Link to={`/`} style={{color: "white", position:"relative" , left:"-25px", top:"-5px", fontSize:"36px", fontWeight:'bold'}}>UPBEAT
                      </Link>
                    </Item>
                    <Item className="customclass">
                      <Input 
                          onChange={handleChange} 
                          value={search} 
                          size="large"
                          placeholder="Search songs, artist, albums"
                          style={{ width: 300,  position: "relative", top:"-10px"  }}
                      />
                      <Button size="large" style={{position: "relative", top:"-10px"}}>
                          <Link onClick={handleClick} to={`/songlist/${search}`} style={{color: "black", }}>Search
                          </Link>
                      </Button>
                    </Item>
                    <Item className="customclass">
                      <Button type="primary" shape="round" icon={<DownloadOutlined style={{fontSize:"20px"}}/>} size="large" 
                              style={{position: "relative", top:"-10px" ,color:"black", right:"-145px"}}>
                        Get UPBEAT Desktop App
                      </Button>
                    </Item>
                    <Item className="customclass">
                      <Button type="primary" shape="round" size="large" 
                              style={{position: "relative", top:"-10px" ,color:"black", right:"-145px"}}>
                        Login
                      </Button>
                    </Item>
                    <Item className="customclass">
                      <Button type="primary" shape="round" size="large" 
                              style={{position: "relative", top:"-10px" ,color:"black", right:"-130px"}}>
                        Signup
                      </Button>
                    </Item>
                </Menu>
            </Header>
            <Layout>
            <Sider collapsible onCollapse={false} theme="dark">
                <Menu
                defaultOpenKeys={['sub1']}
                mode="inline"
                theme="dark"
                inlineCollapsed={true}
                >
                <Menu.Item key="1" icon={<PlayCircleTwoTone twoToneColor="#4287f5" style={{fontSize:"24px"}}/>}>
                  Music
                </Menu.Item>
                <Menu.Item key="2" icon={<CustomerServiceTwoTone twoToneColor="#f642ff" style={{fontSize:"24px"}}/>}>
                  Album
                </Menu.Item>
                <Menu.Item key="3" icon={<SmileTwoTone twoToneColor="#84ff3d" style={{fontSize:"24px"}}/>}>
                  Artist
                </Menu.Item>
                </Menu>
            </Sider>
            <Layout >
            <Content>
                <Switch>
                  <Route path="/" exact component={Home}/>
                  <Route path="/songlist/:q" component={Songlist}/>
                  <Route path="/artist/:id" component={Artist}/>
                </Switch>
            </Content>
            </Layout>
            </Layout>
        </Layout>

        
      </div>
    </Router>
  );
}

export default App;
