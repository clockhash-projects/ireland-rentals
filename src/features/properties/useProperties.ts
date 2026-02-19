import { useEffect, useState } from "react";
import { getProperties, PropertyFilters } from "./property.service";
import { Property } from "./types";

export const useProperties = (filters: PropertyFilters) => {
    const [properties, setProperties] = useState<Property[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetch = async () => {
            try {
                setLoading(true);
                const data = await getProperties(filters);
                setProperties(data);
            } catch {
                setError("Failed to load properties");
            } finally {
                setLoading(false);
            }
        };

        fetch();
    }, [filters]);

    return { properties, loading, error };
};
