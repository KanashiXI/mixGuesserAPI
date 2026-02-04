export default function responseFormatter(req, res, next) {
  res.sendResponse = ({ code = 200, status = 'success', message = null, data = null } = {}) => {
    res.status(code).json({ code, status, message, data });
  };

  res.success = (data = null, message = 'OK', code = 200) => {
    return res.sendResponse({ code, status: 'success', message, data });
  };

  res.error = (message = 'Error', code = 500, data = null) => {
    return res.sendResponse({ code, status: 'error', message, data });
  };

  next();
}
