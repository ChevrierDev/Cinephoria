const express = require("express");
const incidentRoutes = express.Router();
const {
  getIncident,
  getIncidentById,
  deleteIncidentById,
  postIncident,
  updateIncidentById,
} = require("../../controllers/incident/incident.controllers");

// get all incident
incidentRoutes.get("/incident", getIncident);

// get Incident by Id
incidentRoutes.get("/incident/:id", getIncidentById);

// delete Incident by Id
incidentRoutes.delete("/incident/:id", deleteIncidentById);

// post Incident
incidentRoutes.post("/incident", postIncident);

// update Incident
incidentRoutes.put("/incident/:id", updateIncidentById);

module.exports = incidentRoutes;
