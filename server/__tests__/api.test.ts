import request from "supertest";
import app from "../app";

// TODO: simplify startup time so this can be lower
jest.setTimeout(35000);

const POKE_NUMBER = 151;

test("GET /pokemon-list", async () => {
  await request(app)
    .get("/pokemon-list")
    .expect(200)
    .then((res) => {
      const list = res.body;
      expect(Array.isArray(list));
      expect(list.length).toBe(POKE_NUMBER);
      expect(list.map((l: any) => l.id)).toEqual(
        new Array(POKE_NUMBER)
          .fill(0)
          .map((_, i) => (i + 1).toString().padStart(3, "0"))
      );
    });
});

test("GET /pokemon/:id", async () => {
  // check if fetching a pokemon works
  await request(app)
    .get("/pokemon/25")
    .expect(200)
    .then((res) => {
      const pokemon = res.body;
      expect(pokemon).toBeTruthy();
      expect(pokemon).toMatchObject({
        id: "025",
        name: { en: "PIKACHU", de: "PIKACHU", fr: "PIKACHU" },
        image: "images/25.png",
        cry: "cries/25.wav",
        ht: { imperial: `1'04"`, metric: "0,4m" },
        wt: { imperial: "13.2lb", metric: "6,0kg" },
        species: { en: "MOUSE", de: "MAUS", fr: "SOURIS" },
        entry: {
          en: "Whenever PIKACHU comes across something new, it blasts it with a jolt of electricity. If you come across a blackened berry, it’s evidence that this POKéMON mistook the intensity of its charge.",
          de: "Es streckt seinen Schweif nach oben, um seine Umgebung zu prüfen. Häufig fährt ein Blitz hinein.",
          fr: "Il élève sa queue pour surveiller les environs. Elle attire souvent la foudre dans cette position.",
        },
      });
    });

  // check if fetching a pokemon that does not exist properly 404s
  await request(app)
    .get("/pokemon/" + POKE_NUMBER + Math.round(Math.random() * 100))
    .expect(404);
});

test("GET /cries/:id", async () => {
  await request(app).get("/cries/25.wav").expect(200);
});

test("GET /images/:id", async () => {
  await request(app).get("/images/25.png").expect(200);
});
