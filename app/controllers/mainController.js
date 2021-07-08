module.exports = {
    homePage: (req, res) => {
        res.sendFile(__dirname + '/../frontend/index.html');
    }
}