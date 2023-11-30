import { Link } from "react-router-dom";


const Plans = () => {
  return (
    <div className="my-10 bg-green-100 rounded-xl pb-20">
      <h1 className="text-center font-bold text-black text-5xl underline uppercase pb-10 pt-20">
        Our Plans
      </h1>
      <div className="md:flex justify-center gap-5">
        <div className="card w-96 rounded-2xl border-4 bg-violet-200 border-[#6c5ce7] text-main-blue-50 ">
          <div className="card-body">
            <h2 className="card-title w-fit px-5 py-1 rounded-lg bg-green-500  ">
              Free For 1 Month
            </h2>
            <div className="flex mt-4 justify-between">
              <h1 className="text-lg font-bold">
                Premium <br />
                Individual
              </h1>
              <h1 className="font-bold">
                <p className="text-lg">Free</p>
                <p className="text-sm">For 1 Month</p>
              </h1>
            </div>

            <ul style={{ listStyle: "disc" }} className="font-bold mt-10 ml-5">
              <li>1 Premium Account</li>
              <li>Cancel Anytime</li>
              <li>Access to all content</li>
            </ul>
            <div>
              <Link className="card-actions justify-center" to="/subscription">
                <button className="w-full mt-20  font-bold py-3 rounded-lg text-main-blue-50 border-[#301fb1]  border-2 text-xl text-[#301fb1] ">
                  Buy Now
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="card w-96 rounded-2xl border-4 bg-yellow-100 border-[#eeb720] text-main-blue-50 ">
          <div className="card-body">
            <h2 className="card-title w-fit px-5 py-1  rounded-lg bg-[#c09317] ">
              Most Sold
            </h2>
            <div className="flex mt-4 justify-between">
              <h1 className="text-lg font-bold">
                Premium <br />
                Family
              </h1>
              <h1 className="font-bold">
                <p className="text-lg">$14.99</p>
                <p className="text-sm">For 1 Month</p>
              </h1>
            </div>

            <ul style={{ listStyle: "disc" }} className="mt-10 ml-5 font-bold">
              <li>2 Premium Account</li>
              <li>Cancel Anytime</li>
              <li>Access to all content</li>
              <li>Access To Some Special Content</li>
              <li>15 hr/month Reading Capacity</li>
            </ul>
            <div>
              <Link className="card-actions justify-center" to="/subscription">
                <button className="w-full mt-20 font-bold py-3 rounded-lg text-main-blue-50 border-[#a88115] border-2 text-xl text-[#a88115]">
                  Buy Now
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="card w-96 rounded-2xl border-[#ff5e57]  border-4 bg-red-100 text-main-blue-50 ">
          <div className="card-body">
            <h2 className="card-title text-black w-fit px-5 py-1 rounded-lg bg-[#cc241b] ">
              Awesome Deal
            </h2>
            <div className="flex mt-4 justify-between">
              <h1 className="text-lg font-bold">
                Premium <br />
                Duo
              </h1>
              <h1 className="font-bold">
                <p className="text-lg">$14.99</p>
                <p className="text-sm">For 1 Month</p>
              </h1>
            </div>

            <ul style={{ listStyle: "disc" }} className="font-bold mt-10 ml-5">
              <li>Up to 6 Premium Account</li>
              <li>Cancel Anytime</li>
              <li>Access to all content</li>
              <li>Access To Some Special Content</li>
              <li>30 hr/month Reading Capacity</li>
              <li>Also can have access to our premium batch</li>
            </ul>
            <div>
              <Link className="card-actions justify-center" to="/subscription">
                <button className="w-full mt-20 font-bold py-3 rounded-lg text-main-blue-50 border-2 border-[#c72920] text-xl   ">
                  Buy Now
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Plans;
