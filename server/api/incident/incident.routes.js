const express = require("express");
const incidentRoutes = express.Router();
const {
  getIncident,
  getIncidentById,
  deleteIncidentById,
  postIncident,
  updateIncidentById,
} = require("../../controllers/incident/incident.controllers");
const {
  postIncidentValidator,
  validateIncident,
} = require("../../middlewares/validator/incident.validator");

// get all incident
incidentRoutes.get("/incident", getIncident);

// get Incident by Id
incidentRoutes.get("/incident/:id", getIncidentById);

// delete Incident by Id
incidentRoutes.delete("/incident/:id", deleteIncidentById);

// post Incident
incidentRoutes.post("/incident",postIncidentValidator(), validateIncident, postIncident);

// update Incident
incidentRoutes.put("/incident/:id",postIncidentValidator(), validateIncident, updateIncidentById);

module.exports = incidentRoutes;
