import { useGetArticles } from "../../hooks/article/useGetArticles";

export function ArticlesList() {
  const { data = [], isLoading, isError, error } = useGetArticles();

  return (
    <>
      <h2 className="text-xl font-medium ">Articles</h2>
      <ul className="list-disc list-inside">
        {data.map((article) => (
          <li key={article.id}>{article.title}</li>
        ))}
      </ul>
    </>
  );
}
