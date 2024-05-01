import axios from "axios";

export default axios.create({
  baseURL: "https://api.rawg.io/api",
  params: {
    key: "8f31daf53f8f44aeb78a559938b9513f",
  },
});
