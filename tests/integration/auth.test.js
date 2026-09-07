import request from "supertest";
import app from "../../src/app.js";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

let mongoServer;

beforeAll(async () => {
    process.env.JWT_SECRET = "test-secret";
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongoServer.stop();
});

afterEach(async () => {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
        await collections[key].deleteMany({});
    }
});

describe("Authentication Integration Tests", () => {
    const testUser = {
        nom: "Ahmed",
        email: `ahmed-${Date.now()}@gmail.com`,
        motDePasse: "password123",
    };

    test("POST /api/auth/register - should register a new user", async () => {
        const response = await request(app).post("/api/auth/register").send(testUser);
        console.log(response.body); 
        expect(response.status).toBe(201);
        expect(response.body.user).toHaveProperty("nom", testUser.nom);
        expect(response.body.user).toHaveProperty("email", testUser.email);
        expect(response.body).toHaveProperty("token");
        expect(response.body.user).not.toHaveProperty("motDePasse");
    });

    test("POST /api/auth/register - email already used", async () => {
        await request(app).post("/api/auth/register").send(testUser); // إنشاء مستقل داخل نفس test
        const response = await request(app).post("/api/auth/register").send(testUser);
        expect(response.status).toBe(409);
        expect(response.body).toHaveProperty("message", "Email déja utilisé");
        expect(response.body).not.toHaveProperty("token");
    });
});