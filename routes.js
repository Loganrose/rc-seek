module.exports = function(app, passport) {

    app.get('/', function(req, res){
        res.redirect('/login')
    });

    app.get('/login', function(req, res) {
        res.render('pages/index.ejs', { message: req.flash('loginMessage') }); 
    });

    app.get('/signup', function(req, res) {
        res.render('pages/signup.ejs', { message: req.flash('signupMessage') });
    });

    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('pages/profile.ejs', {
            user : req.user,
            message: req.flash('profileMessage')
        });
    });
    app.get('/register', isLoggedIn, function(req, res){
        if(req.user.children.length === 0){
            req.flash('profileMessage', 'You currently don\'t have any children add to your profile!')
            res.redirect('/profile')
        } else {
            res.render('pages/register.ejs', {user: req.user});
        }
    })

    app.get('/child/create', isLoggedIn, function(req, res){
        res.render('pages/child/create.ejs');
    });

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    app.post('/child/create', isLoggedIn, function(req, res) {
        req.user.children.push({name: req.body.name, age: req.body.age, grade: req.body.grade});
        req.user.save();
        res.redirect('/profile');
    });

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile',
        failureRedirect : '/sdfsdfsdf',
        failureFlash : true
    }));

    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile',
        failureRedirect : '/login',
        failureFlash : true 
    }));

};

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/');
}
