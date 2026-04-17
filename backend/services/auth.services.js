export const validateReqBody = (res, name, email, password) => {
  if (!name || !email || !password) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }
};
