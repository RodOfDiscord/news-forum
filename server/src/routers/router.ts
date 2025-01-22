import { Router } from "express";
import { userRouter } from "./UserRouter";
import { articleRouter } from "./ArticleRouter";
import { categoryRouter } from "./CategoryRouter";
import { roleRouter } from "./RoleRouter";

const router = Router();
router.use("/users", userRouter);
router.use("/articles", articleRouter);
router.use("/categories", categoryRouter);
router.use("/roles", roleRouter);
export { router };
