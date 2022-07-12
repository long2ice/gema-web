import axios from "./axios";

async function convert(
  source_type: string,
  content: string,
  language: string,
  dest_type: string
) {
  const response = await axios.post(`/convert`, {
    source_type,
    content,
    language,
    dest_type,
  });
  return response.data;
}

async function getInfo() {
  const response = await axios.get(`/info`);
  return response.data;
}

export { convert, getInfo };
