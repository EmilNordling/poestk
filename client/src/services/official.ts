import Axios, { AxiosPromise } from 'axios';

const officialRootURL = 'https://www.pathofexile.com';

export declare module Character {
  export type response = {
    name: string,
    league: string,
    classId: number,
    ascendancyClass: number,
    class: string,
    level: number,
    experience: number,
  };
}


export declare module GetCharacters {
  export type response = Character.response[];
}

const API = {
  getCharacters: (accountName: string): AxiosPromise<Character.response> => Axios.get(`${officialRootURL}/character-window/get-characters?accountName=${accountName}`),
};

export default API;
