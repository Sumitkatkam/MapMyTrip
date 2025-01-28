import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FcGoogle } from 'react-icons/fc';
import axios from 'axios';

const Header = () => {
  const users = JSON.parse(localStorage.getItem('users'));
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() =>{
    console.log(users)
  },[]);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error),
  });

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
        window.location.reload();
      })
  };

  return (
    <div className='p-2 shadow-sm flex justify-between items-center'>
      <a href='/'>
      <img src="/MapMyTripLogo.png" className='cursor-pointer'/>
      </a>
      <div className='px-5'>
      {users?
        <div className='flex items-center gap-5'>
          <a href='/create-trip'>
          <Button variant="outline" className='rounded-full'>Create Trip</Button>
          </a>
          <a href='/my-trips'>
          <Button variant="outline" className='rounded-full'>My Trips</Button>
          </a>
          <Popover>
            <PopoverTrigger><img src={users?.picture} className='h-[35px] w-[35px] rounded-full cursor-pointer'/></PopoverTrigger>
            <PopoverContent>
              <h2 className='text-center cursor-pointer' onClick={() => {
                googleLogout();
                localStorage.clear();
                window.location.reload();
              }}>Logout</h2>
            </PopoverContent>
          </Popover>

        </div>  
        :
        <Button onClick={() => setOpenDialog(true)}>Sign In</Button>
      }
      </div>
      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="/MapMyTripLogo.png"/>
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
  )
}

export default Header;