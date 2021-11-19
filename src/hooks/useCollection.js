import { useState } from "react";
import data from "../../data/seed.json"
//import testData from "../../data/test-data.json"

export default function useCollection() {
    const [collection] = useState(data);

    return collection;
}