export interface GameIdentity {
  placeId?: number;
  universeId?: number;
}
export interface Project {
  name: string;
  slug: string;
  thumbnail: string;
  icon?: string;
  tags: string[];
  role: string;
  description: string;
  links: { play?: string; video?: string };
  status: string;
  game?: GameIdentity;
}
export interface GameConfig extends GameIdentity {
  slug: string;
  name: string;
  thumbnail: string;
  playUrl?: string;
}
export interface GameStats {
  slug: string;
  universeId: number;
  name: string;
  visits: number;
  playing: number;
  rank: number;
  thumbnail: string;
}
export interface StatsResponse {
  totalVisits: number | null;
  totalPlaying: number | null;
  games: GameStats[];
  topGames: GameStats[];
  updatedAt: string | null;
  stale: boolean;
}
export interface Testimonial {
  quote: string;
  name: string;
  role: string;
}
export interface PaymentPlan {
  id: string;
  name: string;
  currency: string;
  amount: number;
  prefix: string;
  suffix: string;
  subtitle: string;
  note: string;
  details: string;
  link: string | null;
  email: string | null;
}
