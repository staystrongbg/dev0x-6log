import axios from 'axios';

export async function fetch(url: string) {
  return await axios.get(`http://localhost:8080/api${url}`);
}
