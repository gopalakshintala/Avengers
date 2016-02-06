import React from 'react';
import { Link } from 'react-router';
import DialogStore from '../stores/DialogStore.jsx';
import Hero from './Hero.jsx';
import connectToStores from 'alt-utils/lib/connectToStores';
import _ from 'lodash';
import mui from 'material-ui';
var {Card, List} = mui;
import DialogWriter from './DialogWriter.jsx';

@connectToStores
export default class Avengers extends React.Component {
  constructor() {
    super();
    DialogStore.getDialogs();
  }

  static getStores() {
    return [DialogStore];
  }

  static getPropsFromStores() {
    return DialogStore.getState();
  }

  render() {
    var dialogs = _(this.props.dialogs)
      .keys()
      .map((k, i)=> {
        let dialog = this.props.dialogs[k];
        return (
          <Hero key={i} hero={dialog}/>
        );
      })
      .value();

    return (
      <div>
        <Card style={{
        flexGrow: 1
      }}>
          <List>
            {dialogs}
          </List>
        </Card>
        <DialogWriter/>
      </div>
    );
  }
}