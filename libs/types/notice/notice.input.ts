import { NoticeCategory, NoticeStatus } from '../../enums/notice.enum';

export interface NoticeInput {
	noticeCategory: NoticeCategory;
	noticeStatus: NoticeStatus;
	noticeTitle: string;
	noticeContent?: string;
}
