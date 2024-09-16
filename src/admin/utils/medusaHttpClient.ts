import HTTPClient from "./httpClient";

const medusaHttpClient = new HTTPClient(process.env.MEDUSA_BACKEND_URL!, {
  credentials: "include",
});

export default medusaHttpClient;
