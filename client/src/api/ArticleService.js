import { api } from "./api";

export const ArticleService = {
  getAll: async () => {
    const res = await api.get("/articles");
    return res.data;
  },

  createArticle: async (articleData) => {
    const res = await api.post("/articles", articleData);
    return res.data;
  },
};
