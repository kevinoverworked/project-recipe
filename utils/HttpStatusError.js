module.exports = class HttpStatusError extends Error {
	constructor(statusCode, message) {
		super(message);

		this.name = "HttpStatusError";
		this.statusCode = statusCode;
	}
};