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
app.get("/", function (req, res) {
    res.render("home");
})

app.get("/secret",isLoggedIn,function (req, res) {
    res.render("secret");
})

// Registration
app.get("/register", function (req, res) {
    res.render("register");
})

app.post("/register", function (req, res) {
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
app.get("/login", function (req, res) {
    res.render("login");
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

app.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});