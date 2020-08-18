import React from "react";
import "semantic-ui-css/semantic.min.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import Layout from "./containers/Layout";
import PostList from "./containers/PostList";
import PostDetail from "./containers/PostDetail";
import PostCreate from "./containers/PostCreate";
import PostUpdate from "./containers/PostUpdate";
import PostDelete from "./containers/PostDelete";

// create the history in the browser.
const history = createBrowserHistory();

function App() {
  return (
    // history is required for proper use of routing.
    // <Router history={history}>
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path="/" component={PostList} />
          <Route path="/create" component={PostCreate} />
          <Route path="/post/:postSlug" component={PostDetail} />
          <Route path="/post/:postSlug/update" component={PostUpdate} />
          <Route path="/post/:postSlug/delete" component={PostDelete} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
