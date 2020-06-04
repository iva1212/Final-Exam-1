const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const mongoose = require( 'mongoose' );
const jsonParser = bodyParser.json();
const { DATABASE_URL, PORT } = require( './config' );
const errorHandler = require('./middleware/errorHandler');
const {Movies} = require('./models/movie-model');
const {Actors}= require('./models/actor-model');

const app = express();

//app.use(errorHandler);
/* 
    Your code goes here 
*/

app.patch('/api/add-movie-actor/:movie_ID',jsonParser,(req,res)=>{
    let movie_id_param=req.params.movie_ID;
    let movie_id_body = req.body.id;
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;

    if(!movie_id_body){
        //error 406
        return res.status(406).end();
    }
    if(movie_id_body != movie_id_param){
        //error 409
        return res.status(409).end();
    }
    if(!firstName || !lastName){
        //error 403
        return res.status(403).end();
    }
    Movies.addActorToMovieList(movie_id_body,firstName)
    .then(movie=>{
        return res.status(200).end()
    })
    .catch(err=>{
        throw new Error( err );
        return res.status(500).end();
    })
});

app.listen( PORT, () => {
    console.log( "This server is running on port 8080" );
    new Promise( ( resolve, reject ) => {
        const settings = {
            useNewUrlParser: true, 
            useUnifiedTopology: true, 
            useCreateIndex: true
        };
        mongoose.connect( DATABASE_URL, settings, ( err ) => {
            if( err ){
                return reject( err );
            }
            else{
                console.log( "Database connected successfully." );
                return resolve();
            }
        })
    })
    .catch( err => {
        console.log( err );
    });
});