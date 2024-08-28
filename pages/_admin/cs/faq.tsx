import React, { useState } from 'react';
import type { NextPage } from 'next';
import withAdminLayout from '../../../libs/components/layout/LayoutAdmin';
import { Box, Button, InputAdornment, Stack, TextField } from '@mui/material';
import { List, ListItem } from '@mui/material';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { TabContext } from '@mui/lab';
import OutlinedInput from '@mui/material/OutlinedInput';
import TablePagination from '@mui/material/TablePagination';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import { FaqArticlesPanelList } from '../../../libs/components/admin/cs/FaqList';
import { useMutation, useQuery } from '@apollo/client';
import { FAQ_CREATE } from '../../../apollo/admin/mutation';
import { FaqInput } from '../../../libs/types/faq/faq.input';
import { FaqCategory, FaqStatus } from '../../../libs/enums/faq.enum';
import { sweetErrorHandling } from '../../../libs/sweetAlert';
import { GET_FAQ } from '../../../apollo/admin/query';
import { T } from '../../../libs/types/common';
import { Faqs } from '../../../libs/types/faq/faq';

const FaqArticles: NextPage = (props: any) => {
	const [anchorEl, setAnchorEl] = useState<[] | HTMLElement[]>([]);
	const [data, setData] = useState<Faqs[]>([]);
	const [faq, setFaq] = useState<FaqInput>({
		faqCategory: FaqCategory.PROPERTY,
		faqStatus: FaqStatus.ACTIVE,
		faqAnswer: '',
		faqQuestion: '',
	});

	/** APOLLO REQUESTS **/
	const [faqCreate] = useMutation(FAQ_CREATE);

	const {
		loading: getCommentsLoading,
		data: getCommentsData,
		error: getCommentsError,
		refetch: getCommentsRefetch,
	} = useQuery(GET_FAQ, {
		fetchPolicy: 'cache-and-network',
		variables: {
			input: '',
		},
		onCompleted: (data: T) => {
			if (data?.getFaq) setData(data?.getFaq);
		},
	});
	/** LIFECYCLES **/
	/** HANDLERS **/
	const handleCategoryChange = (event: SelectChangeEvent<FaqCategory>) => {
		setFaq({ ...faq, faqCategory: event.target.value as FaqCategory });
	};
	const createFaqHandler = async () => {
		try {
			await faqCreate({ variables: { input: faq } });
			setFaq({ ...faq, faqAnswer: '', faqQuestion: '' });

			getCommentsRefetch();
		} catch (err: any) {
			await sweetErrorHandling(err);
		}
	};
	return (
		// @ts-ignore
		<Box component={'div'} className={'content'}>
			<Box component={'div'} className={'title flex_space'}>
				<Typography variant={'h2'}>FAQ Management</Typography>
				<Stack gap={3} marginTop={'20px'}>
					<Select label="Category" onChange={handleCategoryChange} value={faq.faqCategory}>
						<MenuItem value={FaqCategory.PROPERTY}>PROPERTY</MenuItem>
						<MenuItem value={FaqCategory.PAYMENT}>PAYMENT</MenuItem>
						<MenuItem value={FaqCategory.FOR_BUYERS}>FOR_BUYERS</MenuItem>
						<MenuItem value={FaqCategory.FOR_AGENTS}>FOR_AGENTS</MenuItem>
						<MenuItem value={FaqCategory.MEMBERSHIP}>MEMBERSHIP</MenuItem>
						<MenuItem value={FaqCategory.COMMUNITY}>COMMUNITY</MenuItem>
						<MenuItem value={FaqCategory.OTHER}>OTHER</MenuItem>
					</Select>
					<TextField
						required
						id="outlined-required"
						value={faq.faqQuestion}
						label="Question"
						onChange={({ target: { value } }: any) => {
							setFaq({ ...faq, faqQuestion: value });
						}}
					/>
					<TextField
						required
						id="outlined-required"
						value={faq.faqAnswer}
						label="Answer"
						onChange={({ target: { value } }: any) => {
							setFaq({ ...faq, faqAnswer: value });
						}}
					/>

					<Button className="btn_add" variant={'contained'} size={'medium'} onClick={createFaqHandler}>
						<AddRoundedIcon sx={{ mr: '8px' }} />
						ADD
					</Button>
				</Stack>
			</Box>
			<Box component={'div'} className={'table-wrap'}>
				<Box component={'div'} sx={{ width: '100%', typography: 'body1' }}>
					<TabContext value={'value'}>
						<Box component={'div'}>
							<Divider />
							<Stack className={'search-area'} sx={{ m: '24px' }}>
								<OutlinedInput
									value={'searchInput'}
									// onChange={(e) => handleInput(e.target.value)}
									sx={{ width: '100%' }}
									className={'search'}
									placeholder="Search user name"
									onKeyDown={(event) => {
										// if (event.key == 'Enter') searchTargetHandler().then();
									}}
									endAdornment={
										<>
											{true && <CancelRoundedIcon onClick={() => {}} />}
											<InputAdornment position="end" onClick={() => {}}>
												<img src="/img/icons/search_icon.png" alt={'searchIcon'} />
											</InputAdornment>
										</>
									}
								/>
							</Stack>
							<Divider />
						</Box>
						<FaqArticlesPanelList
							// dense={dense}
							// membersData={membersData}
							// searchMembers={searchMembers}
							anchorEl={anchorEl}
							data={data}
							// handleMenuIconClick={handleMenuIconClick}
							// handleMenuIconClose={handleMenuIconClose}
							// generateMentorTypeHandle={generateMentorTypeHandle}
						/>

						{/* <TablePagination
							rowsPerPageOptions={[20, 40, 60]}
							component="div"
							count={4}
							rowsPerPage={10}
							page={1}
							onPageChange={() => {}}
							onRowsPerPageChange={() => {}}
						/> */}
					</TabContext>
				</Box>
			</Box>
		</Box>
	);
};

export default withAdminLayout(FaqArticles);
