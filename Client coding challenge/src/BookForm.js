import React from 'react';

function BookForm( props ){
    const handleSubmit = (event)=>{
        event.preventDefault();
        let form  = event.currentTarget;
        let name = form.querySelector("#name").value;
        props.name(name);
        
    }
    return(
        <div>
            <form onSubmit={handleSubmit}>
                <label >Name of book:</label>
                <input type ="text" id="name"></input>
                <input type="submit" value="Submit"></input>
            </form>
        </div>
    );
}

export default BookForm;