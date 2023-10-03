"use client"

import {useEffect, useState} from "react";
import {ProModal} from "@/components/pro-modal";
import {CancelProModal} from "@/components/cancel-pro-modal";

export const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) {
        return null
    }

    return (
        <>
            <ProModal />
            <CancelProModal />
        </>
    )
}
