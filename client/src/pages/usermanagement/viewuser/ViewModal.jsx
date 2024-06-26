import React from 'react'
import { Copy } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const ViewModal = ({name, email, image, Role, contact}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">View</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>User Details</DialogTitle>
          <DialogDescription>
            user Details 
            <div className="flex flex-col items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only text-blue-500 ">
              Name
            </Label>
            <h1 className='font-semibold text-black'> {name}</h1>
          </div>
          <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Email
            </Label>
            <h1 className='font-semibold text-black'> {email}</h1>
          </div>
          <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Role
            </Label>
            <h1 className='font-semibold text-black'> {Role}</h1>
          </div>
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              contact
            </Label>
            <h1 className='font-semibold text-black'> {contact}</h1>
          </div>
          
          <Button type="submit" size="sm" className="px-3">
            <span className="sr-only">Copy</span>
            <Copy className="h-4 w-4" />
          </Button>
        </div>
        </div>
        </div>

          </DialogDescription>
        </DialogHeader>

        
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
        
      </DialogContent>
    </Dialog>
  )
}

export default ViewModal


