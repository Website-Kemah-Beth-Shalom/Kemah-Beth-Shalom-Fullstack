// hooks/useGallery.tsx
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteGalleryImage, fetchAllGalleryImages, uploadGalleryImage } from "@/Services/GalleryServices";

export const useGallery = (searchTerm = "") => {
    const queryClient = useQueryClient();
    const query = useQuery({
        queryKey: ['gallery', searchTerm],
        queryFn: () => fetchAllGalleryImages(searchTerm),
    });
    const addGalleryImageMutation = useMutation({
        mutationFn: uploadGalleryImage,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['gallery'],
            });
        },
        onError(error, variables, context) {
            console.log(error);
        },
    });
    const deleteGalleryImageMutation = useMutation({
        mutationFn: deleteGalleryImage,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['gallery'],
            });
        },
    });
    return { query, addGalleryImageMutation, deleteGalleryImageMutation };
}