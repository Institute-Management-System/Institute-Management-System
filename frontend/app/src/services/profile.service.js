import API from "../api";

const ProfileService = {
    getProfile: async () => {
        return await API.get("/profile");
    },

    updateProfile: async (data) => {
        return await API.put("/profile", data);
    },

    uploadImage: async (file) => {
        const formData = new FormData();
        formData.append("image", file);
        return await API.post("/profile/image", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    },
};

export default ProfileService;
