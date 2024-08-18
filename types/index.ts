export type ProductType = {
  id: number;
  imgSrc: string;
  name: string;
  slug: string;
  category: string;
  price: number;
  isInWishlist: boolean;
  quantity: number;
  oldPrice: number;
  total: number;
  mainCategory: string;
};

export type BlogType = {
  id: number;
  imgSrc: string;
  category: string;
  date: string;
  title: string;
  slug: string;
  desc: string;
};

export interface SliderValueTypes {
  sliderOne: number;
  sliderTwo: number;
}
