import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { setSearchedQuery } from "../../redux/jobSlice";

const categories = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "UI/UX Designer",
  "Data Scientist",
  "Product Manager",
  "Project Manager",
  "DevOps Engineer",
  "Artificial Intelligence Engineer",
  "Cybersecurity Engineer",
  "Graphics Engineer",
  "Graphics Designer",
  "Video Editor",
];

const Categories = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/Browse");
  };

  return (
    <div className="py-0">
      <div>
        <h1 className="text-2xl font-bold mt-8 mb-0 text-center bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          Categories
        </h1>
      </div>
      <p className="text-center text-gray-600">
        Explore our extensive job market
      </p>
      <Carousel className="w-full max-w-xl mx-auto mt-6">
        <CarouselContent>
          {categories.map((category, index) => (
            <CarouselItem
              key={index}
              className="p-10 md:basis-1/2 lg:basis-1/3"
            >
              <Button
                className="bg-gradient-to-r from-blue-400 to-purple-400 text-white p-5 rounded-md shadow-lg transition duration-300 hover:scale-110 hover:from-purple-500 hover:to-blue-500"
                onClick={() => searchJobHandler(category)}
              >
                {category}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default Categories;
