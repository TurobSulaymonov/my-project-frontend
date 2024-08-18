import React from 'react';
import Link from 'next/link';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { Box } from '@mui/material';
import Moment from 'react-moment';
import { BoardArticle } from '../../types/board-article/board-article';

interface CommunityCardProps {
	vertical: boolean;
	article: BoardArticle;
	index: number;
}

const CommunityCard = (props: CommunityCardProps) => {
	const { vertical, article, index } = props;
	const device = useDeviceDetect();
	const articleImage = article?.articleImage
		? `${process.env.REACT_APP_API_URL}/${article?.articleImage}`
		: '/img/event.svg';

	if (device === 'mobile') {
		return <div>COMMUNITY CARD (MOBILE)</div>;
	} else {
		if (vertical) {
			return (
				<Link href={`/community/detail?articleCategory=${article?.articleCategory}&id=${article?._id}`}>
					<Box component={'div'} className={'vertical-card'}>
						{/* <div className={'community-img'} style={{ backgroundImage: `url(${articleImage})` }}>
							<div>{article.articleCategory} </div>
						</div>
						<strong>{article?.articleTitle}</strong>
						<span>Free Board</span> */}
						<div className="fz-3-single-blog">
                <div className="community-img"  style={{ backgroundImage: `url(${articleImage})` }}>
				<div>{article.articleCategory} </div>
            
                </div>

                <div className="fz-3-single-blog__txt">
                  <h3 className="fz-3-single-blog__title">
                    <Link href="#">
                      Banana Cake with Brown Butter Cream Cheese
                    </Link>
                  </h3>
                  <div className="fz-3-single-blog__category-and-actions">
                    <span className="fz-3-single-blog__category">
                      <Link href="/blog">Cake Shop</Link>
                    </span>
                   <span>
				   <Link href="#" className="fz-3-single-blog__btn">
                      Read More <i className="fa-regular fa-arrow-right"></i>
                    </Link>
				   </span>
                  </div>
                </div>
              </div>

					</Box>
				</Link>
			);
		} else {
			return (
				<>
					{/* <Link href={`/community/detail?articleCategory=${article?.articleCategory}&id=${article?._id}`}>
						<Box component={'div'} className="horizontal-card">
							<img src={articleImage} alt="" />
							<div>
								<strong>{article.articleTitle}</strong>
								<span>
									<Moment format="DD.MM.YY">{article?.createdAt}</Moment>
								</span>
							</div>
						</Box>
					</Link> */}
				</>
			);
		}
	}
};

export default CommunityCard;
