(() => {
    // check is location correct
    if (window.location.pathname !== "/") {
        console.log("wrong page");
        return;
    }

    const init = () => {
        buildHTML();
        buildCSS();
        loadProducts();
    };

    const buildHTML = () => {
        const carouselContainer = document.createElement("div");
        carouselContainer.className = "carousel-container";

        const title = document.createElement("h2");
        title.textContent = "Beğenebileceğinizi Düşündüklerimiz";
        carouselContainer.appendChild(title);

        const wrapper = document.createElement("div");
        wrapper.className = "carousel-wrapper";

        const slideLeftButton = document.createElement("button");
        slideLeftButton.className = "carousel-slide-button left";
        slideLeftButton.textContent = "<";

        const slideRightButton = document.createElement("button");
        slideRightButton.className = "carousel-slide-button right";
        slideRightButton.textContent = ">";

        const itemsWrapper = document.createElement("div");
        itemsWrapper.className = "carousel-items";

        wrapper.appendChild(slideLeftButton);
        wrapper.appendChild(itemsWrapper);
        wrapper.appendChild(slideRightButton);

        carouselContainer.appendChild(wrapper);

        // get the old carousel containers parents, add newer carousel 
        const parentList = document.querySelectorAll(".Section2A .container");
        if (!parentList.length) {
            console.warn("Section2A içindeki container bulunamadı.");
            return;
        }

        // add new carousel container to firstChild of parent
        const parent = parentList[0];
        parent.insertBefore(carouselContainer, parent.firstChild);
    };

    const buildCSS = () => {
        const existingStyle = document.querySelector("style.carousel_style");
        if (existingStyle) existingStyle.remove();


        const fontImport = document.createElement("style");
        fontImport.textContent = `
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&family=Quicksand:wght@400;600;700&display=swap');
        `;
        document.head.appendChild(fontImport);

        const css = `
        .carousel-container {
            background-color: #fff;
            border-radius: 12px;
            font-family: sans-serif;
            position: relative;
            font-family: Poppins, "cursive";
            box-shadow: 0 2px 16px rgba(0, 0, 0, 0.04);
        }
  
        .carousel-container h2 {
            margin-bottom: 0px;
            font-size: 3rem;
            color: #f28e00;
            background-color: #fef6eb;
            padding: 25px 67px;
            border-top-left-radius: 35px;
            border-top-right-radius: 35px;
            font-family: 'Quicksand';
            font-weight: 700;
        }
  
        .carousel-wrapper {
            position: relative;
            display: flex;
            align-items: center;
        }
  
        .carousel-items {
            display: flex;
            overflow-x: auto;
            scroll-behavior: smooth;
            scroll-snap-type: x mandatory;
            gap: 18px;
            padding: 20px 0;
            flex: 1;
        }
  
        .carousel-items::-webkit-scrollbar {
            display: none;
        }
  
        .carousel-slide-button {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            background-color: #fef6eb;
            border: none;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            font-size: 18px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1;
        }
  
        .carousel-slide-button.left {
            left: -64px;
            font-size: 30px;
            color: #f5945c;
        }

        .carousel-slide-button.left:hover {
            background-color: #fff;
            border: 1px solid #f5945c;
        }
    
        .carousel-slide-button.right {
            right: -64px;
            font-size: 30px;
            color: #f5945c;
        }

        .carousel-slide-button.right:hover {
            background-color: #fff;
            border: 1px solid #f5945c;
        }
  
        .carousel-item {
            flex: 0 0 auto;
            scroll-snap-align: start;
            background: #fff;
            border: 1px solid #ededed;
            border-radius: 10px;
            position: relative;
            padding: 5px 0px;
        }

        .carousel-item:hover { 
            outline: 3px solid #f28e00;
            outline-offset: -3px;
        }

        .carousel-item h3 {
            height: 42px;
            font-size: 1.2rem;
            color: #797e84;
            margin-top:40px;
            padding: 0px 17px 13px;
        }
  
        .carousel-item .price {
            font-size: 2.2rem;
            font-weight: 600;
            padding: 0px 17px 13px;
        }
  
        .favorite-icon {
            position: absolute;
            top: 16px;
            right: 16px;
            width: 50px;
            height: 50px;
            font-size: 40px;
            line-height: 50px;
            text-align: center;
            border-radius: 50%;
            background-color: #fff;
            color: transparent; /* görünmez yap */
            -webkit-text-stroke: 1.5px #f28e00; /* içi boş görünüm */
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
            cursor: pointer;
            border: 1px solid transparent;
        }

        .favorite-icon:hover {
            border: 1px solid #f28e00;
        }

        .favorite-icon.active {
             color: #f28e00; /* dolu kalp görünümü */
            -webkit-text-stroke: 0px;
             border: 1px solid #f28e00;
        }

  
        .add-to-cart {
            width: calc(100% - 34px);
            height: 48px;
            font-size: 1.4rem;
            font-weight: 700;
            margin: 19px 17px 13px;
            color: #f28e00;
            background-color: #fff7ec;
            border: none;
            border-radius: 37.5px;
        }

        .add-to-cart:hover {
            color: #fff7ec ;
            background-color: #f28e00;
        }

        .old-price-wrapper {
            display: flex;
            height: 30px;
            align-items: center;
            gap: 6px;
            padding: 20px 17px;
        }

        .old-price {
            text-decoration: line-through;
            font-size: 1.4rem;
            color: #888;
        }

        .discount-wrapper {
            display: flex;
            align-items: center;
            gap: 6px;
        }

        .discount-percent {
            font-size: 18px;
            font-weight: bold;
            color: #03a76a;
        }


        .discount-circle {
            width: 22px;
            height: 22px;
            border-radius: 50%;
            background-color: #03a76a;
            color: #fff;
            font-size: 12px;
            font-weight: bold;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s ease-in-out;
            cursor: default;
        }

        .rating-stars {
            height: 30px;
            display: flex;
            gap: 5px;
            padding: 0px 17px;
        }

        .rating-stars .star::before {
            content: "★";
            font-size: 24px;
            color: #d7d7d7;
            line-height: '30px';
        }

        .rating-stars .star.full::before {
            content: "★";
            color: #f8d602;
        }

        .rating-stars .star.half::before {
            content: "⯨";
            color: #f8d602;
        }   
        
        .promo-area {
            height: 70px;
        }

        .carousel-item h3 strong {
            font-weight: 700;
        }

        @media (max-width: 480px) {
            .carousel-container h2 {
                margin-bottom: 0px;
                font-size: 2.2rem;
                color: #f28e00;
                background-color: #fff;
                padding: 0px 22px 0px 10px;
                font-family: 'Quicksand';
                font-weight: 700;
            }
            .carousel-item .price {
                font-size: 1.8rem;
                font-weight: 600;
                padding: 0px 17px 13px;
            }
            .favorite-icon {
                width: 40px;
                height: 40px;
                font-size: 30px;
                line-height: 40px;
            }
            .discount-percent {
                font-size: 1.4rem;
            }
            .discount-circle {
                width: 18px;
                height: 18px;
            }
             .rating-stars {
                gap: 4px;
            }
            .rating-stars .star::before {
                font-size: 20px;
                line-height: '26px';
            }
        }
  
        @media (max-width: 991px) {
            .carousel-item {
                width: calc((100% - 12px * 1) / 2.1);
          }
        }
  
        @media (min-width: 992px) and (max-width: 1279px) {
            .carousel-item {
                width: calc((100% - 12px * 2) / 3.1);
          }
        }
  
        @media (min-width: 1280px) and (max-width: 1479px) {
            .carousel-item {
                width: calc((100% - 12px * 3) / 4.1);
          }
        }
  
        @media (min-width: 1480px) {
            .carousel-item {
                width: calc((100% - 12px * 4) / 5.1);
          }
        }
  
      `;
        const styleTag = document.createElement("style");
        styleTag.className = "carousel_style";
        styleTag.textContent = css;
        document.head.appendChild(styleTag);
    };

    const loadProducts = () => {
        const products = JSON.parse(localStorage.getItem("products") || "[]");
        const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

        // no products in localStorage fetch from source
        if (!products.length) {
            fetch("https://gist.githubusercontent.com/sevindi/8bcbde9f02c1d4abe112809c974e1f49/raw/9bf93b58df623a9b16f1db721cd0a7a539296cf0/products.json")
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`Ürünler yüklenemedi. Hata: ${response.status}.`);
                    }
                    return response.json();
                })
                .then((data) => {
                    localStorage.setItem("products", JSON.stringify(data));
                    renderProducts(data, favorites);
                })
                .catch((error) => {
                    console.error("Ürünler yüklenirken hata ile karşılaşıldı.", error);
                });
        } else {
            // products already exist in localStorage
            renderProducts(products, favorites);
        }
    };

    const getFavorites = () => {
        return JSON.parse(localStorage.getItem("favorites") || "[]");
    };

    const saveFavorites = (favorites) => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    };

    const toggleFavorite = (id) => {
        const favorites = getFavorites();
        const index = favorites.indexOf(id);
        if (index > -1) {
            favorites.splice(index, 1); // remove
        } else {
            favorites.push(id); // add
        }
        saveFavorites(favorites);
        return favorites.includes(id);
    };

    const renderProducts = (products, favorites) => {

        const container = document.querySelector(".carousel-items");

        // rendering all items cards
        products.forEach((product) => {
            const item = document.createElement("div");
            item.className = "carousel-item";

            const favoriteIcon = document.createElement("div");
            favoriteIcon.className = "favorite-icon";
            favoriteIcon.textContent = "♥";

            // if item already added favorite set active
            if (favorites.includes(product.id)) {
                favoriteIcon.classList.add("active");
            }

            // add favorite click handle
            favoriteIcon.addEventListener("click", (e) => {
                e.stopPropagation();
                const isNowFavorite = toggleFavorite(product.id);
                favoriteIcon.classList.toggle("active", isNowFavorite);
            });

            // image and link create
            const imageLink = document.createElement("a");
            imageLink.href = product.url;
            imageLink.target = "_blank";

            const image = document.createElement("img");
            image.src = product.img;
            image.alt = product.name;
            image.style.width = "100%";
            image.style.borderRadius = "6px";
            imageLink.appendChild(image);

            // create product title
            const title = document.createElement("h3");

            const brand = document.createElement("strong");
            brand.textContent = product.brand;

            const separator = document.createTextNode(" - " + product.name);

            title.appendChild(brand);
            title.appendChild(separator);


            // create product price 
            const price = document.createElement("div");
            price.className = "price";
            price.textContent = `${product.price.toLocaleString("tr-TR", {
                minimumFractionDigits: 2,
            })} TL`;

            // create add to cart button 
            const btn = document.createElement("button");
            btn.className = "add-to-cart";
            btn.textContent = "Sepete Ekle";

            // create rating stars
            const rating = document.createElement("div");
            rating.className = "rating-stars";

            const stars = 5;
            const score = product.rating || 2;

            // set star color according to rating
            for (let i = 1; i <= stars; i++) {
                const star = document.createElement("span");
                star.className = "star";
                if (i <= Math.floor(score)) {
                    star.classList.add("full");
                } else if (i - score < 1) {
                    star.classList.add("half");
                }
                rating.appendChild(star);
            }

            // create product promo area for promo that in future
            const promo = document.createElement("div")
            promo.className = "promo-area"

            //create old price wrapper
            const oldPriceWrapper = document.createElement("div");
            oldPriceWrapper.className = "old-price-wrapper";

            const oldPrice = document.createElement("div");
            oldPrice.className = "old-price";

            // format the original price using Turkish locale
            oldPrice.textContent = `${product.original_price.toLocaleString("tr-TR", {
                minimumFractionDigits: 2,
            })} TL`;

            // calculate and round the discount rate
            const discountRate = Math.round(
                100 - (product.price / product.original_price) * 100
            );

            const discount = document.createElement("div");
            discount.className = "discount-wrapper";

            const percentText = document.createElement("span");
            percentText.className = "discount-percent";
            percentText.textContent = `%${discountRate}`;

            const arrowCircle = document.createElement("span");
            arrowCircle.className = "discount-circle";
            arrowCircle.textContent = "▼";

            discount.appendChild(percentText);
            discount.appendChild(arrowCircle);

            item.appendChild(favoriteIcon);
            item.appendChild(imageLink);
            item.appendChild(title);
            item.appendChild(rating);

            // show discounted price and set its color
            if (discountRate > 0) {
                oldPriceWrapper.appendChild(oldPrice);
                oldPriceWrapper.appendChild(discount);
                item.appendChild(oldPriceWrapper);
                price.style.color = "#03a76a";
            }
            else
                price.style.color = "#797e84";

            item.appendChild(oldPriceWrapper);
            item.appendChild(price);
            item.appendChild(promo)
            item.appendChild(btn);
            container.appendChild(item);
        });

        slideCarousel();
    };

    // slide func left-right by the buttons
    const slideCarousel = () => {
        const container = document.querySelector(".carousel-items");
        const left = document.querySelector(".carousel-slide-button.left");
        const right = document.querySelector(".carousel-slide-button.right");

        // get item width for sliding
        const getItemWidth = () => {
            const item = container.querySelector(".carousel-item");
            const style = window.getComputedStyle(item);
            const margin = parseInt(style.marginRight || 0) + 12;
            return item.offsetWidth + margin;
        };

        left.addEventListener("click", () => {
            container.scrollLeft -= getItemWidth();
        });

        right.addEventListener("click", () => {
            container.scrollLeft += getItemWidth();
        });
    };

    init();
})();
