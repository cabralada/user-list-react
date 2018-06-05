import React, { Component } from 'react';
import { Link } from "react-router-dom";

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class Add extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: '',
            name: '',
            email: '',
            birthday: '',
            status: {
                email: '',
                name: '',
                birthday: ''
            }
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {

        this.validationType(event.target.name, event.target.value);

        this.setState (
            {
                [event.target.name]: event.target.value
            }
        );
    }

    validationType(field, value) {
        if(field === "email") {
            this.setState({
                status: {
                    email: this.validateEmail(value) ? 'Valid email' : 'Use a valid email'
                }
            })
        } else if (field === "name") {
            this.setState({
                status: {
                    name: value.length > 4 ? 'Success! Thanks.' : 'Please, min 5 charts'
                }
            })
        }
    }

    validateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([ [0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    cancelAction() {
        this.setState({
                id: '',
                name: '',
                email: '',
                birthday: '',
                status: {
                    email: '',
                    name: '',
                    birthday: ''
                }
        })

        this.addForm.reset();
    }

    handleSubmit(event) {
        event.preventDefault();

        let checkEdit = this.props.editStatus;
        let newUser;

        if(checkEdit) {
            newUser = {
                id: this.props.editItem.id,
                name: this.state.name,
                email: this.state.email, 
                birthday: this.state.birthday
            }

            this.props.changeItem(newUser)
            this.cancelAction()
        } else {
            newUser = {
                id: this.props.users.length,
                name: this.state.name,
                email: this.state.email, 
                birthday: this.state.birthday
            }

            if (newUser.name.length < 5) {
                alert('Invalid name')
                return;
            } else if (!this.validateEmail(newUser.email)) {
                alert('Invalid Email')
                return;
            } else if (newUser.birthday.length === 0) {
                alert('Invalid Date')
                return;
            } else {
                this.props.newItem(newUser);
                this.cancelAction()
            }

        }
    }

    componentDidMount() {
        let checkEdit = this.props.editStatus;
        
        if(checkEdit) {
            this.setState({
                id: this.props.editStatus.id,
                name: this.props.editItem.name,
                email: this.props.editItem.email,
                birthday: this.props.editItem.birthday
            })
        }
    }

    render() {
        let checkEdit = this.props.editStatus;
        let dateBirthday;

        if (typeof this.props.editItem !== 'undefined') {
            if (this.props.editItem.birthday) {
                let adjust = this.props.editItem.birthday.split("/");
                let cleaning = this.props.cleanArray(adjust)
                dateBirthday = cleaning;
            }
        }

        return (
            <form ref={input => this.addForm = input} onSubmit={this.handleSubmit}>
                <TextField
                    name="name"
                    id="full-width"
                    label="Name"
                    InputLabelProps={{
                            shrink: true,
                    }}
                    defaultValue={checkEdit ? this.props.editItem.name : this.state.name }
                    placeholder="Tony Stark"
                    helperText={this.state.status.name}
                    fullWidth
                    margin="normal"
                    onChange={this.handleChange}
                />

                <TextField
                    name="email"
                    id="full-width"
                    label="Email"
                    InputLabelProps={{
                            shrink: true,
                    }}
                    defaultValue={checkEdit ? this.props.editItem.email : this.state.email }
                    placeholder="tony@avengers.org"
                    helperText={this.state.status.email}
                    fullWidth
                    margin="normal"
                    onChange={this.handleChange}
                />

                <TextField
                    id="date"
                    label="Birthday"
                    InputLabelProps={{
                            shrink: true,
                    }}
                    defaultValue={checkEdit ? dateBirthday : this.state.birthday }
                    type="date"
                    margin="normal"
                    name="birthday"
                    fullWidth
                    onChange={this.handleChange}
                />

                <br />
                <br />

                <Button type="submit" variant="raised" color="primary" className="full-width" size="large">
                    {checkEdit ? 'Edit' : 'Add' }
                </Button>

                <br />
                <br />
                <Button type="submit" component={Link} to="/" className="full-width" size="large">
                    Back to list
                </Button>
            </form>
        );
    }
}

export default Add;