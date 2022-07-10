const notFound = (_req, res) =>
  res.status(404).json({ status: "Route doesn't exist" });

module.exports = notFound;
