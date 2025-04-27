import React from "react";
import { Star } from "lucide-react";

interface TestimonialCardProps {
  name: string;
  role: string;
  image: string;
  rating: number;
  comment: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  name,
  role,
  image,
  rating,
  comment,
}) => {
  const renderRating = () => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        className={`${index < rating ? "text-yellow-400" : "text-gray-500"} w-4 h-4 fill-current`}
      />
    ));
  };

  return (
    <div className="bg-brand-dark p-6 rounded-lg">
      <div className="flex items-center mb-4">
        <img
          src={image}
          alt={name}
          className="w-16 h-16 rounded-full object-cover mr-4"
        />
        <div>
          <h4 className="font-bold">{name}</h4>
          <p className="text-gray-400 text-sm">{role}</p>
        </div>
      </div>
      <div className="mb-3">
        <div className="flex">
          {renderRating()}
        </div>
      </div>
      <p className="text-gray-300 italic">{comment}</p>
    </div>
  );
};

export default TestimonialCard;
