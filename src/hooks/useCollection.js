import { useState } from "react";
import data from "../../data/seed.json"

export default function useCollection() {
    const [collection] = useState(data);

    return collection;
}