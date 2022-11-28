const fetchJson = (url: string) => fetch(url).then(res => res.json()).catch(console.log);

export default fetchJson;
