import { LoaderCircle } from "lucide-react";

export default function Loader() {
    return (
        <div className="flex justify-center items-center py-20">
            <LoaderCircle
                className="w-10 h-10 text-orange-500 animate-spin"
            />
        </div>
    );
}