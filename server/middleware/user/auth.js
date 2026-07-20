export const auth = (req, res, next) => {
  console.log("Session ID:", req.sessionID);
  console.log("Session:", req.session);
  

  if (!req.session.user) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  next();
};