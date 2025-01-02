import { get, set } from "../services/localObjectStorage"
import { map11, map12, map13, map21, map22, map3, placeholder } from "./Map"

export type ButtonArrayButton = {
  type: "seat" | "toilet" | "food" | "empty"
  number: number
  accessibilityRating: number
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
  standignAccessibility: number
  streetMap: string
}

export const locationMock: LocationMockType[] = [
  {
    id: "1",
    name: "Metal Mayhem Arena",
    contact: "contact@metalmayhem.com",
    ratings: ["1", "2", "3", "4", "5", "17", "16"],
    detailText:
      "Metal Mayhem Arena is a renowned venue for metal concerts, delivering an electrifying atmosphere and unforgettable performances. The venue features a spacious ground floor and multi-tiered seating arrangements to ensure excellent views and acoustics for all guests. Located in the heart of Bern, it is easily accessible via public transportation and offers nearby parking facilities for added convenience. Fans appreciate the arena's modern amenities and its commitment to hosting top-tier metal acts from around the world. Its vibrant ambiance and well-organized services make it a must-visit destination for metal enthusiasts.",
    accessibilityDetailText:
      "Metal Mayhem Arena offers ramps and accessible seating on the ground floor, ensuring wheelchair users and those with reduced mobility can enjoy events comfortably. While the upper floors are accessible with some difficulty, companions of disabled guests (one per disabled attendee) are granted free admission to provide necessary assistance. Larger groups with disabled individuals are encouraged to contact the venue in advance to secure seating arrangements that keep everyone together, avoiding the split of friend groups. Parking near the entrance can be arranged by contacting the on-site parking service, and early admission is available to streamline the entry process. The arena is also conveniently connected to Bern's public transportation network, making travel easy for all visitors.",
    accessibilityRating: 3,
    standignAccessibility: 1,
    standingPlaces: false,
    city: "Bern",
    country: "CH",
    address: "Mayhem 1",
    img: [
      "https://i0.wp.com/mentalmars.com/wp-content/uploads/2019/04/Arena-fight-Borderlands-3.jpg?ssl=1",
      "https://www.countryandtownhouse.co.uk/wp-content/uploads/2019/04/bar.jpg",
      "https://www.shieldhealthcare.com/community/wp-content/uploads/2019/01/Disabled-Parking-is-a-Game-Changer-for-Parents-of-Kids-with-Special-Needs.jpg",
      placeholder,
    ],
    streetMap:
      "https://i.pinimg.com/originals/22/a3/50/22a3506a908ef263dd918325519c2b2a.jpg",
    map: [
      {
        img: map11, // Ground floor
        map: [
          [
            { type: "seat", number: 1, accessibilityRating: 4 },
            { type: "seat", number: 2, accessibilityRating: 4 },
            { type: "seat", number: 3, accessibilityRating: 4 },
            { type: "seat", number: 4, accessibilityRating: 4 },
            { type: "toilet", number: 5, accessibilityRating: 4 },
            { type: "seat", number: 6, accessibilityRating: 4 },
            { type: "seat", number: 7, accessibilityRating: 4 },
            { type: "seat", number: 8, accessibilityRating: 4 },
            { type: "seat", number: 9, accessibilityRating: 4 },
            { type: "food", number: 10, accessibilityRating: 4 },
          ],
          [
            { type: "seat", number: 11, accessibilityRating: 3 },
            { type: "seat", number: 12, accessibilityRating: 3 },
            { type: "seat", number: 13, accessibilityRating: 3 },
            { type: "seat", number: 14, accessibilityRating: 3 },
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
        img: map12, // First floor
        map: [
          [
            { type: "seat", number: 21, accessibilityRating: 2 },
            { type: "seat", number: 22, accessibilityRating: 2 },
            { type: "seat", number: 23, accessibilityRating: 2 },
            { type: "seat", number: 24, accessibilityRating: 2 },
            { type: "toilet", number: 25, accessibilityRating: 2 },
            { type: "toilet", number: 26, accessibilityRating: 2 },
            { type: "food", number: 27, accessibilityRating: 2 },
            { type: "food", number: 28, accessibilityRating: 2 },
            { type: "seat", number: 29, accessibilityRating: 2 },
            { type: "seat", number: 30, accessibilityRating: 2 },
          ],
          [
            { type: "seat", number: 31, accessibilityRating: 1 },
            { type: "seat", number: 32, accessibilityRating: 1 },
            { type: "seat", number: 33, accessibilityRating: 1 },
            { type: "seat", number: 34, accessibilityRating: 1 },
            { type: "seat", number: 35, accessibilityRating: 1 },
            { type: "seat", number: 36, accessibilityRating: 0 },
            { type: "seat", number: 37, accessibilityRating: 0 },
            { type: "seat", number: 38, accessibilityRating: 0 },
            { type: "seat", number: 39, accessibilityRating: 0 },
            { type: "seat", number: 40, accessibilityRating: 0 },
          ],
        ],
      },
      {
        img: map13, // secret floor
        map: [
          [
            { type: "seat", number: 41, accessibilityRating: 0 },
            { type: "seat", number: 42, accessibilityRating: 0 },
            { type: "empty", number: 0, accessibilityRating: 0 },
            { type: "empty", number: 0, accessibilityRating: 0 },
            { type: "empty", number: 0, accessibilityRating: 0 },
            { type: "empty", number: 0, accessibilityRating: 0 },
            { type: "empty", number: 0, accessibilityRating: 0 },
            { type: "empty", number: 0, accessibilityRating: 0 },
            { type: "seat", number: 43, accessibilityRating: 0 },
            { type: "seat", number: 44, accessibilityRating: 0 },
          ],
          [
            { type: "seat", number: 45, accessibilityRating: 0 },
            { type: "seat", number: 46, accessibilityRating: 0 },
            { type: "empty", number: 0, accessibilityRating: 0 },
            { type: "empty", number: 0, accessibilityRating: 0 },
            { type: "empty", number: 0, accessibilityRating: 0 },
            { type: "empty", number: 0, accessibilityRating: 0 },
            { type: "empty", number: 0, accessibilityRating: 0 },
            { type: "empty", number: 0, accessibilityRating: 0 },
            { type: "seat", number: 47, accessibilityRating: 0 },
            { type: "seat", number: 48, accessibilityRating: 0 },
          ],
        ],
      },
    ],
  },
  {
    id: "2",
    name: "Rock 'n' Thunder Hall",
    contact: "info@rocknthunder.com",
    ratings: ["6", "7", "8", "9", "10", "20"],
    detailText:
      "Rock 'n' Thunder Hall is an intimate venue known for its outstanding acoustics and immersive sound experience. With its industrial charm and cozy atmosphere, it's a favorite among fans of rock and alternative music. The hall is equipped with modern sound systems to ensure every note resonates perfectly. Its central location in Zürich makes it easily accessible, with ample public transport options nearby. While compact in size, the venue is designed to create an electric ambiance for smaller, more personal performances. Local dining options and parking facilities add to the convenience for concertgoers.",
    accessibilityDetailText:
      "The ground floor of the venue is wheelchair accessible, with designated seats for wheelchair users and elderly patrons. However, the upper floors are not accessible as there are no elevators available. Wheelchair users only require a standard ticket for entry. Parking near the entrance can be prearranged by contacting the on-site service, ensuring a smooth arrival process. Early access before general admission is also available for those requiring assistance. The venue is well-connected to Zürich’s public transport network, making it easy for visitors to reach the concert hall. On-site staff are available to provide further assistance as needed.",
    accessibilityRating: 3,
    standignAccessibility: 2,
    standingPlaces: true,
    city: "Zürich",
    country: "CH",
    address: "Industriestrasse 64",
    img: [
      "https://nmeda.org/wp-content/uploads/2016/10/Accessible-Parking-Spots.jpg",
      "https://www.101mobility.com/wp-content/uploads/2014/02/ADA-Compliant-Ramp.jpg",
      placeholder,
    ],
    streetMap:
      "https://cdna.artstation.com/p/assets/images/images/003/029/830/large/philip-rice-map-of-asgard-jotunheim-nidavellir-vanaheim.jpg?1468721447",
    map: [
      {
        img: map21, // Ground floor
        map: [
          [
            { type: "toilet", number: 1, accessibilityRating: 4 },
            { type: "seat", number: 2, accessibilityRating: 4 },
            { type: "seat", number: 3, accessibilityRating: 4 },
            { type: "seat", number: 4, accessibilityRating: 4 },
            { type: "food", number: 5, accessibilityRating: 4 },
            { type: "seat", number: 6, accessibilityRating: 4 },
            { type: "seat", number: 7, accessibilityRating: 4 },
            { type: "seat", number: 8, accessibilityRating: 4 },
            { type: "seat", number: 9, accessibilityRating: 4 },
            { type: "seat", number: 10, accessibilityRating: 4 },
          ],
        ],
      },
      {
        img: map22, // First floor
        map: [
          [
            { type: "food", number: 11, accessibilityRating: 2 },
            { type: "seat", number: 12, accessibilityRating: 2 },
            { type: "seat", number: 13, accessibilityRating: 2 },
            { type: "seat", number: 14, accessibilityRating: 2 },
            { type: "seat", number: 15, accessibilityRating: 2 },
            { type: "toilet", number: 16, accessibilityRating: 2 },
            { type: "seat", number: 17, accessibilityRating: 2 },
            { type: "seat", number: 18, accessibilityRating: 2 },
            { type: "seat", number: 19, accessibilityRating: 2 },
            { type: "seat", number: 20, accessibilityRating: 2 },
          ],
        ],
      },
    ],
  },
  {
    id: "3",
    name: "The Screaming Grounds",
    contact: "support@screaminggrounds.com",
    ratings: ["11", "12", "13", "14", "15", "18", "19"],
    detailText:
      "The Screaming Grounds is a stunning outdoor venue nestled in the scenic town of Belp, Switzerland, surrounded by lush landscapes and rolling hills. Known for its blend of natural beauty and modern amenities, it’s perfect for concerts, festivals, and outdoor events. The venue is easily accessible by train, with a nearby station providing quick and convenient transport options for visitors. Designed to accommodate both standing and seated audiences, The Screaming Grounds ensures comfort for all guests. Food and drink options focus on local flavors, adding a unique touch to the experience. With its commitment to sustainability and accessibility, including features like ramps and dedicated seating areas, the venue ensures inclusivity while minimizing its environmental impact. Whether you come for the vibrant performances or the breathtaking scenery, The Screaming Grounds delivers an unforgettable event experience.",
    accessibilityDetailText:
      "Wide pathways and excellent staff support ensure accessibility for all visitors. The venue is primarily outdoors but includes designated seating areas for individuals with reduced mobility. Parking near the entrance can be arranged by contacting the on-site service. Visitors requiring special access can enter before the main crowd, ensuring a smooth and stress-free arrival. A ramp leads to an elevated platform with improved views of the stage for those who prefer not to stand. The venue is also well-connected by public transport, with a nearby train station offering easy access. Staff are always on hand to assist with any specific needs.",
    accessibilityRating: 5,
    standignAccessibility: 4,
    standingPlaces: true,
    city: "Belp",
    country: "CH",
    address: "Kuhweg 9",
    img: [
      "https://www.monarchsign.com/wp-content/uploads/2014/12/handicapped-parking-sign.jpg",
      "https://www.simplyemma.co.uk/wp-content/uploads/2019/05/wheelchair-accessible-viewing-platform-at-Glasgow-Summer-Sessions.jpg",
      "https://www.simplyemma.co.uk/wp-content/uploads/2019/09/Fusion-Festival-Disabled-Access-Wheelchair-Accessibility-3.jpg",
      "https://ichef.bbci.co.uk/news/976/cpsprodpb/B2FE/production/_119922854_atmosphere_katjaogrin_bloodstock21_29.jpg",
      "https://www.publicdomainpictures.net/pictures/230000/velka/scenic-landscape-1499784730rFj.jpg",
      "https://i.pinimg.com/originals/2c/ca/e2/2ccae2fe9696d9104c56b4ecdd0db169.jpg",
    ],
    streetMap:
      "https://cdnb.artstation.com/p/assets/images/images/028/645/645/large/aleksandar-markovic-map-1.jpg?1595076083",
    map: [
      {
        img: map3, // Ground level (outdoor)
        map: [
          [
            { type: "seat", number: 1, accessibilityRating: 4 },
            { type: "seat", number: 2, accessibilityRating: 4 },
            { type: "seat", number: 3, accessibilityRating: 4 },
            { type: "seat", number: 4, accessibilityRating: 4 },
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
