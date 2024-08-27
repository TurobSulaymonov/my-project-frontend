import React from 'react';
import { Stack, Box, Divider, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Property } from '../../types/property/property';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { REACT_APP_API_URL } from '../../config';
import { useRouter } from 'next/router';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '../../../apollo/store';

interface TrendPropertyCardProps {
	property: Property;
	likePropertyHandler: any
}

const TrendPropertyCard = (props: TrendPropertyCardProps) => {
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
			<Stack className="trend-card-box" key={property._id}>
			<Box
				component={'div'}
				className={'card-img'}
				style={{ backgroundImage: `url(${REACT_APP_API_URL}/${property?.productImages[0]})` }}
				onClick={() => {pushDetailHandler(property._id)}}
			>  
				 

	   
			</Box>
		<Box component={'div'} className={'info'}>
			
				<strong className={'title'}
				onClick={() => {pushDetailHandler(property._id)}}
				>{property.productName}</strong>
				
			</Box> 
		</Stack>
		);
	} else {
		return (
			<Stack className="trend-card-box" key={property._id}>
				<Box
					component={'div'}
					className={'card-img'}
					style={{ backgroundImage: `url(${REACT_APP_API_URL}/${property?.productImages[0]})` }}
					onClick={() => {pushDetailHandler(property._id)}}
				>  
				 	

           
				</Box>
			<Box component={'div'} className={'info'}>
				
					<strong className={'title'}
					onClick={() => {pushDetailHandler(property._id)}}
					>{property.productName}</strong>
					
				</Box> 
			</Stack>
		);
	}
};

export default TrendPropertyCard;
