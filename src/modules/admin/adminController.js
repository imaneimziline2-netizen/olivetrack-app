import { getAllUsers, getUserById } from "./adminService.js";

export async function list(req, res, next) {
    try {
        const page = parseInt(req.query.page) || 1;
        const result = await getAllUsers(page);
        res.json(result);
    } catch (err) {
        next(err);
    }
}

export async function getOne(req, res, next) {
    try {
        const user = await getUserById(req.params.id);
        res.json(user);
    } catch (err) {
        next(err);
    }
}