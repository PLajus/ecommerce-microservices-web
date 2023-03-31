import { Request, Response } from "express";
import { driver } from "../services/neo4j";

import { validateNodeInput } from "../services/nodeInputValidator";

class RecommendationsController {
  async getAllNodes(_req: Request, res: Response) {
    const session = driver.session();

    const result = await session.run(`MATCH (n) RETURN n`);

    let users = [],
      products = [];

    for (const i in result.records) {
      const record = result.records[i];
      const node = record.get(0);
      if (node.properties.email) {
        users.push(node.properties.email);
      } else {
        products.push(node.properties.name);
      }
    }

    session.close();

    return res.json({ users: users, products: products });
  }

  async getUserRelationships(req: Request, res: Response) {
    const user = req.params.email;
    if (!user) {
      return res.status(400).json("Invalid inputs");
    }

    const session = driver.session();

    const result = await session.run(
      `MATCH (User {email: $email})-[r]->(Product) RETURN Product.name, type(r)`,
      { email: user }
    );

    session.close();

    return res.json({ result: result.records });
  }

  async createNode(req: Request, res: Response) {
    const { nodeType, propertyName, propertyValue } = req.body;

    if (!validateNodeInput(nodeType, propertyName, propertyValue)) {
      return res.status(400).json("Invalid inputs");
    }

    const session = driver.session();

    const result = await session.run(
      `CREATE (n:${nodeType} { ${propertyName}: $propertyValue })`,
      {
        propertyValue: propertyValue,
      }
    );
    session.close();

    return res.json({
      result: result.summary.updateStatistics,
      created: propertyValue,
    });
  }

  async createRelationship(req: Request, res: Response) {
    const { user, product, relationship } = req.body;

    if (!user || !product || !relationship) {
      return res.status(400).json("Invalid inputs");
    }

    const session = driver.session();

    const result = await session.run(
      `MATCH 
    (u:User),
    (p:Product)
    WHERE u.email = $email AND p.name = $name
    CREATE (u)-[r:${relationship.toUpperCase()} {date: $date}]->(p)`,
      { email: user, name: product, date: new Date().toJSON() }
    );

    session.close();

    return res.json({ result: result.summary.updateStatistics });
  }

  async updateProduct(req: Request, res: Response) {
    const { newProduct } = req.body;
    if (!newProduct) {
      return res.status(400).json("Invalid inputs");
    }

    const session = driver.session();

    const result = await session.run(
      `MATCH (p:Product {name: $name})
      SET p.name = $newName`,
      { name: req.params.product, newName: newProduct }
    );

    session.close();

    return res.json({ result: result.summary.updateStatistics });
  }

  async delRelationship(req: Request, res: Response) {
    const { user, relationship, product } = req.body;

    if (!user || !relationship || !product) {
      return res.status(400).json("Invalid inputs");
    }

    const session = driver.session();

    const result = await session.run(
      `MATCH (u:User {email: $email})-[r:${relationship.toUpperCase()}]->(p:Product {name: $name})
  DELETE r`,
      { email: user, name: product }
    );

    session.close();

    return res.json({ result: result.summary.updateStatistics });
  }

  async delNode(req: Request, res: Response) {
    const { nodeType, propertyName, propertyValue } = req.body;

    if (!validateNodeInput(nodeType, propertyName, propertyValue)) {
      return res.status(400).json("Invalid inputs");
    }

    const session = driver.session();

    const result = await session.run(
      `MATCH (n:${nodeType} {${propertyName}: $value})
      DELETE n`,
      { value: propertyValue }
    );

    session.close();

    return res.json({ result: result.summary.updateStatistics });
  }

  async delProductNode(req: Request, res: Response) {
    const session = driver.session();

    const result = await session.run(
      `MATCH (p:$Product {name: $name})
      DELETE n`,
      { name: req.params.product }
    );

    session.close();

    return res.json({ result: result.summary.updateStatistics });
  }
}

export default RecommendationsController;
