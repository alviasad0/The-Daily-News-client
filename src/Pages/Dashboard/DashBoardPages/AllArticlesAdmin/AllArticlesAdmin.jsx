import { RiDeleteBin6Line } from "react-icons/ri";

const AllArticlesAdmin = () => {





    
    return (
      <div>
        <div>
          <div className="overflow-x-auto">
            <table className="table bg-[#160938] text-main-blue-50">
              {/* head */}
              <thead>
                <tr>
                  <th>
                    <label>
                      <input
                        type="checkbox"
                        className="checkbox text-main-blue-50"
                      />
                    </label>
                  </th>
                  <th className="text-main-blue-50">Author</th>
                  <th className="text-main-blue-50">Title</th>
                  <th className="text-main-blue-50">Posted Date</th>
                  <th className="text-main-blue-50">Publisher</th>
                  <th className="text-main-blue-50">isPremium</th>
                  <th className="text-main-blue-50">Status</th>

                  <th className="text-main-blue-50">Decline</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}

                
                  return (
                    <tr key={article?._id}>
                      <th>
                        <RiDeleteBin6Line
                          onClick={() => handleDelete(article?._id)}
                          size={23}
                          className="text-[#ff3131] cursor-pointer"
                        />
                      </th>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                              <img
                                src={article?.authorImage}
                                alt="Avatar Tailwind CSS Component"
                              />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold text-main-blue-50">
                              {article?.authorName}
                            </div>
                            <div className="text-sm opacity-50">
                              {article?.authorEmail}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        {article?.title}
                        <br />
                      </td>
                      <td>{formattedDate}</td>
                      <td>{article?.publisher}</td>
                      <td>
                        {article?.subscription === "premium" ? (
                          "Premium"
                        ) : (
                          <button
                            onClick={() => handlePremium(article?._id)}
                            className="w-20 font-bold py-3 rounded-lg text-main-blue-50 bg-gradient-to-r from-[#6ba5ef] to-[#3367dd]"
                          >
                            Make Premium
                          </button>
                        )}
                      </td>
                      <td>
                        {article?.status === "active" ? (
                          "Approved"
                        ) : (
                          <button
                            onClick={() => handleStatus(article?._id)}
                            className="w-20 font-bold py-3 rounded-lg text-main-blue-50 bg-gradient-to-r from-[#6ba5ef] to-[#3367dd]"
                          >
                            Approve Article
                          </button>
                        )}
                      </td>
                      <th>
                        <button
                          className=" w-20 font-bold py-3 rounded-lg text-main-blue-50 bg-gradient-to-r from-[#e75050] to-[#dd3333]"
                          onClick={() =>
                            document.getElementById(article?._id).showModal()
                          }
                        >
                          Declined
                        </button>
                        <dialog id={article?._id} className="modal">
                          <div className="modal-box">
                            <h3 className="font-bold text-main-blue-950 text-lg">
                              Reason for Decline
                            </h3>
                            <form
                              onSubmit={() => handleSendReason(article?._id)}
                            >
                              <input
                                type="text"
                                // {...register("title", { required: true })}
                                name="reason"
                                placeholder="Reason...."
                                className="input mt-4 input-bordered border-2 text-main-blue-950 border-main-blue-300 rounded-lg w-full "
                              />
                              <button className=" px-6 mt-5 font-bold py-3 rounded-lg text-main-blue-50 bg-gradient-to-r from-[#e75050] to-[#dd3333]">
                                Send
                              </button>
                            </form>

                            <p className="py-4 text-main-blue-950">
                              Press ESC key or click outside to close
                            </p>
                          </div>
                          <form method="dialog" className="modal-backdrop">
                            <button>close</button>
                          </form>
                        </dialog>
                      </th>
                    </tr>
                  );
               
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
};

export default AllArticlesAdmin;