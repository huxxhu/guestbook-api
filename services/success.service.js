const successHandler = ({ res, data, statusCode = 200, ...rest }) => {
  res.status(statusCode);
  res.send({
    status: "success",
    data,
    ...rest,
  });
};

module.exports = successHandler;
