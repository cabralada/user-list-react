import React, { Component } from 'react';

import List from '@material-ui/core/List';

import Item from './Item';

class ListUsers extends Component {
    render() {
      return (
        <List>
          {
            this.props.users.map((item, key) => {
              return (
                <Item
                  key={key}
                  data={item}
                  id={key}
                  deleteItem={this.props.deleteItem}
                  editItem={this.props.editItem}
                />
              )
            })
          }
        </List>
      );
    }
  }
  
  export default ListUsers;