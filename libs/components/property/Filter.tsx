import React, { useCallback, useEffect, useState } from 'react';
import {
	Stack,
	Typography,
	Checkbox,
	Button,
	OutlinedInput,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Tooltip,
	IconButton,
} from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { ProductSize, PropertyLocation, PropertyType } from '../../enums/property.enum';
import { PropertiesInquiry } from '../../types/property/property.input';
import { useRouter } from 'next/router';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import { productWeight } from '../../config';
import RefreshIcon from '@mui/icons-material/Refresh';

const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: '200px',
		},
	},
};

interface FilterType {
	searchFilter: PropertiesInquiry;
	setSearchFilter: any;
	initialInput: PropertiesInquiry;
}

const Filter = (props: FilterType) => {
	const { searchFilter, setSearchFilter, initialInput } = props;
	const device = useDeviceDetect();
	const router = useRouter();
	const [propertyLocation, setPropertyLocation] = useState<PropertyLocation[]>(Object.values(PropertyLocation));
	const [propertyType, setPropertyType] = useState<PropertyType[]>(Object.values(PropertyType));
	const [productSize, setProductSize] = useState<ProductSize[]>(Object.values(ProductSize));
	const [searchText, setSearchText] = useState<string>('');
	const [showMore, setShowMore] = useState<boolean>(false);

	/** LIFECYCLES **/
	useEffect(() => {
		if (searchFilter?.search?.locationList?.length == 0) {
			delete searchFilter.search.locationList;
			setShowMore(false);
			router
			.push(`/shop?input=${JSON.stringify({
				...searchFilter,
				search: {
					...searchFilter.search
				}
			})}`, `/shop?input=${JSON.stringify({
				...searchFilter,
				search: {
					...searchFilter.search
				}
			})}`, { scroll: false }).then();
		}

		if (searchFilter?.search?.typeList?.length == 0) {
			delete searchFilter.search.typeList;
			router.push(`/shop?input=${JSON.stringify({
				...searchFilter,
				search: {
					...searchFilter.search
				}
			})}`, `/shop?input=${JSON.stringify({
				...searchFilter,
				search: {
					...searchFilter.search
				}
			})}`, { scroll: false }).then();
		}

		if (searchFilter?.search?.sizeList?.length == 0) {
			delete searchFilter.search.sizeList;
			setShowMore(false);
			router
			.push(`/shop?input=${JSON.stringify({
				...searchFilter,
				search: {
					...searchFilter.search
				}
			})}`, `/shop?input=${JSON.stringify({
				...searchFilter,
				search: {
					...searchFilter.search
				}
			})}`, { scroll: false }).then();
		}

		if (searchFilter?.search?.roomsList?.length == 0) {
			delete searchFilter.search.roomsList;
			router.push(`/shop?input=${JSON.stringify({
				...searchFilter,
				search: {
					...searchFilter.search
				}
			})}`, `/shop?input=${JSON.stringify({
				...searchFilter,
				search: {
					...searchFilter.search
				}
			})}`, { scroll: false }).then();
		}

		if (searchFilter?.search?.options?.length == 0) {
			delete searchFilter.search.options;
			router.push(`/shop?input=${JSON.stringify({
				...searchFilter,
				search: {
					...searchFilter.search
				}
			})}`, `/shop?input=${JSON.stringify({
				...searchFilter,
				search: {
					...searchFilter.search
				}
			})}`, { scroll: false }).then();
		}

		if (searchFilter?.search?.bedsList?.length == 0) {
			delete searchFilter.search.bedsList;
			router.push(`/shop?input=${JSON.stringify({
				...searchFilter,
				search: {
					...searchFilter.search
				}
			})}`, `/shop?input=${JSON.stringify({
				...searchFilter,
				search: {
					...searchFilter.search
				}
			})}`, { scroll: false }).then();
		}

		if (searchFilter?.search?.locationList) setShowMore(true);
	}, [searchFilter]);

	/** HANDLERS **/
	const propertyLocationSelectHandler = useCallback(
		async (e: any) => {
			try {
				const isChecked = e.target.checked;
				const value = e.target.value;
				if (isChecked) {
					await router.push(
						`/shop?input=${JSON.stringify({
							...searchFilter,
							search: { ...searchFilter.search, locationList: [...(searchFilter?.search?.locationList || []), value] },
						})}`,
						`/shop?input=${JSON.stringify({
							...searchFilter,
							search: { ...searchFilter.search, locationList: [...(searchFilter?.search?.locationList || []), value] },
						})}`,
						{ scroll: false },
					);
				} else if (searchFilter?.search?.locationList?.includes(value)) {
					await router.push(
						`/shop?input=${JSON.stringify({
							...searchFilter,
							search: {
								...searchFilter.search,
								locationList: searchFilter?.search?.locationList?.filter((item: string) => item !== value),
							},
						})}`,
						`/shop?input=${JSON.stringify({
							...searchFilter,
							search: {
								...searchFilter.search,
								locationList: searchFilter?.search?.locationList?.filter((item: string) => item !== value),
							},
						})}`,
						{ scroll: false },
					);
				}

				if (searchFilter?.search?.typeList?.length == 0) {
					alert('error');
				}

				console.log('propertyLocationSelectHandler:', e.target.value);
			} catch (err: any) {
				console.log('ERROR, propertyLocationSelectHandler:', err);
			}
		},
		[searchFilter],
	);

	const propertyTypeSelectHandler = useCallback(
		async (e: any) => {
			try {
				const isChecked = e.target.checked;
				const value = e.target.value;
				if (isChecked) {
					await router.push(
						`/shop?input=${JSON.stringify({
							...searchFilter,
							search: { ...searchFilter.search, typeList: [...(searchFilter?.search?.typeList || []), value] },
						})}`,
						`/shop?input=${JSON.stringify({
							...searchFilter,
							search: { ...searchFilter.search, typeList: [...(searchFilter?.search?.typeList || []), value] },
						})}`,
						{ scroll: false },
					);
				} else if (searchFilter?.search?.typeList?.includes(value)) {
					await router.push(
						`/shop?input=${JSON.stringify({
							...searchFilter,
							search: {
								...searchFilter.search,
								typeList: searchFilter?.search?.typeList?.filter((item: string) => item !== value),
							},
						})}`,
						`/shop?input=${JSON.stringify({
							...searchFilter,
							search: {
								...searchFilter.search,
								typeList: searchFilter?.search?.typeList?.filter((item: string) => item !== value),
							},
						})}`,
						{ scroll: false },
					);
				}

				if (searchFilter?.search?.typeList?.length == 0) {
					alert('error');
				}

				console.log('propertyTypeSelectHandler:', e.target.value);
			} catch (err: any) {
				console.log('ERROR, propertyTypeSelectHandler:', err);
			}
		},
		[searchFilter],
	);

	const productSizeSelectHandler = useCallback(
		async (e: any) => {
			try {
				const isChecked = e.target.checked;
				const value = e.target.value;
				if (isChecked) {
					await router.push(
						`/shop?input=${JSON.stringify({
							...searchFilter,
							search: { ...searchFilter.search, sizeList: [...(searchFilter?.search?.sizeList || []), value] },
						})}`,
						`/shop?input=${JSON.stringify({
							...searchFilter,
							search: { ...searchFilter.search, sizeList: [...(searchFilter?.search?.sizeList || []), value] },
						})}`,
						{ scroll: false },
					);
				} else if (searchFilter?.search?.sizeList?.includes(value)) {
					await router.push(
						`/shop?input=${JSON.stringify({
							...searchFilter,
							search: {
								...searchFilter.search,
								sizeList: searchFilter?.search?.sizeList?.filter((item: string) => item !== value),
							},
						})}`,
						`/shop?input=${JSON.stringify({
							...searchFilter,
							search: {
								...searchFilter.search,
								sizeList: searchFilter?.search?.sizeList?.filter((item: string) => item !== value),
							},
						})}`,
						{ scroll: false },
					);
				}

				if (searchFilter?.search?.typeList?.length == 0) {
					alert('error');
				}

				console.log('productSizeSelectHandler:', e.target.value);
			} catch (err: any) {
				console.log('ERROR, productSizeSelectHandler:', err);
			}
		},
		[searchFilter],
	);



	const propertyOptionSelectHandler = useCallback(
		async (e: any) => {
			try {
				const isChecked = e.target.checked;
				const value = e.target.value;
				if (isChecked) {
					await router.push(
						`/shop?input=${JSON.stringify({
							...searchFilter,
							search: { ...searchFilter.search, options: [...(searchFilter?.search?.options || []), value] },
						})}`,
						`/shop?input=${JSON.stringify({
							...searchFilter,
							search: { ...searchFilter.search, options: [...(searchFilter?.search?.options || []), value] },
						})}`,
						{ scroll: false },
					);
				} else if (searchFilter?.search?.options?.includes(value)) {
					await router.push(
						`/shop?input=${JSON.stringify({
							...searchFilter,
							search: {
								...searchFilter.search,
								options: searchFilter?.search?.options?.filter((item: string) => item !== value),
							},
						})}`,
						`/shop?input=${JSON.stringify({
							...searchFilter,
							search: {
								...searchFilter.search,
								options: searchFilter?.search?.options?.filter((item: string) => item !== value),
							},
						})}`,
						{ scroll: false },
					);
				}

				console.log('propertyOptionSelectHandler:', e.target.value);
			} catch (err: any) {
				console.log('ERROR, propertyOptionSelectHandler:', err);
			}
		},
		[searchFilter],
	);

	const productLeftCountelectHandler = useCallback(
		async (number: Number) => {
			try {
				if (number != 0) {
					if (searchFilter?.search?.bedsList?.includes(number)) {
						await router.push(
							`/shop?input=${JSON.stringify({
								...searchFilter,
								search: {
									...searchFilter.search,
									bedsList: searchFilter?.search?.bedsList?.filter((item: Number) => item !== number),
								},
							})}`,
							`/shop?input=${JSON.stringify({
								...searchFilter,
								search: {
									...searchFilter.search,
									bedsList: searchFilter?.search?.bedsList?.filter((item: Number) => item !== number),
								},
							})}`,
							{ scroll: false },
						);
					} else {
						await router.push(
							`/shop?input=${JSON.stringify({
								...searchFilter,
								search: { ...searchFilter.search, bedsList: [...(searchFilter?.search?.bedsList || []), number] },
							})}`,
							`/shop?input=${JSON.stringify({
								...searchFilter,
								search: { ...searchFilter.search, bedsList: [...(searchFilter?.search?.bedsList || []), number] },
							})}`,
							{ scroll: false },
						);
					}
				} else {
					delete searchFilter?.search.bedsList;
					setSearchFilter({ ...searchFilter });
					await router.push(
						`/shop?input=${JSON.stringify({
							...searchFilter,
							search: {
								...searchFilter.search,
							},
						})}`,
						`/shop?input=${JSON.stringify({
							...searchFilter,
							search: {
								...searchFilter.search,
							},
						})}`,
						{ scroll: false },
					);
				}

				console.log('productLeftCountelectHandler:', number);
			} catch (err: any) {
				console.log('ERROR, productLeftCountelectHandler:', err);
			}
		},
		[searchFilter],
	);

	const productWeightHandler = useCallback(
		async (e: any, type: string) => {
			const value = e.target.value;

			if (type == 'start') {
				await router.push(
					`/shop?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
							squaresRange: { ...searchFilter.search.squaresRange, start: value },
						},
					})}`,
					`/shop?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
							squaresRange: { ...searchFilter.search.squaresRange, start: value },
						},
					})}`,
					{ scroll: false },
				);
			} else {
				await router.push(
					`/shop?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
							squaresRange: { ...searchFilter.search.squaresRange, end: value },
						},
					})}`,
					`/shop?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
							squaresRange: { ...searchFilter.search.squaresRange, end: value },
						},
					})}`,
					{ scroll: false },
				);
			}
		},
		[searchFilter],
	);

	const productPriceHandler = useCallback(
		async (value: number, type: string) => {
			if (type == 'start') {
				await router.push(
					`/shop?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
							pricesRange: { ...searchFilter.search.pricesRange, start: value * 1 },
						},
					})}`,
					`/shop?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
							pricesRange: { ...searchFilter.search.pricesRange, start: value * 1 },
						},
					})}`,
					{ scroll: false },
				);
			} else {
				await router.push(
					`/shop?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
							pricesRange: { ...searchFilter.search.pricesRange, end: value * 1 },
						},
					})}`,
					`/shop?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
							pricesRange: { ...searchFilter.search.pricesRange, end: value * 1 },
						},
					})}`,
					{ scroll: false },
				);
			}
		},
		[searchFilter],
	);

	const refreshHandler = async () => {
		try {
			setSearchText('');
			await router.push(
				`/shop?input=${JSON.stringify(initialInput)}`,
				`/shop?input=${JSON.stringify(initialInput)}`,
				{ scroll: false },
			);
		} catch (err: any) {
			console.log('ERROR, refreshHandler:', err);
		}
	};

	if (device === 'mobile') {
		return <div>PROPERTIES FILTER</div>;
	} else {
		return (
			<Stack className={'filter-main'}>
				<Stack className={'find-your-home'} mb={'40px'}>
					<Typography className={'title-main'}>Find Your Home</Typography>
					<Stack className={'input-box'}>
						<OutlinedInput
							value={searchText}
							type={'text'}
							className={'search-input'}
							placeholder={'What are you looking for?'}
							onChange={(e: any) => setSearchText(e.target.value)}
							onKeyDown={(event: any) => {
								if (event.key == 'Enter') {
									setSearchFilter({
										...searchFilter,
										search: { ...searchFilter.search, text: searchText },
									});
								}
							}}
							endAdornment={
								<>
									<CancelRoundedIcon
										onClick={() => {
											setSearchText('');
											setSearchFilter({
												...searchFilter,
												search: { ...searchFilter.search, text: '' },
											});
										}}
									/>
								</>
							}
						/>
						<img src={'/img/icons/search_icon.png'} alt={''} />
						<Tooltip title="Reset">
							<IconButton onClick={refreshHandler}>
								<RefreshIcon />
							</IconButton>
						</Tooltip>
					</Stack>
				</Stack>
				<Stack className={'find-your-home'} mb={'30px'}>
					<p className={'title'} style={{ textShadow: '0px 3px 4px #b9b9b9' }}>
						Location
					</p>
					<Stack
						className={`property-location`}
						style={{ height: showMore ? '253px' : '115px' }}
						onMouseEnter={() => setShowMore(true)}
						onMouseLeave={() => {
							if (!searchFilter?.search?.locationList) {
								setShowMore(false);
							}
						}}
					>
						{propertyLocation.map((location: string) => {
							return (
								<Stack className={'input-box'} key={location}>
									<Checkbox
										id={location}
										className="property-checkbox"
										color="default"
										size="small"
										value={location}
										checked={(searchFilter?.search?.locationList || []).includes(location as PropertyLocation)}
										onChange={propertyLocationSelectHandler}
									/>
									<label htmlFor={location} style={{ cursor: 'pointer' }}>
										<Typography className="property-type">{location}</Typography>
									</label>
								</Stack>
							);
						})}
					</Stack>
				</Stack>
				<Stack className={'find-your-home'} mb={'30px'}>
					<Typography className={'title'}>Product Collection</Typography>
					{propertyType.map((type: string) => (
						<Stack className={'input-box'} key={type}>
							<Checkbox
								id={type}
								className="property-checkbox"
								color="default"
								size="small"
								value={type}
								onChange={propertyTypeSelectHandler}
								checked={(searchFilter?.search?.typeList || []).includes(type as PropertyType)}
							/>
							<label style={{ cursor: 'pointer' }}>
								<Typography className="property_type">{type}</Typography>
							</label>
						</Stack>
					))}
				</Stack>

				<Stack className={'find-your-home'} mb={'30px'}>
					<Typography className={'title'}>Product Size</Typography>
					{productSize.map((size: string) => (
						<Stack className={'input-box'} key={size}>
							<Checkbox
								id={size}
								className="property-checkbox"
								color="default"
								size="small"
								value={size}
								onChange={productSizeSelectHandler}
								checked={(searchFilter?.search?.sizeList || []).includes(size as ProductSize)}
							/>
							<label style={{ cursor: 'pointer' }}>
								<Typography className="size_list">{size}</Typography>
							</label>
						</Stack>
					))}
				</Stack>

		
				<Stack className={'find-your-home'} mb={'30px'}>
					<Typography className={'title'}>Options</Typography>
					<Stack className={'input-box'}>
						<Checkbox
							id={'Barter'}
							className="property-checkbox"
							color="default"
							size="small"
							value={'productChocolate'}
							checked={(searchFilter?.search?.options || []).includes('productChocolate')}
							onChange={propertyOptionSelectHandler}
						/>
						<label htmlFor={'Barter'} style={{ cursor: 'pointer' }}>
							<Typography className="propert-type">Fruit Cake</Typography>
						</label>
					</Stack>
					<Stack className={'input-box'}>
						<Checkbox
							id={'Rent'}
							className="property-checkbox"
							color="default"
							size="small"
							value={'fruitCake'}
							checked={(searchFilter?.search?.options || []).includes('fruitCake')}
							onChange={propertyOptionSelectHandler}
						/>
						<label htmlFor={'Rent'} style={{ cursor: 'pointer' }}>
							<Typography className="propert-type">Chocolate Cake</Typography>
						</label>
					</Stack>
				</Stack>
				<Stack className={'find-your-home'} mb={'30px'}>
					<Typography className={'title'}>Cake Weight</Typography>
					<Stack className="square-year-input">
						<FormControl>
							<InputLabel id="demo-simple-select-label">Min</InputLabel>
							<Select
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								value={searchFilter?.search?.squaresRange?.start ?? 0}
								label="Min"
								onChange={(e: any) => productWeightHandler(e, 'start')}
								MenuProps={MenuProps}
							>
								{productWeight.map((square: number) => (
									<MenuItem
										value={square}
										disabled={(searchFilter?.search?.squaresRange?.end || 0) < square}
										key={square}
									>
										{square}
									</MenuItem>
								))}
							</Select>
						</FormControl>
						<div className="central-divider"></div>
						<FormControl>
							<InputLabel id="demo-simple-select-label">Max</InputLabel>
							<Select
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								value={searchFilter?.search?.squaresRange?.end ?? 500}
								label="Max"
								onChange={(e: any) => productWeightHandler(e, 'end')}
								MenuProps={MenuProps}
							>
								{productWeight.map((square: number) => (
									<MenuItem
										value={square}
										disabled={(searchFilter?.search?.squaresRange?.start || 0) > square}
										key={square}
									>
										{square}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Stack>
				</Stack>
				<Stack className={'find-your-home'}>
					<Typography className={'title'}>Price Range</Typography>
					<Stack className="square-year-input">
						<input
							type="number"
							placeholder="$ min"
							min={0}
							value={searchFilter?.search?.pricesRange?.start ?? 0}
							onChange={(e: any) => {
								if (e.target.value >= 0) {
									productPriceHandler(e.target.value, 'start');
								}
							}}
						/>
						<div className="central-divider"></div>
						<input
							type="number"
							placeholder="$ max"
							value={searchFilter?.search?.pricesRange?.end ?? 0}
							onChange={(e: any) => {
								if (e.target.value >= 0) {
									productPriceHandler(e.target.value, 'end');
								}
							}}
						/>
					</Stack>
				</Stack>
			</Stack>
		);
	}
};

export default Filter;
