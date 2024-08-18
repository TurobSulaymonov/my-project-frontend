import React, { useState } from 'react';
import { Stack, Box } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper';
import WestIcon from '@mui/icons-material/West';
import EastIcon from '@mui/icons-material/East';
import PopularPropertyCard from './PopularPropertyCard';
import { Property } from '../../types/property/property';
import Link from 'next/link';
import { PropertiesInquiry } from '../../types/property/property.input';
import { GET_PROPERTIES } from '../../../apollo/user/query';
import { useMutation, useQuery } from '@apollo/client';
import { T } from '../../types/common';
import { LIKE_TARGET_PROPERTY } from '../../../apollo/user/mutation';
import { Message } from '../../enums/common.enum';
import { sweetMixinErrorAlert, sweetTopSmallSuccessAlert } from '../../sweetAlert';

interface PopularPropertiesProps {
	initialInput: PropertiesInquiry;
}

const PopularProperties = (props: PopularPropertiesProps) => {
	const { initialInput } = props;
	const device = useDeviceDetect();
	const [popularProperties, setPopularProperties] = useState<Property[]>([]);

	/** APOLLO REQUESTS **/
	const [likeTargetProperty] = useMutation(LIKE_TARGET_PROPERTY);
	const {
		loading: getPopularPropertiesLoading,
		data: getPopularPropertiesData,
		error: getPopularPropertiesError,
        refetch: getPopularPropertiesRefetch,
	 } = useQuery(GET_PROPERTIES, {
		fetchPolicy: "cache-and-network",
		variables:{input: initialInput},
		notifyOnNetworkStatusChange: true,
		onCompleted:( data: T) => {
			setPopularProperties(data?.getProperties?.list);
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
			await getPopularPropertiesRefetch({input: initialInput});
             await sweetTopSmallSuccessAlert("success", 400);
		} catch (err: any) {
			console.log('ERROR, likePropertyHandler ', err.message);
			sweetMixinErrorAlert(err.message).then();
		}
	}

	if (!popularProperties) return null;

	if (device === 'mobile') {
		return (
			<Stack className={'popular-properties'}>
				<Stack className={'container'}>
					<Stack className={'info-box'}>
						<span>Browse By Type of Cake</span>
					</Stack>
					<Stack className={'card-box'}>
						<Swiper
							className={'popular-property-swiper'}
							slidesPerView={'auto'}
							centeredSlides={true}
							spaceBetween={25}
							modules={[Autoplay]}
						>
							{popularProperties.map((property: Property) => {
								return (
									<SwiperSlide key={property._id} className={'popular-property-slide'}>
										<PopularPropertyCard property={property}  likePropertyHandler={likePropertyHandler} />
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
			<Stack className={'popular-properties py-120'}>
				<Stack className={'container'}>
					<Stack className={'info-box-1 d-flex flex-column flex-md-row justify-content-between align-items-center align-items-md-end'}>
						<Box component={'div'} className={'left'}>
							<span>Layer Cakes</span>
							<p>True Pound Cake is a recipe that dates</p>
						</Box>
						<Box component={'div'} className={'right'}>
							<div className={'more-box'}>
								<Link href={'/property'}>
									<span>See All Categories</span>
								</Link>
								<img src="/img/icons/rightup.svg" alt="" />
							</div>
						</Box>
					</Stack>
					<Stack className={'card-box'}>
						<Swiper
							className={'popular-property-swiper'}
							slidesPerView={'auto'}
							spaceBetween={25}
	
							navigation={{
								nextEl: '.swiper-popular-next',
								prevEl: '.swiper-popular-prev',
							}}
							pagination={{
								el: '.swiper-popular-pagination',
							}}
							breakpoints={{
								0: {
								  slidesPerView: 1,
								  spaceBetween: 20,
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
								1200: {
								  spaceBetween: 30,
								},
							  }}
							  modules={[Autoplay, Navigation, Pagination]}
						>
							{popularProperties.map((property: Property) => {
								return (
									<SwiperSlide key={property._id} className={'popular-property-slide'}>
										<PopularPropertyCard property={property} likePropertyHandler={likePropertyHandler} />
									</SwiperSlide>
								);
							})}
						</Swiper>
					</Stack>
					<Stack className={'pagination-box'}>
						<WestIcon className={'swiper-popular-prev'} />
						<div className={'swiper-popular-pagination'}></div>
						<EastIcon className={'swiper-popular-next'} />
					</Stack>
				</Stack>
			</Stack>
		);
	}
};

PopularProperties.defaultProps = {
	initialInput: {
		page: 1,
		limit: 7,
		sort: 'propertyViews',
		direction: 'DESC',
		search: {},
	},
};

export default PopularProperties;
