export default function checkReqBody(req, res, next) {
  const properties = ["title", "description"];

  for (const property in req.body) {
    if (!properties.includes(property)) {
      return res.status(400).json({ message: "invalid information" });
    }
  }
  next();
}
