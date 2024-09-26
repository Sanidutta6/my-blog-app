import supabase from "@/lib/supabase";
import { nanoid } from "nanoid";

const uploadImage = async (file, isAvatarImg = false) => {
    const path = isAvatarImg ? `profile_pics/avatar_${nanoid()}_${file.name.split('\\').pop()}` : `post_banner/banner_${nanoid()}_${file.name.split('\\').pop()}`;
    const { data, error } = await supabase
        .storage
        .from('images')
        .upload(path, file, {
            cacheControl: '3600',
            upsert: false
        });

    if (error) return { success: false, message: error.message };

    const { data: resData } = supabase
        .storage
        .from('images')
        .getPublicUrl(data.path);

    return { success: true, url: resData.publicUrl };
}

const updateUser = async (name, email, password) => {
    const { data, error } = await supabase.auth.updateUser({
        email,
        password,
    });

    if (error) return { success: false, message: error.message };

    return { success: true, data };
}

const getSession = async () => {
    const { data, error } = await supabase.auth.getSession();

    if (error) return { success: false, message: error.message };

    return { success: true, session: data.session };
};

const signUpUser = async (name, email, password, role, avatarFile) => {
    const response = await uploadImage(avatarFile, true);

    if (!response.success) return { success: false, message: response.message };

    const { data, error } = await supabase.auth.signUp({
        name,
        email,
        password,
        options: {
            data: {
                name,
                avatar_url: response.url,
                role,  // or 'author', 'admin', etc.
            },
        },
    });

    if (error) return { success: false, message: error.message };

    return { success: true, data };
}

const signInUser = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) return { success: false, message: error.message };

    return { success: true, data };
}

const signOutUser = async (email) => {
    const { error } = await supabase.auth.signOut();

    if (error) return { success: false, message: error.message };

    return { success: true };
}

const createPost = async (authorId, title, slug, bannerImg, content) => {
    const response = uploadImage(bannerImg, false);

    if (!response.success) return { success: false, message: response.message };

    const { data, error } = await supabase
        .from('posts')
        .insert([
            { author_id: authorId, title, slug, content, banner_url: response.url },
        ])
        .select();

    if (error) return { success: true, message: error.message };

    return { success: true, data };
}

const getPosts = async () => {
    const { data, error } = await supabase
        .from('posts')
        .select("*");

    if (error) return { success: true, message: error.message };

    return { success: true, data };
}

const getAuthorPosts = async (id) => {
    const { data, error } = await supabase
        .from('posts')
        .select("*")
        .eq("author_id", id);

    if (error) return { success: false, message: error.message };

    return { success: true, data };
}

const updatePost = async (id, title, slug, content) => {
    const { data, error } = await supabase
        .from('posts')
        .update({ title, slug, content })
        .eq('id', id)
        .select();

    if (error) return { success: false, message: error.message };

    return { success: true, data };
}

const deletePost = async (id) => {
    const { error: err } = await supabase
        .from('posts')
        .delete()
        .eq('id', id);

    if (err) return { success: false, message: err.message };

    return { success: true };
}

export { getSession, signUpUser, updateUser, signInUser, signOutUser, createPost, getPosts, getAuthorPosts, updatePost, deletePost };