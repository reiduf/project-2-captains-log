var express = require("express");
var router = express.Router();
const passport = require("passport");

/* GET home page. */
router.get("/", function (req, res, next) {
	if (req.user) {
		res.redirect("/mypassport");
	} else {
    res.render("index", {
      title: "Captain's Log - Home",
    });
  }
});

router.get(
	"/auth/google",
	passport.authenticate("google", {
		scope: ["profile", "email"],
		prompt: "select_account",
	})
);

router.get(
	"/oauth2callback",
	passport.authenticate("google", {
		successRedirect: "/mypassport",
		failureRedirect: "/",
	})
);

router.get("/logout", function (req, res) {
	req.logout(function () {
		res.redirect("/");
	});
});

module.exports = router;
