// import axios from "axios"
// import { useEffect, useState } from "react"

// const useApi = (url) => {
//   const [data, setData] = useState(null)
//   useEffect(() => {
//     ;(async () => {
//       const { data: result } = await axios(url)
//       setData(result)
//     })()
//   }, [url])
//   return data
// }
// export default useApi

import axios from "axios";

export async function GetData(options) {
  const { url, params, data } = options;

  return await axios
    .get(url, {
      params,
    })
    .then((res) => res.data);
}

export default GetData;
