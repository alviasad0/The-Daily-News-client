import { useForm } from "react-hook-form";

import Swal from "sweetalert2";
import useAxiosPublic from "../../../../Hooks/UseAxiosPublic";

const AddPublisher = () => {
  const axiosPublic = useAxiosPublic();
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    const publisher = {
      name: data.name,
      image: data.image,
      description: data.description,
      website: data.website,
      tags: data.tags,
    };
    axiosPublic.post("/allPublishers", publisher).then((res) => {
      if (res.data.success) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Article has been added",
          showConfirmButton: false,
          timer: 1500,
        });
        reset();
      }
    });
  };
  return (
    <div className="bg-green-100   rounded-xl justify-center">
      <form onSubmit={handleSubmit(onSubmit)} className=" md:ml-32">
        <div className="  py-10 space-y-7 mx-auto">
          <h1 className="text-3xl font-bold underline">Add Publisher</h1>
          <div className="w-1/2">
            <input
              type="text"
              {...register("image", { required: true })}
              placeholder="Image"
              className="input input-bordered border-2 border-main-blue-300 rounded-lg w-full "
            />
          </div>
          <div className="md:w-1/2">
            <input
              type="text"
              {...register("name", { required: true })}
              placeholder="Publisher Name"
              className="input input-bordered border-2 border-main-blue-300 rounded-lg w-full "
            />
          </div>
          <div className="md:w-1/2">
            <input
              type="text"
              {...register("description", { required: true })}
              placeholder="Publisher Descriptions"
              className="input input-bordered border-2 border-main-blue-300 rounded-lg w-full "
            />
          </div>
          <div className="md:w-1/2">
            <input
              type="text"
              {...register("website", { required: true })}
              placeholder="Publisher Website"
              className="input input-bordered border-2 border-main-blue-300 rounded-lg w-full "
            />
          </div>
          <div className="md:w-1/2">
            <input
              type="text"
              {...register("tags", { required: true })}
              placeholder="Publisher Tags"
              className="input input-bordered border-2 border-main-blue-300 rounded-lg w-full "
            />
          </div>
        </div>
        <div>
          <button className=" font-bold  btn btn-success text-black  w-1/2 mb-10 ">
            Add Publisher
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPublisher;
