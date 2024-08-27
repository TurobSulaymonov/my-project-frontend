import React from 'react';
import { Stack, Box, Divider, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Property } from '../../types/property/property';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { REACT_APP_API_URL } from '../../config';
import { useRouter } from 'next/router';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '../../../apollo/store';
import Link from 'next/link';

interface TopPropertyCardProps {
	property: Property;
	likePropertyHandler: any
}

const TopPropertyCard = (props: TopPropertyCardProps) => {
	const { property, likePropertyHandler } = props;
	const device = useDeviceDetect();
	const router = useRouter();
	const user = useReactiveVar(userVar);

	/** HANDLERS **/

	const pushDetailHandler = async (propertyId: string) => {
		console.log("id:", propertyId);
		await router.push({pathname: `/shop/detail`, query: {id: propertyId}})
	   }

	if (device === 'mobile') {
		return (
			<Stack className="top-card-box">
			<div className="fz-7-product">
      <div className="fz-7-product-img">
        <img src={`${REACT_APP_API_URL}/${property?.productImages[0]}`} alt="Product Image"   style={{width:"326px", height:"326px"}} />
      </div>

      <div className="fz-7-product-txt" style={{marginLeft: "-30px"}}>
        <h6 className="fz-7-product-cat">{property.productStatus}</h6>
        <h4 className="fz-7-product-title">
          <Link href={"/shop/detail"}>{property.productName}</Link>
        </h4>
        <span className="fz-7-product-price">${property.productName}</span>
        <div className="fz-7-product-actions">
          <button type="button" className="add-to-cart-btn">
            Add To Cart  
          </button>
          <div className="right">
            <button type="button" className="add-to-wishlist-btn">
              <i className="fa-light fa-heart"></i>
            </button>
            <button type="button" className="fz-quick-view">
              <i className="fa-light fa-eye"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
			</Stack>
		);
	} else {
		return (
			<Stack className="top-card-box">
			<div className="fz-7-product">
      <div className="fz-7-product-img">
        <img src={`${REACT_APP_API_URL}/${property?.productImages[0]}`} alt="Product Image"   style={{width:"326px", height:"326px"}} />
      </div>

      <div className="fz-7-product-txt" style={{marginLeft: "-30px"}}>
        <h6 className="fz-7-product-cat">{property.productStatus}</h6>
        <h4 className="fz-7-product-title">
          <Link href={"/shop/detail"}>{property.productName}</Link>
        </h4>
        <span className="fz-7-product-price">${property.productName}</span>
        <div className="fz-7-product-actions">
          
		  <Link href={"/shop/detail"}>
		  <button type="button" className="add-to-cart-btn">
            Add To Cart  
          </button>
		  </Link>
          <div className="right">
            <button type="button" className="add-to-wishlist-btn">
              <i className="fa-light fa-heart"></i>
            </button>
            <button type="button" className="fz-quick-view">
              <i className="fa-light fa-eye"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
			</Stack>
		);
	}
};

export default TopPropertyCard;
