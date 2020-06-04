const mongoose = require( 'mongoose' );
const {Actors} = require('./actor-model');
const moviesSchema = mongoose.Schema({
    movie_ID : {
        type : Number,
        unique : true,
        required : true
    },
    movie_title : {
        type : String,
        required : true
    },
    year :  {
        type : Number,
        required : true
    },
    rating : {
        type : Number,
        required : true
    },
    actors : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'actors',
        required : true
    }]
});

const moviesCollection = mongoose.model( 'movies', moviesSchema );

const Movies = {
    createMovie : function( newMovie ){
        return moviesCollection
                .create( newMovie )
                .then( createdMovie => {
                    return createdMovie;
                })
                .catch( err => {
                    throw new Error( err );
                });
    },
    getMovieByID : function(id){
        return moviesCollection
        .findOne({movie_ID: id})
        .then(Movie =>{
            return Movie;
        })
        .catch(err=>{
            throw new Error( err );
        })
    },
    addActorToMovieList : function(id,actor_name){
        return moviesCollection
        .findOne({movie_ID: id})
        .then(movie =>{
            Actors.getActorByName(actor_name)
        .then(actor=>{
           movie.actors.push(actor._id);
            console.log(movie.actors);
            movie.save();
            return movie;
            
        })
        .catch(err=>{
            throw new Error( err );
        })
        })
        .catch(err=>{
            throw new Error( err );
        })
    }

}
    /*
        Your code goes here
    */


module.exports = {
    Movies
};

