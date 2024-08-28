import { FaqCategory, FaqStatus } from '../../enums/faq.enum';

export interface Faqs {
	_id: string;
	faqCategory: FaqCategory;
	faqStatus: FaqStatus;
	faqQuestion: string;
	faqAnswer: string;
	createdAt: Date;
}
