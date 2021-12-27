module.exports = {
    ensureUserAuthenticated: function(req, res, next) {
      if (req.isAuthenticated()) {
       
        console.log("User is authenticated")
        console.log(req.isAuthenticated())
        return next();
      }
    //  res.send("error_msg", "Please log in to view that resource");
    else{
        console.log("Not authenticated")
      res.redirect("/login")
    }
    },
    forwardUserAuthenticated: function(req, res, next) {
      if (!req.isAuthenticated()) {
         // console.log(req.isAuthenticated())
        return next();
      }
      res.redirect("/seller");
    },
  };