import { get, set } from "../services/localObjectStorage"

export type ButtonArrayButton = {
  type: "seat" | "toilet" | "food"
  number: number
  accessibilityRating: number
  taken?: boolean
}

type MapElement = {
  img: string
  map: ButtonArrayButton[][]
}

export type LocationMockType = {
  id: string
  name: string
  contact: string
  ratings: string[] // id
  detailText: string
  accessibilityDetailText: string
  accessibilityRating: number
  standingPlaces: boolean
  img: string[]
  map: MapElement[]
  country: string
  city: string
  address: string
}

export const locationMock: LocationMockType[] = [
  {
    id: "1",
    name: "Metal Mayhem Arena",
    contact: "contact@metalmayhem.com",
    ratings: ["1", "2", "3", "4", "5"],
    detailText:
      "A popular venue for metal concerts, known for its electrifying atmosphere.",
    accessibilityDetailText:
      "Ramps and accessible seating available on the ground floor. Upper floors are accessible with difficulty. Wheelchair users require a normal ticket, their companion (up to one) receives free admission.",
    accessibilityRating: 3,
    standingPlaces: false,
    city: "Bern",
    country: "CH",
    address: "Mayhem 1",
    img: [],
    map: [
      {
        img: "", // Ground floor
        map: [
          [
            { type: "seat", number: 1, accessibilityRating: 4, taken: true },
            { type: "seat", number: 2, accessibilityRating: 4, taken: true },
            { type: "seat", number: 3, accessibilityRating: 4, taken: true },
            { type: "seat", number: 4, accessibilityRating: 4, taken: true },
            { type: "toilet", number: 5, accessibilityRating: 4 },
            { type: "seat", number: 6, accessibilityRating: 4 },
            { type: "seat", number: 7, accessibilityRating: 4 },
            { type: "seat", number: 8, accessibilityRating: 4, taken: true },
            { type: "seat", number: 9, accessibilityRating: 4, taken: true },
            { type: "food", number: 10, accessibilityRating: 4 },
          ],
          [
            { type: "seat", number: 11, accessibilityRating: 3, taken: true },
            { type: "seat", number: 12, accessibilityRating: 3, taken: true },
            { type: "seat", number: 13, accessibilityRating: 3, taken: true },
            { type: "seat", number: 14, accessibilityRating: 3, taken: true },
            { type: "toilet", number: 15, accessibilityRating: 3 },
            { type: "seat", number: 16, accessibilityRating: 3 },
            { type: "seat", number: 17, accessibilityRating: 3 },
            { type: "seat", number: 18, accessibilityRating: 3 },
            { type: "seat", number: 19, accessibilityRating: 3 },
            { type: "food", number: 20, accessibilityRating: 3 },
          ],
        ],
      },
      {
        img: "", // First floor
        map: [
          [
            { type: "seat", number: 21, accessibilityRating: 2, taken: true },
            { type: "seat", number: 22, accessibilityRating: 2, taken: true },
            { type: "seat", number: 23, accessibilityRating: 2, taken: true },
            { type: "seat", number: 24, accessibilityRating: 2 },
            { type: "toilet", number: 25, accessibilityRating: 2 },
            { type: "seat", number: 26, accessibilityRating: 2 },
            { type: "seat", number: 27, accessibilityRating: 2 },
            { type: "food", number: 28, accessibilityRating: 2 },
            { type: "seat", number: 29, accessibilityRating: 2, taken: true },
            { type: "seat", number: 30, accessibilityRating: 2, taken: true },
          ],
          [
            { type: "seat", number: 31, accessibilityRating: 2, taken: true },
            { type: "seat", number: 32, accessibilityRating: 2, taken: true },
            { type: "seat", number: 33, accessibilityRating: 0, taken: true },
            { type: "seat", number: 34, accessibilityRating: 0, taken: true },
            { type: "seat", number: 35, accessibilityRating: 0 },
            { type: "seat", number: 36, accessibilityRating: 0 },
            { type: "seat", number: 37, accessibilityRating: 0 },
            { type: "seat", number: 38, accessibilityRating: 0 },
            { type: "seat", number: 39, accessibilityRating: 0 },
            { type: "toilet", number: 40, accessibilityRating: 2 },
          ],
        ],
      },
    ],
  },
  {
    id: "2",
    name: "Rock 'n' Thunder Hall",
    contact: "info@rocknthunder.com",
    ratings: ["6", "7", "8", "9", "10"],
    detailText: "A small concert hall that offers a great sound experience.",
    accessibilityDetailText:
      "Ground floor is accessible, but upper floors lack elevators. Seats reserved for wheelchair users and older People. Wheelchair users require a normal ticket.",
    accessibilityRating: 3,
    standingPlaces: true,
    city: "Zürich",
    country: "CH",
    address: "Industriestrasse 64",
    img: [],
    map: [
      {
        img: "", // Ground floor
        map: [
          [
            { type: "seat", number: 1, accessibilityRating: 4, taken: true },
            { type: "seat", number: 2, accessibilityRating: 4, taken: true },
            { type: "seat", number: 3, accessibilityRating: 4, taken: true },
            { type: "seat", number: 4, accessibilityRating: 4, taken: true },
            { type: "toilet", number: 5, accessibilityRating: 4 },
            { type: "seat", number: 6, accessibilityRating: 4 },
            { type: "seat", number: 7, accessibilityRating: 4 },
            { type: "seat", number: 8, accessibilityRating: 4 },
            { type: "seat", number: 9, accessibilityRating: 4 },
            { type: "food", number: 10, accessibilityRating: 4 },
          ],
        ],
      },
      {
        img: "", // First floor
        map: [
          [
            { type: "seat", number: 11, accessibilityRating: 2 },
            { type: "seat", number: 12, accessibilityRating: 2 },
            { type: "seat", number: 13, accessibilityRating: 2 },
            { type: "seat", number: 14, accessibilityRating: 2 },
            { type: "seat", number: 15, accessibilityRating: 2, taken: true },
            { type: "food", number: 16, accessibilityRating: 2, taken: true },
            { type: "seat", number: 17, accessibilityRating: 2, taken: true },
            { type: "seat", number: 18, accessibilityRating: 2 },
            { type: "seat", number: 19, accessibilityRating: 2 },
            { type: "toilet", number: 20, accessibilityRating: 2 },
          ],
        ],
      },
    ],
  },
  {
    id: "3",
    name: "The Screaming Grounds",
    contact: "support@screaminggrounds.com",
    ratings: ["11", "12", "13", "14", "15"],
    detailText: "An outdoor venue surrounded by scenic landscapes.",
    accessibilityDetailText:
      "Wide pathways and excellent staff support for accessibility. Outdoor with a few seats for people with reduced mobility.",
    accessibilityRating: 5,
    standingPlaces: true,
    city: "Belp",
    country: "CH",
    address: "Kuhweg 9",
    img: [],
    map: [
      {
        img: "", // Ground level (outdoor)
        map: [
          [
            { type: "seat", number: 1, accessibilityRating: 4, taken: true },
            { type: "seat", number: 2, accessibilityRating: 4, taken: true },
            { type: "seat", number: 3, accessibilityRating: 4, taken: true },
            { type: "seat", number: 4, accessibilityRating: 4, taken: true },
            { type: "toilet", number: 5, accessibilityRating: 4 },
            { type: "seat", number: 6, accessibilityRating: 4 },
            { type: "seat", number: 7, accessibilityRating: 4 },
            { type: "seat", number: 8, accessibilityRating: 4 },
            { type: "seat", number: 9, accessibilityRating: 4 },
            { type: "food", number: 10, accessibilityRating: 4 },
          ],
        ],
      },
    ],
  },
]

export const getLocationMock = (): LocationMockType[] => {
  const data = get("location")
  if (data) return data
  set("location", locationMock)
  return locationMock
}
