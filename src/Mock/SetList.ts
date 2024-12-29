import { get, set } from "../services/localObjectStorage"

type SetlistEntryType = {
  song: string
  time: string
}

export type SetlistMockType = {
  id: string
  setlist: SetlistEntryType[]
}
export const setlistMock: SetlistMockType[] = [
  // Eluveitie
  {
    id: "1",
    setlist: [
      { song: "Inis Mona", time: "04:10" },
      { song: "Thousandfold", time: "03:45" },
      { song: "The Call of the Mountains", time: "05:00" },
      { song: "King", time: "04:55" },
      { song: "A Rose for Epona", time: "04:40" },
    ],
  },
  {
    id: "2",
    setlist: [
      { song: "Omnos", time: "03:45" },
      { song: "Quoth the Raven", time: "05:05" },
      { song: "Helvetios", time: "04:45" },
      { song: "Uxellodunon", time: "04:30" },
      { song: "Epona", time: "04:15" },
    ],
  },

  // Kanonenfieber
  {
    id: "3",
    setlist: [
      { song: "Der letzte Flug", time: "05:25" },
      { song: "Dicke Bertha", time: "04:45" },
      { song: "Menschenmühle", time: "06:10" },
      { song: "Grabenlieder", time: "05:25" },
      { song: "Unterstandsangst", time: "07:15" },
    ],
  },
  {
    id: "4",
    setlist: [
      { song: "Die Feuertaufe", time: "05:55" },
      { song: "In's Niemandsland", time: "04:20" },
      { song: "Menschenmühle", time: "03:40" },
      { song: "Gott mit der Kavallerie", time: "05:00" },
      { song: "Der Maulwurf", time: "05:20" },
    ],
  },

  // Amon Amarth
  {
    id: "5",
    setlist: [
      { song: "Twilight of the Thunder God", time: "04:45" },
      { song: "Guardians of Asgaard", time: "04:30" },
      { song: "Cry of the Black Birds", time: "03:50" },
      { song: "Pursuit of Vikings", time: "04:15" },
      { song: "Runes to My Memory", time: "05:10" },
    ],
  },
  {
    id: "6",
    setlist: [
      { song: "Deceiver of the Gods", time: "05:10" },
      { song: "Death in Fire", time: "04:55" },
      { song: "Victorious March", time: "07:30" },
      { song: "War of the Gods", time: "05:15" },
      { song: "Find a Way or make One", time: "04:35" },
    ],
  },

  // Slayer
  {
    id: "7",
    setlist: [
      { song: "Raining Blood", time: "04:14" },
      { song: "Angel of Death", time: "04:51" },
      { song: "South of Heaven", time: "04:59" },
      { song: "War Ensemble", time: "04:54" },
      { song: "Seasons in the Abyss", time: "06:36" },
    ],
  },
  {
    id: "8",
    setlist: [
      { song: "Dead Skin Mask", time: "05:19" },
      { song: "Black Magic", time: "04:05" },
      { song: "Hell Awaits", time: "06:15" },
      { song: "Chemical Warfare", time: "06:02" },
      { song: "Postmortem", time: "03:38" },
    ],
  },

  // Anthrax
  {
    id: "9",
    setlist: [
      { song: "Caught in a Mosh", time: "05:02" },
      { song: "Madhouse", time: "04:17" },
      { song: "Antisocial", time: "04:38" },
      { song: "Indians", time: "05:41" },
      { song: "I Am the Law", time: "05:57" },
    ],
  },
  {
    id: "10",
    setlist: [
      { song: "Got the Time", time: "03:44" },
      { song: "Bring the Noise", time: "03:33" },
      { song: "Metal Thrashing Mad", time: "03:47" },
      { song: "Be All, End All", time: "06:22" },
      { song: "Now It's Dark", time: "05:32" },
    ],
  },

  // Ozzy Osbourne
  {
    id: "11",
    setlist: [
      { song: "Crazy Train", time: "04:56" },
      { song: "Mr. Crowley", time: "05:02" },
      { song: "Over the Mountain", time: "04:31" },
      { song: "Bark at the Moon", time: "04:15" },
      { song: "No More Tears", time: "07:23" },
    ],
  },
  {
    id: "12",
    setlist: [
      { song: "I Don't Know", time: "05:14" },
      { song: "Suicide Solution", time: "04:18" },
      { song: "Shot in the Dark", time: "04:20" },
      { song: "Diary of a Madman", time: "06:15" },
      { song: "Flying High Again", time: "04:42" },
    ],
  },
]

export const getSetlistMock = () => {
  const data = get("setlist")
  if (data) return data
  set("setlist", setlistMock)
  return setlistMock
}
