import express from "express";

import RecommendationsController from "../controllers/recommendations.controller";

export const router = express.Router();

const recommendations = new RecommendationsController();

router.use(express.json());

router.get("/all", recommendations.getAllNodes);

router.get("/userRecs", recommendations.getUserRelationships);

router.post("/newNode", recommendations.createNode);

router.post("/newRelationship", recommendations.createRelationship);

router.put("/updateProduct", recommendations.updateProduct);

router.delete("/delRelationship", recommendations.delRelationship);

router.delete("/delNode", recommendations.delNode);
