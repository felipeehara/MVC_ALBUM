export interface Track {
    title: string;
    duration: string;
  }
  
  export interface Album {
    id: string;
    title: string;
    releaseYear: number;
    coverImage: string;
    tracks: Track[];
    genres: string[];
    artistId: string;
  }
  
  export interface Artist {
    id: string;
    name: string;
    genre: string;
    albums: string[];  
  }
  
  export interface Genre {
    id: string;
    name: string;
  }
  