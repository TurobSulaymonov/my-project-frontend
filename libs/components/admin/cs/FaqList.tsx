import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import {
	TableCell,
	TableHead,
	TableBody,
	TableRow,
	Table,
	TableContainer,
	Button,
	Menu,
	Fade,
	MenuItem,
} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/material';
import { FaqInput } from '../../../types/faq/faq.input';
import moment from 'moment';

interface Data {
	category: string;
	group: string;
	title: string;
	writer: string;
	date: string;
	status: string;
	id?: string;
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
}

type Order = 'asc' | 'desc';

interface HeadCell {
	disablePadding: boolean;
	id: keyof Data;
	label: string;
	numeric: boolean;
}

const headCells: readonly HeadCell[] = [
	{
		id: 'category',
		numeric: true,
		disablePadding: false,
		label: 'Number',
	},
	{
		id: 'title',
		numeric: true,
		disablePadding: false,
		label: 'TITLE',
	},

	{
		id: 'writer',
		numeric: true,
		disablePadding: false,
		label: 'WRITER',
	},
	{
		id: 'date',
		numeric: true,
		disablePadding: false,
		label: 'DATE',
	},
	{
		id: 'group',
		numeric: false,
		disablePadding: false,
		label: 'Group',
	},
 {
	id: 'status',
	numeric: false,
	disablePadding: false,
	label: 'Status',
},

];

interface EnhancedTableProps {
	numSelected: number;
	onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
	onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
	order: Order;
	orderBy: string;
	rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
	const { onSelectAllClick } = props;

	return (
		<TableHead>
			<TableRow>
				{headCells.map((headCell) => (
					<TableCell
						key={headCell.id}
						align={headCell.numeric ? 'left' : 'center'}
						padding={headCell.disablePadding ? 'none' : 'normal'}
					>
						{headCell.label}
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	);
}

interface FaqArticlesPanelListType {
	dense?: boolean;
	membersData?: any;
	searchMembers?: any;
	anchorEl?: any;
	handleMenuIconClick?: any;
	handleMenuIconClose?: any;
	generateMentorTypeHandle?: any;
	data: any;
}

export const FaqArticlesPanelList = (props: FaqArticlesPanelListType) => {
	const {
		dense,
		membersData,
		searchMembers,
		anchorEl,
		handleMenuIconClick,
		handleMenuIconClose,
		generateMentorTypeHandle,
		data
	} = props;
	const router = useRouter();

	/** APOLLO REQUESTS **/
	/** LIFECYCLES **/
	/** HANDLERS **/

	return (
		<Stack>
			<TableContainer>
				<Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={dense ? 'small' : 'medium'}>
					{/*@ts-ignore*/}
					<EnhancedTableHead />
					<TableBody>
						{data?.map((ele: FaqInput, index: any) => {
							const member_image = '/img/profile/defaultUser.svg';

							let status_class_name = '';

							return (
								<TableRow hover key={'member._id'} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
									<TableCell align="left">{index + 1}</TableCell>
									<TableCell align="left">{ele.faqQuestion}</TableCell>
									<TableCell align="left" className={'name'}>
								      {moment(ele.createdAt).format('YYYY MM DD')}
									</TableCell>
									<TableCell align="left">{ele.faqCategory}</TableCell>
									<TableCell align="center">
									<Button onClick={(e: any) => handleMenuIconClick(e, index)} className={'badge success'}>
											{ele.faqStatus}
										</Button>

										<Menu
											className={'menu-modal'}
											MenuListProps={{
												'aria-labelledby': 'fade-button',
											}}
											anchorEl={anchorEl[index]}
											open={Boolean(anchorEl[index])}
											onClose={handleMenuIconClose}
											TransitionComponent={Fade}
											sx={{ p: 1 }}
										>
											<MenuItem onClick={(e: any) => generateMentorTypeHandle('member._id', 'mentor', 'originate')}>
												<Typography variant={'subtitle1'} component={'span'}>
													MENTOR
												</Typography>
											</MenuItem>
											<MenuItem onClick={(e: any) => generateMentorTypeHandle('member._id', 'user', 'remove')}>
												<Typography variant={'subtitle1'} component={'span'}>
													USER
												</Typography>
											</MenuItem>
										</Menu>
									</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</TableContainer>
		</Stack>
	);
};
