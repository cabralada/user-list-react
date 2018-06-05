import React, { Component } from 'react';
import { Route, Switch, Link } from "react-router-dom";

import ListUsers from './../users/List';
import Add from './../users/Add';
import { Card } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

// ✓    Above tasks should contain proper validation.
// ●    TDD is expected
// ✓    Add/Edit employee details should be created on new page
// ✓    Use local storage to store all data
// ●    Consider working not more than 5 hours on this task
// ✓    Documentation on how to run and why chosen a specific technology stack

class App extends Component {

    constructor(props) {
        super(props);

        let initData;

        if (localStorage.getItem('myData') !== null) {
            initData = JSON.parse(localStorage.getItem('myData'))
        } else {
            initData = [];
        }

        this.state = {
            data: initData,
            edit: []
        }
    }

    addItem(param) {
        this.setState({
            data: [...this.state.data, param]
        }, () => {
            let local;
            let array;
            if (localStorage.getItem('myData') !== null) {
                local = JSON.parse(localStorage.getItem('myData'));
                array = [...local, param ]
            } else {
                array = [...this.state.data];
            }
            localStorage.setItem('myData', JSON.stringify(array));
            window.location.replace('/')
        });
    }

    deleteItem(param) {
        let {data} = this.state;

        let newData = data.map((index, item) => {
            if (item === param) return '';
            return this.state.data[item]
        });

        this.setState({
            data: this.cleanArray(newData)
        }, () => localStorage.setItem('myData', JSON.stringify(this.cleanArray(newData))))
    }

    changeItem(param) {
        let {data} = this.state;
        let newData = data.map((index, item) => {
            if (data[item].id === param.id) {
                data[item].name = param.name;
                data[item].email = param.email;
                data[item].birthday = param.birthday;
                data[item].id = param.id;
            };
            return this.state.data[item]
        });

        localStorage.setItem('myData', JSON.stringify(newData));

        setInterval(window.location.replace('/'), 500)
    }

    editTriggerItem(param) {
        this.setState({
            edit: this.state.data[param]
        })
    }

    cleanArray(current) {
        var cleanUp = [];
        for (var i = 0; i < current.length; i++) {
            if (current[i]) {
                cleanUp.push(current[i]);
            }
        }
        return cleanUp;
    }

    render() {
        let {data} = this.state;
        let cache;

        const componentListUsers = (props) => {
            return (
                <Card className="card-list">
                    <CardContent>
                        <Typography variant="headline" component="h2"> Add more uers </Typography>
                        <Typography color="textSecondary"> Name, email and DOB </Typography>
                        <br />
                        <Button
                            component={Link}
                            to="/add"
                            variant="raised"
                            color="primary"
                            className="full-width"
                            size="large">
                                Add new user
                        </Button>
                    </CardContent>

                    <ListUsers 
                        deleteItem={this.deleteItem.bind(this)}
                        editItem={this.editTriggerItem.bind(this)}
                        users={cache ? cache : data }
                    />
                </Card>
            );
        }

        const componentAdd = (props) => {
            return (
                <Card className="add-form">
                    <Typography color="textSecondary"> Add Users </Typography>
                    <Add
                        editStatus={false}
                        users={cache ? cache : data }
                        newItem={this.addItem.bind(this)}
                    />
                </Card>
            );
        }

        const componentEdit = (props) => {
            return (
                <Card className="add-form">
                    <Typography color="textSecondary"> Edit Users </Typography>
                    <Add
                        editStatus={true}
                        users={cache ? cache : data }
                        editItem={this.state.edit}
                        changeItem={this.changeItem.bind(this)}
                        newItem={this.addItem.bind(this)}
                        cleanArray={this.cleanArray.bind(this)}
                    />
                </Card>
            );
        }

        return (
            <div className="App">
                <Switch>
                    <Route exact path="/" component={componentListUsers} />
                    <Route exact path="/add" render={componentAdd} />
                    <Route exact path="/edit" render={componentEdit} />
                    <Route component={NoMatch} />
                </Switch>
            </div>
        );
    }
}

export default App;

const NoMatch = ({ location }) => (
    <div>
        <p> Ops!! 404. <code>{location.pathname}</code> </p>
        <Link to="/"> back to home </Link>
    </div>
);