const MESSAGES = {
    ROUTE_NOT_FOUND: {
        message: "ROUTE_NOT_FOUND",
        code: 1,
    },
    DOCUMENT_NOT_FOUND: {
        message: "DOCUMENT_NOT_FOUND",
        code: 2,
    },
    WRONG_PASSWORD: {
        message: "WRONG_PASSWORD",
        code: 3,
    },
    ACCOUNT_NOT_VERIFIED: {
        message: "ACCOUNT_NOT_VERIFIED",
        code: 4,
    },
    USER_ALREADY_EXISTS: {
        message: "USER_ALREADY_EXISTS",
        code: 5,
    },
    UNEXPECTED_ROLE: {
        message: "UNEXPECTED_ROLE",
        code: 6,
    },
    INVALID_TOKEN: {
        message: "INVALID_TOKEN",
        code: 7,
    },
    MISSING_TOKEN: {
        message: "MISSING_TOKEN",
        code: 8,
    },
    PERMISSION_REQUIRED: {
        message: "PERMISSION_REQUIRED",
        code: 21,
    },
    INVALID_CREDENTIALS: {
        message: "INVALID_CREDENTIALS",
        code: 22,
    },
    CLUB_NOT_FOUND: {
        message: "CLUB_NOT_FOUND",
        code: 23,
    },
    USER_NOT_FOUND: {
        message: "USER_NOT_FOUND",
        code: 24,
    },
    MEETING_NOT_FOUND: {
        message: "MEETING_NOT_FOUND",
        code: 25,
    },
};

module.exports = {
    ...MESSAGES,
};