module.exports.isLoggedIn = (req, res, next) => {
  console.log("REQ.USER...", req.user);
  if(!req.isAuthenticated()) {
    //store the url they are requesting!
    // console.log(req.path, req.originalUrl);
    req.session.returnTo = req.originalUrl;
    req.flash('error', 'You must be signed in first!');
    return res.redirect('/login');
  }
  next();
}