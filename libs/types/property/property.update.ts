import { PropertyLocation, ProductStatus, PropertyType } from '../../enums/property.enum';

export interface PropertyUpdate {
	_id: string;
	propertyType?: PropertyType;
	productStatus?: ProductStatus;
	propertyLocation?: PropertyLocation;
	productAddress?: string;
	productName?: string;
	productPrice?: number;
	propertySquare?: number;
	propertyBeds?: number;
	propertyRooms?: number;
	productImages?: string[];
	productDesc?: string;
	propertyBarter?: boolean;
	propertyRent?: boolean;
	soldAt?: Date;
	deletedAt?: Date;
	constructedAt?: Date;
}
