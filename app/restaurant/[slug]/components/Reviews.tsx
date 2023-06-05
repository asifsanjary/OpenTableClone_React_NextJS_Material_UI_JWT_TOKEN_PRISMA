import { Review } from "@prisma/client";
import React from "react";
import ReviewCard from "./ReviewCard";

const Reviews = ({ reviews }: { reviews: Review[] }) => {
  return (
    <div>
      <h1 className="font-bold text-3xl mt-10 mb-7 border-b pb-5">
        {reviews.length > 0 ? `What ${reviews.length} people are saying` : `There are no reviews`}
      </h1>
      {reviews &&
        <div>
          {reviews.map(review => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      }
    </div>
  );
};

export default Reviews;
