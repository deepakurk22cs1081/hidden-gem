
import { User, Location } from './types';

export const MOCK_USER: User = {
  id: 'user1',
  username: 'FoodExplorer',
  gamificationScore: 1250,
  avatarUrl: '',
};

export const MOCK_LOCATIONS: Location[] = [
  {
    id: 'loc1',
    name: 'Taco Haven',
    type: 'Food Truck',
    budgetTag: 'Budget-friendly',
    submittedBy: 'user1',
    imageUrl: 'https://picsum.photos/seed/taco/600/400',
    coordinates: { lat: 34.0522, lng: -118.2437 },
    ratings: [
      { id: 'r1', userId: 'user2', scores: { food: 5, service: 4, ambiance: 3, discovery: 5 }, comment: 'Best tacos I have ever had!' },
      { id: 'r2', userId: 'user3', scores: { food: 4, service: 5, ambiance: 4, discovery: 4 } },
    ],
  },
  {
    id: 'loc2',
    name: 'The Noodle Cart',
    type: 'Food Truck',
    budgetTag: 'Good value',
    submittedBy: 'user2',
    imageUrl: 'https://picsum.photos/seed/noodle/600/400',
    coordinates: { lat: 34.055, lng: -118.25 },
    ratings: [
      { id: 'r3', userId: 'user1', scores: { food: 5, service: 5, ambiance: 3, discovery: 5 }, comment: 'Incredible flavor, will be back.' },
    ],
  },
  {
    id: 'loc3',
    name: 'Secret Slice Pizza',
    type: 'Small Shop',
    budgetTag: 'Budget-friendly',
    submittedBy: 'user3',
    imageUrl: 'https://picsum.photos/seed/pizza/600/400',
    coordinates: { lat: 34.048, lng: -118.24 },
    ratings: [
        { id: 'r4', userId: 'user1', scores: { food: 4, service: 3, ambiance: 4, discovery: 5 }, comment: 'Hidden gem for sure! The crust is perfect.' },
        { id: 'r5', userId: 'user2', scores: { food: 5, service: 4, ambiance: 3, discovery: 4 }, comment: 'A bit hard to find but worth it.' },
    ],
  },
  {
    id: 'loc4',
    name: 'Grill & Chill',
    type: 'Restaurant',
    budgetTag: 'High-cost',
    submittedBy: 'user1',
    imageUrl: 'https://picsum.photos/seed/grill/600/400',
    coordinates: { lat: 34.06, lng: -118.23 },
    ratings: [
      { id: 'r6', userId: 'user3', scores: { food: 5, service: 5, ambiance: 5, discovery: 3 }, comment: 'Pricey but the quality is unmatched. Great for a date night.' },
    ],
  },
];