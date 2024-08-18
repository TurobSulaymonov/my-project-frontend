import Link from "next/link";
import React from "react";

const OfferSection = () => {
  return (
    <section className="offer-section">
      <div className="container">
        <div className=" info-row w-full h-screen bg-gradient-to-t from-foreground to-background flex items-center justify-space-between g-3" 
        >
          <div className="col-md-6">
            <div className="fz-3-single-offer">
              <p className="fz-3-single-offer__discount-percentage">10% off</p>
              <h4 className="fz-3-single-offer__title">
                10% off on All 500gm & 1kg Cakes
              </h4>
              <Link href="/property" className="fz-3-single-offer__btn">
                Shop Now
              </Link>
            </div>
          </div>

          <div className="col-md-6">
            <div className="fz-3-single-offer fz-3-single-offer-2">
              <p className="fz-3-single-offer__discount-percentage">10% off</p>
              <h4 className="fz-3-single-offer__title">
                10% off on All 500gm & 1kg Cakes
              </h4>
              <Link href="/property" className="fz-3-single-offer__btn">
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OfferSection;
