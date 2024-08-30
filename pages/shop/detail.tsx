import React, { ChangeEvent, useEffect, useState } from 'react';
import { Box, Button, CircularProgress, Stack, Typography } from '@mui/material';
import useDeviceDetect from '../../libs/hooks/useDeviceDetect';
import withLayoutFull from '../../libs/components/layout/LayoutFull';
import { NextPage } from 'next';
import Review from '../../libs/components/property/Review';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay, Navigation, Pagination } from 'swiper';
import PropertyBigCard from '../../libs/components/common/PropertyBigCard';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import WestIcon from '@mui/icons-material/West';
import EastIcon from '@mui/icons-material/East';
import { useMutation, useQuery, useReactiveVar } from '@apollo/client';
import { useRouter } from 'next/router';
import { Property } from '../../libs/types/property/property';
import moment from 'moment';
import { formatterStr } from '../../libs/utils';
import { REACT_APP_API_URL } from '../../libs/config';
import { userVar } from '../../apollo/store';
import { CommentInput, CommentsInquiry } from '../../libs/types/comment/comment.input';
import { Comment } from '../../libs/types/comment/comment';
import { CommentGroup } from '../../libs/enums/comment.enum';
import { Pagination as MuiPagination } from '@mui/material';
import Link from 'next/link';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import 'swiper/css';
import 'swiper/css/pagination';
import { GET_COMMENTS, GET_PROPERTIES, GET_PROPERTY } from '../../apollo/user/query';
import { T } from '../../libs/types/common';
import { Direction, Message } from '../../libs/enums/common.enum';
import { sweetErrorHandling, sweetMixinErrorAlert, sweetTopSmallSuccessAlert } from '../../libs/sweetAlert';
import { CREATE_COMMENT, LIKE_TARGET_PROPERTY } from '../../apollo/user/mutation';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import member from '../member';
import { Member } from '../../libs/types/member/member';
import { Margin } from '@mui/icons-material';

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

SwiperCore.use([Autoplay, Navigation, Pagination]);

export const getStaticProps = async ({ locale }: any) => ({
	props: {
		...(await serverSideTranslations(locale, ['common'])),
	},
});

