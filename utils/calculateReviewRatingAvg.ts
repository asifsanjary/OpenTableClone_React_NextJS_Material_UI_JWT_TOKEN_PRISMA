import { Review } from '@prisma/client'

export const calculateReviewRatingAvg = (reviews: Review[]): string => {
    if (!reviews.length) return "0";
    const rating = reviews.reduce((sum, reviews) => {
        return sum + reviews.rating
    }, 0) / reviews.length
    return rating.toFixed(1);
}