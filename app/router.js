import express from "express";
import multer from "multer";
import mainController from "./controllers/mainController.js";
import websiteController from "./controllers/websiteController.js";
import authController from "./controllers/authController.js";
import userController from "./controllers/userController.js";
import isLogged from "./middlewares/isLogged.js";
import commentController from "./controllers/commentController.js";
import methodOverride from "method-override";

const router = express.Router();

//Pour gérer l'enrengistrement d'image (dans le dossier public/uploads)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.get("/", mainController.home);

router.get("/mentions-legales", mainController.legals);
router.get("/plan", mainController.plan);
router.get("/contact", mainController.contact);

router.get("/tomates", websiteController.all);
router.get("/tomates/denoncer", isLogged, websiteController.form);
router.post(
  "/tomates/denoncer",
  isLogged,
  upload.single("image"),
  websiteController.formAction
);
router.get("/tomates/:slug", websiteController.details);

// Utilisattion du package method-overrride pour gérer la suppresion, avec la méthode delete impossible de la mettre en place
//Mettre la route côté profil et pas celle ci :
// router.post(
//   "/tomates/:slug",
//   methodOverride("_method"),
//   websiteController.delete
// );

router.get(
  "/tomates/:slug/commentaire",
  isLogged,
  commentController.formComment
);
router.post(
  "/tomates/:slug/commentaire",
  isLogged,
  commentController.formActionComment
);

router.get("/connexion", authController.login);
router.post("/connexion", authController.loginAction);
router.get("/inscription", authController.signup);
router.post("/inscription", authController.signupAction);
router.get("/deconnexion", isLogged, authController.logout);

router.get("/profil", isLogged, userController.profil);

// on appelle endpoint une route, une url qui donnera lieu à un résultat dans notre api
// notre api est une liste de endpoint (d'adresses) qui donneront lieu à un résultat
router.get("/api/website", websiteController.allJson);
router.get("/api/website/:id", websiteController.detailsJson);
router.delete("/api/website/:id", websiteController.delete);
router.post("/api/website", websiteController.create);

router.get("/api/comment", commentController.allJsonComment);
router.delete("/api/comment/:id", commentController.deleteComment);
router.post("/api/comment", commentController.createComment);

router.use(mainController.notFound);

export default router;
