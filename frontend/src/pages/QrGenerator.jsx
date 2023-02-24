// import QRCode from "qrcode";
// import { useEffect, useRef, useState } from "react";
// import QrCanvas from "./QrCanvas";

// export default function QrGenerator() {
//   const [text, setText] = useState("");
//   const [qrcode, setQqcode] = useState(
//     "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/1200px-QR_code_for_mobile_English_Wikipedia.svg.png"
//   );

//   useEffect(() => {
//     QRCode.toDataURL(
//       text,
//       {
//         width: 800,
//         margin: 2,

//         color: {
//           dark: "#010599FF",
//           light: "#FFFFFFFF",
//         },
//       },
//       (err, url) => {
//         if (err) return console.log(err);
//         setQqcode(url);
//       }
//     );
//   }, [text]);

//   return (
//     <>
//       <div className=" w-[80%] mx-auto my-10 text-center ">
//         <input
//           className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//           value={text}
//           onChange={(e) => setText(e.target.value)}
//         />
//         <br />
//         <img src={qrcode} height={800} width={800} />
//         <QrCanvas url={qrcode} />
//         <div className="m-16">
//           <a
//             className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-16 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//             href={qrcode}
//             download={"qrcode.png"}
//           >
//             {" "}
//             Download{" "}
//           </a>
//         </div>
//       </div>
//     </>
//   );
// }

import React, { useState } from "react";
import { QRCode } from "antd";

export default function QrGenerator() {
  const [qrcode, setQrcode] = useState("facebook.com");

  console.log(QRCode);

  return (
    <div>
      <input
        type={"text"}
        onChange={(e) => {
          setQrcode(e.target.value);
        }}
        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
      <>{qrcode}</>
      <QRCode
        size={200}
        style={{
          background: "red",
        }}
        value={qrcode}
        color={"fffggggt"}
        icon={
          "https://cdn2.goodwall.io/images/1617005/1617005-1572630028036-19208.png?width=240"
        }
      />
    </div>
  );
}
