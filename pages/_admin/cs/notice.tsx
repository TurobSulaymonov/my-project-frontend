import React, { useState } from 'react';
import type { NextPage } from 'next';
import withAdminLayout from '../../../libs/components/layout/LayoutAdmin';
import { Box, Button, InputAdornment, Stack, TextField } from '@mui/material';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { TabContext } from '@mui/lab';
import OutlinedInput from '@mui/material/OutlinedInput';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import { NoticeList } from '../../../libs/components/admin/cs/NoticeList';
import { CREATE_NOTICE, DELETE_NOTICE } from '../../../apollo/admin/mutation';
import { useMutation, useQuery } from '@apollo/client';
import { sweetErrorHandling } from '../../../libs/sweetAlert';
import { NoticeInput } from '../../../libs/types/notice/notice.input';
import { NoticeCategory, NoticeStatus } from '../../../libs/enums/notice.enum';
import { GET_NOTICE } from '../../../apollo/user/query';
import { Notices } from '../../../libs/types/notice/notice';
import { T } from '../../../libs/types/common';
import { Message } from '../../../libs/enums/common.enum';

const AdminNotice: NextPage = (props: any) => {
	const [anchorEl, setAnchorEl] = useState<[] | HTMLElement[]>([]);
	const [select, setSelect] = useState<Notices[]>([]);
	const [title, setTitle] = useState<NoticeInput>({
		noticeCategory: NoticeCategory.NOTICE,
		noticeStatus: NoticeStatus.ACTIVE,
		noticeTitle: '',
		noticeContent: '',
	});

	/** APOLLO REQUESTS **/
	const [noticeCreate] = useMutation(CREATE_NOTICE);
	const [deleteNotice] = useMutation(DELETE_NOTICE);
	const {
		loading: getCommentsLoading,
		data: getCommentsData,
		error: getCommentsError,
		refetch: getCommentsRefetch,
	} = useQuery(GET_NOTICE, {
		fetchPolicy: 'cache-and-network',
		variables: {
			input: '',
		},

		onCompleted: (data: T) => {
			if (data?.getNotice) setSelect(data?.getNotice);
		},
	});
	/** LIFECYCLES **/
	/** HANDLERS **/

	const createNoticeHandler = async () => {
		try {
			if (title.noticeTitle === '') throw Error(Message.PLEASE_REFILL);
			await noticeCreate({ variables: { input: title } });

			setTitle({ ...title, noticeTitle: '' });
			getCommentsRefetch();
			// await getCommentsRefetch({ input: commentInquiry });
		} catch (err: any) {
			await sweetErrorHandling(err);
		}
	};

	const deleteNoticeHandler = async (noticeId: any) => {
		try {
			await deleteNotice({
				variables: { input: noticeId },
			});
			getCommentsRefetch();
		} catch (err: any) {
			console.error('Error deleting notice:', err);
			await sweetErrorHandling(err);
		}
	};

	return (
		// @ts-ignore
		<Box component={'div'} className={'content'}>
			<Box component={'div'} className={'title flex_space'}>
				<Typography variant={'h2'}>Notice Management</Typography>
				<Stack flexDirection={'row'} gap={3} marginTop={'20px'}>
					<TextField
						required
						id="outlined-required"
						label="Add description"
						defaultValue="Hello World"
						value={title.noticeTitle}
						onChange={({ target: { value } }: any) => {
							setTitle({ ...title, noticeTitle: value });
						}}
					/>
					<Button className="btn_add" variant={'contained'} size={'medium'} onClick={createNoticeHandler}>
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
						<NoticeList
							// dense={dense}
							// membersData={membersData}
							// searchMembers={searchMembers}
							select={select}
							anchorEl={anchorEl}
							deleteNoticeHandler={deleteNoticeHandler}

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

export default withAdminLayout(AdminNotice);
