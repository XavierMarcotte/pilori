function isLogged(req, res, next) {
  if (req.session && req.session.isLogged && req.session.token) {
    // if (req.session.token) {
    next();
  } else {
    res.status(401).render("error", {
      message:
        "Vous n'êtes pas autorisé à accéder à la page demandée, une connexion est requise.",
    });
  }
}

export default isLogged;
