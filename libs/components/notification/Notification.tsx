import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import { useMutation, useQuery, useReactiveVar } from '@apollo/client';

import { T } from '../../types/common';
import { Notification } from '../../types/notification/notification';
import { userVar } from '../../../apollo/store';
import { Badge, Box, Stack } from '@mui/material';
import { NotificationStatus } from '../../enums/notification.enum';
import { useRouter } from 'next/router';
/* import Dayjs from 'dayjs'; */
//import relativeTime from 'dayjs/plugin/relativeTime';  
import { MARK_NOTIFICATION_READ, GET_NOTIFICATIONS } from '../../../apollo/user/query';



/*  Dayjs.extend(relativeTime);
Dayjs.locale('ko');  */ 

export default function BasicPopover() {
	const user = useReactiveVar(userVar);
	const router = useRouter();
	const [anchorEl, setAnchorEl] = React.useState<SVGSVGElement | null>(null);
	const [notification, setNotification] = React.useState<Notification[]>([]);
	const handleClick = (event: React.MouseEvent<SVGSVGElement>) => {
		setAnchorEl(event.currentTarget);
		console.log("notification", handleClick)
	};

	const [markNotificationAsRead] = useMutation(MARK_NOTIFICATION_READ, {
		onCompleted: () => {
			getNotificationsRefetch(); 
		},
		onError: (error) => {
			console.error('Error updating notifications:', error);
		},
	});

	const handleClickRead = (notification: Notification) => {
		markNotificationAsRead({
			variables: { notificationId: notification._id },
			onCompleted: () => {
				switch (notification.notificationGroup) {
					case 'MEMBER':
						router.push(`/member?memberId=${notification.authorId}`);
						break;
					case 'PROPERTY':
						router.push(`/property/detail?id=${notification.propertyId}`);
						break;
					case 'ARTICLE':
						router.push(`/property/detail?id=${notification.articleId}`);
						break;
					default:
						router.push(`/member?memberId=${notification.authorId}`);
				}

				getNotificationsRefetch();
			},
		});
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);
	const id = open ? 'simple-popover' : undefined;
	console.log(notification);

	const {
		loading: getNotificationsLoading,
		data: getNotificationsData,
		error: getNotificationsError,
		refetch: getNotificationsRefetch,
	} = useQuery(GET_NOTIFICATIONS, {
		fetchPolicy: 'cache-and-network',
		variables: { userId: user._id },
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			if (data?.getNotificationsByUserId) setNotification(data?.getNotificationsByUserId);
		},
	});

	return (
		<div >
			<Badge
				badgeContent={
					notification?.filter(
						(ele) => ele.receiverId === user._id && ele.notificationStatus === NotificationStatus.WAIT,
					).length
				}
				color="secondary"
				
			>
				<NotificationsOutlinedIcon style={{ cursor: 'pointer', marginRight:"15px", color:"white"  }} onClick={handleClick} /> 
			</Badge>
			<Popover
				sx={{ marginTop: 5 }}
				style={{ height: '500px' }} // 고정된 크기 설정
				id={id}
				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left',
				}}
			>
				{notification.length > 0 ? (
					notification.map((ele: Notification) => {
						if (ele.receiverId === user._id) {
							return (
								<Stack key={ele._id} sx={{ m: 3, cursor: 'pointer' }} onClick={() => handleClickRead(ele)}>
									<div
										style={{
											background: ele.notificationStatus === NotificationStatus.READ ? 'white' : '#e0dfdf',
											padding: '15px',
											borderRadius: '15px',
											border: '1px solid black',
											width: '309px',
										}}
									>
										<Typography sx={{ color: 'blue' }}>{ele.notificationTitle}</Typography>
										<Typography>{ele.notificationDesc}</Typography>
										<Typography variant="body2" color="primary">
											{/* {dayjs(ele.createdAt).fromNow()} */}
										</Typography>
									</div>
								</Stack>
							);
						}
					})
				) : (
					<div
						style={{
							width: '309px',
							height: '149px',
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
						}}
					>
						<Typography>No Notifications</Typography>
					</div>
				)}
			</Popover>
		</div>
	);
}
