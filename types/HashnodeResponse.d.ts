interface CoverImage {
  url: string;
}

interface Node {
  brief: string | null;
  subtitle: string;
  coverImage: CoverImage;
  slug: string;
  title: string;
  readTimeInMinutes: number;
  updatedAt: string;
  views: number;
  url: string;
}

interface Edge {
  node: Node;
}

interface Posts {
  edges: Edge[];
}

interface HashnodeResponse {
  publication: { posts: Posts };
}

// Define the interface for the transformed data structure
interface TransformedPost {
  brief: string;
  coverImage: {
    url: string;
  };
  slug: string;
  title: string;
  readTime: number;
  updatedAt: string;
  url: string;
  views: number;
}

interface TransformedResponse {
  posts: TransformedPost[];
}
