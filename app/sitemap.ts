import type { MetadataRoute } from "next"

const baseUrl = "https://sterlingchin.com"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: baseUrl,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/marvin`,
      changeFrequency: "monthly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/clara`,
      changeFrequency: "monthly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/mcp-dev-summit`,
      changeFrequency: "yearly",
      priority: 0.6,
    },
  ]
}
