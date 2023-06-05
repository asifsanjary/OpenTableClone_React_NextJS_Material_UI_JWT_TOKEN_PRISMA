import React from "react";
import Link from "next/link";
import { RestaurantCardType } from "../../page";
import Price from "../../components/Price";
import { calculateReviewRatingAvg } from "../../../utils/calculateReviewRatingAvg";
import Stars from "../../components/Stars";

interface Props {
  restaurantCard: RestaurantCardType;
}

const RestaurantCard = ({ restaurantCard }: Props) => {

  const renderRatingText = (): string => {
    const rating = parseFloat(calculateReviewRatingAvg(restaurantCard.reviews));
    if (rating > 4) return "Awesome"
    else if (rating > 3) return "Good"
    else if (rating > 2) return "Average"
    else return ""
  }

  return (
    <div className="border-b flex pb-5">
      <img
        src={restaurantCard.main_image}
        alt=""
        className="w-44 h-36 rounded"
      />
      <div className="pl-5">
        <h2 className="text-3xl">{restaurantCard.name}</h2>
        <div className="flex items-start">
          <div className="flex mb-2"><Stars reviews={restaurantCard.reviews} /></div>
          <p className="ml-2 text-sm">{renderRatingText()}</p>
        </div>
        <div className="mb-9">
          <div className="font-light flex text-reg capitalize">
            <Price price={restaurantCard.price} />
            <p className="mr-4">{restaurantCard.cuisine.name}</p>
            <p className="mr-4">{restaurantCard.location.name}</p>
          </div>
        </div>
        <div className="text-red-600">
          <Link href={`/restaurant/${restaurantCard.slug}`}>
            View more information
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
