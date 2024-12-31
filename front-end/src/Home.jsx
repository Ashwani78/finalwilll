import React from "react";
import { Link, useNavigate } from "react-router-dom";
import first from "./assets/first.png";
import second from "./assets/second.png";
import third from "./assets/third.png";
import small from "./assets/small.png";
import fourth from "./assets/fourth.png";
import fifth from "./assets/fifth.png";
import sixth from "./assets/sixth.png";
import seventh from "./assets/seveth.png";
import eigth from "./assets/eigth.png";
import nine from "./assets/nine.png";
import ten from "./assets/ten.png";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full">
      <div className="w-full bg-white h-12 fixed top-0 flex items-center justify-between shadow-md pb-2">
        <div className="ml-5">
          <h2>Finalwill</h2>
        </div>
        <div className="flex gap-4 mr-10 text-sm cursor-pointer">
          <Link to="/">
            {" "}
            <a className="hover:text-blue-600">Home</a>
          </Link>
          <Link to="/subscription">
            {" "}
            <a className="hover:text-blue-600">Create will</a>{" "}
          </Link>
          <a className="hover:text-blue-600">FAQ</a>
          <a className="hover:text-blue-600">Conatact Us</a>
          <a className="hover:text-blue-600">Support</a>
          <Link to="/login">
            <a className="hover:text-blue-600">Login</a>
          </Link>
        </div>
      </div>
      <div className="cursor-pointer">
        <img src={first} onClick={() => navigate("login")} />
      </div>
      <div
        className="w-full pt-10 text-white "
        style={{
          backgroundColor: "rgba(222, 95, 77, 1)",
        }}
      >
        <div className="flex gap-10 justify-center">
          <img src={second} alt="" />
          <div className="w-[60%] flex flex-col gap-10 ">
            <p className="mt-5">
              We offer a unique Will writing software to instantly generate
              highly personalised and completely legal wills for Jamaicans. Our
              software was designed by experts in estate planning, Will writing
              and Jamaican law.
            </p>
            <p>
              Our aim is to give all Jamaicans easy and affordable access to
              creating Wills that are customized to your particular needs.
            </p>
            <div className="flex flex-row justify-between text-sm">
              <div className="flex flex-col items-center justify-center text-center w-[30%]">
                <img src={small} alt="" />
                <p>Experts Jamaican Wills designed by Attorneys</p>
              </div>
              <div className="flex flex-col items-center justify-center text-center w-[30%]">
                <img src={small} alt="" />
                <p>Latest technology to secure your data</p>
              </div>
              <div className="flex flex-col items-center justify-center text-center w-[30%]">
                <img src={small} alt="" />
                <p>
                  Specify exactly who inherits your assets and your final wishes
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between mt-5 px-4">
          <p className="w-[50%] text-center">
            To revolutionize the way Jamaicans secure their legacies by offering
            a convenient , high quality, and easy to use will creation service
            at an affordable cost. By adhering to the requirements of a valid
            will, we aim to set a new standard in will creation services in
            Jamaica and beyond. Our goal is to become the leading wills site in
            Jamaica, and ultimately, throughout the Caribbean, empowering
            individuals to take control of their legacy with confidence and
            ease. We are changing the way Jamaicans get their wills. We are
            offering a convenient, high-quality and easy to use online Wills
            generating service at a Low cost.
          </p>
          <img src={third} className="w-[40%]" />
        </div>
        <div className="flex flex-col items-center justify-center gap-4 mt-16">
          <div className="w-full flex items-center justify-center text-2xl font-bold">
            <h1>Hoo does it work</h1>
          </div>
          <div className="w-full flex items-center justify-center  ">
            <h2>
              Creating your will is easy as as 1-2-3 with step by step guide
              written in plain English
            </h2>
          </div>
          <div className="flex w-[70%] flex-row justify-between text-sm mt-20 pb-20">
            <div className="flex flex-col items-center justify-center text-center w-[30%]">
              <img src={small} alt="" />
              <p>
                Answer easy questions to tell us about yourself and about your
                wishes
              </p>
            </div>
            <div className="flex flex-col items-center justify-center text-center w-[30%]">
              <img src={small} alt="" />
              <p>Print your will that is personalized just for you</p>
            </div>
            <div className="flex flex-col items-center justify-center text-center w-[30%]">
              <img src={small} alt="" />
              <p>Sign your will with 2 witnesses to make it legal</p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-[250px] bg-black text-white flex flex-col items-center justify-center ">
        <div>
          <h1 className="w-full flex items-center justify-center text-2xl">
            Secure your Asset and Family - create a will now
          </h1>
        </div>
        <div className="flex items-center justify-center  mt-10  text-sm">
          <p className="w-[15%]">
            Control who gets your estate Protect your family Leave money to
            charity Set out your funeral wishes
          </p>
          <p className="w-[15%] ml-20">
            Reduce inheritance tax Prevent family conflict Get true peace of
            mind ALL wills solicitor checked
          </p>
        </div>
      </div>
      <div className="bg-black">
        <img src={fourth} />
      </div>
      <div className="w-full h-[50px] bg-black"></div>
      <div
        className="flex flex-col gap-3 items-center justify-center"
        style={{
          backgroundColor: "rgba(217, 216, 216, 1)",
        }}
      >
        <div className="w-full flex items-center justify-center mt-10">
          <h1 className="text-gray-500 text-2xl">What our users has to say?</h1>
        </div>
        <div className="flex items-center mt-10 justify-center gap-10">
          <div className="w-[18%] h-[35%] bg-white shadow-md ml-5 flex flex-col text-gray-600 rounded-lg">
            <img src={fifth} />
            <p className="w-full text-center text-xl mt-3">Robert Rose</p>
            <p className="w-full text-sm text-center p-5">
              This is your Testimonial quote. Give your customers the stage to
              tell the world how great you are
            </p>
          </div>
          <div className="w-[18%] h-[35%] bg-white shadow-md ml-5 flex flex-col text-gray-600 rounded-lg">
            <img src={sixth} />
            <p className="w-full text-center text-xl mt-3">Reese Whitman</p>
            <p className="w-full text-sm text-center p-5">
              This is your Testimonial quote. Give your customers the stage to
              tell the world how great you are
            </p>
          </div>
          <div className="w-[18%] h-[35%] bg-white shadow-md ml-5 flex flex-col text-gray-600 rounded-lg">
            <img src={seventh} />
            <p className="w-full text-center text-xl mt-3">Max Johnson</p>
            <p className="w-full text-sm text-center p-5">
              This is your Testimonial quote. Give your customers the stage to
              tell the world how great you are
            </p>
          </div>
          <div className="w-[18%] h-[35%] bg-white shadow-md ml-5 flex flex-col text-gray-600 rounded-lg">
            <img src={eigth} />
            <p className="w-full text-center text-xl mt-3">Jessica Davis</p>
            <p className="w-full text-sm text-center p-5">
              This is your Testimonial quote. Give your customers the stage to
              tell the world how great you are
            </p>
          </div>
        </div>
        <div className="w-[80%] mt-10  bg-white rounded-xl flex items-center justify-center py-10">
          <div className="w-[50%] flex items-center justify-center px-6 py-4">
            <img src={nine} />
          </div>
          <div className="w-[60%] gap-4">
            <h1 className="text-3xl font-bold w-[60%]">
              Subscribe to our newsletter
            </h1>
            <div className="flex flex-col gap-1 mt-10 ">
              <p className="text-gray-500 px-1"> Email*</p>
              <input
                type="text"
                placeholder="Enter Email"
                className="p-1 w-72 border-b-[1px] border-black rounded-sm outline-none focus:border-blue-700 focus:border-b-2"
              />
            </div>
            <p className="text-gray-500 text-sm mt-10">
              Yes, subscribe me to your newsletter
            </p>
            <button
              className="w-[50%] text-center mt-3 h-10 rounded-2xl text-white "
              style={{
                backgroundColor: "rgba(97, 66, 236, 1)",
              }}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
      <div
        className="pt-10"
        style={{
          backgroundColor: "rgba(217, 216, 216, 1)",
        }}
      >
        <img src={ten} />
      </div>
      <div
        className="b-0 w-full h-[300px] text-white flex flex-col items-center justify-center gap-7"
        style={{
          backgroundColor: "rgba(78, 79, 79, 1)",
        }}
      >
        <div className="w-[80%]">
          <h1 className="text-xl font-bold">FinalWill</h1>
        </div>
        <div className="w-[75%] flex ">
          <div className="w-[30%] flex flex-col gap-4">
            <p>Take a Look</p>
            <p>VISIT OUR OFFICE</p>
            <p>Meet the Team</p>
          </div>
          <div className="w-[30%] flex flex-col gap-4">
            <p>VISIT OUR FEED</p>
            <p>Explore our Latest News</p>
          </div>
          <div className="flex flex-col gap-6">
            <p>Check us out</p>
            <p className="text-xs w-[30%]">
              Have any qucstions? Please don't hesitate to call at I123-456-7890
              Cot something to share? Ping us ot info@mysite.com
            </p>
          </div>
        </div>
        <div className="w-[80%]">
          <p className="text-sm">@ 2024 by Final Wills</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
