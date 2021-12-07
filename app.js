require('dotenv').config();

const { query, application } = require('express');
const express = require('express');
const hbs = require('hbs');


// require spotify-web-api-node package here:
const SpotifyWebApi = require('spotify-web-api-node');


const app = express();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

// setting the spotify-api goes here:
const spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET
  });
  
  
  // Retrieve an access token
spotifyApi
    .clientCredentialsGrant()
    .then(data => spotifyApi.setAccessToken(data.body['access_token']))
    .catch(error => console.log('Something went wrong when retrieving an access token', error));
  
app.get('/', (req, res) => {
res.render('index', {index: 'index'});
});

app.get ('/artist-search', (req, res)=>{
  console.log(req.query) //lo que devuelve
  const {artist} = req.query; //asignarlo a una variable
  spotifyApi.searchArtists(artist) //buscarlo
  .then(data =>{
    console.log('The received data from the API: ', data.body);
    //res.send(data.body)
    console.log(data.body.artists)
    const {items} = data.body.artists
    res.render('artist-search-results', {items})
  })
  .catch(err => console.log('The error while searching artists occurred: ', err));
})
/* spotifyApi
  .searchArtists(
    app.get("/artist-search", (req, res)=>{
    res.send(req.query);
    console.log(req.query)
}))
  .then(data => {
    console.log('The received data from the API: ', data.body);
   
  })
  .catch(err => console.log('The error while searching artists occurred: ', err)); */


app.listen(3000, () => console.log('My Spotify project running on port 3000 🎧 🥁 🎸 🔊'));