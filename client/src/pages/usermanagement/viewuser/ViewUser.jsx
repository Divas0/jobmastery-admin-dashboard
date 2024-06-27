import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Delete, Edit, Eye } from "lucide-react";
import Loader from "@/pages/loader/Loader";
import ViewModal from "./ViewModal";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const ViewUser = () => {
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isviewModal, setisViewModal] = useState(false);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["allusers"],
    queryFn: () =>
      fetch("http://localhost:4000/user/allusers").then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      }),
    onSuccess: (data) => {
      console.log(data, "all users fetched");
    },
  });
  const deleteUserMutation = useMutation(
    (id) =>
      fetch(`http://localhost:4000/user/deleteuser/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        if (!res.ok) throw new Error("Failed to update user");
        return res.json();
      }),
    {
      onSuccess: () => {
        toast("user  deleted succesfully");
        queryClient.invalidateQueries();
        navigate("/viewuser");
      },
      onError: (error) => {
        console.error("Error updating user:", error);
      },
    }
  );
  const { data: selectedUserData, isLoading: isLoadingUserData } = useQuery({
    queryKey: ["userDetail", selectedUserId],
    queryFn: () =>
      fetch(`http://localhost:4000/user/singleuserdata/${selectedUserId}`).then(
        (res) => res.json()
      ),
    enabled: !!selectedUserId,
  });

  const handleView = (userId) => {
    setSelectedUserId(userId);
    setisViewModal(!isviewModal);
  };

  const handleEdit = (userId) => {
    console.log("Edit user:", userId);
    navigate(`/edituser/${userId}`);
  };

  const handleDelete = (userId) => {
    deleteUserMutation.mutate(userId);
  };
  if (isLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }
  if (isLoadingUserData) {
    return (
      <div>
        <Loader />
      </div>
    );
  }
  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="">
      <Table classNamew="w-full h-auto">
        <TableCaption>A list of all users.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-full">SN</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead className="text-right">Role</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data &&
            data.user.map((user, index) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell className="text-right">{user.role}</TableCell>
                <TableCell>
                  <div className="flex gap-[10px]">
                    <button onClick={() => handleView(user.id)}>
                      <Eye className="text-green-600" />
                    </button>
                    {isviewModal && (
                      <ViewModal
                        name={selectedUserData.user.name}
                        email={selectedUserData.user.email}
                        contact={selectedUserData.user.contact}
                        Role={selectedUserData.user.Role}
                      />
                    )}

                    <button onClick={() => handleEdit(user.id)}>
                      <Edit className="text-gray-600" />
                    </button>
                    <button onClick={() => handleDelete(user.id)}>
                      <Delete className="text-red-500" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ViewUser;
