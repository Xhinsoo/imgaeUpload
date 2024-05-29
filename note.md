on registration: attach user_id to req.session.user_id 
on login = attach user_id to req.session.user_id 

logout = session.id = null

make middleware requireLogin which checks for presence of req.session.user_id always. Protect routes with this middleware


//can be used to store variables and access throughout the ap
req.locals = "value"


//
If you are using ejs, e.g., this single line is enough (although you usually also have a second call to app.set that defines the directory where to look for view files):

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');