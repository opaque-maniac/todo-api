// To handle errors caught in handlers
// Is just an example -> opaque-maniac
const ErrorHandler = (err, req, res, next) => {
  console.error(err);
  if (err.type == "auth") {
    return res.status(401).json({
      message: "nope, you need to be authenticated",
    });
  } else {
    return res.status(500).json({
      message: "Server error",
    });
  }
};

export default ErrorHandler;
