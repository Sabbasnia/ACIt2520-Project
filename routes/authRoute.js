const express = require("express");
const passport = require("../middleware/passport");
const { forwardAuthenticated } = require("../middleware/checkAuth");
const { ensureAuthenticated, isAdmin } = require("../middleware/checkAuth");

const router = express.Router();

router.get("/login", forwardAuthenticated, (req, res) => res.render("login"));

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/auth/login",
  })
);

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/auth/login");
});

router.get('/github-login',
  passport.authenticate('github', { failureRedirect: '/auth/login' }),
  function (req, res) {
    res.redirect('/dashboard');
  });

router.get('/github-callback',
  passport.authenticate('github', { failureRedirect: 'auth/login' }),
  function (req, res) {
    // req.session.username = req.user.username;
    // req.session.displayname = req.user.displayName;
    res.redirect('/dashboard');
  });

router.get("/kill-session", ensureAuthenticated, isAdmin, (req, res) => {
  req.sessionStore.destroy(req.query.sessionId);
  res.redirect('/admin');
});
module.exports = router;
