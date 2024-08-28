import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import TelegramIcon from '@mui/icons-material/Telegram';
import TwitterIcon from '@mui/icons-material/Twitter';
import useDeviceDetect from '../hooks/useDeviceDetect';
import { Stack, Box } from '@mui/material';
import moment from 'moment';
import Link from 'next/link';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';

const Footer = () => {
	const device = useDeviceDetect();
	const currentYear = new Date().getFullYear();

	if (device == 'mobile') {
		return (
			<Stack className={'footer-container'}>
				<Stack className={'main z-3-footer-top'}>
					<Stack className={'left'}>
						<Box component={'div'} className={'footer-box'}>
							<img src="/img/logo/logo-3.png" alt="" className={'logo'} />
						</Box>
						<Box component={'div'} className={'footer-box'}>
							<span>total free customer care</span>
							<p>+82 10 4867 2909</p>
						</Box>
						<Box component={'div'} className={'footer-box'}>
							<span>nee live</span>
							<p>+82 10 4867 2909</p>
							<span>Support?</span>
							<Link href="#">
                      <i className="fa-light fa-location-dot"></i> 16 Rr 2,
                      Ketchikan, Alaska 99901, USA
                    </Link>
						</Box>
						<Box component={'div'} className={'footer-box'}>
							<p>follow us on social media</p>
							<div className={'media-box'}>
								<FacebookOutlinedIcon />
								<TelegramIcon />
								<InstagramIcon />
								<TwitterIcon />
							</div>
						</Box>
					</Stack>
					<Stack className={'right'}>
						<Box component={'div'} className={'bottom'}>
							<div>
								<strong>Popular Search</strong>
								<span>Property for Rent</span>
								<span>Property Low to hide</span>
							</div>
							<div>
								<strong>Quick Links</strong>
								<span>Terms of Use</span>
								<span>Privacy Policy</span>
								<span>Pricing Plans</span>
								<span>Our Services</span>
								<span>Contact Support</span>
								<span>FAQs</span>
							</div>
							<div>
								<strong>Discover</strong>
								<span>Seoul</span>
								<span>Gyeongido</span>
								<span>Busan</span>
								<span>Jejudo</span>
							</div>
						</Box>
					</Stack>
				</Stack>
				<Stack className={'second'}>
					<span>© Cake - All rights reserved. Cake {moment().year()}</span>
				</Stack>
			</Stack>
		);
	} else {
		return (
			<Stack className={'footer-container'}>
			<Stack className={'main'}>
				<Stack className={'left'}>
					<Box component={'div'} className={'footer-box fz-3-footer-widget__title'}>
						Contact Us
					</Box>
					<Box component={'div'} className={'footer-box'}>
					<span ><AddLocationIcon  style={{marginTop:10}} /> 16 Rr 2,</span>
						<p> Ketchikan, Alaska 99901, USA</p>
					</Box>
					<Box component={'div'} className={'footer-box'}>
					<Link href="#">
				 <span> <LocalPhoneIcon/>  +(82)10 4043 0444</span>
				 <p>+(82)10 4043 0444</p>
				</Link>
					</Box>
					<Box component={'div'} className={'footer-box'}>
						<span> <EmailIcon/> Our Email </span>
						<p>randomemail@gmail.com</p>
				</Box>
					<Box component={'div'} className={'footer-box'}>

						<div className={'media-box'}>
							<FacebookOutlinedIcon />
							<TelegramIcon />
							<InstagramIcon />
							<TwitterIcon />
						</div> 
						<div className='payme-img' style={{marginTop: 10, cursor: 'pointer'}}>
							<img src='/img/banner/fz-10-payment.png' />
							 </div>
					</Box>
				</Stack>
				<Stack className={'right'}>
					<Box component={'div'} className={'top'}>
						<strong>keep yourself up to date</strong>
						<div>
							<input type="text" placeholder={'Your Email'} />
							<span>Subscribe</span>
						</div>
					</Box>
					<Box component={'div'} className={'bottom'}>
						<div>
							<strong>Customer Service</strong>
							<li>
							  <Link href="#"><span>Product Care</span></Link>
							</li>
							<li>
							  <Link href="#"><span>Returns & Policy</span></Link>
							</li>
							<li>
							  <Link href="#"><span>Warranty & Lifetime Service</span></Link>
							</li>
							<li>
							  <Link href="/cs"><span>FAQ</span></Link>
							</li>
							
						</div>
						<div>
							<strong>Quick Links</strong>
							<span>Terms of Use</span>
							<span>Privacy Policy</span>
							<span>Pricing Plans</span>
							<span>Our Services</span>
							<span>Contact Support</span>
							<span>FAQs</span>
						</div>
						<div>
							<strong>Discover</strong>
							<span>Seoul</span>
							<span>Gyeongido</span>
							<span>Busan</span>
							<span>Jejudo</span>
						</div>
					</Box>
				</Stack>
			</Stack>
			<Stack className={'second'}>
				<span>© Cake-shop - All rights reserved. Cake-shop {moment().year()}</span>
				<span>Privacy · Terms · Sitemap</span>
			</Stack>
		</Stack>
		);
	}
};

export default Footer;
