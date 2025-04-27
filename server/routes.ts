import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertReviewSchema, insertSubscriberSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes
  app.get("/api/products", async (_req: Request, res: Response) => {
    try {
      const products = await storage.getAllProducts();
      return res.json(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      return res.status(500).json({ message: "Failed to fetch products" });
    }
  });

  app.get("/api/products/:slug", async (req: Request, res: Response) => {
    try {
      const product = await storage.getProductBySlug(req.params.slug);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      return res.json(product);
    } catch (error) {
      console.error("Error fetching product:", error);
      return res.status(500).json({ message: "Failed to fetch product" });
    }
  });

  app.get("/api/reviews", async (_req: Request, res: Response) => {
    try {
      const reviews = await storage.getAllReviews();
      return res.json(reviews);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      return res.status(500).json({ message: "Failed to fetch reviews" });
    }
  });

  app.post("/api/reviews", async (req: Request, res: Response) => {
    try {
      const validatedData = insertReviewSchema.parse(req.body);
      const review = await storage.createReview(validatedData);
      return res.status(201).json(review);
    } catch (error) {
      console.error("Error creating review:", error);
      return res.status(400).json({ message: "Invalid review data" });
    }
  });

  app.post("/api/subscribe", async (req: Request, res: Response) => {
    try {
      const validatedData = insertSubscriberSchema.parse(req.body);
      const subscriber = await storage.createSubscriber(validatedData);
      return res.status(201).json({ message: "Subscribed successfully" });
    } catch (error) {
      console.error("Error creating subscriber:", error);
      if (error.message?.includes("unique")) {
        return res.status(400).json({ message: "Email already subscribed" });
      }
      return res.status(400).json({ message: "Invalid subscriber data" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
