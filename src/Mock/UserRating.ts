import { get, set } from "../services/localObjectStorage"

export type UserRatingMockType = {
  id: string
  account: string
  rating: number
  detail: string
}

const userRatingMock: UserRatingMockType[] = [
  {
    id: "1",
    account: "1",
    rating: 5,
    detail: "Great ramp access to the stage area.",
  },
  {
    id: "2",
    account: "1",
    rating: 4,
    detail: "Wheelchair section was well-placed but too crowded.",
  },
  {
    id: "3",
    account: "1",
    rating: 3,
    detail: "Signage was clear and easy to follow.",
  },
  {
    id: "4",
    account: "1",
    rating: 2,
    detail: "The venue lacked proper seating for those with mobility issues.",
  },
  {
    id: "5",
    account: "1",
    rating: 5,
    detail: "Accessible bathrooms were clean and close to the stage.",
  },
  {
    id: "6",
    account: "1",
    rating: 4,
    detail: "Staff were helpful and understanding.",
  },
  {
    id: "7",
    account: "1",
    rating: 1,
    detail: "Elevator was out of order, making access difficult.",
  },
  {
    id: "8",
    account: "1",
    rating: 3,
    detail: "Lighting made it hard to navigate the venue safely.",
  },
  {
    id: "9",
    account: "1",
    rating: 4,
    detail: "Plenty of parking for people with disabilities.",
  },
  {
    id: "10",
    account: "1",
    rating: 5,
    detail: "Acoustics were excellent even in accessible sections.",
  },
  {
    id: "11",
    account: "1",
    rating: 2,
    detail: "The stage view was blocked for wheelchair users.",
  },
  {
    id: "12",
    account: "1",
    rating: 3,
    detail: "Accessible seating was far from the main action.",
  },
  {
    id: "13",
    account: "1",
    rating: 5,
    detail: "Staff provided excellent support for those with mobility aids.",
  },
  {
    id: "14",
    account: "1",
    rating: 1,
    detail: "Accessible entrances were poorly marked.",
  },
  {
    id: "15",
    account: "1",
    rating: 4,
    detail:
      "The venue provided competent staff. Got my wheelchair back after I lost it while crowd surfing.",
  },
  {
    id: "16",
    account: "1",
    rating: 2,
    detail: "Ramps were too steep and slippery.",
  },
  {
    id: "17",
    account: "1",
    rating: 3,
    detail: "Accessible parking was available but limited.",
  },
  {
    id: "18",
    account: "1",
    rating: 5,
    detail: "Security staff were knowledgeable about accessibility needs.",
  },
  {
    id: "19",
    account: "1",
    rating: 4,
    detail: "Pathways were clear and easy to navigate.",
  },
  {
    id: "20",
    account: "1",
    rating: 5,
    detail: "The overall experience was fantastic for accessibility.",
  },
]

export const getUserRatingMock = (): UserRatingMockType[] => {
  const data = get("rating")
  if (data) return data
  set("rating", userRatingMock)
  return userRatingMock
}
