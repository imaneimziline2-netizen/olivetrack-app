import { serverErrorResponse } from "../../utils/serverErrorResponse.js";
import { getPrifile, updateProfile } from "./userService.js";
import { updateProfileValidator } from "./userValidator.js";

export async function myProfile(req, res) {
    try {
        const user = await getPrifile(req.user.userId);
        res.json(user);
    } catch (err) {
        serverErrorResponse(res, err);
    }
}

export async function updateMyProfile(req, res) {
    try {
        const { err } = updateProfileValidator.validate(req.body);
        if (err) {
            return res.status(400).json({ message: err.message });
        }
        const user = await updateProfile(req.user.userId, req.body);
        res.status(200).json(user);
    } catch (err) {
        serverErrorResponse(res, err);
    }
}
