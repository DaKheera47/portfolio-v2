import React from "react";

type Props = {};

export default function Sidebar({}: Props) {
    return (
        <div className="md:absolute md:left-0 md:top-0 bg-zinc-900 md:w-2/5">
            <div className="flex flex-col items-center justify-center md:h-screen">
                <div className="text-white text-3xl">
                    <span className="font-bold">send</span>
                    <span className="font-thin">help</span>
                </div>
            </div>
        </div>
    );
}
