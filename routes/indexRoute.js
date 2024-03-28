const express = require("express");
const router = express.Router();
const { ensureAuthenticated, isAdmin } = require("../middleware/checkAuth");

router.get("/", (req, res) => {
  res.send("welcome");
});

router.get("/dashboard", ensureAuthenticated, (req, res) => {
  if (req.user.role == 'admin') {
    res.redirect('/admin');
  }
  else {
    res.render("dashboard", {
      user: req.user,
    });
  }
});

router.get("/admin", ensureAuthenticated, isAdmin, (req, res) => {
  req.sessionStore.all(function (error, sessions) {
    if (error) {
      return res.status(500).send(error);
    }
    res.render("admin", {
      user: req.user,
      sessions: sessions
    });
  });
});

module.exports = router;
