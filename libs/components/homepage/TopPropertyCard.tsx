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
		await router.push({pathname: `/property/detail`, query: {id: propertyId}})
	   }

	if (device === 'mobile') {
		return (
			<Stack className="top-card-box">
			
				 <div className="fz-4-single-product">
      <div className="fz-4-single-product-img">
	  <Box
					component={'div'}
					className={'card-img'}
					style={{ backgroundImage: `url(${REACT_APP_API_URL}/${property?.propertyImages[0]})` }}
					onClick={() => {pushDetailHandler(property._id)}}
				>
					<a role="button" className="view-like-box">
                         <IconButton color={'default'}>
								<RemoveRedEyeIcon />
							</IconButton>
							<Typography className="view-cnt">{property?.propertyViews}</Typography>
							<IconButton color={'default'} onClick={() => likePropertyHandler(user, property?._id)}>
								{property?.meLiked && property?.meLiked[0]?.myFavorite ? (
									<FavoriteIcon style={{ color: 'red' }} />
								) : (
									<FavoriteIcon />
								)}
							</IconButton>
							<Typography className="view-cnt">{property?.propertyLikes}</Typography>
							
							<ShoppingCartIcon className={'shop-icon'}/>
			
          </a>
				
				</Box>

      
      </div>
      <div className="fz-4-single-product-txt">
        <h5 className="fz-4-single-product-title">
          <Link href="#">{property.propertyTitle}</Link>
        </h5>
        <span className="fz-4-single-product-price">
          ${property.propertyPrice}.00<span className="prev-price">${property.propertyPrice}.00</span>
        </span>
      </div>
	 
    </div>
			</Stack>
		);
	} else {
		return (
			<Stack className="top-card-box">
			
				 <div className="fz-4-single-product">
      <div className="fz-4-single-product-img">
	  <Box
					component={'div'}
					className={'card-img'}
					style={{ backgroundImage: `url(${REACT_APP_API_URL}/${property?.propertyImages[0]})` }}
					onClick={() => {pushDetailHandler(property._id)}}
				>
					<a role="button" className="view-like-box">
                         <IconButton color={'default'}>
								<RemoveRedEyeIcon />
							</IconButton>
							<Typography className="view-cnt">{property?.propertyViews}</Typography>
							<IconButton color={'default'} onClick={() => likePropertyHandler(user, property?._id)}>
								{property?.meLiked && property?.meLiked[0]?.myFavorite ? (
									<FavoriteIcon style={{ color: 'red' }} />
								) : (
									<FavoriteIcon />
								)}
							</IconButton>
							<Typography className="view-cnt">{property?.propertyLikes}</Typography>
							
							<ShoppingCartIcon className={'shop-icon'}/>
			
          </a>
				
				</Box>

      
      </div>
      <div className="fz-4-single-product-txt">
        <h5 className="fz-4-single-product-title">
          <Link href="#">{property.propertyTitle}</Link>
        </h5>
        <span className="fz-4-single-product-price">
          ${property.propertyPrice}.00<span className="prev-price">${property.propertyPrice}.00</span>
        </span>
      </div>
	 
    </div>
			</Stack>
		);
	}
};

export default TopPropertyCard;
