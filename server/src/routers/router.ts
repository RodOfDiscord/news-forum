import { Router } from "express";
import { userRouter } from "./UserRouter";
import { articleRouter } from "./ArticleRouter";
import { categoryRouter } from "./CategoryRouter";
import { roleRouter } from "./RoleRouter";
import { authRouter } from "./AuthRouter";

const router = Router();
router.use("/users", userRouter);
router.use("/articles", articleRouter);
router.use("/categories", categoryRouter);
router.use("/roles", roleRouter);
router.use("/auth", authRouter);
export { router };
