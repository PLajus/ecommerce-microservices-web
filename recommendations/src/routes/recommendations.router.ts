import express from "express";

import RecommendationsController from "../controllers/recommendations.controller";

export const router = express.Router();

const recommendations = new RecommendationsController();

router.use(express.json());

router.get("/", recommendations.getAllNodes);

router.get("/users/:email", recommendations.getUserRelationships);

router.get("/products/:product", recommendations.getProduct);

router.post("/nodes", recommendations.createNode);

router.post("/relationships", recommendations.createRelationship);

router.put("/products/:product", recommendations.updateProduct);

router.delete("/relationships", recommendations.delRelationship);

router.delete("/nodes", recommendations.delNode);

router.delete("/nodes/:product", recommendations.delProductNode);
