module.exports = {
  ensureUserAuthenticated: function(req, res, next) {
    console.log(req.session.passport)
   if (req.session.passport) {
    console.log('User is authenticated')
     return next();
   }
    req.flash("error_msg", "Please log in to view that resource");
    res.redirect("/login");
  },
  forwardUserAuthenticated: function(req, res, next) {
    if (!req.session.passport) {
      return next();
    }
    res.redirect("/seller");
  },
};