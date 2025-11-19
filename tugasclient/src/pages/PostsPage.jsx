import PostCrud from "../component/PostCrud";

const PostsPage = () => {
    return (
        <div className="container py-4">
            <h3 className="mb-4">Manajemen Post</h3>
            <PostCrud />
        </div>
    );
};

export default PostsPage;
