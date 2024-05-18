on registration: attach user_id to req.session.user_id 
on login = attach user_id to req.session.user_id 

logout = session.id = null

make middleware requireLogin which checks for presence of req.session.user_id always. Protect routes with this middleware


//can be used to store variables and access throughout the ap
req.locals = "value"