const notFound = (req, res) => res.status(404).json({ "Error": "Route doesn't exist" });

module.exports = notFound;
