import React from 'react';
import { Stack, Box, Divider, Typography, Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { Property } from '../../types/property/property';
import FavoriteIcon from '@mui/icons-material/Favorite';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { REACT_APP_API_URL, topPropertyRank } from '../../config';
import { useRouter } from 'next/router';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '../../../apollo/store';
import Link from 'next/link';

interface PopularPropertyCardProps {
	property: Property;
	likePropertyHandler: any
}

const PopularPropertyCard = (props: PopularPropertyCardProps) => {
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
	/* 	return (
			<Stack className="popular-card-box">
				<Box
					component={'div'}
					className={'card-img'}
					style={{ backgroundImage: `url(${REACT_APP_API_URL}/${property?.productImages[0]})` }}
					onClick={() => {pushDetailHandler(property._id)}}
				>
					{property && property?.propertyRank >= topPropertyRank ? (
						<div className={'status'}>
							<img src="/img/icons/electricity.svg" alt="" />
							<span>top</span>
						</div>
					) : (
						''
					)}
                      
					<div className={'price'}>${property.productPrice}</div>
				</Box>
				<Box component={'div'} className={'info'}>
					<strong className={'title'}
					onClick={() => {pushDetailHandler(property._id)}}
					>{property.productName}</strong>
					<p className={'desc'}>{property.productAddress}</p>
					<div className={'options'}>
						<div>
							<img src="/img/icons/bed.svg" alt="" />
							<span>{property?.productLeftCount} bed</span>
						</div>
						<div>
							<img src="/img/icons/room.svg" alt="" />

						</div>
						<div>
							<img src="/img/icons/expand.svg" alt="" />
							<span>{property?.productWeight} m2</span>
						</div>
					</div>
					<Divider sx={{ mt: '15px', mb: '17px' }} />
					<div className={'bott'}>
						<p>{property?.fruitCake ? 'rent' : 'sale'}</p>
						<div className="view-like-box">
							<IconButton color={'default'}>
								<RemoveRedEyeIcon />
							</IconButton>
							<Typography className="view-cnt">{property?.productViews}</Typography>
						</div>
					</div>
				</Box>
			</Stack>
		);
	*/}  else {
		return (
			<Stack className="popular-card-box">
				
				<div className="fz-3-single-product__img">
                <img src={`${REACT_APP_API_URL}/${property?.productImages[0]}`} alt="Product Image"  style={{width:"380px", height:"350px"}}/>
                <div className="fz-3-single-product__actions">
                  <div className="top-actions">
			
                  </div>
                  <div className="bottom-actions">
                    <Button
					variant="outlined"
                      className="fz-3-add-to-cart"
                 
                    >
                      Add to cart
                    </Button>
                    <Button variant="outlined"
                      className="fz-3-quick-view"
               
                    >
                   <div className="fz-3-quick-view ">
						

							<IconButton color={'default'} onClick={() => likePropertyHandler(user, property?._id)}>
								{property?.meLiked && property?.meLiked[0]?.myFavorite ? (
									<FavoriteIcon style={{ color: 'red' }} />
								) : (
									<FavoriteIcon />
								)}
							</IconButton>
						
						</div> 
                    </Button>
                  </div>
                </div>
              </div>

			  <div className="fz-3-single-product__txt">
                <Link
                  href={`/property/detail}`}
                  className="fz-3-single-product__title"
                >
                  {property.productName}
                </Link>
                <p className="fz-3-single-product__price">
                  <span className="current-price">${property.productPrice}</span>
                 
                </p>
              </div>
			</Stack>
		);
	}
};

export default PopularPropertyCard;
