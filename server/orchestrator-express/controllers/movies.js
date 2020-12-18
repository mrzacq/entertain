const Redis = require("ioredis");
const redis = new Redis();
const movieUrl = "http://localhost:5001/movies";
const axios = require("axios");

class Movie {
  static async getMovieList(req, res, next) {
    const cache = await redis.get("movies")
    if (cache) {
      res.status(200).json(JSON.parse(cache));
    } else {
      axios({
        url: movieUrl,
        method: "get",
      })
        .then(({ data }) => {
          res.status(200).json(data);
          redis.set("movies", JSON.stringify(data));
        })
        .catch((err) => {
          next(err);
        });
    }
  }

  static async getById(req, res, next) {
    const cache = await redis.get("movies")
    if (cache) {
      let movie = JSON.parse(cache).filter(el => el._id === req.params.id)
      res.status(200).json(movie[0])
    } else {
      axios({
        url: `${movieUrl}/${req.params.id}`,
        method: "get",
      })
        .then(({ data }) => {
          res.status(200).json(data);
        })
        .catch((err) => {
          next(err);
        });
    }
  }

  static create(req, res, next) {
    axios({
      url: movieUrl,
      method: "post",
      data: req.body,
    })
      .then( async ({ data }) => {
        const currentMovie = await redis.get("movies")
        const newMovie = JSON.parse(currentMovie).concat(data)
        await redis.set("movies", JSON.stringify(newMovie))
        res.status(201).json(data);
      })
      .catch((err) => {
        next(err);
      });
  }

  static updateMovie(req, res, next) {
    axios({
      url: `${movieUrl}/${req.params.id}`,
      method: "put",
      data: req.body,
    })
      .then( async ({ data }) => {
        const currentMovie = await redis.get("movies")
        const filtered = JSON.parse(currentMovie).filter(el => el._id !== req.params.id)
        const updated = filtered.concat(data)
        await redis.set("movies", JSON.stringify(updated))
        res.status(200).json(data);
      })
      .catch((err) => {
        next(err);
      });
  }

  static async delete(req, res, next) {
    axios({
      url: `${movieUrl}/${req.params.id}`,
      method: "delete",
    })
      .then( async ({ data }) => {
        const currentMovie = await redis.get("movies")
        const updated = JSON.parse(currentMovie).filter(el => el._id !== req.params.id)
        await redis.set("movies", JSON.stringify(updated))
        res.status(200).json(data);
      })
      .catch((err) => {
        next(err);
      });
  }
}

module.exports = Movie;
