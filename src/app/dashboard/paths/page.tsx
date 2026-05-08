import React from "react";
import { getTracks } from "@/services/tracks.service";
import PathsManagementClient from "./PathsManagementClient";

export default async function PathsManagementPage() {
    const tracks = await getTracks().catch(() => []);

    return (
        <PathsManagementClient 
            initialPaths={tracks} 
        />
    );
}
