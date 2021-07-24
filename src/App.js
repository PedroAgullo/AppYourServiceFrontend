
import './App.scss';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Home from './containers/Home/Home';
import Navbar from './components/Navbar/Navbar';
import Login from './containers/Login/Login';
import Register from './containers/Register/Register';



function App() {
  return (
    <div className="App">

<BrowserRouter>
      
      <Navbar/>

          <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/login" exact component={Login}/>
            <Route path="/register" exact component={Register}/>

          </Switch>
      
    </BrowserRouter>
    </div>
  );
}

export default App;
