import ArticleCard from "../../components/ArticleCard/ArticleCard";
import ArticlesList from "../../components/ArticlesList/ArticlesList";
import { Button } from "../../components/Button/Button";


export function NewsPage() {
  return <>
    <h2 className="text-xl font-medium ">Articles</h2>
    <ArticlesList></ArticlesList>
    <div className="flex">
      <ArticleCard title={"sadas"} date={"asdasd"} description={"asdas"} image={"https://picsum.photos/500/600"}></ArticleCard>
      <ArticleCard title={"sadas"} date={"asdasd"} description={"asdas"} image={"https://picsum.photos/500/600"}></ArticleCard>
      <ArticleCard title={"sadas"} date={"asdasd"} description={"asdas"} image={"https://picsum.photos/500/600"}></ArticleCard>
      <ArticleCard title={"sadas"} date={"asdasd"} description={"asdas"} image={"https://picsum.photos/500/600"}></ArticleCard>
      <ArticleCard title={"sadas"} date={"asdasd"} description={"asdas"} image={"https://picsum.photos/500/600"}></ArticleCard>
    </div>
    <Button variant="primary">Load more</Button>

  </>;
}
