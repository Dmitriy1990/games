export interface Collections {
  novelty: number;
  popularity: number;
  slots: number;
  _hd: number;
  all: number;
}

export interface Idx {
  id: number;
}

export interface Real {
  BTC: Idx;
  ETH: Idx;
  LTC: Idx;
  DOG: Idx;
}

export interface SoftswissAztecMagic {
  title: string;
  provider: string;
  collections: Collections;
  real: Real;
  demo: string;
}

export interface RootGames {
  [elem: string]: SoftswissAztecMagic;
}

export type Sort = {
  provider: string;
  balType: string;
};
