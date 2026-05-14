import React, { useState } from "react";
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_ENDPOINT } from "../../../utils/data.js";
import { toast } from "sonner";
import { setUser } from "../../redux/authSlice";
import { Loader2 } from "lucide-react";
const EditProfileModal = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    fullname: user?.fullname,
    email: user?.email,
    phoneNumber: user?.phoneNumber,
    bio: user?.profile?.bio,
    skills: user?.profile?.skills?.map((skill) => skill),
    file: user?.profile?.resume,
  });
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const handleFileChange = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", input.fullname);
    formData.append("email", input.email);
    formData.append("phone", input.phoneNumber);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      setLoading(true);
      const res = await axios.post(
        `${USER_API_ENDPOINT}/profile/update`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("failed to update profile ");
    } finally {
      setLoading(false);
    }
    setOpen(false);
    console.log(input);
  };
  const FileChangehandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };
  return (
    <div>
      <Dialog open={open}>
        <DialogContent
          className={"sm:max-w-[500px]"}
          onInteractOutside={() => setOpen(false)}
        >
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleFileChange}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right" htmlFor="name">
                  Name
                </Label>
                <input
                  type="text"
                  onChange={changeEventHandler}
                  value={input.fullname}
                  id="name"
                  name="name"
                  className="col-span-3 border border-gray-300 w-full rounded-md p-2"
                />
                <Label className="text-right" htmlFor="email">
                  Email
                </Label>
                <input
                  type="text"
                  value={input.email}
                  onChange={changeEventHandler}
                  id="email"
                  name="email"
                  className="col-span-3 border border-gray-300 w-full rounded-md p-2"
                />
                <Label className="text-right" htmlFor="phone">
                  Phone
                </Label>
                <input
                  type="tel"
                  value={input.phoneNumber}
                  onChange={changeEventHandler}
                  id="phone"
                  name="phone"
                  className="col-span-3 border border-gray-300 w-full rounded-md p-2"
                />
                <Label className="text-right" htmlFor="bio">
                  Bio
                </Label>
                <input
                  type="text"
                  value={input.bio}
                  onChange={changeEventHandler}
                  id="bio"
                  name="bio"
                  className="col-span-3 border border-gray-300 w-full rounded-md p-2"
                />
                <Label className="text-right" htmlFor="skills">
                  Skills
                </Label>
                <input
                  type="text"
                  value={input.skills}
                  onChange={changeEventHandler}
                  id="skills"
                  name="skills"
                  className="col-span-3 border border-gray-300 w-full rounded-md p-2"
                />
                {/*resume file upload*/}
                <Label className="text-right" htmlFor="resume">
                  Resume
                </Label>
                <input
                  type="file"
                  id="file"
                  value={input.resume}
                  onChange={FileChangehandler}
                  name="resume"
                  className="col-span-3 border border-gray-300 w-full rounded-md p-2"
                />
              </div>
            </div>
            <DialogFooter>
              {loading ? (
                <Button className={"w-full my-4"}>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please Wait{" "}
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="block w-3/4 bg-gray-800 mx-auto hover:bg-black text-white px-4 py-2 my-5 mb-2 rounded-md"
                >
                  Save
                </Button>
              )}
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditProfileModal;
