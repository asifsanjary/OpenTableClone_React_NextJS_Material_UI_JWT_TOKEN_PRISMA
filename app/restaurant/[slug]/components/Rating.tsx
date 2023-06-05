import { Review } from "@prisma/client";
import React from "react";
import { calculateReviewRatingAvg } from "../../../../utils/calculateReviewRatingAvg";
import Stars from "../../../components/Stars";

const Rating = ({ reviews }: { reviews: Review[] }) => {
  return (
    <div className="flex items-end">
      <div className="ratings mt-2 flex items-center">
      <Stars reviews={reviews}/>
        <p className="text-reg ml-3">{calculateReviewRatingAvg(reviews)}</p>
      </div>
      <div>
        <p className="text-reg ml-4">Review{reviews.length > 1 ? "s" : ""}</p>
      </div>
    </div>
  );
};

export default Rating;
