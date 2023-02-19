require("rootpath")();
const express = require('express');
const app = express();

const cursoDB = require('../datasource/cursoDB');

app.get('/', getAll);

app.get('/:idCurso', getAlumnosByIdCurso);

app.post('/', createCurso);

app.put('/:idCurso', updateCurso);

app.delete('/:idCurso', deleteCurso);


function getAll(req, res) {
   cursoDB.getAll(function (err, result) {
      if (err) {
         res.status(500).send(err);
      } else {
         res.json(result)
      }
   })
}

function getAlumnosByIdCurso(req, res) {
   cursoDB.getAlumnosByIdCurso(req.params.idCurso, function (err, result) {
      if (err) {
         res.status(500).send(err);
      } else {
         res.json(result);
      }
   })
}

function createCurso(req, res) {
   cursoDB.createCurso(req.body, function (err, result) {
      if (err) {
         res.status(500).send(err);
      } else {
         res.json(result);
      }
   });
}

function updateCurso(req, res) {
   cursoDB.updateCurso(req.params.idCurso, req.body, function (result) {
      if (result.code == 3) {
         res.status(500).send(err);
      } else if (result.code == 2) {
         res.status(404).json(result);
      } else {
         res.json(result);
      }
   })
}

function deleteCurso(req, res) {
   cursoDB.deleteCurso(req.params.idCurso, function (err, result) {
     if (err) {
      res.status(500).send(err);
     } else {
      if (result.detail.affectedRows == 0) {
         res.status(404).json(result);
      } else {
         res.json(result);
      }
     } 
   })
}

module.exports = app;