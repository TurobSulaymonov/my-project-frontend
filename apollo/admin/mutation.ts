import { gql } from '@apollo/client';

/**************************
 *         MEMBER         *
 *************************/

export const UPDATE_MEMBER_BY_ADMIN = gql`
	mutation UpdateMemberByAdmin($input: MemberUpdate!) {
		updateMemberByAdmin(input: $input) {
			_id
			memberType
			memberStatus
			memberAuthType
			memberPhone
			memberNick
			memberFullName
			memberImage
			memberAddress
			memberDesc
			memberProperties
			memberRank
			memberArticles
			memberPoints
			memberLikes
			memberViews
			memberWarnings
			memberBlocks
			deletedAt
			createdAt
			updatedAt
			accessToken
		}
	}
`;

/**************************
 *        PROPERTY        *
 *************************/

export const UPDATE_PROPERTY_BY_ADMIN = gql`
	mutation UpdatePropertyByAdmin($input: PropertyUpdate!) {
		updatePropertyByAdmin(input: $input) {
			_id
			propertyType
			productStatus
			propertyLocation	
            productIngredients
			productSize
			productName
			productPrice
			productWeight
			productLeftCount
		
			productViews
			productLikes
			productImages
			productDesc
			productChocolate
			fruitCake
			memberId
			soldAt
			deletedAt
			constructedAt
			createdAt
			updatedAt
		}
	}
`;

export const REMOVE_PROPERTY_BY_ADMIN = gql`
	mutation RemovePropertyByAdmin($input: String!) {
		removePropertyByAdmin(propertyId: $input) {
			_id
			propertyType
			productStatus
			propertyLocation	
			productName
			productSize
			productPrice
			productIngredients
			productWeight
			productLeftCount
		
			productViews
			productLikes
			productImages
			productDesc
			productChocolate
			fruitCake
			memberId
			soldAt
			deletedAt
			constructedAt
			createdAt
			updatedAt
		}
	}
`;

/**************************
 *      BOARD-ARTICLE     *
 *************************/

export const UPDATE_BOARD_ARTICLE_BY_ADMIN = gql`
	mutation UpdateBoardArticleByAdmin($input: BoardArticleUpdate!) {
		updateBoardArticleByAdmin(input: $input) {
			_id
			articleCategory
			articleStatus
			articleTitle
			articleContent
			articleImage
			articleViews
			articleLikes
			memberId
			createdAt
			updatedAt
		}
	}
`;

export const REMOVE_BOARD_ARTICLE_BY_ADMIN = gql`
	mutation RemoveBoardArticleByAdmin($input: String!) {
		removeBoardArticleByAdmin(articleId: $input) {
			_id
			articleCategory
			articleStatus
			articleTitle
			articleContent
			articleImage
			articleViews
			articleLikes
			memberId
			createdAt
			updatedAt
		}
	}
`;

/**************************
 *         COMMENT        *
 *************************/

export const REMOVE_COMMENT_BY_ADMIN = gql`
	mutation RemoveCommentByAdmin($input: String!) {
		removeCommentByAdmin(commentId: $input) {
			_id
			commentStatus
			commentGroup
			commentContent
			commentRefId
			memberId
			createdAt
			updatedAt
		}

		
	}
`;


/**************************
 *         NOTICE        *
 *************************/
export const CREATE_NOTICE = gql`
	mutation NoticeCreate($input: NoticeInput!) {
		noticeCreate(input: $input) {
			_id
			noticeCategory
			noticeStatus
			noticeTitle
			noticeContent
			createdAt
		}
	}
`;

export const DELETE_NOTICE = gql`
	mutation DeleteNotice($input: String!) {
		deleteNotice(id: $input) {
			_id
			noticeCategory
			noticeStatus
			noticeTitle
			noticeContent
			createdAt
		}
	}
`;

/**************************
 *         FAQ        *
 *************************/

export const FAQ_CREATE = gql`
	mutation FaqCreate($input: FaqInput!) {
		faqCreate(input: $input) {
			_id
			faqCategory
			faqStatus
			faqQuestion
			faqAnswer
			createdAt
		}
	}
`;

