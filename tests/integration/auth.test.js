import request from "supertest";
import app from "../../src/app.js";
import mongoose from "mongoose";

beforeAll(async () => {
    await mongoose.connect("mongodb://localhost:27017/oliveo_test");
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe("Authentication Integration Tests", () => {
    const testUser = {
        nom: "Ahmed",
        email: "Ahmed-${Date.now()}@gmail.com",
        motDePasse: "password123",
        role: "agriculteur",
    };

    test("POST /api/auth/register - should register a new user", async () => {
        const response = await request(app)
            .post("/api/auth/register")
            .send(testUser);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("user");
        expect(response.body.user).toHaveProperty("nom", testUser.nom);
        expect(response.body.user).toHaveProperty("email", testUser.email);
        expect(response.body).toHaveProperty("token");
        expect(response.body.user).not.toHaveProperty("motDePasse");
    });
});

test("Email already used - should return 409", async () => {
    const response = await request(app)
        .post("/api/auth/register")
        .send(testUser);

    expect(response.status).toBe(409);
    expect(response.body).toHaveProperty("message", "Email déja utilisé");
    expect(response.body).not.toHaveProperty("token");
});