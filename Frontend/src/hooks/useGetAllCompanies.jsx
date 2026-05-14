import axios from "axios";
import { useEffect } from "react";
import { COMPANY_API_ENDPOINT } from "../../utils/data";
import { useDispatch } from "react-redux";
import { setCompanies } from "../redux/companySlice";
const useGetAllCompanies = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAllCompanies = async () => {
      try {
        const res = await axios.get(`${COMPANY_API_ENDPOINT}/get`, {
          withCredentials: true,
        });
        console.log(res.data);
        if (res?.data?.success) {
          dispatch(setCompanies(res.data.companies));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllCompanies();
  }, []);
};

export default useGetAllCompanies;
