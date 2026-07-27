'use server';

import { put, list } from '@vercel/blob';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const ADMIN_COOKIE = 'admin_session';

export async function login(formData: FormData) {
    const password = formData.get('password') as string;

    if (password !== process.env.ADMIN_PASSWORD) {
        // Redirigimos con un parámetro de error
        redirect('/admin?error=1');
    }

    const cookieStore = await cookies();
    cookieStore.set(ADMIN_COOKIE, 'true', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7, // 7 días
        path: '/',
    });

    redirect('/admin');
}

export async function logout() {
    const cookieStore = await cookies();
    cookieStore.delete(ADMIN_COOKIE);
    redirect('/');
}

export async function isAdmin() {
    const cookieStore = await cookies();
    return cookieStore.get(ADMIN_COOKIE)?.value === 'true';
}

export async function uploadImage(formData: FormData) {
    const isLoggedIn = await isAdmin();
    if (!isLoggedIn) {
        redirect('/admin');
    }

    const file = formData.get('file') as File;
    if (!file || file.size === 0) {
        redirect('/admin?uploadError=1');
    }

    await put(`images/${Date.now()}-${file.name}`, file, {
        access: 'public',
    });

    // Redirigimos para que se recargue la página y se vea la nueva imagen
    redirect('/admin?uploaded=1');
}

export async function getImages() {
    const { blobs } = await list({
        prefix: 'images/',
    });

    return blobs.map((blob) => ({
        url: blob.url,
        pathname: blob.pathname,
        uploadedAt: blob.uploadedAt,
    }));
}