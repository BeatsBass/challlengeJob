import React, { Component } from 'react';
import { db } from "../configFirebase";

import Card from './card'
import './MainView.css'


class MainView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            date: "",
            description: "",
            informes: []
        }

    }

    removeWishlist = (index) => {
        const { userid } = this.props;
        console.log(this.props)
        /* const thisUser = usersWishlist.child(userid);
        let completeWishlist = this.state.completeWishlist.slice();
        completeWishlist.splice(index,1)
        this.setState({completeWishlist: completeWishlist})
        thisUser.set({completeWishlist}); */

    }

    addWishlist = async () => {
        console.log(this.props)
        console.log(this.state)
        const { userid } = this.props
        const { name, date, description, informes } = this.state;
        const linkObject = {
            userid,
            name,
            date,
            description
        }
        await db.collection("informeCultivo").doc().set(linkObject);
        informes.push(linkObject);
        this.setState({ informes })
    }


    componentDidMount() {
        const { userid } = this.props;
        db.collection("informeCultivo").onSnapshot((querySnapshot) => {
            const docs = [];
            querySnapshot.forEach((doc) => {
                docs.push({ ...doc.data(), id: doc.id });
            });
            console.log(docs)
        });
        const hh = db.collection("informeCultivo").where('userid', '==', userid).get()
            .then(snapshot => {
                if (snapshot.empty) {
                    console.log('No matching documents.');
                    return;
                }
                const docs = [];
                snapshot.forEach(doc => {
                    docs.push({ ...doc.data(), id: doc.id });
                });
                this.setState({ informes: docs })
            })
            .catch(err => {
                console.log('Error getting documents', err);
            });
    }

    renderWishlist() {
        return this.state.informes.map((item, index) => {
            return (
                <Card item={item} index={index} />
            )
        })

    }


    render() {
        console.log(this.state)
        return (

            <div className="container" style={{ margin: '5%' }}>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form">
                            <input className="form-control"
                                placeholder="Your Name"
                                onChange={({ target }) => this.setState({ name: target.value })}
                            />
                            <div className="omrs-input-group">
                                <label className="omrs-input-underlined">
                                    <input name="date"
                                        type="date" required onChange={({ target }) => this.setState({ date: target.value })} />
                                </label>
                            </div>



                        </div>
                        <div>
                            <textarea
                                rows="3"
                                className="textarea"
                                placeholder="Write a Description"
                                name="description"
                                onChange={({ target }) => this.setState({ description: target.value })}
                            ></textarea>
                            <button className="btn"
                                onClick={this.addWishlist}
                            >Add new Note
                            </button>
                        </div>

                    </div>
                    {<div className="cuerpo">
                        {this.renderWishlist()}
                    </div>}
                </div>

            </div>


        )


    }


}

export default MainView;