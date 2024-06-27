import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const GuestModal = ({ setIsModalActive, sendDatatoAddBlog }) => {
  const [guestData, setGuestData] = useState({
    name: "",
    email: "",
    address: "",
    contact: "",
  });

  const handleChange = (e) => {
    setGuestData({ ...guestData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log(guestData);
    if (guestData.name && guestData.email !== "") {
      setIsModalActive(false);
    }
    sendDatatoAddBlog(guestData);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add Guest</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader></DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              name="name"
              defaultValue=""
              className="col-span-3"
              value={guestData.name}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              email
            </Label>
            <Input
              id="email"
              name="email"
              defaultValue=""
              className="col-span-3"
              value={guestData.email}
              onChange={handleChange}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="contact" className="text-right">
              contact
            </Label>
            <Input
              id="contact"
              name="contact"
              defaultValue=""
              className="col-span-3"
              value={guestData.contact}
              onChange={handleChange}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="address" className="text-right">
              Address
            </Label>
            <Input
              id="address"
              name="address"
              defaultValue=""
              className="col-span-3"
              value={guestData.address}
              onChange={handleChange}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GuestModal;
