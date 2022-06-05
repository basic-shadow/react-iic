export interface ISearchQueryParams {
  search: string;
  page: number;
  perPage: number;
}

export interface IMediaData {
  id: number;
  title: ITitleData;
}

interface ITitleData {
  romaji: string;
  english: string;
  native: string;
}

export interface IPage {
  total: number;
  currentPage: number;
  lastPage: number;
  hasNextPage: boolean;
  perPage: number;
}

export interface IResponseData {
  pageInfo: IPage;
  media: IMediaData[] | [];
}
