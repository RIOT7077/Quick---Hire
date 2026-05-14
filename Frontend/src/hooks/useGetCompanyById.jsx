import axios from "axios";
import { useEffect } from "react";
import { COMPANY_API_ENDPOINT } from "../../utils/data";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "../redux/companySlice";
const useGetCompany = (companyId) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchSingleCompany = async () => {
      try {
        const res = await axios.get(
          `${COMPANY_API_ENDPOINT}/get/${companyId}`,
          {
            withCredentials: true,
          }
        );
        dispatch(setSingleCompany(res.data.company));
      } catch (error) {
        console.log(error);
      }
    };
    if (companyId) {
      fetchSingleCompany();
    }
  }, [companyId, dispatch]);
};

export default useGetCompany;
