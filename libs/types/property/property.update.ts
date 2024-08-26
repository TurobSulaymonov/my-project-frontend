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
	productWeight?: number;
	productLeftCount?: number;

	productImages?: string[];
	productDesc?: string;
	productChocolate?: boolean;
	fruitCake?: boolean;
	soldAt?: Date;
	deletedAt?: Date;
	constructedAt?: Date;
}
