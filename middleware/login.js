module.exports.requireLogin = (req,res,next) => {
    if(!req.session.user_id){
      return res.redirect("home")
    }
    next()
}

