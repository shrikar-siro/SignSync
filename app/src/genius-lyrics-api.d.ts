declare module 'genius-lyrics-api' {
    export function getLyrics(options: {
      apiKey: string;
      title: string;
      artist: string;
      optimizeQuery?: boolean;
    }): Promise<string | null>;
  
    export function searchSong(options: {
      apiKey: string;
      title: string;
      artist: string;
      optimizeQuery?: boolean;
    }): Promise<
      { id: number; title: string; url: string; albumArt: string }[] | null
    >;
  
    export function getSong(options: {
      apiKey: string;
      title: string;
      artist: string;
      optimizeQuery?: boolean;
    }): Promise<{
      id: number;
      title: string;
      url: string;
      lyrics: string;
      albumArt: string;
    } | null>;
  
    export function getSongById(id: number | string, access_token: string): Promise<{
      id: number;
      title: string;
      url: string;
      lyrics: string;
      albumArt: string;
    } | null>;
  }
  