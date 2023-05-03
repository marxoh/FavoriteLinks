//para protejer las rutas

//se exportara un objeto
module.exports = {
    //metodo para saber si un usuario esta logueado o no
    isLoggedIn(req, res, next){
        if(req.isAuthenticated()){
            return next()
        }
        return res.redirect('/signin')
    },
    isNotLoggedIn(req,res,next){
        if(!req.isAuthenticated()){
            return next()
        }
        return res.redirect('/profile')
    }

}
