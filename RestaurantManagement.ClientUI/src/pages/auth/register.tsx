import { useState } from "react";
import { CustomerRegister } from "../../services/auth-services";

const RegisterPage = () => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [gender, setGender] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await CustomerRegister(firstName, lastName, email, password, phone, gender);

            console.log('Registration successful:', response);
        } catch (error) {
            console.error('Registration failed:', error);
        }
    };

    return (
        <>
            <main>
                <h2>Register Customer</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>First Name:</label>
                        <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                    </div>
                    <div>
                        <label>Last Name:</label>
                        <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                    </div>
                    <div>
                        <label>Email:</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <div>
                        <label>Phone:</label>
                        <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                    </div>
                    <div>
                        <label className="form-label">Giới tính:</label>
                        <select className="form-select" value={gender} onChange={(e) => setGender(e.target.value)} required>
                            <option value="">Chọn giới tính</option>
                            <option value="Male">Nam</option>
                            <option value="Female">Nữ</option>
                            <option value="Orther">Khác</option>
                        </select>
                    </div>
                    <button type="submit">Register</button>
                </form>
            </main>
        </>
    )

}
export default RegisterPage;