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
      <div className="fz-product-details__price-rating">
        <span className="price">{property?.productName}</span>
      
      </div>

      <div className="fz-product-details__infos">
        <ul>

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
        <div className="average-rating-area">
          <h3>
            <span>4.3</span>
            <span>/5</span>
          </h3>
          <span className="rating-amount">24 ratings</span>
        </div>
        <div className="review-breakdown">
          <ul className="individual-star-breakdown">
            <li className="star">
			<Box
      sx={{
        width: 200,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Rating
        name="text-feedback"
        value={value}
        readOnly
        precision={0.5}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      <Box sx={{ ml: 2 }}></Box>
    </Box>
            </li>
            <li>
              <div className="bar">
                <div className="filled"></div>
              </div>
            </li>
            <li>
              <div className="each-star-amount">320</div>
            </li>
          </ul>

          <ul className="individual-star-breakdown individual-star-breakdown-2">
            <li className="star">
			<Box
      sx={{
        width: 200,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Rating
        name="text-feedback"
        value={valueOne}
        readOnly
        precision={0.5}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      <Box sx={{ ml: 2 }}></Box>
    </Box>
            </li>
            <li>
              <div className="bar">
                <div className="filled"></div>
              </div>
            </li>
            <li>
              <div className="each-star-amount">250</div>
            </li>
          </ul>

          <ul className="individual-star-breakdown individual-star-breakdown-3">
		  <li className="star">
			<Box
      sx={{
        width: 200,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Rating
        name="text-feedback"
        value={valueThree}
        readOnly
        precision={0.5}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      <Box sx={{ ml: 2 }}></Box>
    </Box>
            </li>
            <li>
              <div className="bar">
                <div className="filled"></div>
              </div>
            </li>
            <li>
              <div className="each-star-amount">140</div>
            </li>
          </ul>

          <ul className="individual-star-breakdown individual-star-breakdown-4">
		  <li className="star">
			<Box
      sx={{
        width: 200,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Rating
        name="text-feedback"
        value={valueFour}
        readOnly
        precision={0.5}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      <Box sx={{ ml: 2 }}></Box>
    </Box>
            </li>
            <li>
              <div className="bar">
                <div className="filled"></div>
              </div>
            </li>
            <li>
              <div className="each-star-amount">83</div>
            </li>
          </ul>

          <ul className="individual-star-breakdown individual-star-breakdown-5">
		  <li className="star">
			<Box
      sx={{
        width: 200,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Rating
        name="text-feedback"
        value={valueThree}
        readOnly
        precision={0.5}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      <Box sx={{ ml: 2 }}></Box>
    </Box>
            </li>
            <li>
              <div className="bar">
                <div className="filled"></div>
              </div>
            </li>
            <li>
              <div className="each-star-amount">11</div>
            </li>
          </ul>
        </div>
	

	 </div>

	 

    </div>
	


	       
						{/* 	<Stack className={'right-config'}>
								<Stack className={'info-box'}>
									<Typography className={'main-title'}>Get More Information</Typography>
									<Stack className={'image-info'}>
										<img
											className={'member-image'}
											src={
												property?.memberData?.memberImage
													? `${REACT_APP_API_URL}/${property?.memberData?.memberImage}`
													: '/img/profile/defaultUser.svg'
											}
										/>
										<Stack className={'name-phone-listings'}>
											<Link href={`/member?memberId=${property?.memberData?._id}`}>
												<Typography className={'name'}>{property?.memberData?.memberNick}</Typography>
											</Link>
											<Stack className={'phone-number'}>
												<svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
													<g clipPath="url(#clip0_6507_6774)">
														<path
															d="M16.2858 10.11L14.8658 8.69C14.5607 8.39872 14.1551 8.23619 13.7333 8.23619C13.3115 8.23619 12.9059 8.39872 12.6008 8.69L12.1008 9.19C11.7616 9.528 11.3022 9.71778 10.8233 9.71778C10.3444 9.71778 9.88506 9.528 9.54582 9.19C9.16082 8.805 8.91582 8.545 8.67082 8.29C8.42582 8.035 8.17082 7.76 7.77082 7.365C7.43312 7.02661 7.24347 6.56807 7.24347 6.09C7.24347 5.61193 7.43312 5.15339 7.77082 4.815L8.27082 4.315C8.41992 4.16703 8.53822 3.99099 8.61889 3.79703C8.69956 3.60308 8.741 3.39506 8.74082 3.185C8.739 2.76115 8.57012 2.35512 8.27082 2.055L6.85082 0.625C6.44967 0.225577 5.9069 0.000919443 5.34082 0C5.06197 0.000410905 4.78595 0.0558271 4.52855 0.163075C4.27116 0.270322 4.03745 0.427294 3.84082 0.625L2.48582 1.97C1.50938 2.94779 0.960937 4.27315 0.960938 5.655C0.960937 7.03685 1.50938 8.36221 2.48582 9.34C3.26582 10.12 4.15582 11 5.04082 11.92C5.92582 12.84 6.79582 13.7 7.57082 14.5C8.5484 15.4749 9.87269 16.0224 11.2533 16.0224C12.6339 16.0224 13.9582 15.4749 14.9358 14.5L16.2858 13.15C16.6828 12.7513 16.9073 12.2126 16.9108 11.65C16.9157 11.3644 16.8629 11.0808 16.7555 10.8162C16.6481 10.5516 16.4884 10.3114 16.2858 10.11ZM15.5308 12.375L15.3858 12.5L13.9358 11.045C13.8875 10.99 13.8285 10.9455 13.7623 10.9142C13.6961 10.8829 13.6243 10.8655 13.5511 10.8632C13.478 10.8608 13.4051 10.8734 13.337 10.9003C13.269 10.9272 13.2071 10.9678 13.1554 11.0196C13.1036 11.0713 13.0631 11.1332 13.0361 11.2012C13.0092 11.2693 12.9966 11.3421 12.999 11.4153C13.0014 11.4884 13.0187 11.5603 13.05 11.6265C13.0813 11.6927 13.1258 11.7517 13.1808 11.8L14.6558 13.275L14.2058 13.725C13.4279 14.5005 12.3743 14.936 11.2758 14.936C10.1774 14.936 9.12372 14.5005 8.34582 13.725C7.57582 12.955 6.70082 12.065 5.84582 11.175C4.99082 10.285 4.06582 9.37 3.28582 8.59C2.51028 7.81209 2.0748 6.75845 2.0748 5.66C2.0748 4.56155 2.51028 3.50791 3.28582 2.73L3.73582 2.28L5.16082 3.75C5.26027 3.85277 5.39648 3.91182 5.53948 3.91417C5.68247 3.91651 5.82054 3.86196 5.92332 3.7625C6.02609 3.66304 6.08514 3.52684 6.08748 3.38384C6.08983 3.24084 6.03527 3.10277 5.93582 3L4.43582 1.5L4.58082 1.355C4.67935 1.25487 4.79689 1.17543 4.92654 1.12134C5.05619 1.06725 5.19534 1.03959 5.33582 1.04C5.61927 1.04085 5.89081 1.15414 6.09082 1.355L7.51582 2.8C7.61472 2.8998 7.6704 3.0345 7.67082 3.175C7.67088 3.24462 7.65722 3.31358 7.63062 3.37792C7.60403 3.44226 7.56502 3.50074 7.51582 3.55L7.01582 4.05C6.47844 4.58893 6.17668 5.31894 6.17668 6.08C6.17668 6.84106 6.47844 7.57107 7.01582 8.11C7.43582 8.5 7.66582 8.745 7.93582 9C8.20582 9.255 8.43582 9.53 8.83082 9.92C9.36974 10.4574 10.0998 10.7591 10.8608 10.7591C11.6219 10.7591 12.3519 10.4574 12.8908 9.92L13.3908 9.42C13.4929 9.32366 13.628 9.26999 13.7683 9.26999C13.9087 9.26999 14.0437 9.32366 14.1458 9.42L15.5658 10.84C15.6657 10.9387 15.745 11.0563 15.7991 11.1859C15.8532 11.3155 15.8809 11.4546 15.8808 11.595C15.8782 11.7412 15.8459 11.8853 15.7857 12.0186C15.7255 12.1518 15.6388 12.2714 15.5308 12.37V12.375Z"
															fill="#181A20"
														/>
													</g>
													<defs>
														<clipPath id="clip0_6507_6774">
															<rect width="16" height="16" fill="white" transform="translate(0.9375)" />
														</clipPath>
													</defs>
												</svg>
												<Typography className={'number'}>{property?.memberData?.memberPhone}</Typography>
											</Stack>
											<Typography className={'listings'}>View Listings</Typography>
										</Stack>
									</Stack>
								</Stack>
								<Stack className={'info-box'}>
									<Typography className={'sub-title'}>Name</Typography>
									<input type={'text'} placeholder={'Enter your name'} />
								</Stack>
								<Stack className={'info-box'}>
									<Typography className={'sub-title'}>Phone</Typography>
									<input type={'text'} placeholder={'Enter your phone'} />
								</Stack>
								<Stack className={'info-box'}>
									<Typography className={'sub-title'}>Email</Typography>
									<input type={'text'} placeholder={'creativelayers088'} />
								</Stack>
								<Stack className={'info-box'}>
									<Typography className={'sub-title'}>Message</Typography>
									<textarea placeholder={'Hello, I am interested in \n' + '[Renovated property at  floor]'}></textarea>
								</Stack>
								<Stack className={'info-box'}>
									<Button className={'send-message'}>
										<Typography className={'title'}>Send Message</Typography>
										<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
											<g clipPath="url(#clip0_6975_593)">
												<path
													d="M16.0556 0.5H6.2778C6.03214 0.5 5.83334 0.698792 5.83334 0.944458C5.83334 1.19012 6.03214 1.38892 6.2778 1.38892H14.9827L0.630219 15.7413C0.456594 15.915 0.456594 16.1962 0.630219 16.3698C0.71701 16.4566 0.83076 16.5 0.944469 16.5C1.05818 16.5 1.17189 16.4566 1.25872 16.3698L15.6111 2.01737V10.7222C15.6111 10.9679 15.8099 11.1667 16.0556 11.1667C16.3013 11.1667 16.5001 10.9679 16.5001 10.7222V0.944458C16.5 0.698792 16.3012 0.5 16.0556 0.5Z"
													fill="white"
												/>
											</g>
											<defs>
												<clipPath id="clip0_6975_593">
													<rect width="16" height="16" fill="white" transform="translate(0.5 0.5)" />
												</clipPath>
											</defs>
										</svg>
									</Button>
								</Stack>
							</Stack> */}
						</Stack>
						{destinationProperties.length !== 0 && (
							<Stack className={'similar-properties-config'}>
								<Stack className={'title-pagination-box'}>
									<Stack className={'title-box'}>
										<Typography className={'main-title'}>Destination Property</Typography>
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
