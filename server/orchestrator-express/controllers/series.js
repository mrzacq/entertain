const Redis = require("ioredis");
const redis = new Redis();
const serieUrl = "http://localhost:5002/series";
const axios = require("axios");

class Serie {
  static async getSerieList(req, res, next) {
    const cache = await redis.get("series")
    if (cache) {
      res.status(200).json(JSON.parse(cache));
    } else {
      axios({
        url: serieUrl,
        method: "get",
      })
      .then(({ data }) => {
          res.status(200).json(data);
          redis.set("series", JSON.stringify(data));
        })
        .catch((err) => {
          next(err);
        });
      }
    }
    
  static async getById(req, res, next) {
    const cache = await redis.get("series")
    if (cache) {
      let serie = JSON.parse(cache).filter(el => el._id === req.params.id)
      res.status(200).json(serie[0])
    } else {
      axios({
        url: `${serieUrl}/${req.params.id}`,
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
      url: serieUrl,
      method: "post",
      data: req.body,
    })
      .then( async ({ data }) => {
        let currentSerie = await redis.get("series")
        let newSerie = JSON.parse(currentSerie).concat(data)
        await redis.set("series", JSON.stringify(newSerie))
        res.status(201).json(data);
      })
      .catch((err) => {
        next(err);
      });
  }

  static updateSerie(req, res, next) {
    axios({
      url: `${serieUrl}/${req.params.id}`,
      method: "put",
      data: req.body,
    })
      .then( async ({ data }) => {
        const currentSerie = await redis.get("series")
        const filtered = JSON.parse(currentSerie).filter(el => el._id !== req.params.id)
        const updated = filtered.concat(data)
        await redis.set("series", JSON.stringify(updated))
        res.status(200).json(data);
      })
      .catch((err) => {
        next(err);
      });
  }

  static async delete(req, res, next) {
    axios({
      url: `${serieUrl}/${req.params.id}`,
      method: "delete",
    })
      .then( async ({ data }) => {
        const currentSerie = await redis.get("series")
        const updated = JSON.parse(currentSerie).filter(el => el._id !== req.params.id)
        await redis.set("series", JSON.stringify(updated))
        res.status(200).json(data);
      })
      .catch((err) => {
        next(err);
      });
  }
}

module.exports = Serie;
