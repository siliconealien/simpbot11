module.exports = {
    name: 'pipeme',
    description: 'pipeme',
    execute(message, args) {
        message.channel.send("You want the pipe?", { files: ["./img/pipe.jpg"] })
    },
};