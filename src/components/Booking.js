import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import img from '../images/paytm.png'

export const Booking = () => {
  const [data, setData] = useState();

  useEffect(() => {
    const fetch = async () => {
      await axios
        .get("http://localhost:8080/api/v1/users/getbooking", {
          headers: { Authorization: Cookies.get("accessToken") },
        })
        .then((res) => {
          setData(res.data.data);
        })
        .catch((err) => console.log(err));
    };
    fetch();
  }, []);

  console.log(data)
  return (
    <div className="grid lg:grid-cols-2 p-4 md:p-8 gap-10">
      {data?.map((ee, i) => {
        const e = ee.event_id;
        return (
          <div
            key={i}
            className="grid md:grid-cols-3 gap-10 items-center p-4 rounded bg-[#f3f3f1]"
          >
            <div>
              <img className="p-4 w-full md:h-[200px] bg-white" src={img} />
              <div className="text-center">
                <button className="bg-blue-500 p-1 rounded">Download</button>
              </div>
            </div>
            <div className="grid gap-2 overflow-hidden">
              <div className="font-medium">
                <div className="text-lg">Ticket ID:</div>
                <div className="text-md text-blue-700">{e._id}</div>
              </div>

              <div className="font-medium">
                <div className="text-lg">Location:</div>
                <div className="text-md text-blue-700 capitalize">{e.location}</div>
              </div>
              <div className="font-medium">
                <div className="text-lg">Price:</div>
                <div className="text-md text-blue-700 uppercase">₹ {e.price}</div>
              </div>
            </div>
            <div className="grid gap-2">
              <div className="font-medium">
                <div className="text-lg">Date & Time:</div>
                <div className="text-md text-blue-700">{e.e_date}, {e.e_time}</div>
              </div>

              <div className="font-medium">
                <div className="text-lg">Booking Date:</div>
                <div className="text-md text-blue-700 uppercase">{new Date(e.createdAt).toLocaleDateString()}</div>
              </div>
              <div className="font-medium">
                <div className="text-lg">Title:</div>
                <div className="text-md text-blue-700 uppercase">{e.title}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
