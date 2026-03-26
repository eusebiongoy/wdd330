// ExternalServices.mjs
const baseURL = import.meta.env.VITE_SERVER_URL
function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error(`Bad Response: ${res.status}`);
  }
}

export default class ExternalServices {
  constructor(category) {
    this.category = category;
    this.path = `../json/${this.category}.json`; // adjust path if needed
  }

  getData() {
    return fetch(this.path).then(convertToJson);
  }

  async getData(category) {
  const response = await fetch(`${baseURL}products/search/${category} `);
  const data = await convertToJson(response);
  return data.Result;
}

  async findProductById(id) {
    const products = await this.getData();
    return products.find((item) => String(item.Id) === String(id));
  }
}