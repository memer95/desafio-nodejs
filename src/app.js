const express = require("express");
const cors = require("cors");

 const { v4: uuid, validate: isUuid } = require('uuid');
const { response } = require("express");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const {title, url, techs} = request.body;

  const rep = {id: uuid(), title, url, techs, likes:0}

  repositories.push(rep);

  return response.json(rep);
});

app.put("/repositories/:id", (request, response) => {
  const {id} = request.params;
  const {title, url, techs} = request.body;

  const repIndex = repositories.findIndex(rep => rep.id == id);

  if (repIndex < 0){
    return response.status(400).json({ error: 'Repository not found'})
  }

  const rep = {
    id,
    title,
    url,
    techs,
    likes: repositories[repIndex].likes,
  };

  repositories[repIndex] = rep;


  return response.json(rep);
});

app.delete("/repositories/:id", (request, response) => {
  const {id} = request.params;

  const repIndex = repositories.findIndex(rep => rep.id == id);

  if (repIndex < 0) {
  return response.status(400).json({ error: 'Repository not founde'})
  };

  repositories.splice(repIndex, 1);

  return response.status(204).send();

});



app.post("/repositories/:id/like", (request, response) => {
  const {id} = request.params;

  const repIndex = repositories.findIndex(rep => rep.id == id);

  if (repIndex < 0){
    return response.status(400).json({ error: 'Repository not found'})
  }

  repositories[repIndex].likes++;

  return response.json(repositories[repIndex]);

});

module.exports = app;
