const notFound = (req, res) => res.status(404)
    .json({ status: "route doesn't exist" });

module.exports = notFound;