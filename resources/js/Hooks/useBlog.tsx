import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { SaveBlogasDraft, fetchBlog } from "@/Services/BlogServices";

export const useBlog = () => {
    const queryClient = useQueryClient();
    const query = useQuery({
        queryKey: ['blog'],
        // queryFn: fetchAllBlog, fetch one single blog
        queryFn: fetchBlog,
    });


    // const addBlogMutation = useMutation({
    //     mutationFn: SaveBlog,
    //     onSuccess: () => {
    //         queryClient.invalidateQueries({
    //             queryKey: ['blog'],
    //         });
    //     },
    // });

    // const deleteBlogMutation = useMutation({
    //     mutationFn: deleteBlog,
    //     onSuccess: () => {
    //         queryClient.invalidateQueries({
    //             queryKey: ['blog'],
    //         });
    //     },
    // });

    const saveBlogMutation = useMutation({
        mutationFn: SaveBlogasDraft,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['blog'],
            });
        },
    });
    return { query, saveBlogMutation };
}