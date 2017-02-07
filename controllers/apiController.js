const ImagesClient = require('google-images')
const keys = require('./../.googleApi')

const apiController = (Search) => {

  const get = (req, res)=> {
    res.send('Houston We are here at /API')
  }

  const handleSearch = (req, res)=> {
    const search = req.params.search
    const page = req.query.page || 10
    const searchM = {
      term: search,
      when: new Date()
    }
    const latestSite = new Search(searchM)
    latestSite.save((err)=> {
      if(err) throw err;
      // console.log(searchDB + 'Saved!');
    })
    let client = new ImagesClient(keys.cseId, keys.apiKey)
    client.search(search, {page: page})
      .then(function (images) {
          /*
          [{
              "url": "http://steveangello.com/boss.jpg",
              "type": "image/jpeg",
              "width": 1024,
              "height": 768,
              "size": 102451,
              "thumbnail": {
                  "url": "http://steveangello.com/thumbnail.jpg",
                  "width": 512,
                  "height": 512
              }
          }]
           */
           res.send(images)
      })

  }

  const getLatest = (req, res)=> {
    Search.find({}, null, {
      "limit": 10,
      "sort": {"when": -1}
    }, (err, result)=> {
      if(err) return console.error(err);;
      // console.log(result);
      res.send(result.map((arg)=> {
        return {
          term: arg.term,
          when: arg.when
        }
      }))
    })
  }

  return {
    get: get,
    handleSearch: handleSearch,
    getLatest: getLatest
  }
}

module.exports = apiController
