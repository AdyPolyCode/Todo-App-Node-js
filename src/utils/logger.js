const { transports, format, createLogger, addColors } = require("winston");

const colorAndTime = format.combine(
    format.colorize({
        all: true,
    }),
    format.label({
        label: "[Logger]",
    }),
    format.timestamp({
        format: "YY-MM-DD HH:MM:SS",
    }),
    format.printf(
        (info) =>
            `${info.label}  ${info.timestamp}  ${info.level} : ${info.message}`
    )
);

addColors({
    error: "bold red",
});

module.exports = createLogger({
    transports: [
        new transports.Console({
            level: "error",
            format: format.combine(format.colorize(), colorAndTime),
        }),
    ],
});
