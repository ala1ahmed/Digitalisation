exports.create = (req, res, next) => {
  const model = req.model || req.models;
  if (!model) next();
  res.status(201).json(model);
};

exports.update = (req, res, next) => {
  if (!req.model) next();
  res.json(req.model);
};

exports.remove = (req, res) => {
  res.status(204).end();
};

exports.get = (req, res, next) => {
  if (!req.model) next();
  res.json(req.model);
};

exports.list = (req, res) => {
  console.log("wech");
  res.json(req.models);
};
