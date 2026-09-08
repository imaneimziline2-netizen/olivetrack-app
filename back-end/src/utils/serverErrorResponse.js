export const serverErrorResponse = (res, error) => {
    res.status(error.statusCode || 500).json({ message: error.message });
};
