import React, { useEffect, useState } from "react";
import RatingTemps from "./RatingTemps";
import Rating from "./Rating";
import RatingReact from "react-rating";
import Pagination from "./Pagination";
import { FaStar } from "react-icons/fa";
import { CiStar } from "react-icons/ci";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { customerReviewSend } from "../store/reducers/homeReducer";
import { PulseLoader } from "react-spinners";

const ProductReviews = ({ product }) => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.customerAuth);
  const { products, totalReviews, ratingReview, reviews, isLoading } =
    useSelector((state) => state.home);

  const [parPage, setParPage] = useState(1);
  const [pageNumber, setPageNumber] = useState(10);

  const [enterRating, setEnterRating] = useState("");
  const [enterReview, setEnterReview] = useState("");

  const handleSubmitReview = (e) => {
    e.preventDefault();
    const userEnteredProductReview = {
      name: userInfo.name,
      review: enterReview,
      rating: enterRating,
      productId: product._id,
    };
    dispatch(customerReviewSend(userEnteredProductReview));
  };

  useEffect(() => {
    if (!isLoading) {
      setEnterRating("");
      setEnterReview("");
    }
  }, [isLoading]);

  return (
    <div className="mt-8">
      <div className="flex gap-10 md-lg:flex-col">
        <div className="flex flex-col gap-2 justify-start items-start py-4">
          <div>
            <span className="text-6xl font-semibold">4.5</span>
            <span className="text-3xl font-semibold text-slate-600">/5</span>
          </div>
          <div className="flex text-3xl">
            <Rating ratings={4.5} />
          </div>
          <p className="text-sm text-slate-600">15 Reviews</p>
        </div>

        <div className="flex gap-2 flex-col py-4">
          <div className="flex justify-start items-center gap-5">
            <div className="text-md flex gap-1 w-[93px]">
              <RatingTemps rating={5} />
            </div>
            <div className="w-[200px] h-[14px] bg-slate-200 relative">
              <div className="h-full bg-[#Edbb0E] w-[60%]"></div>
            </div>
            <p className="text-sm text-slate-600 w-[0%]">10</p>
          </div>

          <div className="flex justify-start items-center gap-5">
            <div className="text-md flex gap-1 w-[93px]">
              <RatingTemps rating={4} />
            </div>
            <div className="w-[200px] h-[14px] bg-slate-200 relative">
              <div className="h-full bg-[#Edbb0E] w-[70%]"></div>
            </div>
            <p className="text-sm text-slate-600 w-[0%]">20</p>
          </div>

          <div className="flex justify-start items-center gap-5">
            <div className="text-md flex gap-1 w-[93px]">
              <RatingTemps rating={3} />
            </div>
            <div className="w-[200px] h-[14px] bg-slate-200 relative">
              <div className="h-full bg-[#Edbb0E] w-[40%]"></div>
            </div>
            <p className="text-sm text-slate-600 w-[0%]">8</p>
          </div>

          <div className="flex justify-start items-center gap-5">
            <div className="text-md flex gap-1 w-[93px]">
              <RatingTemps rating={2} />
            </div>
            <div className="w-[200px] h-[14px] bg-slate-200 relative">
              <div className="h-full bg-[#Edbb0E] w-[30%]"></div>
            </div>
            <p className="text-sm text-slate-600 w-[0%]">5</p>
          </div>

          <div className="flex justify-start items-center gap-5">
            <div className="text-md flex gap-1 w-[93px]">
              <RatingTemps rating={1} />
            </div>
            <div className="w-[200px] h-[14px] bg-slate-200 relative">
              <div className="h-full bg-[#Edbb0E] w-[10%]"></div>
            </div>
            <p className="text-sm text-slate-600 w-[0%]">3</p>
          </div>

          <div className="flex justify-start items-center gap-5">
            <div className="text-md flex gap-1 w-[93px]">
              <RatingTemps rating={0} />
            </div>
            <div className="w-[200px] h-[14px] bg-slate-200 relative">
              <div className="h-full bg-[#Edbb0E] w-[0%]"></div>
            </div>
            <p className="text-sm text-slate-600 w-[0%]">0</p>
          </div>
        </div>
      </div>
      <h2 className="text-slate-600 text-xl font-bold py-5">
        Product Review 10
      </h2>

      <div className="flex flex-col gap-8 pb-10 pt-4">
        {[1, 2, 3, 4, 5].map((r, i) => (
          <div key={i} className="flex flex-col gap-1">
            <div className="flex justify-between items-center">
              <div className="flex gap-1 text-xl">
                <RatingTemps rating={4} />
              </div>
              <span className="text-slate-600">8 Apr 2024</span>
            </div>
            <span className="text-slate-600 text-md">John Doe</span>
            <p className="text-slate-600 text-sm">
              Compact design, but lacking in durability. Easy to use, but the
              battery life is disappointingly short. Overall, a decent product
              for casual use, but not ideal for heavy-duty tasks
            </p>
          </div>
        ))}
        <div className="flex justify-end">
          {
            <Pagination
              pageNumber={pageNumber}
              setPageNumber={setPageNumber}
              totalItem={10}
              parPage={parPage}
              showItem={Math.floor(10 / 3)}
            />
          }
        </div>
      </div>

      <div>
        {userInfo ? (
          <div className="flex flex-col gap-3">
            <div className="flex gap-1">
              <RatingReact
                onChange={(e) => setEnterRating(e)}
                value={enterRating}
                initialRating={enterRating}
                emptySymbol={
                  <span className="text-slate-600 text-4xl">
                    <CiStar />
                  </span>
                }
                fullSymbol={
                  <span className="text-[#Edbb0E] text-4xl">
                    <FaStar />
                  </span>
                }
              />
            </div>
            <form onSubmit={handleSubmitReview}>
              <textarea
                value={enterReview}
                onChange={(e) => setEnterReview(e.target.value)}
                required
                className="border outline-0 p-3 w-full"
                name=""
                id=""
                cols="30"
                rows="5"
              ></textarea>
              <div className="mt-2">
                <button className="py-1 h-[35px] w-[100px] px-5 bg-slate-500 text-white rounded-sm">
                  {isLoading ? (
                    <PulseLoader color="white" margin={2} className="mt-1" />
                  ) : (
                    "Submit"
                  )}
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div>
            <Link
              to="/login"
              className="py-1 px-5 bg-red-500 text-white rounded-sm"
            >
              Login First{" "}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductReviews;
