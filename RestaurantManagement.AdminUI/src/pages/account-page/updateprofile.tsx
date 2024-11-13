import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AccountDto } from "../../models/employeeDto";
import { GetDetailEmployee } from "../../services/employee-service";

const UpdateProfilePage = () => {

    const { userId } = useParams<{ userId: string }>();
    const [user, setUser] = useState<string>('');
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [userImage, setUserImage] = useState<string>('');
    const [fileInputRef, setFileInputRef] = useState<HTMLInputElement | null>(null);

    const navigate = useNavigate();

    return (
        <>

        </>
    )
}

export default UpdateProfilePage;