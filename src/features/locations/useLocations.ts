import { useEffect, useState } from "react";
import { getLocations } from "./location.service";
import { Location } from "./type";

export const useLocations = () => {
    const [locations, setLocations] = useState<Location[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetch = async () => {
            try {
                setLoading(true);
                const data = await getLocations();
                setLocations(data);
            } catch {
                setError("Failed to load locations");
            } finally {
                setLoading(false);
            }
        };

        fetch();
    }, []);

    return { locations, loading, error };
};
