import { getPrifile, updateProfile } from "../services/userService.js";
import { updateProfileValidator } from "../validator/userValidator.js";

export async function myProfile(req, res) {
    try {
        const user = await getPrifile(req.user.userId);
        res.json(user);
    } catch (error) {
        res.status(error.statuCode || 500).json({ message: error.message });
    }
}

export async function updateMyProfile(req, res) {
    try {
        const { error } = updateProfileValidator.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.message });
        }
        const user = await updateProfile(req.user.userId, req.body);
        res.status(200).json(user);
    } catch (error) {
        res.status(error.statuCode || 500).json({message: error.message});
    }
}
