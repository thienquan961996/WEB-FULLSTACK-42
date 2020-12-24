import { Switch, Route } from "react-router-dom";
import './App.css';
import Home from "./page/Home/Home";
import Login from "./page/Auth/Login";
import Signup from "./page/Auth/Signup";
import CreatePost from "./page/Post/CreatePost";
import PostDetail from "./page/Post/PostDetail"
import NotFound from "./page/NotFound/404";

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


function App() {
  return (
    <div className="App">
      <div>Header</div>
      <Switch>
        <Route path='/' exact>
          <Home />
        </Route>
        <Route path='/login' exact>
          <Login />
        </Route>
        <Route path='/signup' exact>
          <Signup />
        </Route>
        <Route path='/upload' exact>
          <CreatePost />
        </Route>
        <Route path='/post/:id' exact>
          <PostDetail />
        </Route>
        <Route path='*' exact>
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
