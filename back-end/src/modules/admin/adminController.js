import { serverErrorResponse } from "../../utils/serverErrorResponse.js";
import { getAdminStats, getAllUsers, getUserById } from "./adminService.js";

export async function list(req, res) {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const result = await getAllUsers(page, limit);
        res.json(result);
    } catch (err) {
        serverErrorResponse(res, err);
    }
}

export async function getOne(req, res) {
    try {
        const user = await getUserById(req.params.id);
        res.json(user);
    } catch (err) {
        serverErrorResponse(res, err);
    }
}

export async function stats(req, res) {
    try {
        const result = await getAdminStats();
        res.json(result);
    } catch (err) {
        serverErrorResponse(res, err); 
    }
}
