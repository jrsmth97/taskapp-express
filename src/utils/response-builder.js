class ResponseBuilder {
    static SuccessResponse(message = "Success", statusCode = 200, data = null) {
        return {
            success: true,
            message: message,
            status_code: statusCode,
            data: data,
        }
    }

    static ErrorResponse(message = "Error", statusCode = 500, errors = null) {
        return {
            success: false,
            message: message,
            status_code: statusCode,
            data: null,
            errors: errors,
        }
    }
}

module.exports = ResponseBuilder;