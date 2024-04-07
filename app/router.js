import express from "express";
import multer from "multer";
import mainController from "./controllers/mainController.js";
import websiteController from "./controllers/websiteController.js";
import authController from "./controllers/authController.js";
import userController from "./controllers/userController.js";
import commentController from "./controllers/commentController.js";
import articleController from "./controllers/articleController.js";
import isLogged from "./middlewares/isLogged.js";
import csrf from "csurf";
import bodyParser from "body-parser";

const router = express.Router();
const csfrprotection = csrf({ cookie: true });
const parseForm = bodyParser.urlencoded({ extended: false });

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
router.get(
  "/tomates/denoncer",
  isLogged,
  csfrprotection,
  websiteController.form
);
router.post(
  "/tomates/denoncer",
  isLogged,
  upload.single("image"),
  csfrprotection,
  parseForm,
  websiteController.formAction
);

router.get("/tomates/:slug", websiteController.details);
router.delete("/tomates/:slug", websiteController.deleteWebsite);

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
router.put("/profil", isLogged, userController.updateProfil);

router.get("/article", articleController.page);
// router.get("/article/form", isLogged, csfrprotection, articleController.form);
// router.post(
//   "/article/form",
//   isLogged,
//   parseForm,
//   csfrprotection,
//   articleController.formAction
// );
router.get("/article/form", isLogged, articleController.form);
router.post("/article/form", isLogged, articleController.formAction);
router.get("/article/:slug", articleController.details);

router.use(mainController.notFound);

export default router;
