import { useGetArticles } from "../../hooks/article/useGetArticles";

export default function ArticlesList() {
  const { data = [] } = useGetArticles();

  return (
    <ul className="list-disc list-inside">
      {data.map((article) => (
        <li key={article.id} className={articleItemClasses}>
          {article.title}
        </li>
      ))}
    </ul>

  );
}
