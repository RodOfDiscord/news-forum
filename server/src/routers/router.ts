import { Router } from "express";
import { userRouter } from "./UserRouter";
import { articleRouter } from "./ArticleRouter";
import { categoryRouter } from "./CategoryRouter";

const router = Router();
router.use("/users", userRouter);
router.use("/articles", articleRouter);
router.use("/categories", categoryRouter);
export { router };
