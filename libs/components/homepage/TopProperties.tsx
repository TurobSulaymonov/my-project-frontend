import React, { useState } from 'react';
import { Stack, Box } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import WestIcon from '@mui/icons-material/West';
import EastIcon from '@mui/icons-material/East';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper';
import TopPropertyCard from './TopPropertyCard';
import { PropertiesInquiry } from '../../types/property/property.input';
import { Property } from '../../types/property/property';
import { GET_PROPERTIES } from '../../../apollo/user/query';
import { useMutation, useQuery } from '@apollo/client';
import { T } from '../../types/common';
import { LIKE_TARGET_PROPERTY } from '../../../apollo/user/mutation';
import { sweetMixinErrorAlert, sweetTopSmallSuccessAlert } from '../../sweetAlert';
import { Message } from '../../enums/common.enum';


interface TopPropertiesProps {
	initialInput: PropertiesInquiry;
}

const TopProperties = (props: TopPropertiesProps) => {
	const { initialInput } = props;
	const device = useDeviceDetect();
	const [topProperties, setTopProperties] = useState<Property[]>([]);

	/** APOLLO REQUESTS **/
	const [likeTargetProperty] = useMutation(LIKE_TARGET_PROPERTY);

	const {
		loading: getTopPropertiesLoading,
		data: getTopPropertiesData,
		error: getTopPropertiesError,
        refetch: getTopPropertiesRefetch,
	 } = useQuery(GET_PROPERTIES, {
		fetchPolicy: "cache-and-network",
		variables:{input: initialInput},
		notifyOnNetworkStatusChange: true,
		onCompleted:( data: T) => {
			setTopProperties(data?.getProperties?.list);
		},
	 });

	/** HANDLERS **/

	const likePropertyHandler = async(user: T, id: string) => {
		try{
			if(!id) return;
			if(!user._id) throw new Error(Message.NOT_AUTHENTICATED);

			// execute likeTargetProperty Mutation
			await likeTargetProperty(
				{variables: {input: id}}
			);
			//execute getPropertiesRefetch
			await getTopPropertiesRefetch({input: initialInput});
             await sweetTopSmallSuccessAlert("success", 400);
		} catch (err: any) {
			console.log('ERROR, likePropertyHandler ', err.message);
			sweetMixinErrorAlert(err.message).then();
		}
	}

	if (device === 'mobile') {
		return (
			<Stack className={'top-properties'}>
				<Stack className={'container'}>
					<Stack className={'info-box'}>
						<span>Pound Cakes</span>
					</Stack>
					<Stack className={'card-box'}>
						<Swiper
							className={'top-property-swiper'}
							slidesPerView={'auto'}
							centeredSlides={true}
							spaceBetween={15}
							modules={[Autoplay]}
						>
							{topProperties.map((property: Property) => {
								return (
									<SwiperSlide className={'top-property-slide'} key={property?._id}>
										 <TopPropertyCard property={property} likePropertyHandler={likePropertyHandler} />
									</SwiperSlide>
								);
							})}
						</Swiper>
					</Stack>
				</Stack>
			</Stack>
		);
	} else {
		return (
			<Stack className={'top-properties'}>
				<Stack className={'container'}>
					<Stack className={'info-box'}>
						<Box component={'div'} className={'left'}>
							<span>Pound Cakes</span>
							<p>True Pound Cake is a recipe that dates</p>
						</Box>
						<Box component={'div'} className={'right'}>
							
						</Box>
					</Stack>
					<Stack className={'card-box'}>
					   <Swiper
							className={'top-property-swiper'}
							slidesPerView={4}
							spaceBetween={15}
							navigation={{
								prevEl: ".fz-4-prev",
								nextEl: ".fz-4-next",
							}}
							modules={[Navigation]}
							breakpoints={{
								0: {
								slidesPerView: 1,
								},

								480: {
								slidesPerView: 2,
								},

								768: {
								slidesPerView: 3,
								},

								992: {
								slidesPerView: 4,
								},
							}}
							>
						            {topProperties.map((property: Property) => {
													return (
														<SwiperSlide className={'top-property-slide'} key={property?._id}>
															<TopPropertyCard property={property} likePropertyHandler={likePropertyHandler} />
														</SwiperSlide>
													);
												})}
							</Swiper>
					</Stack>
				</Stack>
			</Stack>
		);
	}
};

TopProperties.defaultProps = {
	initialInput: {
		page: 1,
		limit: 8,
		sort: 'propertyRank',
		direction: 'DESC',
		search: {},
	},
};

export default TopProperties;
