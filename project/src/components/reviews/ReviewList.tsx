import React from 'react';
import { Star } from 'lucide-react';

interface Review {
  id: string;
  user: {
    name: string;
    avatar?: string;
  };
  rating: number;
  comment: string;
  date: string;
  images?: string[];
}

interface ReviewListProps {
  reviews: Review[];
  onAddImage?: (reviewId: string) => void;
}

const ReviewList: React.FC<ReviewListProps> = ({ reviews, onAddImage }) => {
  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <div key={review.id} className="border-b pb-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                {review.user.avatar ? (
                  <img src={review.user.avatar} alt={review.user.name} className="w-full h-full rounded-full" />
                ) : (
                  <span className="text-gray-500 font-medium">
                    {review.user.name.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              <div>
                <h4 className="font-medium">{review.user.name}</h4>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
              </div>
            </div>
            <span className="text-sm text-gray-500">{review.date}</span>
          </div>
          <p className="text-gray-700 mb-3">{review.comment}</p>
          {review.images && review.images.length > 0 && (
            <div className="flex space-x-2 mb-3">
              {review.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Review ${idx + 1}`}
                  className="w-16 h-16 object-cover rounded-md cursor-pointer hover:opacity-80"
                  onClick={() => window.open(img, '_blank')}
                />
              ))}
            </div>
          )}
          <button
            onClick={() => onAddImage?.(review.id)}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            Add Photo
          </button>
        </div>
      ))}
    </div>
  );
};

export default ReviewList;
