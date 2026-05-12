export interface Author {
  name: string;
  socials: Record<string, string> | null;
}

export interface Launch {
  launch_id: string;
  provider: string;
}

export interface SpaceEvent {
  id: number;
  title: string;
  description: string;
}

export interface SpaceFlightNews {
  id: number;
  title: string;
  authors: Author[];
  url: string;
  image_url: string;
  news_site: string;
  summary: string;
  published_at: string;
  updated_at: string;
  featured: boolean;
  launches: Launch[];
  events: SpaceEvent[];
}
