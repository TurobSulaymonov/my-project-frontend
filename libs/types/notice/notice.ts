import { NoticeCategory, NoticeStatus } from '../../enums/notice.enum';

export interface Notices {
	_id: string;
	noticeCategory: NoticeCategory;
	noticeStatus: NoticeStatus;
	noticeTitle: string;
	noticeContent?: string;
	createdAt: Date;
}
