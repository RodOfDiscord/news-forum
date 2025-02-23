import { useQuery } from "@tanstack/react-query";
import { ArticleService } from "../../api/ArticleService";
export const useGetArticles = () => {
  return useQuery({
    queryKey: ["articles"],
    queryFn: ArticleService.getAll,
  });
};
