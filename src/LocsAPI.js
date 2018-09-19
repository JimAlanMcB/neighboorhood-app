const api = "https://jimalanmcb.github.io/api";

export const get = () => fetch(`${api}/locations.json`).then(res => res.json());