const PropertyDetail: NextPage = ({ initialComment, ...props }: any) => {
	const device = useDeviceDetect();
	const router = useRouter();
	const user = useReactiveVar(userVar);
	const [propertyId, setPropertyId] = useState<string | null>(null);
	const [property, setProperty] = useState<Property | null>(null);
	const [slideImage, setSlideImage] = useState<string>('');
	const [destinationProperties, setDestinationProperties] = useState<Property[]>([]);
	const [commentInquiry, setCommentInquiry] = useState<CommentsInquiry>(initialComment);
	const [productComments, setproductComments] = useState<Comment[]>([]);
	const [commentTotal, setCommentTotal] = useState<number>(0);
	const [insertCommentData, setInsertCommentData] = useState<CommentInput>({
		commentGroup: CommentGroup.PROPERTY,
		commentContent: '',
		commentRefId: '',
	});
	const [topAgents, setTopAgents] = useState<Member[]>([]);

	/** APOLLO REQUESTS **/
	
	const [likeTargetProperty] = useMutation(LIKE_TARGET_PROPERTY);
	const [createComment] = useMutation(CREATE_COMMENT);


	const {
		loading: getPropertyLoading,
		data: getPropertyData,
		error: getPropertyError,
        refetch: getPropertyRefetch,
	 } = useQuery(GET_PROPERTY, {
		fetchPolicy: "network-only",
		variables:{input: propertyId},
		skip: !propertyId,
		notifyOnNetworkStatusChange: true,
		onCompleted:( data: T) => {
		  if(data?.getProperty) setProperty(data?.getProperty);
		  if(data?.getProperty) setSlideImage(data?.getProperty?.productImages[0]);

		},
	 });

	  /* my code */
	 const defaultQuantity = 1;
	 const [activeTab, setActiveTab] = useState("description");
     const [quantity, setQuantity] = useState(defaultQuantity);
   
	 const handleQuantityChange = (newQuantity: number) => {
	   if (newQuantity >= 1) {
		 setQuantity(newQuantity);
	   }
	 };

	 const handleTabChange = (eventKey: string | null) => {
	   if (eventKey) {
		 setActiveTab(eventKey);
	   }
	 };
	 const value = 4;
	 const valueOne = 3.5;
	 const valueTwo = 3;
	 const valueThree = 2.5;
	 const valueFour = 2;
     



	 const {
		loading: getPropertiesLoading,
		data: getPropertiesData,
		error: getPropertiesError,
        refetch: getPropertiesRefetch,
	 } = useQuery(GET_PROPERTIES, {
		fetchPolicy: 'cache-and-network',
		variables:{
			input: {
               page: 1,
			   limit: 4,
			   sort: 'createdAt',
			   direction: Direction.DESC,
			   search: {
				locationList:property?.propertyLocation ? [property?.propertyLocation] : [],
			   },
			},
		 },
		 skip: !propertyId && !property,
		notifyOnNetworkStatusChange: true,
		onCompleted:( data: T) => {
			if(data?.getProperties?.list) setDestinationProperties(data?.getProperties?.list)
		},
	 });

	 const {
		loading: getCommentsLoading,
		data: getCommentsData,
		error: getCommentsError,
        refetch: getCommentsRefetch,
	 } = useQuery(GET_COMMENTS, {
		fetchPolicy: "cache-and-network",
		variables:{
			input: initialComment },
		 skip: !commentInquiry.search.commentRefId,
		notifyOnNetworkStatusChange: true,
		onCompleted:( data: T) => {
			if(data?.getComments?.list) setproductComments(data?.getComments?.list),
			setCommentTotal(data?.getComments?.metaCounter[0]?.total ?? 0)
		},
	 });
	/** LIFECYCLES **/
	useEffect(() => {
		if (router.query.id) {
			setPropertyId(router.query.id as string);
			setCommentInquiry({
				...commentInquiry,
				search: {
					commentRefId: router.query.id as string,
				},
			});
			setInsertCommentData({
				...insertCommentData,
				commentRefId: router.query.id as string,
			});
		}
	}, [router]);

	useEffect(() => {
		if(commentInquiry.search.commentRefId) {
			getCommentsRefetch({input: commentInquiry});
		}
	}, [commentInquiry]);

	/** HANDLERS **/

	const changeImageHandler = (image: string) => {
		setSlideImage(image);
	};

	const likePropertyHandler = async(user: T, id: string) => {
		try{
			if(!id) return;
			if(!user._id) throw new Error(Message.NOT_AUTHENTICATED);

			// execute likeTargetProperty Mutation
			await likeTargetProperty(
				{variables: {input: id}}
			);
		     await getPropertyRefetch({
				variables: {input: propertyId}
			 })
			await getPropertiesRefetch({
				input: {
					page: 1,
					limit: 4,
					sort: "productViews",
					direction: Direction.DESC,
					search: {
					 locationList: [property?.propertyLocation]
					},
			},
		});
             await sweetTopSmallSuccessAlert("success", 400);
		} catch (err: any) {
			console.log('ERROR, likePropertyHandler ', err.message);
			sweetMixinErrorAlert(err.message).then();
		}
	}



	const commentPaginationChangeHandler = async (event: ChangeEvent<unknown>, value: number) => {
		commentInquiry.page = value;
		setCommentInquiry({ ...commentInquiry });
	};

	const createCommentHandler = async () => {
        try{
			if(!user._id) throw new Error(Message.NOT_AUTHENTICATED)
			 await createComment({variables: { input: insertCommentData } });
            
			setInsertCommentData({...insertCommentData, commentContent: "" });

			await getCommentsRefetch({ input: commentInquiry });
		} catch(err: any) {
            await sweetErrorHandling(err);
		}
	};

	if(getPropertyLoading) {
		return(<Stack
	     sx={{ display: "flex", justifyContent: "center", alignItems:"center", width: '100%', height: "1080px" }} 	
		>
			<CircularProgress  />
		</Stack>)
	}

	if (device === 'mobile') {
		return <div>PROPERTY DETAIL PAGE</div>;
	} else {
		return (
			<div id={'property-detail-page'}>
				<div className={'container'}>
					<Stack className={'property-detail-config'}>
						<Stack className={'property-info-config'}>
							<Stack className={'info'}>
							
								<Stack className={'left-box'}>
								
          <div className="col-lg-4 col-md-6 col-12 col-xxs-12">
            <div className="fz-product-details__img-slider"> {/*  */}
			<Stack className={'main-image'}>
			<img
			 src={slideImage ? `${REACT_APP_API_URL}/${slideImage}` : '/img/property/bigImage.png'}
			 alt={'main-image'}
			 style={{width: "336px", height:"336px", marginBottom:"20px"}}
			 />
			</Stack>
    <Stack className="main-title">
		<h2 className="fz-product-details__title">{property?.productStatus}</h2>
  

      <div className="fz-product-details__infos">
        <ul>
   
           <li>
		   <span className="info-property"> Product Namw: </span>   
		   <span className="price">{property?.productName}</span>
		   </li>

		<li>
            <span className="info-property"> Product Price: </span> 
            <span className="info-value">${property?.productPrice}</span>
          </li>

      
          <li>
            <span className="info-property"> Product Type: </span> 
            <span className="info-value">{property?.propertyType}</span>
          </li>
        </ul>
      </div>
	  <h6>
			Product Ingedrent:
		</h6>
      <p className="fz-product-details__short-descr">
	    Each controller comes with adjustable in-built dual shock mechanism.
        They can be toggled on/off and shock setting of 1,2 and 3 Auxiliary
        buttons around the home button enable more key bindings to be
        designated.
      </p>
	  {/* increise and decrimense */}
	  <div >
       
	  <div className="fz-product-details__quantity cart-product__quantity">
        <button
          className="minus-btn cart-product__minus"
          onClick={() => handleQuantityChange(quantity - 1)}
        >
        <RemoveIcon/>
        </button>
        <input
          type="number"
          name="product-quantity"
          className="cart-product-quantity-input"
          value={quantity}
          onChange={(e) =>
            handleQuantityChange(Math.max(1, parseInt(e.target.value)))
          }
          min="1"
        />
        <button
          className="plus-btn cart-product__plus"
          onClick={() => handleQuantityChange(quantity + 1)}
        >
         <AddIcon/>
        </button>
		<button className="fz-product-details__add-to-cart">Add to cart</button>
		<Box className="button-box">
			{property?.meLiked && property?.meLiked[0]?.myFavorite ? (
			<FavoriteIcon color="primary" fontSize={'medium'} />
			) : (
			<FavoriteBorderIcon
			fontSize={'medium'}
			// @ts-ignore
			onClick={() => likePropertyHandler(user, property?._id)}
			/>
			)}
			 
			 <Box classname="removeIcon">
			 <RemoveRedEyeIcon fontSize="medium" style={{Margin: 10}} />
			</Box>
		</Box>
      </div>
	  

	  </div>
	  
	  <div className="fz-product-details__payment-methods">
        <img src="/img/banner/fz-10-payment.png" alt="Pyament Methods" />
		
        <span className="dialog">Guaranteed safe & secure checkout</span>
      </div>
	</Stack>
			
							
		  {/*  */}
          </div>

          <div className="col-lg-8 col-md-6">
            
          </div>

       
        </div>  

		<Stack className={'floor-plans-config'}>
									<Typography className={'title'} ><span style={{fontSize:"20px", fontWeight:"600"}}>Cake Shape and Size</span></Typography>
									<Stack className={'image-box'}  >
										<img src={'/img/banner/cake-sze.webp'} alt={'image'} style={{width: "100%", height:"800px", marginTop:"20px", marginBottom: "20px"}} />
									</Stack>
								</Stack>
		
		{commentTotal !== 0 && (
									<Stack className={'reviews-config'}>
										<Stack className={'filter-box'}>
											<Stack className={'review-cnt'}>
												<svg xmlns="http://www.w3.org/2000/svg" width="16" height="12" viewBox="0 0 16 12" fill="none">
													<g clipPath="url(#clip0_6507_7309)">
														<path
															d="M15.7183 4.60288C15.6171 4.3599 15.3413 4.18787 15.0162 4.16489L10.5822 3.8504L8.82988 0.64527C8.7005 0.409792 8.40612 0.257812 8.07846 0.257812C7.7508 0.257812 7.4563 0.409792 7.32774 0.64527L5.57541 3.8504L1.14072 4.16489C0.815641 4.18832 0.540363 4.36035 0.438643 4.60288C0.337508 4.84586 0.430908 5.11238 0.676772 5.28084L4.02851 7.57692L3.04025 10.9774C2.96794 11.2275 3.09216 11.486 3.35771 11.636C3.50045 11.717 3.66815 11.7575 3.83643 11.7575C3.98105 11.7575 4.12577 11.7274 4.25503 11.667L8.07846 9.88098L11.9012 11.667C12.1816 11.7979 12.5342 11.7859 12.7992 11.636C13.0648 11.486 13.189 11.2275 13.1167 10.9774L12.1284 7.57692L15.4801 5.28084C15.7259 5.11238 15.8194 4.84641 15.7183 4.60288Z"
															fill="#181A20"
														/>
													</g>
													<defs>
														<clipPath id="clip0_6507_7309">
															<rect width="15.36" height="12" fill="white" transform="translate(0.398438)" />
														</clipPath>
													</defs>
												</svg>
												<Typography className={'reviews'}>{commentTotal} reviews</Typography>
											</Stack>
										</Stack>
										<Stack className={'review-list'}>
											{productComments?.map((comment: Comment) => {
												return <Review comment={comment} key={comment?._id} />;
											})}
											<Box component={'div'} className={'pagination-box'}>
												<MuiPagination
													page={commentInquiry.page}
													count={Math.ceil(commentTotal / commentInquiry.limit)}
													onChange={commentPaginationChangeHandler}
													shape="circular"
													color="primary"
												/>
											</Box>
										</Stack>
									</Stack>
								)}
								<Stack className={'leave-review-config'}>
									<Typography className={'main-title'}>Leave A Review</Typography>
									<Typography className={'review-title'}>Review</Typography>
									<textarea
										onChange={({ target: { value } }: any) => {
											setInsertCommentData({ ...insertCommentData, commentContent: value });
										}}
										value={insertCommentData.commentContent}
									></textarea>
									<Box className={'submit-btn'} component={'div'}>
										<Button
											className={'submit-review'}
											disabled={insertCommentData.commentContent === '' || user?._id === ''}
											onClick={createCommentHandler}
										>
											<Typography className={'title'}>Submit Review</Typography>
											<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
												<g clipPath="url(#clip0_6975_3642)">
													<path
														d="M16.1571 0.5H6.37936C6.1337 0.5 5.93491 0.698792 5.93491 0.944458C5.93491 1.19012 6.1337 1.38892 6.37936 1.38892H15.0842L0.731781 15.7413C0.558156 15.915 0.558156 16.1962 0.731781 16.3698C0.818573 16.4566 0.932323 16.5 1.04603 16.5C1.15974 16.5 1.27345 16.4566 1.36028 16.3698L15.7127 2.01737V10.7222C15.7127 10.9679 15.9115 11.1667 16.1572 11.1667C16.4028 11.1667 16.6016 10.9679 16.6016 10.7222V0.944458C16.6016 0.698792 16.4028 0.5 16.1571 0.5Z"
														fill="#181A20"
													/>
												</g>
												<defs>
													<clipPath id="clip0_6975_3642">
														<rect width="16" height="16" fill="white" transform="translate(0.601562 0.5)" />
													</clipPath>
												</defs>
											</svg>
										</Button>
									</Box>
								</Stack>  
 

								</Stack>
								<Stack className={'right-box'}>
									<Stack className="buttons">
										<Stack className="button-box">
										
										</Stack>
								
									</Stack>
									
								</Stack>
							</Stack>
							
						</Stack>
						<Stack className={'property-desc-config'}>
							 {/* review */}

							 <div className="fz-product-details__review">
      <div className="review-overview">
	 </div>

	 

    </div>
						
						</Stack>
						{destinationProperties.length !== 0 && (
							<Stack className={'similar-properties-config'}>
								<Stack className={'title-pagination-box'}>
									<Stack className={'title-box'}>
										<Typography className={'main-title'}>Destination Cakes</Typography>
										<Typography className={'sub-title'}>Aliquam lacinia diam quis lacus euismod</Typography>
									</Stack>
									<Stack className={'pagination-box'}>
										<WestIcon className={'swiper-similar-prev'} />
										<div className={'swiper-similar-pagination'}></div>
										<EastIcon className={'swiper-similar-next'} />
									</Stack>
								</Stack>
								<Stack className={'cards-box'}>
									<Swiper
										className={'similar-homes-swiper'}
										slidesPerView={'auto'}
										spaceBetween={35}
										modules={[Autoplay, Navigation, Pagination]}
										navigation={{
											nextEl: '.swiper-similar-next',
											prevEl: '.swiper-similar-prev',
										}}
										pagination={{
											el: '.swiper-similar-pagination',
										}}
									>
										{destinationProperties.map((property: Property) => {
											return (
												<SwiperSlide className={'similar-homes-slide'} key={property.productName}>
													<PropertyBigCard property={property} likePropertyHandler={likePropertyHandler} key={property?._id} />
												</SwiperSlide>
											);
										})}
									</Swiper>
								</Stack>
							</Stack>
						)}
					</Stack>
				</div>
			</div>
		);
	}
};

PropertyDetail.defaultProps = {
	initialComment: {
		page: 1,
		limit: 5,
		sort: 'createdAt',
		direction: 'DESC',
		search: {
			commentRefId: '',
		},
	},
};

export default withLayoutFull(PropertyDetail);
