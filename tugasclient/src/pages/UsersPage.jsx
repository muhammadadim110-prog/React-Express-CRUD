import UserCrud from "../component/UserCrud";

const UsersPage = () => {
    return (
        <div className="container py-4">
            <h3 className="mb-4">Manajemen User</h3>
            <UserCrud />
        </div>
    );
};

export default UsersPage;
