import React, { useState, useEffect } from "react";

const BookForm = (props) => {
    const initialFieldValues = {
        title: '',
        bookName: '',
        email: '',
        address: ''
    }

    var [values, setValues] = useState(initialFieldValues)

    useEffect(() => {
        if (props.currentId === '')
            setValues({
                ...initialFieldValues
            })
        else
            setValues({
                ...props.booklists[props.currentId]
            })
    }, [props.currentId, props.booklists])

    const handleInputChange = e => {
        var { name, value } = e.target
        setValues({
            ...values,
            [name]: value
        })
    }
    const handleFormSubmit = e => {
        e.preventDefault();
        props.addOrEdit(values)
    }

    return (
        <form autoComplete="off" onSubmit={handleFormSubmit}>
            <div className="form-group input-group">
                <div className="input-group-prepend">
                    <div className="input-group-text">
                        <i className="fas fa-user"></i>
                    </div>
                </div>
                <input className="form-control" placeholder="Title" name="title"
                    value={values.title}
                    onChange={handleInputChange}
                />
            </div>
            <div className="form-row">
                <div className="form-group input-group col-md-6">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            <i className="fas fa-book"></i>
                        </div>
                    </div>
                    <input className="form-control" placeholder="Book Name" name="bookName"
                        value={values.bookName}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group input-group col-md-6">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            <i className="fas fa-envelope"></i>
                        </div>
                    </div>
                    <input className="form-control" placeholder="Your Email" name="email"
                        value={values.email}
                        onChange={handleInputChange}
                    />
                </div>
            </div>
            <div className="form-group">
                <textarea className="form-control" placeholder="Address" name="address"
                    value={values.address}
                    onChange={handleInputChange}
                />
            </div>
            <div className="form-group">
                <input type="submit" value={props.currentId === '' ? "Save" : "Update"} className="btn btn-primary btn-block" />
            </div>
        </form >
    );
}

export default BookForm;