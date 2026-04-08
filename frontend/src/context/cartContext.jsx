import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const cartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [user, setUser] = useState(null);
    const [isInitialLoad, setIsInitialLoad] = useState(true);

    useEffect(() => {
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
            setIsInitialLoad(false);
        });

        supabase.auth.getSession().then(({ data: { session } }) => {
            setUser(session?.user ?? null);
            setIsInitialLoad(false);
        });

        return () => subscription.unsubscribe();
    }, []);

    const fetchCart = async () => {
        if (!user) return setCart([]);
        const { data, error } = await supabase
            .from('cart_items')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: true });

        if (!error) setCart(data || []);
    };

    useEffect(() => { fetchCart(); }, [user]);

    const addToCart = async (product, qty) => {
        if (!user) return alert("Please login first");
        await supabase.from('cart_items').upsert({
            user_id: user.id,
            product_id: product._id,
            name: product.name,
            price: Number(product.price),
            image_url: product.imageUrl,
            quantity: qty
        }, { onConflict: 'user_id,product_id' });
        fetchCart();
    };

    const updateQuantity = async (productId, newQty) => {
        if (!user || newQty < 1) return;
        await supabase.from('cart_items')
            .update({ quantity: newQty })
            .eq('user_id', user.id)
            .eq('product_id', productId);
        fetchCart();
    };

    const removeFromCart = async (productId) => {
        if (!user) return;
        await supabase.from('cart_items')
            .delete()
            .eq('user_id', user.id)
            .eq('product_id', productId);
        fetchCart();
    };

    const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    return (
        <cartContext.Provider value={{
            cart, addToCart, removeFromCart, updateQuantity,
            cartTotal, user, isInitialLoad
        }}>
            {children}
        </cartContext.Provider>
    );
};

export const useCart = () => useContext(cartContext);