// hooks/useImages.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteImage, fetchAllImages, updateImage, uploadImage } from "@/Services/ImageServices";
import { ImageProps } from '@/types';

export const useImages = (searchTerm = "") => {
    const queryClient = useQueryClient();

    const query = useQuery({
        queryKey: ['images', searchTerm],
        queryFn: () => fetchAllImages(searchTerm),
    });

    const addImageMutation = useMutation({
        mutationFn: uploadImage,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['images'],
            });
        },
        onError(error, variables, context) {
            console.log(error);
        },
    });

    const deleteImageMutation = useMutation({
        mutationFn: deleteImage,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['images'],
            });
        },
    });

    const updateImageMutation = useMutation({
        mutationFn: (variables: { id: number, data: any }) => updateImage(variables.id, variables.data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['images'],
            });
        },
    });

    return { query, addImageMutation, deleteImageMutation, updateImageMutation };
};
