import { useRouter } from "next/router";

const Pokelex: React.FC = () => {
  const router = useRouter();
  const { slug } = router.query;
  return (<div>I love shorts, they're comfy and easy to wear! { slug }</div>);
}

export default Pokelex;
