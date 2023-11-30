import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/UseAxiosPublic";
import { Typewriter } from "react-simple-typewriter";



const AllPublishers = () => {
    const axiosPublic = useAxiosPublic();
  const { data: allPublishers = [] } = useQuery({
    queryKey: ["allPublishers"],
    queryFn: async () => {
      const res = await axiosPublic.get("/allPublishers");
      return res.data;
       

    }
  })
  


  console.log(allPublishers);


  return (
    <div className="mt-20">
      <h1 className="text-center text-black underline text-5xl font-bold pb-10 uppercase">
        <span className="text-black font-bold">daily news :</span> {""}
        <span className="mt-2">
          <Typewriter
            words={["AllPublishers Insights", "Publisher's Palette"]}
            loop={0 | false}
            cursor
            cursorStyle="_"
            typeSpeed={30}
            deleteSpeed={30}
            delaySpeed={3000}
          />
        </span>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {allPublishers.map((publishers) => (
          <div key={publishers._id} className="card  bg-green-100 text-black">
            <div className="card-body">
              <figure className="w-[300px] rounded-xl h-[200px] mx-auto">
                <img src={publishers.image} className="w-full h-full" alt="" />
              </figure>
              <h2 className="text-2xl font-bold pt-5">{publishers.name}</h2>
              <p className="text-md text-black font-medium ">
                {publishers.description}
              </p>
              <p className="font-semibold ">
                Website :{" "}
                <span className="font-bold">
                  <a href="">{publishers.website}</a>
                </span>
              </p>
              <p className="">
                {publishers?.tags?.map((tag) => (
                  <button
                    key={tag}
                    className="badge badge-success mr-2 text-lg font-medium"
                  >
                    {tag}
                  </button>
                ))}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllPublishers;
