import { Request, Response } from "express";
import { driver } from "../services/neo4j";
import { validateNodeInput } from "../services/nodeInputValidator";

class RecommendationsController {
  async getAllNodes(_req: Request, res: Response) {
    const session = driver.session();

    const result = await session.run(`MATCH (n) RETURN n`);

    session.close();

    return res.json({ result: result.records.length });
  }

  async getUserRelationships(req: Request, res: Response) {
    const user = req.body.user;
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

    return res.json({ result: result.summary.updateStatistics });
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
    const { product, newProduct } = req.body;
    if (!product || !newProduct) {
      return res.status(400).json("Invalid inputs");
    }

    const session = driver.session();

    const result = await session.run(
      `MATCH (p:Product {name: $name})
      SET p.name = $newName`,
      { name: product, newName: newProduct }
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
}

export default RecommendationsController;
