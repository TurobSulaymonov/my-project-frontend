import { PropertyLocation, ProductStatus, PropertyType } from '../../enums/property.enum';
import { Member } from '../member/member';

export interface MeLiked {
	memberId: string;
	likeRefId: string;
	myFavorite: boolean;
}

export interface TotalCounter {
	total: number;
}

export interface Property {
	_id: string;
	propertyType: PropertyType;
	productStatus: ProductStatus;
	propertyLocation: PropertyLocation;
	productAddress: string;
	productName: string;
	productPrice: number;
	propertySquare: number;
	propertyBeds: number;
	propertyRooms: number;
	productViews: number;
	productLikes: number;
	productComments: number;
	propertyRank: number;
	productImages: string[];
	productDesc?: string;
	propertyBarter: boolean;
	propertyRent: boolean;
	memberId: string;
	soldAt?: Date;
	deletedAt?: Date;
	constructedAt?: Date;
	createdAt: Date;
	updatedAt: Date;
	/** from aggregation **/
	meLiked?: MeLiked[];
	memberData?: Member;
}

export interface Properties {
	list: Property[];
	metaCounter: TotalCounter[];
}
