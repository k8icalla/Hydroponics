// Remove the getPH method
exports.getIndex = (req, res) => {
    res.render('index');
};

exports.getLogin = (req, res) => {
    res.render('login');
};

exports.getSignup = (req, res) => {
    res.render('signup');
};

// Keep the other methods as they are
exports.getController = (req, res) => {
    res.render('controller');
};
