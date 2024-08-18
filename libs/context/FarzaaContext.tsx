
import {
  createContext,
  MutableRefObject,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { toast } from "react-toastify";
import { BlogType, ProductType } from "../../types";
import { allProductList, blogList } from "../../data/Data";
import { sweetErrorAlert } from "../sweetAlert";

interface FarzaaContextData {
  showWishlist: boolean;
  handleWishlistClose: () => void;
  handleWishlistShow: () => void;
  showCart: boolean;
  handleCartClose: () => void;
  handleCartShow: () => void;
  showVideo: boolean;
  handleVideoClose: () => void;
  handleVideoShow: () => void;
  isCategoryOpen: boolean;
  handleCategoryBtn: () => void;
  categoryBtnRef: MutableRefObject<HTMLButtonElement | null>;
  isTimerState: CountdownState;
  isProductViewOpen: boolean;
  handleProductViewClose: () => void;
  handleProductViewOpen: () => void;
  isHeaderFixed: boolean;
  isListView: boolean;
  setListView: () => void;
  setGridView: () => void;
  price: [number, number];
  handlePriceChange: (
    event: Event,
    newPrice: number | number[],
    activeThumb: number
  ) => void;
  filteredProducts: ProductType[];
  sortBy: string;
  handleSortChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  sortProducts: (criteria: string) => void;
  handleCategoryFilter: (category: string | null) => void;
  handlePriceFilter: () => void;
  currentPage: number;
  handlePageChange: (newPage: number) => void;
  totalPages: number;
  paginatedProducts: ProductType[];
  productsPerPage: number;
  totalProducts: number;
  cartItems: ProductType[];
  handleQuantityChange: (itemId: number, newQuantity: number) => void;
  handleRemoveItem: (itemId: number) => void;
  wishlist: ProductType[];
  handleRemoveItemWishlist: (itemId: number) => void;
  addToCart: (itemId: number) => void;
  cartItemAmount: number;
  addToWishlist: (itemId: number) => void;
  subTotal: number;
  shipping: number;
  coupon: number;
  finalPrice: number;
  filteredBlogList: BlogType[];
  handleBlogCategoryFilter: (category: string) => void;
  activeBlogCategory: string | null;
  currentBlogPage: number;
  handleBlogPageChange: (newPage: number) => void;
  itemsPerBlogPage: number;
  totalBlogPage: number;
  paginatedBlogPost: BlogType[];
  jeweleryWishlist: ProductType[];
  addToJeweleryWishlist: (itemId: number) => void;
  jeweleryAddToCart: ProductType[];
  addToJeweleryCart: (itemId: number) => void;
  jeweleryCartItemAmount: number;
  handleRemoveJeweleryItemWishlist: (itemId: number) => void;
  handleRemoveJeweleryCartItem: (itemId: number) => void;
  handleJeweleryCartQuantityChange: (
    itemId: number,
    newQuantity: number
  ) => void;
  randomizedCakes: ProductType[];
  randomizedCakesSecond: ProductType[];
  cartCakes: ProductType[];
  cartCakeAmount: number;
  handleRemoveCake: (itemId: number) => void;
  handleCakeQuantityChange: (itemId: number, newQuantity: number) => void;
  addToCakeCart: (itemId: number) => void;
  wishlistCakes: ProductType[];
  handleRemoveCakeWishlist: (itemId: number) => void;
  addToCakeWishlist: (itemId: number) => void;
  searchTerm: string;
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  searchQuery: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  jeweleryArray: ProductType[];
  randomizedItems: ProductType[];
  cakeListArray: ProductType[];
  addWishlistToCart: () => void;
  addToCartFromWishlist: (item: ProductType) => void;
  isSidebarOpen: boolean;
  handleSidebarOpen: () => void;
  handleSidebarClose: () => void;
  isDropdownOpen: DropdownState;
  handleDropdownToggle: (dropdownName: keyof DropdownState) => void;
  selectedTags: string[];
  handleTagSelection: (tag: string) => void;
  filteredByTags: ProductType[];
  selectedBlogTags: string[];
  handleBlogTagSelection: (tag: string) => void;
  wishlistItemAmount: number;
  wishlistJewelleryItemAmount: number;
  wishlistCakeAmount: number;
  searchModalOpen: boolean;
  toggleOpenSearch: () => void;
  toggleCloseSearch: () => void;
  allDoorList: ProductType[];
  allCakeList: ProductType[];
  ornamentList: ProductType[];
}
interface DropdownState {
  home: boolean;
  shop: boolean;
  pages: boolean;
  blog: boolean;
}
interface CountdownState {
  days: number;
  hours: string | number;
  minutes: string | number;
  seconds: string | number;
}
const FarzaaContext = createContext<FarzaaContextData | undefined>(undefined);

interface FarzaaProviderProps {
  children: ReactNode;
}

export const FarzaaProvider = ({ children }: FarzaaProviderProps) => {
  // door list
  const allDoorList = allProductList.filter(
    (item) => item.mainCategory === "door"
  );
  // cake list
  const allCakeList = allProductList.filter(
    (item) => item.mainCategory === "cake"
  );
  // ornament list
  const ornamentList = allProductList.filter(
    (item) => item.mainCategory === "ornament"
  );
  // Wishlist Modal
  const [showWishlist, setShowWishlist] = useState(false);

  const handleWishlistClose = () => setShowWishlist(false);
  const handleWishlistShow = () => setShowWishlist(true);

  // Cart Modal
  const [showCart, setShowCart] = useState(false);

  const handleCartClose = () => setShowCart(false);
  const handleCartShow = () => setShowCart(true);

  // Video Modal
  const [showVideo, setShowVideo] = useState(false);

  const handleVideoClose = () => setShowVideo(false);
  const handleVideoShow = () => setShowVideo(true);

  // Header Category Button
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const handleCategoryBtn = () => {
    setIsCategoryOpen((prevState) => !prevState);
  };

  const categoryBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        categoryBtnRef.current &&
        !categoryBtnRef.current.contains(event.target as Node)
      ) {
        // Click occurred outside the button, so close the button
        setIsCategoryOpen(false);
      }
    };

    // Attach the click event listener when the component mounts
    document.addEventListener("click", handleClickOutside);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // Countdown Timer
  const countdownDate = new Date(
    Date.now() + 7 * 24 * 60 * 60 * 1000
  ).getTime();
  const [isTimerState, setIsTimerState] = useState({
    days: 0,
    hours: 0 as string | number,
    minutes: 0 as string | number,
    seconds: 0 as string | number,
  });

  useEffect(() => {
    const intervalId = setInterval(() => setNewTime(), 1000);
    return () => clearInterval(intervalId);
  }, []);

  const setNewTime = () => {
    if (countdownDate) {
      const currentTime = new Date().getTime();
      const distanceToDate = countdownDate - currentTime;

      const days = Math.floor(distanceToDate / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distanceToDate % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor(
        (distanceToDate % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((distanceToDate % (1000 * 60)) / 1000);

      const numbersToAddZeroTo = [1, 2, 3, 4, 5, 6, 7, 8, 9];

      // Add leading zero if necessary
      const formattedHours = numbersToAddZeroTo.includes(hours)
        ? `0${hours}`
        : hours;
      const formattedMinutes = numbersToAddZeroTo.includes(minutes)
        ? `0${minutes}`
        : minutes;
      const formattedSeconds = numbersToAddZeroTo.includes(seconds)
        ? `0${seconds}`
        : seconds;

      setIsTimerState({
        days,
        hours: formattedHours,
        minutes: formattedMinutes,
        seconds: formattedSeconds,
      });
    }
  };

  // Product Quick View Modal
  const [isProductViewOpen, setIsProductViewOpen] = useState(false);

  const handleProductViewClose = () => {
    setIsProductViewOpen(false);
  };
  const handleProductViewOpen = () => {
    setIsProductViewOpen(true);
  };

  // Sticky Header Section on Scroll
  const [isHeaderFixed, setIsHeaderFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 300) {
        setIsHeaderFixed(true);
      } else {
        setIsHeaderFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      // Clean up the event listener when the component is unmounted
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // List View Mode
  const [isListView, setIsListView] = useState(false);

  const setListView = () => {
    setIsListView(true);
  };
  const setGridView = () => {
    setIsListView(false);
  };
  // Price Filter
  const [startPrice, setStartPrice] = useState<number>(20);
  const [endPrice, setEndPrice] = useState<number>(500);
  const [price, setPrice] = useState<[number, number]>([startPrice, endPrice]);

  const handlePriceChange = (
    event: Event,
    newPrice: number | number[],
    activeThumb: number
  ) => {
    // Handle price change logic
    setPrice(newPrice as [number, number]); // Assuming an array for start and end price
  };
  // All Product Filter

  const [filteredProducts, setFilteredProducts] =
    useState<ProductType[]>(allDoorList);
  const [sortBy, setSortBy] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchedProducts, setSearchedProducts] = useState<any[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  // Handle sort
  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSortBy(value);
    sortProducts(value);
  };
  // sort product
  const sortProducts = (criteria: string) => {
    let sortedProducts = [...filteredProducts];

    switch (criteria) {
      case "name-az":
        sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-za":
        sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "price-low-high":
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case "price-high-low":
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    setFilteredProducts(sortedProducts);
  };
  // category handle method
  const handleCategoryFilter = (category: string | null) => {
    if (category === null) {
      setFilteredProducts(allProductList); // Show all products
    } else {
      const filtered = allProductList.filter(
        (product) => product.category === category
      );
      setFilteredProducts(filtered);
    }
    setCurrentPage(1);
  };

  // Price Filter
  const handlePriceFilter = () => {
    const filtered = allProductList.filter(
      (product) => product.price >= price[0] && product.price <= price[1]
    );
    setFilteredProducts(filtered);
  };

  // Search Filter

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
    performSearch(value);
  };

  const performSearch = (term: string) => {
    const filtered = allProductList.filter((product) =>
      product.name.toLowerCase().includes(term.toLowerCase())
    );
    setSearchedProducts(filtered);
  };
  useEffect(() => {
    if (searchTerm) {
      setFilteredProducts(searchedProducts);
      setCurrentPage(1); // Reset pagination when search changes
    } else {
      setFilteredProducts(allProductList);
    }
  }, [searchedProducts, searchTerm]);
  // Tag Filter

  const handleTagSelection = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(
        selectedTags.filter((selectedTag) => selectedTag !== tag)
      );
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  // Filter products based on selected tags
  const filteredByTags =
    selectedTags.length === 0
      ? allProductList
      : allProductList.filter((product) =>
          selectedTags.includes(product.category)
        );

  useEffect(() => {
    if (selectedTags.length > 0) {
      const filteredByTags = allProductList.filter((product) =>
        selectedTags.includes(product.category)
      );
      setFilteredProducts(filteredByTags);
      setCurrentPage(1); // Reset pagination when tags change
    } else {
      setFilteredProducts(allProductList);
    }
  }, [selectedTags]);

  // Pagination
  const [paginatedProducts, setPaginatedProducts] = useState<ProductType[]>([]);

  // Pagination
  const productsPerPage = 9;
  const totalProducts = filteredProducts.length;
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    scrollToTop();
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = currentPage * productsPerPage;
    const paginatedSlice = filteredProducts.slice(startIndex, endIndex);
    setPaginatedProducts(paginatedSlice);
  }, [currentPage, filteredProducts]);

  // Cart Item Table
  const initialCartItems = allProductList.slice(0, 2);
  const [cartItems, setCartItems] = useState(initialCartItems);
  const cartItemAmount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const handleRemoveItem = (itemId: number) => {
    const updatedItems = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedItems);
    toast.error("Item deleted from cart!");
  };
  const handleQuantityChange = (itemId: number, newQuantity: number) => {
    if (newQuantity >= 0) {
      if (newQuantity === 0) {
        handleRemoveItem(itemId); // Call the handleRemoveItem function
      } else {
        const updatedItems = cartItems.map((item) =>
          item.id === itemId
            ? {
                ...item,
                quantity: newQuantity,
                total: item.price * newQuantity,
              }
            : item
        );
        setCartItems(updatedItems);
      }
    }
  };

  // Add to Cart
  const addToCart = (itemId: number) => {
    // Find the item from allProductList using itemId
    const itemToAdd = allProductList.find((item) => item.id === itemId);

    if (itemToAdd) {
      const existingItemIndex = cartItems.findIndex(
        (item) => item.id === itemId
      );
      // Check if the item is already in the cart
      if (!cartItems.some((item) => item.id === itemId)) {
        // Set initial quantity to 1 and total to item's price
        const newItem = {
          ...itemToAdd,
          quantity: 1,
          total: itemToAdd.price,
        };

        setCartItems((prevCartItems) => [...prevCartItems, newItem]);
        toast.success("Item added in cart!");
      } else if (existingItemIndex !== -1) {
        // Increment quantity and update total
        const updatedCartItems = [...cartItems];
        updatedCartItems[existingItemIndex].quantity += 1;
        updatedCartItems[existingItemIndex].total =
          updatedCartItems[existingItemIndex].quantity * itemToAdd.price;

        setCartItems(updatedCartItems);
        toast.success("Item list updated in cart!");
      }
    } else {
      toast.warning("Item not found in allProductList.");
    }
  };

  // Wishlist Item Table
  const initialWishlist = allProductList.slice(-2);
  const [wishlist, setWishlist] = useState(initialWishlist);
  const wishlistItemAmount = wishlist.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const handleRemoveItemWishlist = (itemId: number) => {
    const updatedItems = wishlist.filter((item) => item.id !== itemId);
    setWishlist(updatedItems);
    toast.error("Item deleted from wishlist!");
  };

  // Add to Wishlist

  const addToWishlist = (itemId: number) => {
    const itemToAdd = filteredProducts.find((item) => item.id === itemId);

    if (itemToAdd) {
      if (!wishlist.some((item) => item.id === itemId)) {
        const newItem = {
          ...itemToAdd,
          quantity: 1,
          total: itemToAdd.price,
          isInWishlist: true,
        };

        setWishlist((prevWishlistItems) => [...prevWishlistItems, newItem]);
        toast.success("Item added to wishlist!");
      } else {
        toast.warning("Item already in wishlist!");
      }
    } else {
      toast.error("Item not found in filteredProducts.");
    }
  };

  useEffect(() => {
    setFilteredProducts((prevFilteredProducts) => {
      const updatedProductList = prevFilteredProducts.map((item) => {
        if (wishlist.some((wishlistItem) => wishlistItem.id === item.id)) {
          return {
            ...item,
            isInWishlist: true,
          };
        } else {
          return {
            ...item,
            isInWishlist: false,
          };
        }
      });
      return updatedProductList;
    });
  }, [wishlist]);

  // Function to add wishlist items to cart
  const addWishlistToCart = () => {
    if (wishlist.length === 0) {
      toast.warning("No items in wishlist to add!");
      return;
    }

    const updatedCartItems = [...cartItems];

    wishlist.forEach((wishlistItem) => {
      const existingCartItemIndex = updatedCartItems.findIndex(
        (cartItem) => cartItem.id === wishlistItem.id
      );

      if (existingCartItemIndex !== -1) {
        // If item exists in cart, update its quantity
        updatedCartItems[existingCartItemIndex].quantity += 1;
        updatedCartItems[existingCartItemIndex].total += wishlistItem.price;
      } else {
        // If item does not exist in cart, add it with quantity 1
        const newCartItem = {
          ...wishlistItem,
          quantity: 1,
          total: wishlistItem.price,
        };
        updatedCartItems.push(newCartItem);
      }
    });

    setCartItems(updatedCartItems);
    setWishlist([]); // Clear the wishlist after adding to cart
    toast.success("Wishlist items added to cart!");
  };

  const addToCartFromWishlist = (item: ProductType) => {
    const existingCartItemIndex = cartItems.findIndex(
      (cartItem) => cartItem.id === item.id
    );
    const updatedWishlist = wishlist.filter(
      (wishlistItem) => wishlistItem.id !== item.id
    ); // Use a different parameter name

    if (existingCartItemIndex !== -1) {
      // If item exists in cart, update its quantity
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingCartItemIndex].quantity += 1;
      updatedCartItems[existingCartItemIndex].total += item.price;
      setCartItems(updatedCartItems);
      toast.success("Item quantity updated in cart!");
    } else {
      // If item does not exist in cart, add it with quantity 1
      const newCartItem = {
        ...item,
        quantity: 1,
        total: item.price,
      };
      setCartItems((prevCartItems) => [...prevCartItems, newCartItem]);
      setWishlist(updatedWishlist); // Update wishlist after removing the item
      toast.success("Item added to cart!");
    }
  };

  // Total Price
  const subTotal = cartItems.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );
  const shipping = cartItems.length === 0 ? 0.0 : 50.0;
  const coupon = cartItems.length === 0 ? 0.0 : 60.0;
  const finalPrice = subTotal - (shipping + coupon);

  // Blog List Category Filter
  const [filteredBlogList, setFilteredBlogList] =
    useState<BlogType[]>(blogList);
  const [activeBlogCategory, setActiveBlogCategory] = useState<string | null>(
    null
  );
  const [paginatedBlogPost, setPaginatedBlogPost] = useState<BlogType[]>([]);

  const itemsPerBlogPage = 3; // Number of items per page
  const [currentBlogPage, setCurrentBlogPage] = useState<number>(1);

  const handleBlogPageChange = (newPage: number) => {
    setCurrentBlogPage(newPage);
    scrollToTop();
  };

  useEffect(() => {
    const startIndex = (currentBlogPage - 1) * itemsPerBlogPage;
    const endIndex = startIndex + itemsPerBlogPage;

    const paginatedBlogSlice = filteredBlogList.slice(startIndex, endIndex);

    setPaginatedBlogPost(paginatedBlogSlice);
  }, [currentBlogPage, filteredBlogList]);

  const totalBlogs = filteredBlogList.length;
  const totalBlogPage = Math.ceil(totalBlogs / itemsPerBlogPage);

  // Search Filter
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    const filteredBlogs = blogList.filter((item) =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredBlogList(filteredBlogs);
    setCurrentBlogPage(1); // Reset to the first page when search is changed
    setSelectedBlogTags([]); // Reset selected tags
    setActiveBlogCategory(null); // Reset active category
  };

  // Blog Category Filter

  const handleBlogCategoryFilter = (category: string) => {
    if (category === null) {
      setFilteredBlogList(blogList);
    } else {
      const filteredBlogs = blogList.filter(
        (item) => item.category === category
      );
      setFilteredBlogList(filteredBlogs);
    }
    setActiveBlogCategory(category);
    setCurrentBlogPage(1); // Reset to the first page when category is changed
    setSelectedBlogTags([]); // Reset selected tags
  };
  // Blog Tag Filter
  const [selectedBlogTags, setSelectedBlogTags] = useState<string[]>([]);

  const handleBlogTagSelection = (tag: string) => {
    if (selectedBlogTags.includes(tag)) {
      setSelectedBlogTags(
        selectedBlogTags.filter((selectedTag) => selectedTag !== tag)
      );
    } else {
      setSelectedBlogTags([...selectedBlogTags, tag]);
    }
  };
  // Filter products based on selected tags
  useEffect(() => {
    // Apply all active filters together
    let filteredBlogs = blogList;

    // Apply category filter
    if (activeBlogCategory !== null) {
      filteredBlogs = filteredBlogs.filter(
        (blog) => blog.category === activeBlogCategory
      );
    }

    // Apply tag filter
    if (selectedBlogTags.length > 0) {
      filteredBlogs = filteredBlogs.filter((blog) =>
        selectedBlogTags.includes(blog.category)
      );
    }

    // Apply search filter
    if (searchQuery.trim() !== "") {
      filteredBlogs = filteredBlogs.filter((blog) =>
        blog.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Update filtered blog list and reset pagination
    setFilteredBlogList(filteredBlogs);
    setCurrentBlogPage(1);
  }, [searchQuery, selectedBlogTags, activeBlogCategory]);

  // jewelery shop
  const [jeweleryArray, setJeweleryArray] =
    useState<ProductType[]>(ornamentList);
  const [jeweleryWishlist, setJeweleryWishlist] = useState<ProductType[]>([]);
  const wishlistJewelleryItemAmount = jeweleryWishlist.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // random ornament array
  const [randomizedItems, setRandomizedItems] = useState<ProductType[]>([]);
  useEffect(() => {
    // Create an array of indices from 0 to the length of jeweleryArray
    const indices = jeweleryArray.map((_, index) => index);

    // Shuffle the array of indices
    const shuffledIndices = shuffleArray(indices);

    setRandomizedItems(shuffledIndices);
  }, [jeweleryArray]);

  const handleRemoveJeweleryItemWishlist = (itemId: number) => {
    const updatedItems = jeweleryWishlist.filter((item) => item.id !== itemId);
    setJeweleryWishlist(updatedItems);
    toast.error("Item deleted from wishlist!");
  };

  const addToJeweleryWishlist = (itemId: number) => {
    const itemToAdd = jeweleryArray.find((item) => item.id === itemId);
    if (itemToAdd) {
      if (!jeweleryWishlist.some((item) => item.id === itemId)) {
        const newItem = {
          ...itemToAdd,
          quantity: 1,
          total: itemToAdd.price,
          isInWishlist: true,
        };
        setJeweleryWishlist((prevWishlistItems) => [
          ...prevWishlistItems,
          newItem,
        ]);
        // Toast logic
        toast.success("Item added to wishlist!");
      } else {
        toast.warning("Item already in wishlist!");
      }
    } else {
      toast.error("Item not found in filteredProducts.");
    }
  };

  const updateIsInWishlist = (itemsArray: ProductType[]) => {
    return itemsArray.map((item) => {
      if (
        jeweleryWishlist.some((wishlistItem) => wishlistItem.id === item.id)
      ) {
        return {
          ...item,
          isInWishlist: true,
        };
      } else {
        return {
          ...item,
          isInWishlist: false,
        };
      }
    });
  };
  useEffect(() => {
    // Create a copy of jeweleryArray
    const copiedJeweleryArray = [...jeweleryArray];

    // Shuffle the copied array
    const shuffledArray = shuffleArray(copiedJeweleryArray);

    // Set the randomized items state with the shuffled array
    setRandomizedItems(shuffledArray);
  }, [jeweleryArray]);

  // Jewelery add to cart array
  const [jeweleryAddToCart, setJeweleryAddToCart] = useState<ProductType[]>([]);
  // Jewelery cart total amount
  const jeweleryCartItemAmount = jeweleryAddToCart.reduce(
    (total, item) => total + item.quantity,
    0
  );
  // handle remove method for jewelery shop
  const handleRemoveJeweleryCartItem = (itemId: number) => {
    const updatedItems = jeweleryAddToCart.filter((item) => item.id !== itemId);
    setJeweleryAddToCart(updatedItems);
    toast.error("Item deleted from wishlist!");
  };
  // handle quantity change for jewelery shop
  const handleJeweleryCartQuantityChange = (
    itemId: number,
    newQuantity: number
  ) => {
    if (newQuantity === 0) {
      handleRemoveJeweleryCartItem(itemId); // Call the handleRemoveItem function
    } else {
      const updatedItems = jeweleryAddToCart.map((item) =>
        item.id === itemId
          ? { ...item, quantity: newQuantity, total: item.price * newQuantity }
          : item
      );
      setJeweleryAddToCart(updatedItems);
    }
  };
  // Add to cart in jewelery shop
  const addToJeweleryCart = (itemId: number) => {
    const itemToAdd = ornamentList.find((item) => item.id === itemId);

    if (itemToAdd) {
      const existingItemIndex = jeweleryAddToCart.findIndex(
        (item) => item.id === itemId
      );
      // Check if the item is already in the cart
      if (!jeweleryAddToCart.some((item) => item.id === itemId)) {
        // Set initial quantity to 1 and total to item's price
        const newItem = {
          ...itemToAdd,
          quantity: 1,
          total: itemToAdd.price,
        };

        setJeweleryAddToCart((prevAddToCartItems) => [
          ...prevAddToCartItems,
          newItem,
        ]);
        toast.success("Item added in AddToCart!");
      } else if (existingItemIndex !== -1) {
        // Increment quantity and update total
        const updatedAddToCartItems = [...jeweleryAddToCart];
        updatedAddToCartItems[existingItemIndex].quantity += 1;
        updatedAddToCartItems[existingItemIndex].total =
          updatedAddToCartItems[existingItemIndex].quantity * itemToAdd.price;

        setJeweleryAddToCart(updatedAddToCartItems);
        toast.success("Item list updated in AddToCart!");
      }
    } else {
      toast.warning("Item not found in ornament list.");
    }
  };

  // Cake Shop cart
  // Main cake list array
  const [cakeListArray, setCakeListArray] =
    useState<ProductType[]>(allCakeList);

  // random cake array
  // random cake array
  const [randomizedCakes, setRandomizedCakes] = useState<any[]>([]);
  const [randomizedCakesSecond, setRandomizedCakesSecond] = useState<any[]>([]);

  const cakeSlice = cakeListArray.slice(-8);

  useEffect(() => {
    // Shuffle the array and store the shuffled order initially for the first state variable
    const shuffledCakes = shuffleArray(cakeSlice);
    setRandomizedCakes(shuffledCakes);

    // Create a new shuffled array for the second state variable
    const shuffledCakesSecond = shuffleArray(cakeSlice.slice()); // Create a copy of cakeSlice before shuffling
    setRandomizedCakesSecond(shuffledCakesSecond);
  }, []); // Empty dependency array, so the shuffle is done once on mount

  // Wishlist

  // Initiate cake shop wishlist array
  const [wishlistCakes, setWishlistCakes] = useState<ProductType[]>([]);
  const wishlistCakeAmount = wishlistCakes.reduce(
    (total, item) => total + (item.quantity ? item.quantity : 1),
    0
  );

  // Cake wishlist remove item method
  const handleRemoveCakeWishlist = (itemId: number) => {
    const updatedItems = wishlistCakes.filter((item) => item.id !== itemId);
    setWishlistCakes(updatedItems);
    toast.error("Item deleted from wishlist!");
  };

  // Add to Cake wishlist
  const addToCakeWishlist = (itemId: number) => {
    // Find the item from allCakeList using itemId
    const itemToAdd = cakeListArray.find((item) => item.id === itemId);

    if (itemToAdd) {
      if (!wishlistCakes.some((item) => item.id === itemId)) {
        const newItem = {
          ...itemToAdd,
          quantity: 1,
          total: itemToAdd.price,
          isInWishlist: true,
        };

        setWishlistCakes((prevWishlistItems) => [
          ...prevWishlistItems,
          newItem,
        ]);
        toast.success("Item added to wishlist!");
      } else {
        toast.warning("Item already in wishlist!");
      }
    } else {
      toast.error("Item not found in All Cake List.");
    }
  };
  const updateIsInCakeWishlist = (itemsArray: ProductType[]) => {
    return itemsArray.map((item) => {
      if (wishlistCakes.some((wishlistItem) => wishlistItem.id === item.id)) {
        return {
          ...item,
          isInWishlist: true,
        };
      } else {
        return {
          ...item,
          isInWishlist: false,
        };
      }
    });
  };

  useEffect(() => {
    setCakeListArray((prevFilteredProducts) =>
      updateIsInCakeWishlist(prevFilteredProducts)
    );
    setRandomizedCakes((prevRandomizedItems) =>
      updateIsInCakeWishlist(prevRandomizedItems)
    );
    setRandomizedCakesSecond((prevRandomizedItems) =>
      updateIsInCakeWishlist(prevRandomizedItems)
    );
  }, [wishlistCakes]);

  // Cart
  // Initiate cake shop cart array
  const [cartCakes, setCartCakes] = useState<ProductType[]>([]);
  // Cake cart quantity amount
  const cartCakeAmount = cartCakes.reduce(
    (total, item) => total + (item.quantity ? item.quantity : 1),
    0
  );
  // Cake cart remove item method
  const handleRemoveCake = (itemId: number) => {
    const updatedItems = cartCakes.filter((item) => item.id !== itemId);
    setCartCakes(updatedItems);
    toast.error("Item deleted from cart!");
  };
  // Cake quantity change method
  const handleCakeQuantityChange = (itemId: number, newQuantity: number) => {
    if (newQuantity >= 0) {
      if (newQuantity === 0) {
        handleRemoveCake(itemId); // Call the handleRemoveItem function
      } else {
        const updatedItems = cartCakes.map((item) =>
          item.id === itemId
            ? {
                ...item,
                quantity: newQuantity,
                total: item.price * newQuantity,
              }
            : item
        );
        setCartCakes(updatedItems);
      }
    }
  };

  // Add to Cake Cart
  const addToCakeCart = (itemId: number) => {
    // Find the item from allProductList using itemId
    const itemToAdd = allCakeList.find((item) => item.id === itemId);

    if (itemToAdd) {
      const existingItemIndex = cartCakes.findIndex(
        (item) => item.id === itemId
      );
      // Check if the item is already in the cart
      if (existingItemIndex === -1) {
        // Set initial quantity to 1 and total to item's price
        const newItem: ProductType = {
          ...itemToAdd,
          quantity: 1,
          total: itemToAdd.price,
        };

        setCartCakes((prevCartItems) => [...prevCartItems, newItem]);
        toast.success("Item added in cart!");
      } else {
        // Increment quantity and update total
        const updatedCartCakes = [...cartCakes];
        updatedCartCakes[existingItemIndex].quantity =
          (updatedCartCakes[existingItemIndex].quantity || 0) + 1;
        updatedCartCakes[existingItemIndex].total =
          updatedCartCakes[existingItemIndex].quantity * itemToAdd.price;

        setCartCakes(updatedCartCakes);
        toast.success("Item list updated in cart!");
      }
    } else {
      toast.warning("Item not found in allProductList.");
    }
  };

  // Function to shuffle an array using Fisher-Yates algorithm
  const shuffleArray = (array: any[]) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };

  // Right Sidebar
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const handleSidebarOpen = () => {
    setIsSidebarOpen(true);
  };

  const handleSidebarClose = () => {
    setIsSidebarOpen(false);
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState<DropdownState>({
    home: false,
    shop: false,
    pages: false,
    blog: false,
  });

  const handleDropdownToggle = (dropdownName: keyof DropdownState) => {
    setIsDropdownOpen((prevState) => ({
      ...prevState,
      [dropdownName]: !prevState[dropdownName],
    }));
  };

  // Search Modal
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  const toggleOpenSearch = () => {
    setSearchModalOpen(true);
  };

  const toggleCloseSearch = () => {
    setSearchModalOpen(false);
  };

  // Context Value
  const contextValue: FarzaaContextData = {
    showWishlist,
    handleWishlistClose,
    handleWishlistShow,
    showCart,
    handleCartClose,
    handleCartShow,
    showVideo,
    handleVideoClose,
    handleVideoShow,
    isCategoryOpen,
    handleCategoryBtn,
    categoryBtnRef,
    isTimerState,
    isProductViewOpen,
    handleProductViewClose,
    handleProductViewOpen,
    isHeaderFixed,
    isListView,
    setListView,
    setGridView,
    price,
    handlePriceChange,
    filteredProducts,
    sortBy,
    handleSortChange,
    sortProducts,
    handleCategoryFilter,
    handlePriceFilter,
    currentPage,
    handlePageChange,
    totalPages,
    paginatedProducts,
    productsPerPage,
    totalProducts,
    cartItems,
    handleQuantityChange,
    handleRemoveItem,
    wishlist,
    handleRemoveItemWishlist,
    addToCart,
    cartItemAmount,
    addToWishlist,
    subTotal,
    shipping,
    coupon,
    finalPrice,
    filteredBlogList,
    handleBlogCategoryFilter,
    activeBlogCategory,
    currentBlogPage,
    handleBlogPageChange,
    itemsPerBlogPage,
    totalBlogPage,
    paginatedBlogPost,
    jeweleryWishlist,
    addToJeweleryWishlist,
    jeweleryAddToCart,
    addToJeweleryCart,
    jeweleryCartItemAmount,
    handleRemoveJeweleryItemWishlist,
    handleRemoveJeweleryCartItem,
    handleJeweleryCartQuantityChange,
    randomizedCakes,
    randomizedCakesSecond,
    cartCakes,
    cartCakeAmount,
    handleRemoveCake,
    handleCakeQuantityChange,
    addToCakeCart,
    wishlistCakes,
    handleRemoveCakeWishlist,
    addToCakeWishlist,
    searchTerm,
    handleSearchChange,
    searchQuery,
    handleSearch,
    jeweleryArray,
    randomizedItems,
    cakeListArray,
    addWishlistToCart,
    addToCartFromWishlist,
    isSidebarOpen,
    handleSidebarOpen,
    handleSidebarClose,
    isDropdownOpen,
    handleDropdownToggle,
    selectedTags,
    handleTagSelection,
    filteredByTags,
    selectedBlogTags,
    handleBlogTagSelection,
    wishlistItemAmount,
    wishlistJewelleryItemAmount,
    wishlistCakeAmount,
    searchModalOpen,
    toggleOpenSearch,
    toggleCloseSearch,
    allDoorList,
    allCakeList,
    ornamentList,
  };
  return (
    <FarzaaContext.Provider value={contextValue}>
      {children}
    </FarzaaContext.Provider>
  );
};

 export const useFarzaaContext = () => {
  const context = useContext(FarzaaContext);
  if (!context) {
    throw new Error("somthing went Error");
  }
  return context;
}; 
