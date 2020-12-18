import React from 'react'
import { ApolloProvider } from '@apollo/client'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import client from './config/config'
import Home from './pages/Home'
import AddMovie from './pages/AddMovie'
import EditMovie from './pages/EditMovie'
import Favorit from './pages/Favorit'

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/favorit" component={Favorit} />
          <Route exact path="/add-movie" component={AddMovie} />
          <Route exact path="/edit-movie/:id" component={EditMovie} />
        </Switch>
      </Router>
    </ApolloProvider>
  );
}

export default App;
