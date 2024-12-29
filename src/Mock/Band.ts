import { get, set } from "../services/localObjectStorage"

export type BandMockType = {
  id: string
  name: string
  genre: string
  description: string
  img: string
}

export const bandMock: BandMockType[] = [
  {
    id: "1",
    name: "Eluveitie",
    genre: "Folk Metal",
    description:
      "Eluveitie is a Swiss folk metal band that masterfully blends melodic death metal with traditional Celtic folk music. " +
      "Their music often features instruments like hurdy-gurdies, bagpipes, and flutes, creating a unique sound that " +
      "is both heavy and deeply atmospheric. Known for their powerful live performances and evocative lyrics, the band draws heavily " +
      "on themes of mythology, ancient history, and nature. Albums like 'Slania' and 'Helvetios' have cemented their place as pioneers " +
      "in the folk metal genre.",
    img: "https://eluveitie.ch/images/elu_slider_neu.jpeg",
  },
  {
    id: "2",
    name: "Kanonenfieber",
    genre: "Blackened Death Metal",
    description:
      "Kanonenfieber is a German blackened death metal project that delves into the grim realities of war. " +
      "Formed as a one-man project, Kanonenfieber's music is raw, brutal, and unflinchingly honest, with lyrics inspired by " +
      "historical accounts and letters from soldiers. The band combines aggressive riffs and blast beats with a haunting atmosphere, " +
      "creating a visceral experience. Their debut album, 'Menschenmühle,' was critically acclaimed for its ability to merge " +
      "unrelenting heaviness with poignant storytelling.",
    img: "https://www.metal-archives.com/images/3/5/4/0/3540483079_photo.jpg?4933",
  },
  {
    id: "3",
    name: "Amon Amarth",
    genre: "Melodic Death Metal",
    description:
      "Amon Amarth is a Swedish melodic death metal band widely recognized for their Viking-themed music and " +
      "relentless energy. Their songs are tales of Norse mythology, battles, and legendary sagas, delivered with " +
      "thunderous riffs and Johan Hegg's iconic growling vocals. Known for their epic albums like 'Twilight of the Thunder God' " +
      "and 'Jomsviking,' the band has gained a massive following worldwide. Their live shows, complete with Viking ship stage props, " +
      "are as theatrical as they are ferocious.",
    img: "https://www.metal-archives.com/images/1/5/0/150_photo.jpg?2821",
  },
  {
    id: "4",
    name: "Slayer",
    genre: "Thrash Metal",
    description:
      "Slayer is an American thrash metal band and one of the 'Big Four' of the genre, alongside Metallica, Megadeth, and Anthrax. " +
      "Formed in 1981, Slayer's music is characterized by its blistering speed, aggressive riffs, and dark, controversial themes. " +
      "Albums like 'Reign in Blood' and 'Seasons in the Abyss' are considered landmarks in heavy metal history. The band's uncompromising " +
      "attitude and intense live performances have earned them a legendary status, influencing countless metal bands across generations.",
    img: "https://wallpaperaccess.com/full/1496102.jpg",
  },
  {
    id: "5",
    name: "Anthrax",
    genre: "Thrash Metal",
    description:
      "Anthrax is an American thrash metal band that emerged in the early 1980s as part of the genre's pioneering wave. " +
      "Known for their energetic style and humorous approach, Anthrax often incorporates elements of hardcore punk into their sound. " +
      "Albums like 'Among the Living' and 'Persistence of Time' are thrash classics, featuring fast tempos, sharp riffs, and biting lyrics. " +
      "The band is also credited with helping to popularize the crossover between metal and rap through their collaboration with Public Enemy " +
      "on 'Bring the Noise.' Their dynamic live performances and enduring appeal have kept them at the forefront of metal for decades.",
    img: "https://cdn.mos.cms.futurecdn.net/VaRe7tsp2jqiPxXXenWUMQ-1200-80.jpg",
  },
  {
    id: "6",
    name: "Ozzy Osbourne",
    genre: "Heavy Metal",
    description:
      "Ozzy Osbourne, famously known as the 'Prince of Darkness,' is a British heavy metal icon and the legendary frontman of Black Sabbath. " +
      "As a solo artist, Ozzy has crafted a legacy with hits like 'Crazy Train,' 'Bark at the Moon,' and 'No More Tears.' His music is a blend of " +
      "heavy riffs, haunting melodies, and his unmistakable voice. Ozzy's persona, both on and off stage, has made him a cultural phenomenon. " +
      "Despite personal struggles and controversies, his influence on the heavy metal genre is unparalleled, earning him a rightful place in " +
      "the Rock and Roll Hall of Fame.",
    img: "https://i.pinimg.com/originals/c5/0c/fe/c50cfeb1a42835b36f72b9913b16df98.jpg",
  },
]
export const getBandMock = (): BandMockType[] => {
  const data = get("band")
  if (data) return data
  set("band", bandMock)
  return bandMock
}
