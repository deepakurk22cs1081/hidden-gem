
export interface Coordinates {
  lat: number;
  lng: number;
}

export interface RatingScores {
  food: number;
  service: number;
  ambiance: number;
  discovery: number;
}

export interface Rating {
  id: string;
  userId: string;
  scores: RatingScores;
  comment?: string;
}

export interface Location {
  id: string;
  name: string;
  type: string;
  budgetTag: string;
  submittedBy: string;
  imageUrl: string;
  coordinates: Coordinates;
  ratings: Rating[];
}

export interface User {
  id: string;
  username: string;
  gamificationScore: number;
  avatarUrl: string;
}
