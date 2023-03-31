import express from "express";

import RecommendationsController from "../controllers/recommendations.controller";

export const router = express.Router();

const recommendations = new RecommendationsController();

router.use(express.json());

router.get("/", recommendations.getAllNodes);

router.get("/:email", recommendations.getUserRelationships);

router.post("/node", recommendations.createNode);

router.post("/relationship", recommendations.createRelationship);

router.put("/product/:product", recommendations.updateProduct);

router.delete("/relationship", recommendations.delRelationship);

router.delete("/node", recommendations.delNode);

router.delete("/node/:product", recommendations.delProductNode);
