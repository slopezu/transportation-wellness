const config = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID as string,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2023-03-09", // Mantenemos tu versión más reciente
  useCdn: process.env.NODE_ENV === "production",
  token: process.env.SANITY_API_KEY as string,
};

export default config;