import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';


export const useCart = () => {
    const queryClient = useQueryClient();
    const {
        data: cart = [],
    } = useQuery({

        queryKey: ['cart'],
        queryFn: async () => {
            const cart = localStorage.getItem('cart');
            if (cart) {
                return JSON.parse(cart);
            }
            return [];
        },
        // initialData: [],
        staleTime: 1000 * 60 * 5,
    });
    const {
        mutate: addCartMutation,
    } = useMutation({
        mutationFn: async (item: any) => {
            const cart = localStorage.getItem('cart');
            if (cart) {
                const cartArray = JSON.parse(cart);
                const found = cartArray.some((el: any) => el.id === item.id);
                if (!found) {
                    cartArray.push(item);
                    localStorage.setItem('cart', JSON.stringify(cartArray));
                }
            } else {
                localStorage.setItem('cart', JSON.stringify([item]));
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['cart'],
            });
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: ['cart'],
            });
        }
    });
    return { cart, addCartMutation };
}
