import React from 'react';
import { Stack, Typography, Box, } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Property } from '../../types/property/property';
import Link from 'next/link';
import { formatterStr } from '../../utils';
import { REACT_APP_API_URL, topPropertyRank } from '../../config';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '../../../apollo/store';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import IconButton from '@mui/material/IconButton';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
interface PropertyCardType {
	property: Property;
	likePropertyHandler?: any;
	myFavorites?: boolean;
	recentlyVisited?: boolean;
}

const labels: { [index: string]: string } = {
	0.5: 'Useless',
	1: 'Useless+',
	1.5: 'Poor',
	2: 'Poor+',
	2.5: 'Ok',
	3: 'Ok+',
	3.5: 'Good',
	4: 'Good+',
	4.5: 'Excellent',
	5: 'Excellent+',
  };

const PropertyCard = (props: PropertyCardType) => {
	 const value = 3.5;
	const { property, likePropertyHandler, myFavorites, recentlyVisited } = props;
	const device = useDeviceDetect();
	const user = useReactiveVar(userVar);
	const imagePath: string = property?.propertyImages[0]
		? `${REACT_APP_API_URL}/${property?.propertyImages[0]}`
		: '/img/banner/header1.svg';

	if (device === 'mobile') {
		return <div>PROPERTY CARD</div>;
	} else {
		return (
			<Stack className="card-config">
				<Stack className="top">
					<Link
						href={{
							pathname: '/property/detail',
							query: { id: property?._id },
						}}
					>
						<img src={imagePath} alt="" />
					</Link>
					{property && property?.propertyRank > topPropertyRank && (
						<Box component={'div'} className={'top-badge'}>
							<img src="/img/icons/electricity.svg" alt="" />
							<Typography>TOP</Typography>
						</Box>
					)}
					<Box component={'div'} className={'price-box'}>
						<Typography>{property.propertyRank}</Typography>
					</Box>
				</Stack>
				<Stack className="col-xl-4 col-md-4 col-6 col-xxs-12" key={property._id}>
             
			  {/* 8888888888888 */}

			  <div className="col-xl-4 col-md-4 col-6 col-xxs-12" key={property._id}>
              <div className="fz-1-single-product">
                <div className="fz-single-product__img">
              {/* // <img src={item.imgSrc} alt={item.name} />    */}
               
                </div>

                <div className="fz-single-product__txt">
                  <span className="fz-single-product__category list-view-text">
                    {property.propertyStatus}
                  </span>
                  <Link
                    href={`/property/detail`}
                    className="fz-single-product__title"
                  >
                    {property.propertyTitle}
                  </Link>
                  <div className="fz-single-product__price-rating">
                    <p className="fz-single-product__price">
                      <span className="current-price">${property.propertyPrice}</span>
                    </p>

                    <div className="rating list-view-text">
					<Rating
						name="text-feedback"
						value={value}
						readOnly
						precision={0.5}
						emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
						/>
                    </div>
                  </div>

                  <p className="fz-single-product__desc list-view-text">
                    2021 Latest G5 3200DPI Gaming Mouse 7-Color RGB Breathing
                    Led Light for Notebook Laptop/PC RGB Backlit Universal.
                  </p>

                  <div className="fz-single-product__actions list-view-text">
                    <button
                      className="fz-add-to-wishlist-btn"
                      
                    >
                     
                      <span className="btn">
					  <IconButton color={'default'} onClick={() => likePropertyHandler(user, property?._id)}>
								{property?.meLiked && property?.meLiked[0]?.myFavorite ? (
									<FavoriteIcon style={{ color: 'red' }} />
								) : (
									<FavoriteIcon />
								)}
							</IconButton>
                      </span>
                    </button>

                    <button
                      className="fz-add-to-cart-btn"
                     
                    >
                     
                      <span className="btn" color='default'>
                       <ShoppingCartIcon />
                      </span>
                    </button>

                    <button className="btn btn-success">
                      
                      <span className="btn-icon">
					  <IconButton color={'default'}>
								<RemoveRedEyeIcon />
							</IconButton>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            </Stack>
			</Stack>
		);
	}
};

export default PropertyCard;


	