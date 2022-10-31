import { useRouter } from "next/router";

const Pokelex: React.FC = () => {
  const router = useRouter();
  const { slug } = router.query;
  return <div>Here is your query: { slug }</div>;
}

export default Pokelex;
