import React from 'react';
import './App.css';
import Book from './Book';
import BookForm from './BookForm';

class App extends React.Component{

  constructor( props ){
    super( props );
    this.state = {
      name:"",
      title:"",
      author:"",
      thumbnail:"",
      text:"",
      /*
        Your code goes here
      */
    }
    this.HandleSubmit = this.HandleSubmit.bind(this);
  }
   HandleSubmit(name){
    this.setState({name: name});
    let url = "https://www.googleapis.com/books/v1/volumes?q="+name+"+intitle";
    console.log(url)
    let settings = {
         method : 'GET',
   }
   fetch( url, settings )
        .then( response => {
            if( response.ok ){
                return response.json();
            }

            throw new Error( response.statusText );
        })
        .then( responseJSON => {
            console.log(responseJSON.items[0].volumeInfo);
            let title= responseJSON.items[0].volumeInfo.title;
            let author = responseJSON.items[0].volumeInfo.authors[0];
            let thumbnail = responseJSON.items[0].imageLinks.thumbnail;
            let text = responseJSON.items[0].accessInfo.searchInfo.textSnippet;
          this.setState({title:title,author:author,thumbnail:thumbnail,text:text})

        })
        .catch( err => {
            alert("Something happend,Try again");
            console.log(err);
        });
  }
  

  render(){
    return(
      <div>
        <BookForm name={this.HandleSubmit}></BookForm>
        <Book title={this.props.title} author={this.props.author} thumbnail = {this.props.thumbnail} text={this.props.text}></Book>
      </div>
    )
  }

}

export default App;
