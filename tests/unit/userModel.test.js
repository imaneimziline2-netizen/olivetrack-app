import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import User from "../../src/modules/users/user.model.js";

let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
    await User.syncIndexes(); 
});

afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongoServer.stop();
});

afterEach(async () => {
    await User.deleteMany({});
});

describe("User model — contrainte single admin", () => {
    test("autorise la création du premier compte admin", async () => {
        const admin = await User.create({
            nom: "Admin1",
            email: "admin1@test.com",
            motDePasse: "hashedpass",
            role: "admin",
        });
        expect(admin.role).toBe("admin");
    });

    test("rejette la création d'un deuxième compte admin (E11000)", async () => {
        await User.create({
            nom: "Admin1",
            email: "admin1@test.com",
            motDePasse: "hashedpass",
            role: "admin",
        });

        await expect(
            User.create({
                nom: "Admin2",
                email: "admin2@test.com",
                motDePasse: "hashedpass",
                role: "admin",
            })
        ).rejects.toThrow(/E11000/);
    });

    test("autorise plusieurs comptes agriculteur sans restriction", async () => {
        await User.create({ nom: "Agri1", email: "agri1@test.com", motDePasse: "x", role: "agriculteur" });
        await User.create({ nom: "Agri2", email: "agri2@test.com", motDePasse: "x", role: "agriculteur" });
        const count = await User.countDocuments({ role: "agriculteur" });
        expect(count).toBe(2);
    });
});