import ArticleCard from "../../components/ArticleCard/ArticleCard";
import ArticlesList from "../../components/ArticlesList/ArticlesList";
import { Button } from "../../components/Button/Button";


export function NewsPage() {
  const handleClick = () => {
    console.log("Article clicked");
  }
  return <>
    <h1 className="text-5xl font-medium ">Articles</h1>
    <ArticlesList></ArticlesList>
    <div className="flex justify-center gap-5">
      <ArticleCard title={"sadas"} date={"asdasd"} description={"asdas"} image={"https://picsum.photos/500/600"} onClick={handleClick}></ArticleCard>
      <ArticleCard title={"sadas"} date={"asdasd"} description={"asdas"} image={"https://picsum.photos/500/600"} onClick={handleClick}></ArticleCard>
      <ArticleCard title={"sadas"} date={"asdasd"} description={"asdas"} image={"https://picsum.photos/500/600"} onClick={handleClick}></ArticleCard>
      <ArticleCard title={"sadas"} date={"asdasd"} description={"asdas"} image={"https://picsum.photos/500/600"} onClick={handleClick}></ArticleCard>
      <ArticleCard title={"sadas"} date={"asdasd"} description={"asdas"} image={"https://picsum.photos/500/600"} onClick={handleClick}></ArticleCard>
    </div>
    <Button variant="primary">Dummy button</Button>

  </>;
}
