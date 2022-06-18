import React, { useState, useEffect } from "react";
import BookForm from "./BookForm";
import firebaseDb from "../firebase"

const Contacts = () => {

    var [booklists, setContactObjects] = useState({})
    var [currentId, setCurrentId] = useState('')

    useEffect(() => {
        firebaseDb.child('books').on('value', snapshot => {
            if (snapshot.val() != null)
                setContactObjects({
                    ...snapshot.val()
                })
            else
                setContactObjects({})

        })
    }, [])// similar to componentDidMount

    const addOrEdit = obj => {
        if (currentId === '')
            firebaseDb.child('books').push(
                obj,
                err => {
                    if (err)
                        console.log(err)
                    else
                        setCurrentId('')
                }
            )
        else
            firebaseDb.child(`books/${currentId}`).set(
                obj,
                err => {
                    if (err)
                        console.log(err)
                    else
                        setCurrentId('')
                }
            )
    }

    const onDelete = key => {
        if (window.confirm('Are you sure to delete this record?')) {
            debugger
            firebaseDb.child(`books/${key}`).remove(
                err => {
                    if (err)
                        console.log(err)
                    else
                        setCurrentId('')
                }
            )
        }
    }

    return (
        <>
            <div className="jumbotron jumbotron-fluid">
                <div className="container">
                    <h1 className="display-4 text-center">Book Register</h1>
                </div>
            </div>
            <div className="row">
                <div className="col-md-5">
                    <BookForm {...({ addOrEdit, currentId, booklists })} />
                </div>
                <div className="col-md-7">
                    <table className="table table-borderless table-stripped">
                        <thead className="thead-light">
                            <tr>
                                <th>Title</th>
                                <th>Book Name</th>
                                <th>Your Email</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                Object.keys(booklists).map(id => {
                                    return <tr key={id}>
                                        <td>{booklists[id].title}</td>
                                        <td>{booklists[id].bookName}</td>
                                        <td>{booklists[id].email}</td>
                                        <td>
                                            <a className="btn text-primary" onClick={() => { setCurrentId(id) }}>
                                                <i className="fas fa-pencil-alt"></i>
                                            </a>
                                            <a className="btn text-danger" onClick={() => { onDelete(id) }}>
                                                <i className="far fa-trash-alt"></i>
                                            </a>
                                        </td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>

                </div>
            </div>
        </>
    );
}

export default Contacts;