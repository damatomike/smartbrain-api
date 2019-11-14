const Clarifai = require('clarifai');

//API KEY:
//db3b2b5bb8bc43989afafbbdb7350c7f

const app = new Clarifai.App({
    apiKey: 'db3b2b5bb8bc43989afafbbdb7350c7f'
   });

const handleApiCall = (req, res) => {
   app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
        res.json(data);
    })
    .catch(err => res.status(400).json('Unable to work with API'));
}

const handleImage = (db) => (req, res) => {
    const { id } = req.body;
  db('users').where('id', '=', id)
  .increment('entries', 1)
  .returning('entries')
  .then(entries => {
      res.json(entries[0]);
  })
    .catch(err => res.status(400).json('Unable to get entries'))
}

module.exports = {
    handleImage,
    handleApiCall
}