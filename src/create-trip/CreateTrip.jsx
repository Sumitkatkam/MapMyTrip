import { chatSession } from "@/AI Service/AIModel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AI_PROMPT,
  SelectBudgetOptions,
  SelectTravelsList,
} from "@/constants/options";
import React, { useEffect, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import toast, { Toaster } from "react-hot-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/AI Service/firebaseConfig";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const CreateTrip = () => {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); 

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {}, [formData]);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error),
  });

  const onGenerate = async () => {
    const users = localStorage.getItem("users");

    if (!users) {
      setOpenDialog(true);
      return;
    }

    if (!formData?.location) {
      toast.error("Please select a destination.");
      return;
    }
    if (!formData?.noOfDays || formData?.noOfDays <= 0) {
      toast.error("Please enter a valid number of days.");
      return;
    }
    if (formData?.noOfDays >= 11) {
      toast.error("Number of days should be less than 11.");
      return;
    }
    if (!formData?.budget) {
      toast.error("Please select a budget.");
      return;
    }
    if (!formData?.traveller) {
      toast.error("Please select who is joining you.");
      return;
    }
    setLoading(true);
    const FINAL_PROMT = AI_PROMPT.replace(
      "{location}",
      formData?.location?.label
    )
      .replace("{noOfDays}", formData?.noOfDays)
      .replace("{budget}", formData?.budget)
      .replace("{traveller}", formData?.traveller);

    const result = await chatSession.sendMessage(FINAL_PROMT);
    console.log("--", result?.response?.text());
    setLoading(false);
    SaveAiTrip(result?.response?.text());
    toast.success("Itinerary generated successfully!");
  };

  const SaveAiTrip = async (Tripdata) => {
    try {
      setLoading(true);
      const users = JSON.parse(localStorage.getItem("users"));
      const docId = Date.now().toString();
      await setDoc(doc(db, "AiTrips", docId), {
        userSelection: formData,
        tripData: JSON.parse(Tripdata),
        usersEmail: users?.email,
        id: docId,
      });
      setLoading(false);
      navigate('/view-trip/' + docId);
    } catch (error) {
      setLoading(false);
      console.error("Error saving trip: ", error);
      toast.error("Failed to save the trip. Please try again.");
    }
  };
  

  const GetUserProfile = (tokenInfo) => {
    console.log(tokenInfo);

    axios
      .get(
        `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "application/json",
          },
        }
      )
      .then((resp) => {
        console.log(resp);
        localStorage.setItem("users", JSON.stringify(resp.data));
        setOpenDialog(false);
        onGenerate();
      })
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
      <Toaster
        className="text-4xl"
        position="top-center"
        reverseOrder={false}
      />
      <h2 className="font-bold text-3xl">Tell us your travel preferences</h2>
      <p className="mt-3 text-gray-500 text-xl">
        Just provide some basic information about your trip and our{" "}
        <span className="text-[#ff3131] font-semibold">MapMyTrip</span> planner
        will generate a beautiful itinerary based on your preferences.
      </p>
      <div className="mt-20 flex flex-col gap-10">
        <div>
          <h2 className="text-xl my-3 font-medium">
            What's your preferred destination?
          </h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              place,
              onChange: (v) => {
                setPlace(v);
                handleInputChange("location", v);
              },
            }}
          />
        </div>
        <div>
          <h2 className="text-xl my-3 font-medium">
            How many days are you planning for your trip?
          </h2>
          <Input
            placeholder={"Ex.3"}
            type="number"
            onChange={(e) => handleInputChange("noOfDays", e.target.value)}
          />
        </div>
        <div>
          <h2 className="text-xl my-3 font-medium">What's your budget?</h2>
          <div className="grid grid-cols-3 mt-5 gap-5">
            {SelectBudgetOptions.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange("budget", item.title)}
                className={`p-4 border cursor-pointer rounded-lg hover:shadow-xl
                  ${
                    formData?.budget == item.title && "shadow-xl border-black"
                  }`}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-sm text-gray-500">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-xl my-3 font-medium">
            Who's joining you on your next unforgettable adventure?
          </h2>
          <div className="grid grid-cols-3 mt-5 gap-5">
            {SelectTravelsList.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange("traveller", item.people)}
                className={`p-4 border cursor-pointer rounded-lg hover:shadow-xl 
                ${
                  formData?.traveller == item.people && "shadow-xl border-black"
                }`}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-sm text-gray-500">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="my-10 flex justify-center">
        <Button 
        disabled={loading}
        onClick={onGenerate}>
        {loading?
          <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin"/>: 'Generate the Itinerary ✨'
        }
          </Button>
      </div>
      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="/MapMyTripLogo.png" alt="" />
              <h2 className="font-bold text-lg mt-7">
                🔒 Sign In with Google Account.
              </h2>
              <p>Sign in quickly and securely using your Google account.</p>
              <Button
                onClick={login}
                className="w-full mt-5 flex gap-2 items-center"
              >
                Sign In with Google
                <FcGoogle className="h-7 w-7" />
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateTrip;
