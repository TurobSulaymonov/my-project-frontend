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
					style={{ backgroundImage: `url(${REACT_APP_API_URL}/${property?.propertyImages[0]})` }}
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
                      
					<div className={'price'}>${property.propertyPrice}</div>
				</Box>
				<Box component={'div'} className={'info'}>
					<strong className={'title'}
					onClick={() => {pushDetailHandler(property._id)}}
					>{property.propertyTitle}</strong>
					<p className={'desc'}>{property.propertyAddress}</p>
					<div className={'options'}>
						<div>
							<img src="/img/icons/bed.svg" alt="" />
							<span>{property?.propertyBeds} bed</span>
						</div>
						<div>
							<img src="/img/icons/room.svg" alt="" />
							<span>{property?.propertyRooms} rooms</span>
						</div>
						<div>
							<img src="/img/icons/expand.svg" alt="" />
							<span>{property?.propertySquare} m2</span>
						</div>
					</div>
					<Divider sx={{ mt: '15px', mb: '17px' }} />
					<div className={'bott'}>
						<p>{property?.propertyRent ? 'rent' : 'sale'}</p>
						<div className="view-like-box">
							<IconButton color={'default'}>
								<RemoveRedEyeIcon />
							</IconButton>
							<Typography className="view-cnt">{property?.propertyViews}</Typography>
						</div>
					</div>
				</Box>
			</Stack>
		);
	*/}  else {
		return (
			<Stack className="popular-card-box">
				{/* <Box
					component={'div'}
					className={'card-img'}
					//style={{ backgroundImage: `url(${REACT_APP_API_URL}/${property?.propertyImages[0]})` }}
					onClick={() => {pushDetailHandler(property._id)}}
				> 
				  <img src='/img/banner/fz-product-3.png'/>
					{property?.propertyRank && property?.propertyRank >= 50 ? (
						<div className={'status'}>
							<img src="/img/icons/electricity.svg" alt="" />
							
						</div>
					) : (
						''
					)}


				</Box> */}
				{/* <Box component={'div'} className={'info'}>
					<strong className={'title'}
					 onClick={() => {pushDetailHandler(property._id)}}
					><Link href={'/property'}>{property.propertyTitle}</Link></strong>
					<p className={'desc'}>{property.propertyAddress}</p>
					
					<div className={'price'}>${property.propertyPrice}</div>

					<Divider sx={{ mt: '15px', mb: '17px' }} />
					<div className={'bott'}>
						<Button>Add to Cart</Button>
						<div className="view-like-box">
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
						</div>
					</div>
				</Box> */}
				<div className="fz-3-single-product__img">
                <img src={`${REACT_APP_API_URL}/${property?.propertyImages[0]}`} alt="Product Image" />
                <div className="fz-3-single-product__actions">
                  <div className="top-actions">
				{/*   <div className="view-li-box">
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
						</div> */}
                  </div>
                  <div className="bottom-actions">
                    <Button
					variant="outlined"
                      className="fz-3-add-to-cart"
                     // onClick={() => addToCakeCart(item.id)}
                    >
                      Add to cart
                    </Button>
                    <Button variant="outlined"
                      className="fz-3-quick-view"
                     // onClick={handleProductViewOpen}
                    >
                   <div className="fz-3-quick-view ">
						

							<IconButton color={'default'} onClick={() => likePropertyHandler(user, property?._id)}>
								{property?.meLiked && property?.meLiked[0]?.myFavorite ? (
									<FavoriteIcon style={{ color: 'red' }} />
								) : (
									<FavoriteIcon />
								)}
							</IconButton>
							<Typography className="view-cnt">{property?.propertyLikes}</Typography>
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
                  {property.propertyTitle}
                </Link>
                <p className="fz-3-single-product__price">
                  <span className="current-price">${property.propertyPrice}</span>
                  <span className="prev-price text-decoration-line-through">
                    ${property.propertyPrice}
                  </span>
                </p>
              </div>
			</Stack>
		);
	}
};

export default PopularPropertyCard;
