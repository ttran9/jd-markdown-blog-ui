import React from "react";
import "semantic-ui-css/semantic.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Layout from "./containers/Layout";
import PostList from "./containers/PostList";
import PostDetail from "./containers/PostDetail";
import PostCreate from "./containers/PostCreate";
import PostUpdate from "./containers/PostUpdate";
import Login from "./containers/Login";
import Signup from "./containers/Signup";

function App() {
  return (
    // history is required for proper use of routing.
    // <Router history={history}>
    <Router>
      <Layout>
        <Switch>
          <Route exact path="/" component={PostList} />
          <Route path="/create" component={PostCreate} />
          <Route exact path="/posts/:postSlug" component={PostDetail} />
          <Route path="/posts/:postSlug/update" component={PostUpdate} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
