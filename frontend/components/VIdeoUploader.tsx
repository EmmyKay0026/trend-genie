// "use client";
// import React, { useEffect } from "react";
// import Uppy from "@uppy/core";
// import Tus, { type TusBody } from "@uppy/tus";
// import { Dashboard } from "@uppy/react";
// import "@uppy/core/dist/style.css";
// import "@uppy/dashboard/dist/style.css";

// type MyMeta = {
//   user_id: string;
//   headers?: string;
// };
// const VideoUploader = () => {
//   const [uppyInstance, setUppyInstance] = React.useState<Uppy<
//     MyMeta,
//     TusBody
//   > | null>(null);

//   const getUserLocalInfo = () => {
//     const contentRepurpose = localStorage.getItem("contentRepurpose");
//     if (contentRepurpose) {
//       return JSON.parse(contentRepurpose);
//     }
//     return null;
//   };

//   useEffect(() => {
//     const uppy = new Uppy<MyMeta, TusBody>({
//       restrictions: {
//         maxFileSize: 1000 * 1024 * 1024, // 1 GB
//         maxNumberOfFiles: 1,
//         allowedFileTypes: ["video/*"],
//       },
//       autoProceed: true,
//     });

//     uppy.use(Tus, {
//       endpoint: "http://localhost:1080/files",
//       chunkSize: 5 * 1024 * 1024, // 5MB chunks
//       retryDelays: [0, 1000, 3000, 5000],

//       metadata: {
//         user_id: getUserLocalInfo()?.userId || "",
//         headers: `Bearer ${getUserLocalInfo()?.token}` || "",
//       },
//     });

//     setUppyInstance(uppy);

//     return () => uppy.destroy();
//   }, []);

//   return uppyInstance ? <Dashboard uppy={uppyInstance} /> : null;
// };

// export default VideoUploader;

// "use client";
// import React, { useEffect } from "react";
// import Uppy from "@uppy/core";
// import Tus from "@uppy/tus";
// import { Dashboard } from "@uppy/react";
// import "@uppy/core/dist/style.css";
// import "@uppy/dashboard/dist/style.css";

// const VideoUploader = () => {
//   const [uppyInstance, setUppyInstance] = React.useState<Uppy | null>(null);

// const getUserLocalInfo = () => {
//   const contentRepurpose = localStorage.getItem("contentRepurpose");
//   if (contentRepurpose) {
//     return JSON.parse(contentRepurpose);
//   }
//   return null;
// };

//   useEffect(() => {
//     const uppy = new Uppy({
//       restrictions: {
//         maxFileSize: 1000 * 1024 * 1024, // 1 GB
//         maxNumberOfFiles: 1,
//         allowedFileTypes: ["video/*"],
//       },
//       autoProceed: true,
//     });

//     uppy.use(Tus, {
//       endpoint: "http://localhost:1080/files/",
//       chunkSize: 5 * 1024 * 1024,
//       retryDelays: [0, 1000, 3000, 5000],
//       allowedMetaFields: ["filetype", "user_id"],
//     });

//     // ✅ Set global metadata here
//     uppy.on("file-added", (file) => {
//       const userInfo = getUserLocalInfo();
//       if (userInfo) {
//         uppy.setFileMeta(file.id, {
//           user_id: userInfo.userId,
//           filetype: file.type,
//           token: userInfo.token,
//         });
//       }
//     });

//     setUppyInstance(uppy);

//     return () => uppy.destroy();
//   }, []);

//   return uppyInstance ? <Dashboard uppy={uppyInstance} /> : null;
// };

// export default VideoUploader;

"use client";
import React, { useEffect, useRef, useState } from "react";
import Uppy from "@uppy/core";
import Tus from "@uppy/tus";
import { Dashboard } from "@uppy/react";
import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";

const VideoUploader = () => {
  const uppyRef = useRef<Uppy | null>(null);
  const [ready, setReady] = useState(false);

  const getUserLocalInfo = () => {
    const contentRepurpose = localStorage.getItem("contentRepurpose");
    return contentRepurpose ? JSON.parse(contentRepurpose) : null;
  };

  useEffect(() => {
    const uppy = new Uppy({
      restrictions: {
        maxFileSize: 1000 * 1024 * 1024, // 1 GB
        maxNumberOfFiles: 1,
        allowedFileTypes: ["video/*"],
      },
      autoProceed: true,
    });

    uppy.use(Tus, {
      endpoint: "http://localhost:1080/files/", // ✅ trailing slash is important!
      chunkSize: 5 * 1024 * 1024,
      retryDelays: [0, 1000, 3000, 5000],
      allowedMetaFields: ["user_id", "filetype", "filename", "token"],
    });
    // ✅ Set global metadata here
    uppy.on("file-added", (file) => {
      const userInfo = getUserLocalInfo();
      if (userInfo) {
        uppy.setFileMeta(file.id, {
          filename: file.name,
          user_id: userInfo.userId,
          filetype: file.type,
          token: userInfo.token,
        });
      }

      console.log({
        filename: file.name,
        user_id: userInfo.userId,
        filetype: file.type,
        token: userInfo.token,
      });
    });

    uppyRef.current = uppy;
    setReady(true); // trigger one render after uppy is ready

    return () => uppy.destroy();
  }, []);

  return ready && uppyRef.current ? <Dashboard uppy={uppyRef.current} /> : null;
};

export default VideoUploader;
