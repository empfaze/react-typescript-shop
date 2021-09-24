export interface FetchedProduct {
  id: number;
  photo: string;
  price: number;
  rating: number;
  name: string;
  category: number;
  inCart: boolean;
  quantity: number;
}

export interface Products {
  backpacks: FetchedProduct[];
  messengerBags: FetchedProduct[];
  businessBags: FetchedProduct[];
}

export interface BackpacksPayload {
  payload: FetchedProduct[];
}
export interface MessengerBagsPayload {
  payload: FetchedProduct[];
}
export interface BusinessBagsPayload {
  payload: FetchedProduct[];
}
