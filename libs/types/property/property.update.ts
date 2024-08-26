import { PropertyLocation, ProductStatus, PropertyType, ProductSize } from '../../enums/property.enum';

export interface PropertyUpdate {
	_id: string;
	propertyType?: PropertyType;
	productStatus?: ProductStatus;
	propertyLocation?: PropertyLocation;
	productSize?: ProductSize;
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
