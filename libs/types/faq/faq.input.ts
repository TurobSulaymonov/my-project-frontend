import { FaqCategory, FaqStatus } from '../../enums/faq.enum';

export interface FaqInput {
	faqCategory: FaqCategory;
	faqStatus: FaqStatus;
	faqQuestion: string;
	faqAnswer: string;
	createdAt?: Date;
}
