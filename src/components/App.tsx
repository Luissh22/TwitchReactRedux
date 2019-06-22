import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { StreamList } from './streams/StreamList';
import { StreamShow } from './streams/StreamShow';
import { StreamCreate } from './streams/StreamCreate';
import { StreamDelete } from './streams/StreamDelete';
import { StreamEdit } from './streams/StreamEdit';
import { Header } from './Header';

export class App extends React.Component {
  render() {
    return (
      <div className="ui container">
        <BrowserRouter>
          <div>
            <Header />
            <Route path="/" exact component={StreamList} />
            <Route path="/streams/new" exact component={StreamCreate} />
            <Route path="/streams/edit/:id" exact component={StreamEdit} />
            <Route path="/streams/delete/:id" exact component={StreamDelete} />
            <Route path="/streams/show/:id" exact component={StreamShow} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}
