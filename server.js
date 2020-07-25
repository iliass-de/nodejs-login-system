const express               = require("express"),
      app                   = express();
      mongoose              = require("mongoose"),
      passport              = require("passport"),
      bodyParser            = require("body-parser"),
      localStrategy         = require("passport-local"),
      passportLocalMongoose = require("passport-local-mongoose"),
      user                  = require("./models/user")
      hostname              = '127.0.0.1',
      port                  = 3000;

mongoose.connect("mongodb://localhost/db_login");
app.set('view engine', 'ejs');
app.set('views', './views');
// integrate public folder
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({extend:true}));
app.use(require("express-session")({
    secret: "Hello here is the Login system project with passport",
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());


// Routes
app.get("/", isLoggedOut,function (req, res) {
    res.render("home", {userLoggedIn: false});
})

app.get("/secret",isLoggedIn,function (req, res) {
    res.render("secret", {userLoggedIn: true});
})

// Registration
app.get("/register", isLoggedOut,function (req, res) {
    res.render("register", {userLoggedIn: false});
})

app.post("/register", isLoggedOut,function (req, res) {
    user.register(new user({username: req.body.username}), req.body.password, function (err, user) {
        if (err){
            console.log(err)
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function () {
            res.redirect("/secret");
        })
    })

})

//Login
app.get("/login", isLoggedOut,function (req, res) {
    res.render("login", {userLoggedIn: false});
})

app.post("/login", passport.authenticate("local" , {successRedirect: "/secret", failureRedirect: "/login"}),function (req, res) {

})

//Logout
app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
})

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login")
}

function isLoggedOut(req,res,next){
    if(!req.isAuthenticated()){
        return next();
    }
    res.redirect("/secret")
}

app.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});