import React, { Component } from 'react';
import { Link } from "react-router-dom";

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import UserIcon from '@material-ui/icons/Face';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';

class Item extends Component {

    render() {
        let data = this.props.data;
        let name = data.name;
        let moreinfo =  data.email + ' - ' + data.birthday;
        let id = this.props.id;

        return (
            <ListItem>
                <ListItemIcon>
                    <UserIcon />
                </ListItemIcon>
                <ListItemText primary={name} secondary={moreinfo} />
                <IconButton onClick={(e) => this.props.editItem(id)} component={Link} to="/edit" color="default" aria-label="edit">
                    <EditIcon />
                </IconButton>
                <IconButton onClick={(e) => this.props.deleteItem(id)} color="default" aria-label="edit">
                    <DeleteIcon />
                </IconButton>
            </ListItem>
        );
        }
  }
  
  export default Item; 